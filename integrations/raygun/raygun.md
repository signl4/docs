---
title: Raygun
parent: Integrations
---

# SIGNL4 Integration with Raygun

[Raygun](https://raygun.com/) provides software tools for monitoring and improving application performance and user experiences. Its products deliver real-time crash reporting, error tracking, and performance monitoring to help developers identify, diagnose, and resolve issues quickly, ensuring reliable and high-performing applications.

The SIGNL4 integration enhances Raygun’s monitoring by delivering real-time mobile alerts for critical issues like application crashes or performance bottlenecks. This ensures that development and operations teams can respond instantly to incidents, minimizing downtime and improving user satisfaction.

In our example we are using Raygun to monitor the number of database calls within an application.  We are forwarding SMTP notifications to the SIGNL4 team email address to receive the alerts.

SIGNL4 is a mobile alert notification app for powerful alerting, alert management and mobile assignment of work items.  Get the app at [https://www.signl4.com](https://www.signl4.com/)

## Prerequisites

- A SIGNL4 ([https://www.signl4.com](https://www.signl4.com/)) account
- A Raygun ([http://www.raygun.com](http://www.raygun.com/)) account

## How to Integrate

First let’s create the SIGNL4 user. From the top left navigation menu on the left side click on Invite Team.  The invite will come to the SIGNL4 mobile app where you can validate the email.

Then make sure the user is assigned to the associated Application within Raygun. Under Manage Teams make sure the application and the users are listed.

![Raygun User 1](raygun-user-1.png)

Now lets assign an incident to the user that we just created. Within the application click on Issues and select an issue to assign. On the Top right hand side click on the drop down box for Assign to and select the SIGNL4 user.

![Raygun User 2](raygun-user-2.png)

This will then immediately send an email alert to the SIGNL4 team.

![Raygun Alert](raygun-alert.png)
