---
title: On / Off Duty
parent: Samples
---

# On / Off Duty

Sometimes, on-call schedules are managed in third-party tools such as SAP or Microsoft O365. In these cases, you may want to automatically set users on or off duty directly from those systems.

These sample API calls demonstrate how to set a specific user on or off duty. It uses the [SIGNL4 REST API](https://connect.signl4.com/api/docs/index.html?urls.primaryName=SIGNL4%20API%20V2).

You will need a SIGNL4 API key, which you can obtain in the SIGNL4 web portal under Integrations -> API Keys. In the examples below, replace "your-signl4-api-key" with your actual SIGNL4 API key.

## Get Users

First, you need the user ID of the person you want to set on or off duty. You can retrieve it using the following API call:

```bash
GET https://connect.signl4.com/api/v2/users
X-S4-Api-Key: your-signl4-api-key
Accept: application/json
```

This call returns a list of users. For the next step, you will need to select the user ID of the appropriate user from that list.

```json
...
"userId": "00000000-0000-0000-0000-000000000000"
...
```

Under "dutyInfos", you can also find the user’s team information and current duty status.

```json
...
 "dutyMode": 0,
"onDutyTime": 0,
"overdue": false,
"teamId": "00000000-0000-0000-0000-000000000000",
...
```

The "dutyMode" field indicates whether the user is currently on duty (1) or off duty (0).

You can also retrieve team information separately by using the following API call:

```bash
GET https://connect.signl4.com/api/v2/teams
X-S4-Api-Key: your-signl4-api-key
Accept: application/json
```

## Punch In / Out

The following API call allows you to set a user on or off duty for their on-call schedule.

```bash
POST https://connect.signl4.com/api/v2/duties/PunchIn
X-S4-Api-Key:  your-signl4-api-key
Content-Type: application/json
Accept: application/json

{
  "userId": "your-signl4-user-id",
  "teamIds": [
    "your-signl4-team-id"
  ]
}
```

Replace "your-signl4-user-id" and "your-signl4-team-id" with the appropriate user and team IDs.

To punch a user into their team’s on-call duty, use the same request as above but with the following URL:

```bash
https://connect.signl4.com/api/v2/duties/PunchOut
```

That’s it. You can now automatically set users on or off duty for a specific team directly from within your own tools.
