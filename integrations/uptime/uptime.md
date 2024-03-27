---
title: Uptime
parent: Integrations
---

# SIGNL4 Integration with Uptime

In our example we are using Uptime to monitor the up-time of critical servers.  We are forwarding SMTP notifications to the SIGNL4 team email address to receive the alerts.

SIGNL4 is a mobile alert notification app for powerful alerting, alert management and mobile assignment of work items.  Get the app at [https://www.signl4.com](https://www.signl4.com)

## Prerequisites
- A SIGNL4 ([https://www.signl4.com](https://www.signl4.com)) account
- An Uptime ([https://uptime.com](https://uptime.com)) account

## How to integrate

First create a contact with the SIGNL4 team email address.

![Uptime Add Contact](uptime-add-contact.png)

Next, lets create a monitor. For this example, we will use an Azure VM that is turned off.

Populate the Check interval time and URL under the Basic Tab.

![Uptime Add Check](uptime-add-check.png)

Next populate the SIGNL4 team in the escalation tab.

![uptime_escalate](uptime_escalate.png)

The dashboard will show when the website is unreachable. It then forwards an email to the SIGNL4 team in which the mobile app segregates data into an easily readable format.

![SIGNL4 Alert](signl4-uptime.png)
