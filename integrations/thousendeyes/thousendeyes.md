---
title: ThousendEyes
parent: Integrations
---

# SIGNL4 Integration with ThousendEyes

In our example we are using ThousandEyes to monitor the up-time of critical servers.  We are setting up a SIGNL4 Webhook as the method of receiving the alerts.

SIGNL4 is a mobile alert notification app for powerful alerting, alert management and mobile assignment of work items.  Get the app at [https://www.signl4.com](https://www.signl4.com/).

## Prerequisites

- A SIGNL4 ([https://www.signl4.com](https://www.signl4.com/)) account
- A ThousandEyes ([https://www.thousandeyes.com](https://www.thousandeyes.com/)) account

## How to integrate

Add or edit an Alert Rule by selecting Alerts and Alert Rules.

![te_alert0](thousendeyes-alert1.png)

In the **Notifications** section click on Configure Webhook.

Give it a name and enter the URL of the SIGNL4 webhook associated with your account.

![ThousendEyes Webhook 1](thousendeyes-webhook1.png)

![ThousendEyes Webhook 2](thousendeyes-webhook2.png)

Be sure to select the newly created webhook in the alert rule.

Click on Create New Alert Rule or Save.

That’s it! The next time this alert is triggered, data will be sent from ThousandEyes to your SIGNL4 team.

![te_alert2](thousendeyes-alert2.png)

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)
