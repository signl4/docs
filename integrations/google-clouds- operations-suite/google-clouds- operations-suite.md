---
title: Google Cloud’s Operations Suite
parent: Integrations
---

# SIGNL4 Integration with Google Cloud’s Operations Suite

Google Cloud’s Operations Suite (formerly Stackdriver) is a cloud-based systems management service offering performance and diagnostics data to public cloud users.

It provides access to logs, metrics, traces, and other signals from infrastructure platforms, virtual machines, containers, middleware, etc. with the objective to track issues all the way from the end user to backend services and infrastructure. Pairing this Google Cloud’s Operations Suite with SIGNL4 can enhance your daily operations with an extension to your mobile team in the field or on the shop floor.

Gathering events from IoT devices and sending team alerts in case of critical incidents is a broad field. It starts with simple prototypes using a Raspberry Pi and goes up to industrial IoT scenarios, machine data or distributed systems in the field.

The following example demonstrates the whole flow from an event on a device, through Google IoT Core and then notifying an engineer using SIGNL4.

SIGNL4 is a mobile alert notification app for powerful alerting, alert management and mobile assignment of work items. Get the app at [https://www.signl4.com](https://www.signl4.com/).

Cloud IoT Core is a fully managed service that allows you to easily and securely manage and connect your IoT devices. The integration with SIGNL4 is straightforward. In the following we will show an example on how to send alert notifications using SIGNL4 in case of MQTT events coming from devices in the field.

## Prerequisites

- A [SIGNL4](https://www.signl4.com/) account
- Access to the Google Cloud’s Operations Suite ([https://console.cloud.google.com](https://console.cloud.google.com/))

First of all go to your workspace in Google Cloud’s Operations Suite or create a new one at [https://app.google.stackdriver.com](https://app.google.stackdriver.com/).[](https://github.com/signl4/signl4-integration-google-stackdriver/blob/master/README.md#setup-the-signl4-webhook)

Go to Workspace Settings -> Notifications -> Webhooks and create a new Webhook.

Here you just need to enter your SIGNL4 webhook URL. The is the specific team secret of your SIGNL4 team.

Click Test Connection to test the connection. You should then receive a SIGNL4 alert on your phone.

![Google Stackdriver Webhook](google-stackdriver-webhook.png)

Here you just need to enter your SIGNL4 webhook URL. The is the specific team secret of your SIGNL4 team.

Click Test Connection to test the connection. You should then receive a SIGNL4 alert on your phone.[](https://github.com/signl4/signl4-integration-google-stackdriver/blob/master/README.md#add-an-alerting-policy)

In the Google Cloud’s Operations Suite console go to Alerting -> Alerting Policies and then click Add Policy.

Here you can specify the conditions on when to send the alert. And you can add Your Notification Channel. For the latter you can select Webhook with Token Authentication and then select the SIGNL4 notification channel you have configured in the previous step.

![Google Stackdriver Notification](google-stackdriver-notification.png)

Then you can specify a name for the notification and click Save.

## Ready to Go

This is it and now you will receive SIGNL4 alerts for any events and incidents matching your conditions.

If you would like to simulate event data you can do so for example using MQTT as descrived here: [https://github.com/signl4/signl4-integration-google-iot](https://github.com/signl4/signl4-integration-google-iot).

You can also find the information at GitHub: [https://github.com/signl4/signl4-integration-google-stackdriver](https://github.com/signl4/signl4-integration-google-stackdriver)

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-iot.png)
