---
title: Azure Monitor
parent: Integrations
---

# SIGNL4 Integration with Azure Monitor

SIGNL4 adds powerful and reliable mobile alerting to Azure Monitor. As built-in alert notification capabilities of Azure Monitor are limited, SIGNL4 can increase reliability, convenience and manageability of important notification processes. SIGNL4 provides for duty scheduling and escalation procedures for an advanced alerting experience.

SIGNL4 integrates with Azure Monitor via an advanced 2-way connector allowing for remote alert management.

## How does it work?

SIGNL4 offers a simple, 2-way connector app that makes integration with Azure Monitor a child’s play. The connector app uses an Azure API to retrieve alerts from Azure and change their status, for example when an alert is acknowledged or closed in the SIGNL4 mobile app.  
In order for the connector app to access the alerts in Azure, it must first be created in Azure as a registered application. In order to be able to access Azure Monitor alerts only, it is also assigned a user role created specifically for it. Sounds too complicated? Not at all! The connector app includes a PowerShell script that automatically creates all these things in Azure for you.

### SIGNL4 Azure Monitor Connector – Manual Setup Guide

**Purpose**  
This guide creates an App Registration in Microsoft Entra ID (formerly Azure AD), generates a client secret, and assigns the necessary permissions so that the SIGNL4 Azure Monitor Connector can read alerts from your Azure subscription.

**What you will create**  
- An App Registration (Service Principal)  
- A Client Secret  
- RBAC role assignment on the target Azure Subscription (typically **Monitoring Contributor** or a more restricted custom role)

**Prerequisites**  
- You must be signed in with an account that has at least:  
  - **Application Administrator** (or **Global Administrator**) in Microsoft Entra ID  
  - **User Access Administrator** or **Owner** on the target Azure Subscription

---

### Step-by-Step Instructions

#### 1. Create the App Registration

1. Go to the **[Microsoft Entra admin center](https://entra.microsoft.com)**.
2. In the left menu, select **App registrations** → **+ New registration**.
3. Fill in the following:
   - **Name**: `SIGNL4-AzureMonitor-Connector`
   - **Supported account types**: **Accounts in this organizational directory only** (Single tenant)
   - **Redirect URI**: Leave blank (no redirect needed for this daemon app)
4. Click **Register**.

5. After creation, copy the following values (you will need them later):
   - **Application (client) ID** → This is your **Client ID**
   - **Directory (tenant) ID** → This is your **Tenant ID**

#### 2. Create a Client Secret

1. Still in the app registration you just created, go to **Certificates & secrets** in the left menu.
2. Under **Client secrets**, click **+ New client secret**.
3. Enter:
   - **Description**: `SIGNL4 Connector Secret`
   - **Expires**: Choose 12 or 24 months (according to your security policy)
4. Click **Add**.
5. **Immediately copy the secret Value** and store it securely (it will never be shown again).

   > **Client Secret** = the long string shown in the **Value** column.

#### 3. Assign Permissions on the Azure Subscription

1. Go to the **[Azure Portal](https://portal.azure.com)**.
2. Navigate to the **Subscription** where your Azure Monitor alerts are located.
3. In the left menu, select **Access control (IAM)**.
4. Click **+ Add** → **Add role assignment**.
5. On the **Role** tab, search for and select one of the following:
   - Recommended: **Monitoring Contributor** (allows reading and managing alerts)
   - Minimum: **Monitoring Reader** (if SIGNL4 only needs to read alerts)
6. Click **Next**.
7. On the **Members** tab:
   - Select **User, group, or service principal**.
   - Click **+ Select members**.
   - Search for the app name you created: `SIGNL4-AzureMonitor-Connector`.
   - Select it and click **Select**.
8. Click **Next** → **Review + assign**.

The service principal now has access to your Azure Monitor alerts.

#### 4. Configure the SIGNL4 Azure Monitor Connector

In your SIGNL4 team portal:

1. Go to **Apps** → Add the **Azure Monitor** connector.
2. Enter the following values:
   - **Subscription ID** → ID of the Azure subscription you assigned the role to
   - **Tenant ID** → Directory (tenant) ID from step 1
   - **Client ID** → Application (client) ID from step 1
   - **Client Secret** → The secret value from step 2

3. Configure any additional settings (severity mapping, auto-close, etc.) and save.

---

**Security Recommendations**

- Use the principle of least privilege. If **Monitoring Contributor** is too broad, create a custom RBAC role that only includes the permissions needed for Azure Monitor alerts (`Microsoft.Insights/alertRules/*`, `Microsoft.AlertsManagement/*`, etc.).
- Rotate the Client Secret regularly (every 6–12 months).
- Monitor sign-ins of this app in Microsoft Entra ID under **Sign-in logs**.

**Troubleshooting**  
- “Access Denied” → Check that the role assignment is on the correct subscription and that the service principal was selected correctly.  
- Secret expired → Create a new client secret and update it in SIGNL4.

---

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)
