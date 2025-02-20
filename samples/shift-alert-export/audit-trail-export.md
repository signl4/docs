---
title: Shift and Alert Export
parent: Samples
---

# SIGNL4 Shift and Alert Export

In the SIGNL4 web portal you can export audit trail logs for shifts / duties and alerts in .csv format under Teams -> Audit Trails.

This is a manual process, however, you can also automate this using the [SIGNL4 REST API](https://connect.signl4.com/api/docs/index.html?urls.primaryName=SIGNL4%20API%20V2).

This is useful, for example, to pass duty information to other systems for accounting purposed, to archive information, or to use this information for own reports.

Here is how it works.

## Prerequisites

In order to use the SIGNL4 REST API you need an API key, in the following referred to as {api-key}. You can obtain this one in the SIGNL4 web portal under Integrations -> API Keys.

The SIGNL4 audit trails are available per team, so you also need the team ID in the following referred to as {team-id}. You can get the team ID by calling this endpoint:

```
GET https://connect.signl4.com/api/v2/teams
X-S4-Api-Key: {api-key}
```

## Shift Duty Audit Trail

For getting shift and duty reports you can use this endpoint.

```http
GET https://connect.signl4.com/api/v2/teams/{team-id}/dutyReports/2025_1_ShiftReport.csv
X-S4-Api-Key: {api-key}
```

To retrieve the .csv report for the required month you just need to adapt the year and month in the file name, e.g. 2025_1_ShiftReport.csv for January 2025.

## Alerting and Response

For getting alert and response reports you can use this endpoint.

```http
GET https://connect.signl4.com/api/v2/teams/{team-id}/alertReports/2025_1_AlertAuditReport.csv
X-S4-Api-Key: {api-key}
```

To retrieve the .csv report for the required month you just need to adapt the year and month in the file name, e.g. 2025_1_AlertAuditReport.csv for January 2025.

## CURL Example

```bash
curl --output 2025_1_ShiftReport.csv --header "X-S4-Api-Key: {api-key}}" https://connect.signl4.com/api/v2/teams/{team-id}/dutyReports/2025_1_ShiftReport.csv
```

## Excel Report

We have created example on how to import and use these .csv reports in Excel. You can find more information [here](https://www.signl4.com/blog/alert-shift-reports-excel/).
