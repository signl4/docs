---
title: Crosser
parent: Integrations
---

# SIGNL4 Integration with Crosser

[Crosser](https://crosser.io/) is a Swedish software company with installations in over 20 different countries. They offer a Low-Code software platform for Streaming Analytics, Automation and Integration for any Edge, On\-premise or Cloud. The Crosser Platform enables real-time processing of streaming, event-driven or batch data for Industrial IoT and Intelligent Workflows. The solution is built to fight complexity with simplicity through the Crosser Flow Studio, the visual design tool that enables teams to innovate faster than ever without developers. The software is ideally suited for Enterprise customers of various industries and applications, including Edge Analytics, Industrial Connectivity, Industry 4.0, Streaming Analytics, Hybrid Integration and Intelligent Workflows.

In our example we create a sample flow that receives OPC UA data, processes them and then generates an alert in SIGNL4. SIGNL4 is a mobile alert notification app for powerful alerting, alert management and mobile assignment of work items. Get the app at [https://www.signl4.com](https://www.signl4.com/).

In order to show the concept in a simplified way we also use a data generator that is capable to generate sample data. This makes it easy to simulate alerts.

## Prerequisites

- A SIGNL4 ([https://www.signl4.com](https://www.signl4.com/)) account
- A Crosser ([https://crosser.io](https://crosser.io/)) account

## Crosser Workflow

![Crosser Workflow](crosser-workflow.png)

Logon to the Crosser portal and go to Flows. You can create or use your own flow as you like. In our case we have also added a Data Generator action. This one simulates random event data in certain intervals and is a good way for testing.

The next step in the flow is the aggregation. This is optional but since it is a powerful feature we show it here. The idea is to read events over a certain period of time and then aggregate the data. In our case we are interested in the average temperature.

The Range Filter allows us to trigger alert for a certain temperature range and close the alert again for another range.

Finally, add the SIGNL4 Publisher. In the Credentials you add your SIGNL4 team secret as API Key. Title and Message can contain the alert information.

To close an alert you have to use the same ExternalID with which the alarm was created and as status you enter “resolved”.

That’s it and now your SIGNL4 team will receive alerts whenever Crosser detects a critical event.

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-crosser.png)
