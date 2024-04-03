---
title: IBM App Connect
parent: Integrations
---

# SIGNL4 Integration with IBM App Connect

[IBM App Connect](https://www.ibm.com/cloud/app-connect) in IBM Cloud is a business-friendly platform for integrating cloud-based or on-premises applications to automate tasks and business processed. You can instantly connect applications, data, heritage systems and modern technologies through a variety of integrations. Pairing this powerful platform with SIGNL4 can enhance your daily operations with an extension to your team wherever it is.

In our example we will send information about a new Task in Asana to our SIGNL4 team.

SIGNL4 is a mobile alert notification app for powerful alerting, alert management and mobile assignment of work items. Get the app at [https://www.signl4.com](https://www.signl4.com/).

## Prerequisites

- A SIGNL4 ([https://www.signl4.com](https://www.signl4.com/)) account
- An IBM App Connect ([https://www.ibm.com/cloud/app-connect](https://www.ibm.com/cloud/app-connect)) account
- An Asana account ([https://www.asana.com](https://www.asana.com/)) for our example (optional)

## How to Integrate

Log on to the IBM App Connect platform at [https://www.ibm.com/cloud/app-connect](https://www.ibm.com/cloud/app-connect).

Now you can create a new flow (Event-driven flow) consisting of two steps:

1. Asana: Event for a new Asana task.
2. HTTP: Here we send the HTTP POST request to SIGNL4 in order to trigger the alert.

![IBM App Connect Flow](ibm-app-connect-flow.png)

Our application trigger is an Asana task. This requires an authentication with your existing Asana account. The event will start our flow each time a new Task with the respective properties has been created in Asana.

Besides Asana, you can connect other systems as well, for example IBM Maximo to inform teams about new service requests.

![IBM App Monnect Maximo](ibm-app-connect-maximo.png)

We send an HTTP Push request to SIGNL4 in order to trigger an alert. The URL is your SIGNL4 webhook URL including your team secret. The request body is the JSON payload. In our case we assemble the body dynamically from the Asana Task data.

For testing you can create a new Task in Asana. This will trigger the flow in IBM App Connect and as a result send the task data to your SIGNL4 team.

You can find a sample in GitHub:  
[https://github.com/signl4/signl4-integration-ibm-app-connect](https://github.com/signl4/signl4-integration-ibm-app-connect)

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)
