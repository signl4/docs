---
title: REST API Samples
parent: Samples
---

# SIGNL4 REST API Samples

This article lists sample calls of the SIGNL4 REST API for different purposes. You can find a detailes description of the SIGNL4 REST API [here](https://connect.signl4.com/api/docs/index.html?urls.primaryName=SIGNL4%20API%20V2).

## Get Teams

As a result you get the team id(s) that you might need in the next steps.

```http
GET https://connect.signl4.com/api/v2/teams
X-S4-Api-Key: {signl4-api-key}
```

## Get Users

As a result you get the user id(s) that you might need in the next steps.

```http
GET https://connect.signl4.com/api/v2/users
X-S4-Api-Key: {signl4-api-key}
```

## Get Duty Schedules

```http
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
