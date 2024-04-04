---
title: Microsoft Dynamics 365
parent: Integrations
---

# SIGNL4 Integration with Microsoft Dynamics 365

On-the-go management may want to know the status of the workday in the office when they are traveling on business. In SIGNL4, workforce leaders can stay in the loop with mobile CRM updates pushed from Dynamics 365.

By configuring Microsoft Logic Apps, users will be able to push [Microsoft Dynamics 365](https://dynamics.microsoft.com/en-us/) updates to their SIGNL4 team. This is suggested especially for managers and leadership who want to be aware of daily team actions.


### Mobile Real-time Notifications

If you use Microsoft Dynamics 365 CRM, SIGNL4 provides a powerful solution for proactive business notifications, set up in just a few minutes. SIGNL4 ensures fast mobile notification to team leaders and managers, taking into account their availability.

All this works through Microsoft Logic Apps and the connector for SIGNL4, which requires an account with the SIGNL4 service. You can quickly set up an account in SIGNL4 through the [mobile app](https://www.signl4.com/free-trial-test/).

Of course you also need a Dynamics 365 subscription from Microsoft (the whole set up of course also works with other CRM vendors). To work with Logic Apps, you need an Azure account. Logic Apps are the "glue" between Dynamics 365 and SIGNL4.

## Configure Logic Apps step by step

Here are the steps for setting up mobile push notifications upon invoices created in Dynamics CRM:

1. Open the Microsoft Azure Management Portal and go to "Logic Apps"in the menu.
2. Click "New" to create a new Logic App.
3. Enter the necessary data and wait briefly until the Logic App is created.
4. Select a "Blank Logic App" as template. SIGNL4 templates will be available soon.
5. Locate the "Dynamics 365" connector and select "When a Record is created".
6. Then select your Dynamics 365 organization and the entity to be notified.
7. In the second step, search for "SIGNL4" and select the action "Trigger Alert".
8. You must then log in to the SIGNL4 portal with your SIGNL4 account in order to give Microsoft Logics Apps access to the necessary data ("Consent").
9. Fill in the parameters that you want to transmit for the notification via SIGNL4. To do this, you can transfer dynamic parameters from CRM
10. Then press "Save" and you are good to go…

Here is a short video of how it works.

<iframe title="Mobile Notifications for Dynamics 365 CRM" src="https://player.vimeo.com/video/246451089?h=dc2767eed1&amp;dnt=1&amp;app_id=122963" width="1200" height="675" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

Voilà. As soon as a new invoice is created in CRM, your team receives a mobile push notification via SIGNL4 with all specified data from Dynamics 365.

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)
