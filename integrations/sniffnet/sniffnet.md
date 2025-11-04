---
title: Sniffnet
parent: Integrations
---

# SIGNL4 Integration with Sniffnet

[Sniffnet](https://sniffnet.net/) is a free, open-source network monitoring tool that makes it easy to keep an eye on your internet traffic. It lets you pick a network adapter, apply filters, view real-time charts, identify services, protocols, trojans, and worms, and set custom alerts – all with a user-friendly interface and strong focus on privacy and usability.

SIGNL4 adds reliable mobile alerting to Sniffnet with features like mobile app, push notifications, SMS messaging, voice calls, automated escalations, and on-call duty scheduling. SIGNL4 ensures that critical alerts reliably reach the responsible personnel – anytime, anywhere.

The integration of SIGNL4 with Sniffnet using a webhook is straightforward.

## Prerequisites

A SIGNL4 (<https://www.signl4.com>) account
A Sniffnet (<https://sniffnet.net/>) instance

## How to Integrate

To integrate Sniffnet with SIGNL4, open Settings -> Notifications in Sniffnet, set up remote notifications, and paste your SIGNL4 webhook URL. Sniffnet will send HTTP POST JSON payloads for selected events (e.g., data threshold exceeded or new data from favorites). Alerts then appear instantly in SIGNL4, notifying you on your mobile.

Please also refer to the Sniffnet documentation [here](https://github.com/GyulyVGC/sniffnet/wiki/Remote-notifications).

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)
