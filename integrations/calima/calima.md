---
title: CALIMA
parent: Integrations
---

# SIGNL4 Integration with CALIMA

[CALIMA](https://en.calima.io/) offers a personal emergency signaling system that transforms employees' smartphones into safety devices, providing both manual and automatic alarm triggers to protect lone workers. The system includes a dead man's switch feature, which automatically detects immobility or falls and triggers an alarm to ensure rapid assistance.

![CALIMA app](calima-app.png)

SIGNL4 is a mobile alerting and incident management service for alerting responsible users or teams about critical situations as quickly and as reliably as possible. It supports app push, SMS test, voice calls, including escalation, shift planning and collaboration. Get the started at [https://www.signl4.com](https://www.signl4.com/).

SIGNL4 enhances CALIMA’s lone worker safety by instantly delivering mobile alerts triggered by CALIMA’s dead man switch, ensuring rapid response and team coordination in emergencies.

The integration of SIGNL4 with CALIMA is straightforward.

## Prerequisites
- A [SIGNL4](https://www.signl4.com/) account
- A [CALIMA Cloud](https://calima.cloud/#/signup) account

## How to Integrate

In the event of an emergency, CALIMA can send a webhook or an email. You can use both with SIGNL4. The following shows how to configure the webhook.

![CALIMA webhook](calima-config.png)

In your CALIMA Cloud portal you go to Webhooks and create a new Alarm Webhook as a POST request with your SIGNL4 webhook URL including team or integration secret.

The body represents your alert text and it can contain placeholders. Here is an example:

{% raw %}
```
{
  "Title": "Alert from CALIMA",
  "Message": "Alert from worker {{name}}. Please check urgently.",
  "Link": {{liveAppURL}}
}
```
{% endraw %}

This will trigger a SIGNL4 alert and the response team can take according action. 

## SIGNL4 Alerting

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-calima.png)
