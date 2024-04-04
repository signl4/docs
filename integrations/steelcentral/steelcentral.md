---
title: SteelCentral
parent: Integrations
---

# SIGNL4 Integration with SteelCentral by Riverbed

Installing the agent on a VM machine will collect vital information such as memory and CPU usage. Alert definitions set within Steel Central will gather this information and display it through widgets on the dashboard as well as send an email out to responsible parties.  This is where SIGNL4 comes in. Rather than having the email get lost in the inbox, SIGNL4 sends this critical data out to team members, immediately alerting them of mission critical issues.

Set notifications by going to Configure and Alert Definitions.

![Configure Alert Definitions](configure-alert-definitions.png)

Click Add Definition and fill in the appropriate conditions.  Select the server an agent is installed and put in an email address to receive the notification.  This is where the SIGNL4 team email address goes.  Additional thresholds can be set in the Configure > Thresholds section.

![Email](email.png)

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)
