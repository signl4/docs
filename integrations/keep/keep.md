---
title: Keep
parent: Integrations
---

# SIGNL4 Integration with Keep

[Keep](https://www.keephq.dev/) is an open-source AIOps and alerts management and automation platform that helps you to connect, automate, and analyze alerts for any part of your observability stack with GitHub Action-like interfaces.

The SIGNL4 integration is available as a Provider in Keep.

By sending automated alerts from Keep, users can react to critical situations quickly and take according action.

SIGNL4 is a mobile alert notification app for powerful alerting, alert management and mobile assignment of work items. Get the app at [https://www.signl4.com](https://www.signl4.com/).

![Keep SIGNL4](keep-signl4.png)

To use SIGNL4 alerting in Keep, you first need to create the SIGNL4 Provider. In the Keep web portal go to Providers, search for SIGNL4 go into its settings. Here you enter your SIGNL4 integration or team secret and click Connect.

## Send alerts

To send alerts, you can create a workflow under Workflows and integrate SIGNL4 there. You can find more information [here](https://docs.keephq.dev/providers/documentation/signl4-provider).

In your workflow's SIGNL4 step you can set the parameters as needed. You can also use place holders.

When you trigger a SIGNL4 alert from a new alert in Keep, it is recommended to set the parameter s4_external_id to the alert's finger print, i.e. {{alert.fingerprint}}.

## Two-Way Integration

It is also possible to send status updates from SIGNL4 back to Keep, e.g. when an alert in SIGNL4 has been acknowledged, annotated or closed. For this to work you need to configure the back-channel connector app for Keep in SIGNL4. In the SIGNL4 web portal go to Integrations -> Gallery and look for the Keep (<-) connector. Please note that the arrow point to the left. Here you configure your API URL and your API Key. The other parameters are optional. You can find more information about the parameters by hovering over the (?) symbol. When ready, click Install and now status changes in SIGNL4 will reflect in the Keep alert.

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-keep.png)
