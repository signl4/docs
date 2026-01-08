---
title: Maintenance Mode
parent: Samples
---

# Maintenance Mode Using Category Assignments

Sometimes you may want to mute alerts for specific categories, for example, when certain systems are in maintenance mode. You can do this by muting alerts for selected users and categories.

You can find more information [here](https://support.signl4.com/hc/en-us/articles/360018774037-How-to-create-a-blacklist-filter-in-SIGNL4).

If you want to automate this process, you can use the [SIGNL4 REST API](https://connect.signl4.com/api/docs/index.html?urls.primaryName=SIGNL4%20API%20V2).

## Get All Categories

First, you need to get the category ID and team ID.

```
# Get all categories for the given team
GET https://connect.signl4.com/api/v2/categories/{team-id}
X-S4-Api-Key: {signl4-api-key}
```

You can get the team ID by using the following call.

```
# Get Teams
# As a result you get the team id(s) that you need in the next steps
GET https://connect.signl4.com/api/v2/teams
X-S4-Api-Key: {signl4-api-key}
```

Alternatively, you can get all categories.

```
# Get all categories
GET https://connect.signl4.com/api/v2/categories/
X-S4-Api-Key: {signl4-api-key}
```

## Get Category Assignments

Now, you can get all the user assignments for a given category.

```
# Get Categorie Subscriptions / Assignments
GET https://connect.signl4.com/api/v2/categories/{team-id}/{category-id}/subscriptions
X-S4-Api-Key: {signl4-api-key}
```

The result looks like this.

```
[
  {
    "status": "Subscribed",
    "userId": "0000-0001"
  },
  {
    "status": "Subscribed",
    "userId": "0000-0002"
  }
]
```

This means all users are subscribned to this category, so they will receive alerts.

## Set Category Assignments

Now you can update the assignment to "Muted" (to mute the alerts for this category and user) or back to "Subscribed" like this.

```
# Set Categorie Subscriptions / Assignments
POST https://connect.signl4.com/api/v2/categories/{team-id}/{category-id}/subscriptions
X-S4-Api-Key: {signl4-api-key}
Content-Type: application/json
Accept: application/json

[
  {
    "status": "Muted",
    "userId": "0000-0001"
  },
  {
    "status": "Muted",
    "userId": "0000.0002"
  }
]
```

That is it and now you can automate your maintenance mode directly from your systems, e.g. using scripts of no-code platforms.
