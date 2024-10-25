---
title: OTRS
parent: Integrations
---

# SIGNL4 Integration with OTRS

[OTRS](https://otrs.com/) is a cloud-based ticketing and automation system. This tool is perfect for call centers and help desk to take incoming calls and log them in the portal.

SIGNL4 comes in is at the alerting level. Currently OTRS will send an email to specified parties when a new ticket is raised. SIGNL4 allows for those emails to be directed to the right people at the right time. With on-call duty scheduling and a tiered escalation to a manager, SIGNL4 ensures that the email will not be lost in a sea of emails.

## Prerequisites

- A SIGNL4 ([https://www.signl4.com](https://www.signl4.com/)) account
- An OTRS ([https://otrs.com/](https://otrs.com/)) account

## How to integrate

In our example we are going to forward OTRS tickets via email to the SIGNL4 email address.  This will alert all team members on duty via Push, SMS and Voice notifications.

In order to keep the current workflows and processes already set within OTRS, we are going to simply create a new user and designate the SIGNL4 team email address as the notification delivery address.

From the admin panel, select Add Agent.

![ORTS Add Agent 1](otrs-add-agent-1.png)

Populate this user with the SIGNL4 team email address. For the purposes of forwarding ticket information, the username and password are not important but must be populated.  Be sure to enter the SIGNL4 team email address in the *Email field.

![ORTS Add Agent 2](otrs-add-agent-2.png)

Now when the helpdesk takes an incoming call, they simply need to select the SIGNL4 Team as the user to be assigned to the ticket.  This will then notify all on-call team members of the new ticket.  They will receive the information entered in the ticket as well as a link to the ticket within the OTRS portal.

![ORTS Ticket](otrs-ticket.png)

This will then send all tickets and raised alerts to the SIGNL4 team.

That's it!

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)
