---
title: Apprise
parent: Integrations
---

# SIGNL4 Integration with Apprise

[Apprise](https://github.com/caronc/apprise) is a lightweight notification library that supports sending messages to a wide range of popular notification services like Telegram, Slack, Discord, and SIGNL4 using a common and intuitive syntax. It allows developers and system administrators to easily send notifications without needing to research or adapt to each individual service.

[SIGNL4](https://www.signl4.com) sends actionable mobile alerts to the responsible users or teams. It provides a powerful set of features including a mobile app, push notifications, SMS, voice calls, automated escalations, and duty scheduling. This ensures that critical alerts are delivered instantly and reliably to the right people – anytime, anywhere.

## Prerequisites

- A SIGNL4 ([https://www.signl4.com](https://www.signl4.com/)) account
- Apprise ([https://github.com/caronc/apprise](https://github.com/caronc/apprise)) installed

## How to Integrate

Install Apprise as described [here](https://github.com/caronc/apprise). For sending SIGNL4 alerts you can use the Apprise SIGNL4 URL for SIGNL4. For more infornation see the documentation [here](https://github.com/caronc/apprise/wiki/Notify_signl4).

### Syntax
Valid syntax is as follows:
* `signl4://{secret}`

### Parameter Breakdown
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| a |  b | c |

| Variable    | Required | Description |
| ----------- | -------- | ----------- |
| service | No      | Assigns the alert to the service/system category with the specified name. |
| location | No       | Transmit location information (‘latitude, longitude’) with your event and display a map in the mobile app. |



You can find more information [here](https://docs.signl4.com/integrations/webhook/webhook.html).

### Example

Sends simple SIGNL4 alerts

```bash
apprise -vv --title 'Alert from Apprise' --body 'Hello world.'
```

```bash
apprise -vv --title 'Alert from Apprise' --body 'Hello world.' 'signl4://secret?service=IoT&location=52.3984235,13.0544149&external_id=a2&status=new'
```

The "secret" is your SIGNL4 team or integration secret.

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-apprise.png)





