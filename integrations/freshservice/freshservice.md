---
title: Freshservice
parent: Integrations
---

# SIGNL4 Integration with Freshservice

[Freshservice](https://freshservice.com/) is the sleek SaaS IT helpdesk system from [Freshworks](https://www.freshworks.com/). This service allows teams to streamline their support channels and communicate effectively to solve issues as this happens. Support does not have to end at the dashboard. Integrate Freshservice with SIGNL4 to extend your support team’s operations with actionable real-time alerting.

The Freshservice connector app makes 2-way integration with Freshservice as a child's play and responding to service desk tickets can be done conveniently via the SIGNL4 mobile app.

## Feature overview

- Forwarding tickets of your choice to SIGNL4 (via Freshservice Automator)
- Status synchronization between both systems (via Freshservice Automators)
- Agent assignment when Signl is acknowledged and or closed
- Ticket notes on status changes in SIGNL4
- User friendly display of linked items (e.g. products or company names)

## How does it work?

The connector app will provide a dedicated webhook that is used for communication from Freshservice to SIGNL4. It is used in 3 Automators to:

- Forward new tickets of your choice to SIGNL4
- Automatically acknowledge Signls when ticket is updated in Freshservice
- Automatically close Signls when ticket is updated in Freshservice

There is two more Automation Rules that control how tickets are updated (e.g. status change) in Freshservice when

- Signls are acknowledged in SIGNL4
- Signls are closed in SIGNL4

Both rules trigger on a new note (interaction) on the ticket which in fact is added by this connector app on those Signl status changes.

You must create all Automators in Freshservice manually yourself because Automators cannot be managed via REST API.

The connector communicates with the Freshservice REST API to read ticket details and to update tickets.

Appropriate permissions must be enabled in the role of the agent user account of which you want to let SIGNL4 use its API. It is recommended to create a dedicated agent account in Freshservice for SIGNL4.

## Setup step 1: User role and API key in Freshservice

SIGNL4 uses the Freshservice REST API ([https://api.freshservice.com/](https://api.freshservice.com/)) to read ticket data or linked entities (e.g. retrieving the name of a department a ticket belongs to). Read through the next sections to learn how to create an awesome API key in Freshservice so that you can enter it in the app configuration in Setup Step 2 (see below).

### About API keys

API keys in Freshdesk belong to agent user accounts. Each agent can find his/her API key in the personal profile menu. The easiest thing you could do is to use the API key of the Freshdesk account owner. That user has of cause all permissions and thus its API key is suitable for all API actions the connector app uses.

Using such an API key has the advantage of saving an agent license because administrators can add notes to tickets by impersonating other agents. You would then see notes as added by respective agents signed in to the SIGNL4 mobile app. The disadvantage may be that you hand out an admin agent key to a 3rd party system. SIGNL4 does no delete operations on the API and saves the Freshservice API key encrypted.

### Creating an integration user account first

If you want to create a dedicated integration agent user account specifically for SIGNL4, a nice guide on how to add agents can be found here:

[https://support.freshservice.com/support/solutions/articles/204591-managing-agents-in-freshservice](https://support.freshservice.com/support/solutions/articles/204591-managing-agents-in-freshservice) 

**Note**: When you create the agent, you must use an email address that you have access to because an activation link will be sent to that email address. You may need to register a temporary mailbox in order to accomplish that.

### Create a dedicated user role with streamlined permissions

Next, you'll create a new user role in Freshservice specifically for SIGNL4. A great article how this can be done is available here: [https://support.freshservice.com/support/solutions/articles/156465-how-to-create-a-new-custom-role-and-why-](https://support.freshservice.com/support/solutions/articles/156465-how-to-create-a-new-custom-role-and-why-)

1. In Freshdesk, simply click on Settings -> Roles
2. Add a new role with the name "SIGNL4"
3. Enable the following permissions:
    1. **Tickets**  
        ![Agent Permissions 1](agent-permissions-1.png)
    2. **Problems** (view permission required to display names of problems linked to a ticket)  
        ![Agent Permissions 2](agent-permissions-2.png)
    3. **Inventory** (view permission required to display names of assets linked to a ticket)  
        ![Agent Permissions 3](agent-permissions-3.png)
    4. **Contracts** (view permission required to display names of contracts linked to a ticket)  
        ![Agent Permissions 4](agent-permissions-4.png)
    5. **Administration** (agent management required for agent assignments to tickets)  
        ![Agent Permissions 5](agent-permissions-5.png)

Once you have enabled all permissions above, save your new user role.

### Assign user role and note API key

Perform these steps to glue agent account and role together and to note your API key:

1. Under Admin -> User Management -> Agents, locate the agent created for SIGNL4
2. Open its details and click "Edit Agent"
3. Scroll down assign the role "SIGNL4" that you have created in the previous section  
    ![Roles](roles.png)
4. Next, open a fresh browser and login to your Freshservice instance using the agent account you created for SIGNL4.
5. Click on your user profile image on the top right and choose "Profile settings"
6. Complete the CAPTCHA and make note of the displayed API key, you'll enter it in the Freshservice connector app configuration in Setup Step 3  
    ![API Key](api-key.png)

## Setup step 2: Create Freshservice connector app in SIGNL4

After you have obtained the required Freshservice API key in [setup step 1](https://support.signl4.com/hc/en-us/articles/4548385523985), you can now setup the connector app in your SIGNL4 team by following the instructions below.

1. From the menu, choose the SIGNL4 team you want to attach to Freshservice and then click "Apps".
2. On the bottom of the page, under app templates, locate Freshservice and click create  
    ![Freshservice App](freshservice-app.png)
3. Enter a name and an optional description for this connector instance in this team. An example is "Security Tickets"
4. Next, configure all connector properties:
    1. **Instance URI**: The root URL of your Freshservice instance without any additional path. An example is [https://my.freshservice.com](https://my.freshdesk.com/)
    2. **API key**: The API key that you have created in setup step 1
    3. **Note on Signl acknowledged**: If your choices in '**Status mappings**' include '_Acknowledged in SIGNL4 -> Update in FD_', you must enter a note that is added to the ticket conversations when the corresponding Signl is acknowledged. It is then also used to trigger the Automator '_Was acknowledged in SIGNL4_' in Freshservice which can further update the ticket (e.g. a status change).
    4. **Note on Signl closed**: If your choices in '**Status mappings**' include '_Closed in SIGNL4 -> Update in FD_', you must enter a note that is added to the ticket conversations when the corresponding Signl is closed. It is then also used to trigger the Automator '_Was closed in SIGNL4_' in Freshservice which can further update the ticket (e.g. a status change).
    5. **Note on Signl escalated**: When a Signl is escalated in SIGNL4, the ticket is optionally updated by the note you can enter here.
    6. **Notes always private**: If enabled, all notes that are added to tickets are only visible to agents.
    7. **Agent assignment when**: When a user in SIGNL4 acknowledges or closes a Signl, he or she can be assigned as agent to the ticket. Select on which status changes this should be done.
    8. **Status mappings**: Select which status updates should each be synchronized between both systems. Synchronization actions are defined in each the corresponding Freshservice Automators 'Was acknowledged in SIGNL4', 'Was closed in SIGNL4', 'Auto acknowledge in SIGNL4' and 'Auto close in SIGNL4'. When "Acknowledged in SIGNL4 -> Update in FD" or "Closed in SIGNL4 -> Update in FD" is not selected, respective notes won't be added to ticket.
5. Once you have configured all fields, click Save.
6. You now have to copy and note down the webhook URL of the created connector app. It is displayed in the "General" section of the created app instance and can be copied from there. It is needed in 3 Workflow Automators that you'll now have to create in the [final setup step 3](https://support.signl4.com/hc/en-us/articles/4571033236113):  
    ![Freshservice Configuration](freshservice-config.png)

## Setup step 3: Create Automators in Freshservice

Data exchange between Freshservice and SIGNL4 is driven by Freshservice Automators. They control the following integration elements:

- Automator 1: Which tickets should be forwarded to SIGNL4 and when exactly?
- Automator 2: How should tickets change when their Signl is acknowledged in SIGNL?
- Automator 3: How should tickets change when their Signl is closed in SIGNL?
- Automator 4: Which ticket updates in Freshservice should acknowlegde its earlier created Signl?
- Automator 5: Which ticket updates in Freshservice should close its earlier created Signl?

Automator 1, 4 and 5 each contain a webhook action which sends an event to the Freshservice connector app on events or criteria configured in the Automator. The connector app in SIGNL4 can then either trigger a new Signl or update existing ones.

Automator 2 and 3 are triggered by a specific note that is added to a ticket when its Signl is either acknowledged or closed. These Automators then typically have ticket status updates as actions but you may add further ticket changes to these Automators.

Note that the owner assignment is not controlled by any Automator and done by the connector app itself via the REST API if enabled in the connector app configuration.

Follow the below steps carefully to create all Ticket Automators in your Freshservice environment.

### Automator 1 - Forward to SIGNL4

In Freshservice, navigate to Admin -> Workflow Automator and then create a new Ticket Automator with the name "_Forward to SIGNL4_".

Now setup its workflow exactly as it is displayed in this image but by using your SIGNL4 Freshdesk connector webhook URL that you have created as part of Setup Step 2.

Use this JSON as body for the webhook:

{% raw %}
```json
{  
    "ticket_id": "{{ticket.id_numeric}}"  
}
```
{% endraw %}

![Ticket Automator 1](ticket-automator-1.png)

_**Note:**_ If you want to further filter which tickets are forwarded, feel free to insert a condition action between the trigger and the webhook action.

### Automator 2: Was acknowledged in SIGNL4

In Freshservice, navigate to Admin -> Workflow Automator and then create a new Ticket Automator with the name "_Was acknowledged in SIGNL4_".

Now setup its workflow exactly\* as it is displayed in this image.

_**\*Note:**_ Feel free to change the actions that follow the condition in the workflow according to your use case needs.

![Ticket Automator 2](ticket-automator-2.png)

### Automator 3: Was closed in SIGNL4

In Freshservice, navigate to Admin -> Workflow Automator and then create a new Ticket Automator with the name "_Was closed in SIGNL4_".

Now setup its workflow exactly\* as it is displayed in this image.

_**\*Note:**_ Feel free to change the actions that follow the condition in the workflow according to your use case needs.

![Ticket Automator 3](ticket-automator-3.png)

### Automator 4: Auto acknowledge in SIGNL4

In Freshservice, navigate to Admin -> Workflow Automator and then create a new Ticket Automator with the name "_Auto acknowledge in SIGNL4_".

Now setup its workflow exactly as it is displayed in this image but by using your SIGNL4 Freshdesk connector webhook URL that you have created as part of Setup Step 2.

Use this JSON as body for the webhook:

{% raw %}
```json
{
    "ticket_id": "{{ticket.id_numeric}}",
    "X-S4-Status": "Acknowledged"
}
```
{% endraw %}

![Ticket Automator 4](ticket-automator-4.png)

### Automator 5: Auto close in SIGNL4

In Freshservice, navigate to Admin -> Workflow Automator and then create a new Ticket Automator with the name "_Auto close in SIGNL4_".

Now setup its workflow exactly as it is displayed in this image but by using your SIGNl4 Freshdesk connector webhook URL that you have created as part of Setup Step 2.

Use this JSON as body for the webhook:

{% raw %}
```json
{
    "ticket_id": "{{ticket.id_numeric}}",
    "X-S4-Status": "Resolved"
}
```
{% endraw %}

![Ticket Automator 5](ticket-automator-5.png)

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)
