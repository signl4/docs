---
title: REST API
parent: Integrations
---

# SIGNL4 REST API

SIGNL4 offers a comprehensive REST API for interacting and performing various tasks and configurations. You can find a detailed description of the REST API [here](https://connect.signl4.com/api/docs/index.html?urls.primaryName=SIGNL4%20API%20V2).

**Note**: If you plan to send (trigger) alert, you can use the [inbound webhook API](https://docs.signl4.com/integrations/webhook/webhook.html#signl4-integration-with-webhook). This offers a simple yet powerful way to trigger alerts by sending HTTP POST requests.

## Samples

You can find sample calls using the REST API [here](https://docs.signl4.com/samples/rest-api-samples/rest-api-samples.html).

### Send Event

The following HTTP request sends an event to SIGNL4. SIGNL4 can process the event and then trigger an alert. Except of the endpoint (URL) and X-S4-Api-Key header the format is the same as for the [inbound webhook API](https://docs.signl4.com/integrations/webhook/webhook.html#signl4-integration-with-webhook).

Please replace {team-secret} with your SIGNL4 team or integration secret and {api-key} with your SIGNL4 API key.

```
POST https://connect.signl4.com/api/v2/events/{team-secret}
X-S4-Api-Key: {api-key}
Content-Type: application/json

{
    "Title": "Hi",
    "Message": "Test",
    "Temperature": "10",
    "Temperature2": "30",
    "Group-By": "US",
    "X-S4-Service": "Temperature",
    "X-S4-Location": "52.3984235,13.0544149",
    "X-S4-AlertingScenario": "single_ack",
    "X-S4-Filtering": false,
    "X-S4-ExternalID": "test101",
    "X-S4-Status": ""
}
```
