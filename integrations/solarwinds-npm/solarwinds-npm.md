---
title: SolarWinds NPM
parent: Integrations
---

# SIGNL4 Integration with SolarWinds NPM

SolarWinds can send out alerts, but all too often the emails that are sent from critical events are missed. SIGNL4 ensures that all on duty members receive, acknowledge and resolve those critical alerts, all from their smartphones. With persistent notifications and escalation chains there will never be a critical alert that goes unattended. SIGNL4 also offers ad-hoc collaboration between team members for each and every alert, so Subject Matter Experts can be looped in to help resolve issues.

SIGNL4 notifies teams on their mobile devices when custom alert conditions are met in SolarWinds NPM.

### How to integrate

From the main dashboard go to Alerts & Activity -> Alerts.

![SolarWinds](screenshot-solarwinds.jpg)

Select an Alert then click on Edit Alert Definition.

![SolarWinds 2](solarwinds2.jpg)

Once you are editing the alert click on Triggers Actions.

![SolarWinds 3](solarwinds3.jpg)

In the Trigger Actions section click on Add Action.

![SolarWinds 4](solarwinds4.jpg)

The simplest form of getting this alert to SIGNL4 is to send an email to the SIGNL4 email address.

![SolarWinds 5](solarwinds5.jpg)

If you are already receiving emails to an inbox, just add the SIGNL4 email as a CC.

![SolarWinds 6](solarwinds6.jpg)

You can also send a Post Request to the signal.

![SolarWinds 7](solarwinds7.jpg)

Enter the URL provided by SIGNL4 and the message that you want delivered.  SIGNL4 will receive this message and generate an alert.

With either of these actions added SIGNL4 will receive the alert and notify on duty members of that team.

![SolarWinds 8](solarwinds8.jpg)

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)

