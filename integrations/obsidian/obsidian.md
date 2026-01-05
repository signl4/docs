---
title: Obsidian
parent: Integrations
---

# SIGNL4 Integration with Obsidian

[Obsidian](https://obsidian.md/) is a personal knowledge base and note-taking app that works with Markdown files stored locally ("vaults"), letting you build richly linked notes and visualize their interconnections via a graph view. It supports a variety of plugins that also enable automation tasks.

SIGNL4 adds reliable mobile alerting to Obsidian with features like mobile app, push notifications, SMS messaging, voice calls, automated escalations, and on-call duty scheduling. SIGNL4 ensures that critical alerts reliably reach the responsible personnel – anytime, anywhere.

## Prerequisites
A SIGNL4 (https://www.signl4.com) account
A Obsidian (https://obsidian.md/) installation, including plugins as mentioned below

## How to Integrate

The integration of SIGNL4 with Obsidian is straightforward. The following describes two options.

### Option 1: Python Script

The community plugin Code Emitter allows you to execute code, such as Python. This provides an easy way to trigger SIGNL4 alerts. You can use it for alerting purposes or for testing and development directly within your Obsidian environment.

An example of Python code is shown below (please insert your own SIGNL4 team or integration secret):

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

The plugin Code Emitter adds a Run button just after the code. You can click this one to run the script and to trigger the SIGNL4 alert.

### Option 2: Webhook

The Post Webhook plugin allows you to send HTTP POST requests. It provides commands to send the current note (or a selected part of it) via webhook. In the Post Webhook configuration, you can create a new webhook using your SIGNL4 webhook URL.

Optionally, you can use the Meta Bind or Buttons plugin to display a button that triggers the command and sends the note text as a SIGNL4 alert.

![Obsidian Alert](obsidian-signl4.png)

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)
