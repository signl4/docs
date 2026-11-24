---
title: NetBox
title_category: NetBox + SIGNL4 Integration
parent: Integrations
description: Integrate NetBox and Grafana with SIGNL4 to enrich infrastructure alerts with device context and notify the right on-call engineer via push, SMS, and voice calls.
permalink: /integrations/netbox/
redirect_from:
  - /integrations/netbox/netbox.html
  - /integrations/netbox/netbox
---
# SIGNL4 Integration with NetBox

[NetBox](https://netboxlabs.com/) is a source of truth for networks and infrastructure. It stores information about devices, IP addresses, sites, racks, tenants, and other infrastructure assets. The [NetBox data source for Grafana](https://netboxlabs.com/docs/observability/grafana-datasource/) makes this context available to Grafana dashboards and alert rules.

By combining **NetBox**, **Grafana Alerting**, and [SIGNL4](https://www.signl4.com/), teams can send infrastructure alerts with useful asset context to the responsible engineer. SIGNL4 provides mobile app push notifications, SMS, voice calls, on-call scheduling, acknowledgement, and automated escalation if nobody responds.

Typical use cases include:

* **Network outages:** Alert the on-call network engineer when a core switch or router becomes unavailable, including its NetBox site and device role.
* **Device and interface issues:** Include the affected device, location, and asset details in a mobile alert rather than only a hostname or IP address.
* **Site-specific incidents:** Use stable NetBox labels, such as site or team, in Grafana notification policies to select the appropriate SIGNL4 contact point.
* **Capacity issues:** Notify the responsible team when a monitored network or infrastructure metric exceeds a threshold, enriched with NetBox context.
* **After-hours incidents:** Escalate important infrastructure alerts automatically until an on-call engineer responds.

## Prerequisites

* A [SIGNL4](https://www.signl4.com/) account and a team or integration secret.
* A NetBox instance with relevant device and infrastructure data, plus an API token.
* Grafana with alerting enabled and permission to create alert rules and contact points.
* For the NetBox data source integration described here, **NetBox 4.2 or later** and **Grafana 12.3 or later**. Specific enrichment recipes may also depend on Grafana features or settings.
* A monitoring data source, such as Prometheus, if you want to trigger alerts based on performance or availability metrics.

> **Note:** This integration uses Grafana and HTTP webhooks. It is not a native SIGNL4 connector built into NetBox, and NetBox by itself is not assumed to send these alerts. The steps describe a documented integration pattern; an end-to-end deployment has not been verified for this page.

## How to Integrate

There are two ways to use NetBox context with SIGNL4:

1. **Recommended: Enrich in Grafana before alerting.** The NetBox data source contributes stable device, site, role, or tenant information to the Grafana alert. Grafana then sends a webhook directly to SIGNL4. These labels can also influence Grafana notification routing.
2. **Optional: Enrich after alerting.** Grafana sends a webhook to an intermediate HTTP service, which looks up additional context in NetBox and forwards an enriched message to SIGNL4. This is useful for changing or high-cardinality information such as a contact name or a NetBox device link.

### Option 1: Grafana and NetBox Data Source (Recommended)

```text
Monitoring metrics (e.g., Prometheus)    NetBox inventory
                |                              |
                +------------+-----------------+
                             |
                  Grafana alert rule
                   with NetBox context
                             |
                   Grafana contact point
                             |
                       SIGNL4 webhook
                             |
                Push / SMS / Voice / Escalation
```

#### 1. Configure the NetBox Data Source in Grafana

1. Install or enable the [NetBox data source for Grafana](https://grafana.com/grafana/plugins/netboxlabs-netbox-datasource/) according to the plugin documentation and your Grafana environment.
2. In Grafana, open **Connections > Data sources** and add **NetBox**.
3. Enter the base URL of your NetBox instance, for example `https://netbox.example.com`, and supply a NetBox API token using the data source's secure configuration.
4. Save and test the connection. Ensure Grafana can access the NetBox API.

See the [NetBox data source documentation](https://netboxlabs.com/docs/observability/grafana-datasource/) for setup details and supported query types.

#### 2. Create a Grafana Alert Rule with NetBox Context

In **Alerting > Alert rules**, create a Grafana-managed rule for your infrastructure condition. For example, alert when an availability metric reports that a network device is down.

Use the [NetBox alerting recipes](https://netboxlabs.com/docs/observability/grafana-datasource/alerting/) to add context. Depending on the use case, you can:

* Alert on a NetBox object count or state using a NetBox query with **Return count only**.
* Join a monitoring metric with NetBox data at rule evaluation time and include stable values, such as device, site, role, and tenant, as alert labels.
* Use the enriched labels in Grafana notification policies to route alerts to a suitable SIGNL4 contact point.
* Add human-readable details, such as location, rack, runbook, or device URL, as **annotations** when available.

For an availability rule, an example annotation template is:

```text
Summary: {{ $labels.device }} is unavailable
Description: Device {{ $labels.device }} at site {{ $labels.netbox_site }}
             (role: {{ $labels.netbox_role }}) requires attention.
```

The labels above are examples. Use the actual label names produced by your Grafana queries. For the precise SQL expression and query configuration, follow NetBox Labs' [rule-time join recipe](https://netboxlabs.com/docs/observability/grafana-datasource/alerting/rule-time-join/).

> **Tip:** Put relatively stable values such as site, role, or tenant in **labels** and changing values such as contact names, emails, and URLs in **annotations**. Grafana uses labels for alert identity, grouping, and routing. Avoid making contact details part of an alert's identity.

#### 3. Get Your SIGNL4 Webhook URL

Select the destination team in SIGNL4 and obtain its team or integration secret. Your webhook URL has this format:

```text
https://connect.signl4.com/webhook/YOUR_SIGNL4_SECRET
```

Replace `YOUR_SIGNL4_SECRET` with the actual secret. Treat the webhook URL as a credential and do not publish it in documentation, logs, or screenshots.

See the [SIGNL4 Webhook integration](https://docs.signl4.com/integrations/webhook/) for details.

#### 4. Add SIGNL4 as a Grafana Contact Point

1. In Grafana, go to **Alerting > Contact points**.
2. Create a new **Webhook** contact point, for example `SIGNL4 - Network On-Call`.
3. Enter your SIGNL4 webhook URL.
4. Save the contact point and use Grafana's **Test** option to send a test notification.
5. In **Notification policies**, configure which alerts should be sent to this contact point. For example, match a stable `netbox_role` or `netbox_site` label.

For Grafana's standard webhook payload, you can optionally append the following query string to correlate grouped firing and resolved notifications in SIGNL4:

```text
?ExtIDParam=groupKey&ExtStatusParam=status&ResolvedStatus=resolved
```

This is the method described in the [SIGNL4 Grafana integration](https://docs.signl4.com/integrations/grafana/). The `groupKey` is a **Grafana notification-group identifier**, not necessarily the unique identifier of an individual device alert. Test grouped alerts and recovery behavior before relying on automatic resolution.

#### 5. Test the Complete Flow

1. Trigger a safe test condition in Grafana or use its contact-point test feature.
2. Verify that SIGNL4 receives the notification.
3. Confirm that the expected NetBox device and site context is present in the delivered message. Adjust Grafana annotations or contact-point templates if needed.
4. Test the configured on-call schedule, mobile acknowledgement, and escalation behavior.
5. Clear the alert condition and, if you enabled resolution mapping, check that the corresponding SIGNL4 alert is resolved as intended.

### Option 2: Post-Alert Enrichment Using a Webhook Service

If additional context should be looked up **after Grafana has fired an alert**, use the [NetBox post-alert enrichment pattern](https://netboxlabs.com/docs/observability/grafana-datasource/alerting/post-alert-enrichment/).

```text
Grafana alert
     |
     v
Webhook enrichment service (self-hosted)
     |           |
     |           +--> NetBox REST API (device/IP lookup)
     |                 site, rack, owner, contact, URL
     v
SIGNL4 webhook
     |
Mobile alert / on-call / escalation
```

1. Implement or deploy an HTTP webhook service that accepts Grafana notifications. This service is **not included** with NetBox or SIGNL4.
2. Read the affected device or IP from the Grafana payload, typically from `alerts[].labels`.
3. Query the NetBox REST API for device information, for example `GET /api/dcim/devices/?name=SW-CORE-01`. Retrieve any additional details you need, such as site, rack, or an object link.
4. Build an enriched JSON message and send it via HTTP POST to the SIGNL4 webhook URL.
5. Implement appropriate authentication, timeout handling, retries, caching, and rate limiting in the enrichment service. Avoid placing unnecessary personal information in mobile notifications.

For example, the **enrichment service** could send this payload to SIGNL4:

```json
{
  "Title": "Network device unavailable: SW-CORE-01",
  "Message": "Core switch is unreachable. Check connectivity and upstream devices.",
  "Device": "SW-CORE-01",
  "Site": "Berlin DC",
  "Rack": "R12",
  "Role": "Core Switch",
  "NetBox URL": "https://netbox.example.com/dcim/devices/123/",
  "Source": "Grafana / NetBox",
  "X-S4-ExternalID": "grafana-SW-CORE-01-unreachable",
  "X-S4-Status": "new"
}
```

This is an **illustrative output payload**, not a payload that NetBox or Grafana generates automatically. The service must perform the lookup and mapping. For a related resolution event, send `"X-S4-Status": "resolved"` together with the **same** `X-S4-ExternalID` used for the original alert.

> **Important:** Post-alert enrichment changes the notification **message** after Grafana has already routed and grouped it. It cannot retroactively influence Grafana's contact-point selection, grouping, silences, or inhibition. Use rule-time enrichment if NetBox data must control routing. SIGNL4 can still route to the configured on-call personnel within the chosen SIGNL4 team.

## Example

A core switch at the Berlin data center becomes unreachable. Grafana detects the outage from monitoring metrics and enriches the alert with NetBox information identifying the device as a core switch in the Berlin site. Grafana forwards the alert to a SIGNL4 contact point.

SIGNL4 notifies the network engineer currently on duty by app push, SMS, or voice call. If the engineer does not respond, SIGNL4 escalates according to the team's configuration. The engineer sees the affected device and site details on their phone and can acknowledge the alert immediately.

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](https://docs.signl4.com/assets/images/signl4-alert.png)

## Troubleshooting

* **No SIGNL4 alert:** Verify the Grafana contact point, notification policy, webhook URL and outbound HTTPS connectivity. Send a test notification.
* **NetBox context missing:** Check the NetBox data source configuration, query results, join key, labels and annotations. Make sure device names or IP identifiers match across systems.
* **Alert rule evaluation fails:** Review Grafana's query format, SQL expression availability, NetBox query limits and API connectivity. Set up monitoring for rule evaluation errors.
* **Wrong team receives the alert:** Check Grafana notification-policy matchers and whether the expected stable labels are present.
* **Recovery does not resolve the SIGNL4 alert:** Check the webhook query parameters, Grafana `groupKey` and `status` fields, and notification grouping. For middleware, use a consistent `X-S4-ExternalID` for firing and resolved events.
* **Post-alert enrichment fails:** Inspect the webhook service logs, NetBox API authorization, device lookup, retry logic and SIGNL4 webhook response.

## References

* [NetBox Labs](https://netboxlabs.com/)
* [NetBox Data Source for Grafana](https://netboxlabs.com/docs/observability/grafana-datasource/)
* [NetBox Alerting Recipes](https://netboxlabs.com/docs/observability/grafana-datasource/alerting/)
* [NetBox Rule-Time Enrichment](https://netboxlabs.com/docs/observability/grafana-datasource/alerting/rule-time-join/)
* [NetBox Post-Alert Enrichment (Webhook Pattern)](https://netboxlabs.com/docs/observability/grafana-datasource/alerting/post-alert-enrichment/)
* [SIGNL4 Grafana Integration](https://docs.signl4.com/integrations/grafana/)
* [SIGNL4 Webhook Integration](https://docs.signl4.com/integrations/webhook/)

That's it. NetBox infrastructure context and Grafana alerting can now work together with SIGNL4 to get actionable alerts to the right on-call engineer.
