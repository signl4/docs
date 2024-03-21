---
title: Microsoft Sentinel
parent: Integrations
---

# SIGNL4 Integration with Microsoft Sentinel

Configure the app parameters as described in the table below.

| Configuration parameter | Description |
| --- | --- |
| Subscription Id | Azure Subscription ID of the subscription you want to get security events from |
| Tenant Id | Your Azure tenant ID |
| Client Id | Client Id that was created and displayed when creating the SPN in Azure using the PS script |
| Client Secret | Client secret that was created and displayed when creating the SPN in Azure using the PS script |
| Azure Sentinel Log Analytics Workspace | Sentinel security events (incidents) can be augmented with search result data of the underlaying security alerts that triggered the incident. The search results often give more context when investigating an incident.<br><br>If you leave this field empty, no augmentation will be done by the connector. |
| Azure Sentinel Resource Group | The name of the resource group in which your Microsoft Sentinel solution is deployed. If you read alerts directly from the Sentinel API (see next parameter) this value is required.<br><br>Otherwise this value is optional and also used to augment incidents with search results from their underlaying security alerts. |
| Read security events from | You can select the Azure API that is used to read security alerts / incidents from.<br><br>If Microsoft Sentinel is your single pane of glass solution for SIEM and all security events are fed into Sentinel, select "Microsoft Sentinel API" here.<br><br>If on the other hand, you have assets in Azure that are not integrated with Sentinel and rather use solutions like Defender for Cloud to manage security of those assets, you may select "Microsoft Graph Security API" here. Graph Security API also provides access to security alerts from different sources such as MS Sentinel or Defender for Cloud. |
| Filter Severity | Select incident severities you wish to get Signls for in SIGNL4. you may e.g. deselect low severity. |
| Tags for Sentinel incident after Signl creation | Once an incident was received by SIGNL4, a tag can be added to it. This allows you to keep track of the items that were polled by SIGNL4 inside Sentinel. You can leave this field empty. |
