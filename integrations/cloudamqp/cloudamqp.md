---
title: CloudAMQP
parent: Integrations
---

# SIGNL4 Integration with CloudAMQP

[CloudAMQP](https://www.cloudamqp.com/) offers fully managed RabbitMQ (and LavinMQ) message broker clusters in the cloud, so developers don’t have to install, run, scale or monitor queue servers themselves. It lets applications send/receive messages asynchronously, decoupling services for better scalability and reliability, with monitoring, alarms, high availability, and security (GDPR/HIPAA) built in.

SIGNL4 enhances CloudAMQP with reliable mobile alerting, including a mobile app, push notifications, SMS messages, voice calls, automated escalations, and on-call scheduling. SIGNL4 ensures that critical alerts reach the right people reliably – anytime, anywhere.

## Prerequisites
- A SIGNL4 (https://www.signl4.com) account
- A CloudAMQP (https://www.cloudamqp.com/) instance

## How to Integrate

Integrating SIGNL4 with CloudAMQP is straightforward. Here’s how it works.

In your CloudAMQP dashboard go to Monitoring -> Alarms. First add a new recipient, choose SIGNL4 as type and enter your SIGNL4 webhook URL including team or integration secret so CloudAMQP can send alerts to SIGNL4.

Then create or edit alarms, set thresholds, and assign the SIGNL4 recipient to them.

When an alarm triggers, CloudAMQP sends a notification to SIGNL4, which delivers it to your team via push, SMS or voice call.

You can find more information on how to configure SIGNL4 mobile alerting in CloudAMQP [here](https://www.cloudamqp.com/docs/cloudamqp-alarms.html).

That's it.

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)

