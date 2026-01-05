---
title: Obsidian
parent: Integrations
---

# SIGNL4 Integration with Obsidian

[Obsidian](https://obsidian.md/) is a personal knowledge base and note-taking app that works with locally stored Markdown files (“vaults”). It allows you to create richly linked notes and visualize their relationships using a graph view. Obsidian also supports a wide range of plugins that enable automation and extended workflows.

SIGNL4 adds reliable mobile alerting to Obsidian, including a mobile app, push notifications, SMS messages, voice calls, automated escalations, and on-call scheduling. SIGNL4 ensures that critical alerts reach the right people reliably – anytime, anywhere.

## Prerequisites
A SIGNL4 (https://www.signl4.com) account
A Obsidian (https://obsidian.md/) installation, including plugins as mentioned below

## How to Integrate

Integrating SIGNL4 with Obsidian is straightforward. The following sections describe two available options.

### Option 1: Python Script

The community plugin Code Emitter allows you to execute code, such as Python, directly within Obsidian. This provides an easy way to trigger SIGNL4 alerts. You can use this approach for alerting, testing, or development directly in your Obsidian environment.

An example Python script is shown below (be sure to insert your own SIGNL4 team or integration secret):

```python
# Send SIGNL4 alert from Python

import micropip
await micropip.install('requests')

import requests

# Your SIGNL4 team or integration secret
teamSecret = 'your-signl4-or-integration-secret'

# SIGNL4 webhook URL
webhook_url = 'https://connect.signl4.com/webhook/' + teamSecret

# Alert data
alert_data = {
  'Title': 'Alert',
  'Message': 'SIGNL4 alert from Python'}

result = requests.post(url = webhook_url, json = alert_data)

if result.status_code == 201:
  # Success
  print(result.text)
else:
  # Error
  print('Error: ' + str(result.status_code))
```

The Code Emitter plugin adds a Run button directly below the code block. Click this button to run the script and trigger a SIGNL4 alert.

### Option 2: Webhook

The Post Webhook plugin allows you to send HTTP POST requests. It provides commands to send the current note – or a selected portion of it – via a webhook. In the Post Webhook configuration, you can create a new webhook using your SIGNL4 webhook URL.

Optionally, you can use the Meta Bind or Buttons plugin to display a button that triggers the command and sends the note content as a SIGNL4 alert.

![Obsidian Alert](obsidian-signl4.png)

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)

