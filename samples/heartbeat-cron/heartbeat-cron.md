---
title: Cron Job for Heartbeats
parent: Samples
---

# Cron Job for Heartbeats

The SIGNL4 [Heartbeat Monitor](https://docs.signl4.com/integrations/heartbeat-monitoring/heartbeat-monitoring.html) listens for heartbeats (HTTP requests) in regular intervals. If a heartbeat is missing an alert is triggered.

This can make sure that for example an internet connection to a monitoring tool is still up or that a sensor is functioning correctly.

The following describes how to setup these regular HTTP requests on Linux and Windows.

## Linux

To set up a cron job on Linux that sends an HTTP GET request at regular intervals, you can use tools like curl or wget in combination with cron.

Here's a step-by-step guide:

1. Check cron is running

Ensure cron is running on your system. You can check the cron service status with the following command:
```bash
sudo systemctl status cron
```

If it’s not running, you can start it with:
```bash
sudo systemctl start cron
```

2. Write a script to send the HTTP GET request

You can use either curl or wget to send the request. First, create a bash script that will execute the request.

For example, create a script http_request.sh:
```bash
#!/bin/bash
curl https://connect.signl4.com/apps/11111-22222
```

Or if using wget:
```bash
#!/bin/bash
wget -qO- curl https://connect.signl4.com/apps/11111-22222
```

Make sure you use the URL of the heartbeat monitor you have configured in SIGNL4.

Save the script and give it executable permissions:
```bash
chmod +x http_request.sh
```

3. Add the cron job

To set up a cron job, follow these steps:

Open the crontab editor for your user:
```bash
crontab -e
```

Add the cron job to run the script at the desired interval. The syntax for a cron job is as follows:
```bash
* * * * * /path/to/http_request.sh
```

The five asterisks represent time intervals in the following order:
```sql
* * * * * 
│ │ │ │ │
│ │ │ │ │
│ │ │ │ └──── Day of the week (0-7, Sunday=0)
│ │ │ └──────── Month (1-12)
│ │ └──────────── Day of the month (1-31)
│ └──────────────── Hour (0-23)
└──────────────────── Minute (0-59)
```

For example, if you want to run the script every hour:

```bash
0 * * * * /path/to/http_request.sh
```

If you want it to run every 5 minutes:
```bash
*/5 * * * * /path/to/http_request.sh
```

Save and exit the crontab.

4. Verify the cron job

Check if your cron job is working by checking the system logs:
```bash
grep CRON /var/log/syslog
```

If you want to log the output of the HTTP request, you can modify the cron job to log into a file:
```bash
*/5 * * * * /path/to/http_request.sh >> /path/to/logfile.log 2>&1
```

This will log both the output and any errors to logfile.log.

That’s it! You've set up a cron job to send periodic HTTP GET requests.

## Windows

To schedule an HTTP GET request in Windows, you can use the built-in Task Scheduler along with either curl (available in Windows 10+ by default) or a custom script in PowerShell or batch. Here’s how to do it:

### Option 1: Using a Batch Script with curl and Task Scheduler

1. Create a Batch Script

First, create a batch file that sends the HTTP GET request. Open Notepad and enter the following command:
```batch
@echo off
curl curl https://connect.signl4.com/apps/11111-22222
```

Make sure you use the URL of the heartbeat monitor you have configured in SIGNL4.

Save this file as http_request.bat (or another name) on your desktop or in a folder of your choice, ensuring it has the .bat extension.

2. Open Task Scheduler

Press Win + R, type taskschd.msc, and press Enter. This will open Task Scheduler.
On the right-hand side, click Create Task.

3. Configure the Task

In the General tab:
Give your task a name (e.g., HTTP Request Task).

Choose Run whether the user is logged on or not if you want the task to run in the background.

In the Triggers tab:
Click New.

Choose how often you want the task to run (e.g., daily, weekly, or more advanced schedules).
Set the desired frequency (e.g., every hour, every 5 minutes, etc.).
In the Actions tab:
Click New.

Set the Action to Start a program.

In the Program/script field, browse to your batch file (http_request.bat).

In the Conditions and Settings tabs, adjust any additional settings as needed (e.g., stop the task if it runs longer than a specific time).

Click OK and enter your password if prompted.

Your batch file will now run according to the schedule you've set.

### Option 2: Using PowerShell with Task Scheduler

You can also create a PowerShell script instead of using a batch file.

1. Create a PowerShell Script

Open Notepad and type the following:
```powershell
Invoke-RestMethod -Uri curl https://connect.signl4.com/apps/11111-22222
```

Make sure you use the URL of the heartbeat monitor you have configured in SIGNL4.

Save this file as http_request.ps1.

2. Allow PowerShell Scripts to Run

Ensure that your system allows PowerShell scripts to run:
Open PowerShell as Administrator.

Run the following command to allow scripts to run:
```powershell
Set-ExecutionPolicy RemoteSigned
```

3. Set up the Task in Task Scheduler

Open Task Scheduler (Win + R > taskschd.msc).

Click Create Task and follow the same steps as above, but in the Actions tab:
Set the Program/script to powershell.exe.

In the Add arguments field, add the path to your script:
```bash
-File "C:\path\to\http_request.ps1"
```

After setting up the task, the PowerShell script will run at the scheduled times.

### Option 3: Using Windows Scheduler Directly with curl (Without Script)

You can also set up a task in Task Scheduler to run curl directly, without the need for a separate script.

Open Task Scheduler.

Create a new task as before.

In the Actions tab, set:
Program/script: curl
Arguments: curl https://connect.signl4.com/apps/11111-22222

Make sure you use the URL of the heartbeat monitor you have configured in SIGNL4.

This option is simpler if you don’t need the additional flexibility of a script.
