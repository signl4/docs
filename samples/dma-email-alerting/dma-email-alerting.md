---
title: Linux Email Alerting with DMA
parent: Samples
description: Trigger SIGNL4 alerts from Linux using DragonFly Mail Agent (DMA) and SMTP, with a mail queue for retrying failed deliveries.
permalink: /samples/dma-email-alerting/
redirect_from:
  - /samples/dma-email-alerting/dma-email-alerting.html
  - /samples/dma-email-alerting/dma-email-alerting
---
# SIGNL4 Email Alerting from Linux with DMA

[DragonFly Mail Agent (DMA)](https://github.com/corecode/dma) is a lightweight mail transfer agent for Linux and BSD. It allows scripts, monitoring tools, and scheduled jobs to send email through an SMTP relay without setting up a full mail server.

This is a useful way to trigger [SIGNL4 alerts via email](https://docs.signl4.com/integrations/email/), particularly in restricted networks where outbound HTTP/HTTPS requests are not allowed but access to an SMTP relay is available. DMA also provides a local mail queue, so messages that could not be delivered immediately can be retried.

SIGNL4 turns the incoming email into a mobile alert and notifies the responsible on-call team via app push, SMS, or voice call, with acknowledgements and automatic escalation.

## Prerequisites

- A Linux system with DMA installed (the example below uses Debian/Ubuntu).
- An SMTP relay reachable from that system, including an account if the relay requires authentication.
- A SIGNL4 team email address, available in SIGNL4 in the format `YOUR_TEAM_SECRET@mail.signl4.com`.

Only outbound SMTP connectivity to the relay is required from the Linux host; DMA does not need to make an HTTP request to SIGNL4. The relay must be able to deliver email to SIGNL4.

## 1. Install DMA

On Debian or Ubuntu:

```bash
sudo apt update
sudo apt install dma
```

DMA may ask for basic mail configuration during installation. You can configure or adjust the relay settings afterward.

## 2. Configure the SMTP relay

Edit `/etc/dma/dma.conf` and configure your SMTP relay:

```ini
SMARTHOST smtp.example.com
PORT 587
AUTHPATH /etc/dma/auth.conf
SECURETRANSFER
STARTTLS
MASQUERADE alerts@example.com

# Keep DEFER disabled for immediate delivery attempts.
# DEFER
```

Replace the SMTP host and sender address with your own values. The example uses STARTTLS on port 587. If your installation already contains other required settings, such as `MAILNAME /etc/mailname`, keep them.

If SMTP authentication is required, add the credentials to `/etc/dma/auth.conf`:

```text
alerts@example.com|smtp.example.com:YOUR_SMTP_PASSWORD
```

The format is `username|smtp-server:password`. Protect this file from other users. For Debian/Ubuntu, the following permissions normally allow DMA to read it while restricting access:

```bash
sudo chown root:mail /etc/dma/auth.conf
sudo chmod 640 /etc/dma/auth.conf
```

Use a supported SMTP authentication method and a provider-approved password or application password. Do not commit real credentials or your SIGNL4 team email address to a public repository.

## 3. Send a SIGNL4 alert

Replace `YOUR_TEAM_SECRET` with the secret part of your SIGNL4 team's email address, then run:

```bash
printf '%s\n' \
  'From: alerts@example.com' \
  'To: YOUR_TEAM_SECRET@mail.signl4.com' \
  'Subject: Critical: Database server unavailable' \
  '' \
  'Title: Database server unavailable' \
  'Message: Database server db01 is not responding.' \
  'Host: db01' \
  'Severity: Critical' | dma -t
```

The `-t` option reads the recipient from the `To:` header. SIGNL4 processes the subject and email body, including structured `Parameter: Value` lines. You can use this command in a shell script, a monitoring notification command, or a cron job.

## 4. Retry queued emails

DMA provides a local queue for messages awaiting delivery. To inspect the queue and attempt delivery again, run:

```bash
sudo dma -bp    # List queued emails
sudo dma -q     # Attempt delivery of queued emails
```

For automatic retries, run `dma -q` periodically. **First check whether your distribution already installs a queue-processing job** (Debian's DMA package includes `/etc/cron.d/dma`):

```bash
cat /etc/cron.d/dma
```

If no equivalent job exists, edit root's crontab with `sudo crontab -e` and add:

```cron
*/5 * * * * /usr/sbin/dma -q
```

This processes the queue every five minutes. Verify the DMA executable path with `command -v dma` and adjust the cron entry if needed. Avoid creating a second retry job when your package already provides one.

**Delivery behavior:** With `DEFER` disabled, DMA attempts to send new messages immediately; pending messages can be retried from the queue. If you enable `DEFER`, DMA queues *all* new messages and sends them only when `dma -q` runs. This can delay alerts by up to the queue-processing interval, so immediate delivery is usually preferable for critical alerts.

Retries help with temporary relay or network outages but do not guarantee delivery. Permanent SMTP errors, authentication failures, and expired queued messages require investigation. Monitor the queue and mail logs so delayed or failed alerts do not go unnoticed.

## Typical Use Cases

- **Restricted IT/OT networks:** Send alerts through an approved SMTP relay when direct outbound HTTP/HTTPS calls are blocked.
- **Linux monitoring scripts:** Turn disk, service, backup, or hardware problems into actionable SIGNL4 alerts without adding an HTTP client or API integration.
- **Intermittent connectivity:** Queue messages locally and retry delivery after temporary SMTP connectivity problems.
- **Legacy systems:** Use simple command-line email or sendmail-compatible tools to connect older applications to SIGNL4's on-call routing and escalation.

## Further Information

- [SIGNL4 Email Integration](https://docs.signl4.com/integrations/email/)
- [DMA Project on GitHub](https://github.com/corecode/dma)
- [DMA Manual](https://manpages.debian.org/unstable/dma/dma.8.en.html)
