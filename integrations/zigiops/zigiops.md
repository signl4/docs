---
title: ZigiOps
parent: Integrations
---
# SIGNL4 Integration with ZigiOps

[ZigiOps](https://www.zigiwave.com/zigiops-integration-platform?utm_source=signl4&utm_medium=docs&utm_campaign=signl4-docs-partn) by [ZigiWave](https://www.zigiwave.com/?utm_source=signl4&utm_medium=docs&utm_campaign=signl4-docs-partn) is the one of the most flexible, no-code integration platforms. Connect your systems in minutes with the predefined integration templates. Scale and modify your integrations easily, without any code. Connect SIGNL4 with your tools to automate the events and data exchange between them to enhance your daily operations with an extension to your team wherever it is.

SIGNL4 is a mobile alert notification app for powerful alerting, alert management and mobile assignment of work items. Get the app at [https://www.signl4.com](https://www.signl4.com).

In the example below we will be looking at how you can automatically transfer events from Micro Focus OpsBridge to SIGNL4 with ZigiOps.

## Prerequisites:
- A SIGNL4 ([https://www.signl4.com](https://www.signl4.com)) account
- A ZigiOps instance ([https://zigiwave.com](https://www.zigiwave.com/?utm_source=signl4&utm_medium=docs&utm_campaign=signl4-docs-partn))
- A Micro Focus OpsBridge instance ([https://microfocus.com](https://microfocus.com), optional)

1. Log-in to ZigiOps and check the connection with your SIGNL4 and OpsBridge instances. For the SIGNL4 configuration you just need to enter your SIGNL4 team secret.
![Connection-Check](connection.png)

2. Load the SIGNL4 – OpsBridge events template from our library or create an integration from scratch. Modify the data mapping and filtering per your needs.
![Templates](templates.png)

3. To test, launch the integration and when an event is created in OpsBridge, it will automatically be transferred to your SIGNL4 instance where an alert is sent to your team.

You can find more information about the [SIGNL4 Connector](https://www.zigiwave.com/apps/signl4-integrations?utm_source=signl4&utm_medium=docs&utm_campaign=signl4-docs-partn) and about the [integration with OpsBridge](https://www.zigiwave.com/integrations/signl4-opsbridge-integration?utm_source=signl4&utm_medium=docs&utm_campaign=signl4-docs-partn) directly at the ZigiWave web site.

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)

