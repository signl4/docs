---
title: REST API Samples
parent: Samples
---

# SIGNL4 REST API Samples

This article lists sample calls of the SIGNL4 REST API for different purposes. You can find a detailes description of the SIGNL4 REST API [here](https://connect.signl4.com/api/docs/index.html?urls.primaryName=SIGNL4%20API%20V2).

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

## Get Teams

As a result you get the team id(s) that you might need in the next steps.

```
GET https://connect.signl4.com/api/v2/teams
X-S4-Api-Key: {signl4-api-key}
```

## Get Users

As a result you get the user id(s) that you might need in the next steps.

```
GET https://connect.signl4.com/api/v2/users
X-S4-Api-Key: {signl4-api-key}
```

## Get Duty Schedules

```
POST https://connect.signl4.com/api/v2/schedules
X-S4-Api-Key: {signl4-api-key}
Content-Type: application/json
Accept: application/json

{
  "teamIds": [
    "{team-id}"
  ],
  "userId": "{user.id}",
  "minDate": "2025-01-01T00:00:00.000Z",
  "limit": 10
}
```

