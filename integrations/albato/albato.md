---
title: Albato
parent: Integrations
---

# SIGNL4 Integration with Albato

[Albato](https://albato.com/) is a no-code automation platform for all business automations. You can connect any apps without coders.

Pairing Albato with SIGNL4 can enhance your daily operations with an extension to your team wherever it is.

SIGNL4 is a mobile alert notification app for powerful alerting, alert management and mobile assignment of work items. Get the app at [https://www.signl4.com](https://www.signl4.com/).

In the following sample workflow below we send information from a HTTP request to SIGNL4.

## SIGNL4 App

Fist, under Apps you need to create a new SIGNL4 app, give it a name and enter your SIGNL4 team secret.

![Add a App in Albato](add-a-app-in-albato.png)

## User SIGNL4 in your Automation

Now you can use the SIGNL4 actions in your automations. There are two actions available, one for sending alerts (“Send alert”) and one for resolving / closing alerts (“Resolve alert”).

You can add the parameters within the action. In order to resolve / close and alert the parameter “SIGNL4 External ID” in the “Resolve alert” action needs to be the same as for the previously called “Send alert” action.

![Albato Automation](albato-automation.png)

You can find a detailed step-by-step guide for connecting the SIGNL4 app to Albato [here](https://albato.com/blog/publications/signl4-automation-to-optimize-your-alerting-system).

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-albato.png)
