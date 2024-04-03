---
title: Hyperping
parent: Integrations
---

# SIGNL4 Integration with Hyperping

[Hyperping](https://hyperping.io/) is a cloud-based monitoring system.  This tool is perfect monitoring the status of your servers and applications to make sure they are reachable.  The monitoring dashboard gives a great overview of your setup but where SIGNL4 comes in is at the alerting level.  Server DOWN status will be sent via email to the SIGNL4 team by creating a new teammate within Hyperping. With on-call duty scheduling and a tiered escalation to a manager, SIGNL4 ensures that the email will not be lost in a sea of emails.

In our example we are going to forward Hyperping status information via email to the SIGNL4 team.  This will alert all team members on duty via Push, SMS and Voice notifications.

SIGNL4 is a mobile alert notification app for powerful alerting, alert management and mobile assignment of work items.  Get the app at [https://www.signl4.com](https://www.signl4.com/)

## Prerequisites

- A SIGNL4 ([https://www.signl4.com](https://www.signl4.com/)) account
- A Hyperping  ([https://Hyperping.io](https://hyperping.io/)) account

## Hot to Integrate

In order to not disturb any of the current workflows you may already have setup, we are simply going to add a new teammate within Hyperping that will forward status information to the SIGNL4 team.  
To do this follow these steps:

1. Login to the Hyperping admin console.
2. Click Teammates.
3. Enter the SIGNL4 team email address.
4. You will receive an alert to your SIGNL4 app – just click on the link provided and create a password to login.
5. The teammate is now created and able to receive alerts.
6. We setup a monitor and then shut down access to the URL generate an alert. This alert was received in the SIGNL4 app.

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)
