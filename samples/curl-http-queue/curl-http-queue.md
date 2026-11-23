---
title: Reliable HTTP Alerting with curl
parent: Samples
description: Trigger SIGNL4 alerts from Linux with curl, a persistent disk queue, and cron-based retries for failed HTTP requests.
permalink: /samples/curl-http-queue/
redirect_from:
  - /samples/curl-http-queue/curl-http-queue.html
  - /samples/curl-http-queue/curl-http-queue
---
# Reliable SIGNL4 HTTP Alerting with curl and a Disk Queue

Sending alerts to [SIGNL4 via webhook](https://docs.signl4.com/integrations/webhook/) is straightforward with `curl`. However, a regular `curl` command does not persist requests if the network is down or the destination is temporarily unavailable. Even `curl --retry` only retries while the command is running.

This Linux sample adds a **small, persistent HTTP queue**: a shell script saves each JSON alert to disk, attempts delivery immediately, and keeps temporary failures for later retries by cron. After SIGNL4 accepts the request, the queued file is removed. It is useful for monitoring scripts, industrial/OT systems, edge devices, and machines with intermittent Internet connectivity.

Once an event reaches SIGNL4, it can alert the responsible on-call team using app push, SMS, and voice calls, with acknowledgment and automatic escalation.

> **Network requirement:** This approach still requires outbound HTTPS access to SIGNL4, either directly or through an allowed proxy. If only SMTP is available, use the [DMA email alerting sample](/samples/dma-email-alerting/) instead.

## Prerequisites

- A Linux machine with Bash, `curl`, `flock` (typically from `util-linux`), `mktemp`, and cron.
- Outbound HTTPS connectivity to `connect.signl4.com` (possibly intermittent).
- A SIGNL4 inbound webhook URL, available under **Integrations** in SIGNL4. It has the format `https://connect.signl4.com/webhook/YOUR_TEAM_SECRET`.

On Debian/Ubuntu, install the required utilities if necessary:

```bash
sudo apt update
sudo apt install curl util-linux cron
```

## 1. Configure the webhook URL

Keep the SIGNL4 webhook URL in a curl configuration file rather than embedding it directly in the shell script or putting the secret on the command line:

```bash
mkdir -p "$HOME/.config"
cat > "$HOME/.config/signl4-http-queue.curl" <<'EOF'
url = "https://connect.signl4.com/webhook/YOUR_TEAM_SECRET"
EOF
chmod 600 "$HOME/.config/signl4-http-queue.curl"
```

Replace `YOUR_TEAM_SECRET` with your SIGNL4 team/integration secret. **Treat the webhook URL as a credential** and do not commit it to source control. Curl reads this URL using `--config`, so it is not passed as a URL argument to the `curl` process.

## 2. Create the queue script

Save the following as `signl4-http-queue.sh` and install it as `/usr/local/bin/signl4-http-queue`:

```bash
sudo install -m 755 signl4-http-queue.sh /usr/local/bin/signl4-http-queue
```

Script (`signl4-http-queue.sh`):

```bash
#!/usr/bin/env bash
# Minimal, disk-backed SIGNL4 HTTP alert queue for Linux.
set -euo pipefail
umask 077

QUEUE_DIR="${HOME:?}/.local/state/signl4-http-queue"
CURL_CONFIG="$HOME/.config/signl4-http-queue.curl"

mkdir -p "$QUEUE_DIR/failed"

case "${1:-}" in
  send)
    if [[ ! -r "$CURL_CONFIG" ]]; then
      echo "Missing curl config: $CURL_CONFIG" >&2
      exit 1
    fi

    # Write to a temporary file, then atomically publish to the queue.
    tmp_file=$(mktemp "$QUEUE_DIR/$(date -u +%Y%m%dT%H%M%S)-XXXXXXXX.tmp")
    trap 'rm -f -- "$tmp_file"' EXIT
    cat > "$tmp_file"
    if [[ ! -s "$tmp_file" ]]; then
      echo "Empty alert payload" >&2
      exit 1
    fi
    mv -- "$tmp_file" "${tmp_file%.tmp}.json"
    trap - EXIT

    # Try immediately; the alert remains on disk if delivery fails.
    exec "$0" flush
    ;;

  flush)
    if [[ ! -r "$CURL_CONFIG" ]]; then
      echo "Missing curl config: $CURL_CONFIG" >&2
      exit 1
    fi

    # Only one queue processor should send requests at a time.
    exec 9>"$QUEUE_DIR/.lock"
    flock -n 9 || exit 0

    for file in "$QUEUE_DIR"/*.json; do
      [[ -f "$file" ]] || continue

      if status=$(curl --config "$CURL_CONFIG" \
        --silent --show-error --output /dev/null \
        --write-out '%{http_code}' \
        --connect-timeout 5 --max-time 20 \
        --header 'Content-Type: application/json' \
        --data-binary "@$file"); then
        :
      else
        status=000
      fi

      case "$status" in
        2??)
          rm -- "$file"                 # Accepted; remove from queue
          ;;
        408|429|5??|000)
          echo "Temporary failure (HTTP $status): $file" >&2
          # Retain the file for the next scheduled attempt.
          ;;
        *)
          mv -- "$file" "$QUEUE_DIR/failed/"
          echo "Non-retryable response (HTTP $status); moved to failed/" >&2
          ;;
      esac
    done
    ;;

  *)
    echo "Usage: $0 send|flush" >&2
    exit 2
    ;;
esac
```

The script creates a per-user queue at `$HOME/.local/state/signl4-http-queue/`. New files are written with restrictive permissions, then moved atomically into the queue. `flock` prevents concurrent delivery attempts from overlapping.

## 3. Send a SIGNL4 alert

Pipe a JSON payload into the script:

```bash
printf '%s\n' '{"Title":"Motor overheating","Message":"Motor M12 temperature above 90 C","Machine":"M12","Severity":"Critical"}' \
  | /usr/local/bin/signl4-http-queue send
```

The script first stores the payload on disk and then tries to POST it to SIGNL4. A successful HTTP response (`2xx`; SIGNL4 normally returns `201 Created`) removes the file. If the server or network is unavailable, the file remains queued.

You can call the same command from monitoring scripts, scheduled tasks, shell-based checks, or applications capable of writing JSON to standard output.

**Important:** Exit code `0` from `send` means the payload was accepted into the *local queue*, not necessarily delivered to SIGNL4.

## 4. Retry failed requests automatically

Edit the crontab of the **same Linux user** that runs the send command:

```bash
crontab -e
```

Add a retry every five minutes:

```cron
*/5 * * * * /usr/local/bin/signl4-http-queue flush
```

The script retries queued requests without deleting their JSON files until delivery succeeds. You can also trigger the retry manually:

```bash
/usr/local/bin/signl4-http-queue flush
```

Do not create duplicate cron entries. For near-immediate recovery, choose a shorter interval or a service/timer instead of cron.

## 5. Inspect the queue and troubleshoot

List pending requests:

```bash
ls -lh "$HOME/.local/state/signl4-http-queue/"*.json
```

Temporary errors such as connection failures, HTTP `408`, `429`, or `5xx` stay in the queue for the next retry. Other statuses (for example, `400` or `401`) are moved to the `failed/` folder to avoid retrying a request that needs configuration or payload changes:

```bash
ls -lh "$HOME/.local/state/signl4-http-queue/failed/"
```

Investigate the cause before re-queuing any files from `failed/`, particularly an invalid secret or malformed JSON payload. The stored JSON contains the alert details and should be protected accordingly.

**Operational notes:**

- A queued alert survives process exits and reboots, provided the disk remains intact and the retry job resumes.
- If SIGNL4 accepted a request but the HTTP response was lost, a later retry might create a duplicate alert. This is **at-least-once delivery**, not guaranteed exactly-once delivery. An optional `X-S4-ExternalID` can help identify related events, but should not be assumed to deduplicate repeated new alerts.
- SIGNL4 may return `429 Too Many Requests` if many alerts are submitted quickly. These remain queued; add throttling/backoff or use a dedicated queue service for higher volumes.
- Watch disk usage and queue age. Persistent connection problems, full disks, or misconfigured cron jobs can delay alerts indefinitely.
- For production-critical systems, consider a managed message queue or a service with monitoring, backoff, and dead-letter handling.

## Typical Use Cases

- **Linux monitoring and maintenance scripts:** Queue alerts about services, failed backups, low disk space, or system failures.
- **Edge/OT systems:** Buffer machine or sensor events while Internet access is intermittent.
- **Restricted networks:** Use an approved HTTPS proxy while retaining failed submissions locally.
- **Lightweight integrations:** Add reliable delivery to legacy tools that can run commands but have no built-in webhook retry queue.

## Further Information

- [SIGNL4 Webhook Integration](https://docs.signl4.com/integrations/webhook/)
- [SIGNL4 Webhook API](https://connect.signl4.com/webhook/docs/)
- [SIGNL4 Code Samples](https://docs.signl4.com/samples/code-samples/)
- [curl Command-Line Options](https://curl.se/docs/manpage.html)
- [Linux Email Alerting with DMA](/samples/dma-email-alerting/)
