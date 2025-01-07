---
title: Email
parent: Integrations
---

# SIGNL4 Integration via Email (SMTP)

SIGNL4 provides an SMTP server. Each team in SIGNL4 gets a dedicated email address ( {teamsecrect} [at] mail.signl4.com ). Simply send an email to this address to notify an entire team or team members on duty. Global email addresses with routing rules can be configured as well.

## Trigger Alerts

You can send more or less any email and SIGNL4 will try to process it and to trigger an alert.

Even attachments (e.g. images or audio files) are supported.

![SIGNL4 Alert](signl4-alert.png)

If you want to improve formatting and add additional functionality you can send a plain-text email and format the email body as follows:

```
Title: My Alert
Message: Hello world.
```

You can add any parameter / value pair in this way. Find a list of supported parameters on the [webhook page](https://docs.signl4.com/integrations/webhook/webhook.html).

You can even close alerts as described here: [https://www.signl4.com/blog/update-july-2020-resolve-alerts/](https://www.signl4.com/blog/update-july-2020-resolve-alerts/)

Here is an example for a plain-text email to trigger an alert:

**Subject**: Server Down
```
Message: Server A2 is down.
X-S4-ExternalID: 1234
X-S4-Status: new
```

Email Body to close the alert:

**Subject**: Server Up
```
X-S4-ExternalID: 1234
X-S4-Status: resolved
```
