---
title: Outbound Webhook
parent: Integrations
---

# SIGNL4 Outbound Webhook

You can use the [inbound webhook API](https://docs.signl4.com/integrations/webhook/webhook.html#signl4-integration-with-webhook) for triggering SIGNL4 alerts.

The outbound webhook used for sending status updates (e.g. alert acknowledged, closed, or annotated) from SIGNL4 to your system via HTTP POST. You can find a detailed description of the outbound webhook [here](https://www.signl4.com/outbound-webhooks/).

Here are some tips on how to identify the different events:

| Event  | Parameters |
|---|---|
| New alert | eventType == 200 |
| Acknowledged | eventType == 201 && alert.statusCode == 2 |
| Closed / Resolved | eventType == 201 && alert.statusCode == 2 |
| Escalated | eventType == 202 |
| Annotation | eventType == 203, annotation.message contains the annotation text. |

General information:

| Parameter  | JSON path |
|---|---|
| External event ID | alert.externalEventId |
| User name | user.username |
| User emai | user.mailaddress |
