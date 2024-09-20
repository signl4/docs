---
title: Heartbeat Monitoring
parent: Integrations
---

# SIGNL4 Heartbeat Monitoring

The SIGNL4 heartbeat monitor is a feature that helps ensure the continuous operation of mission-critical systems by monitoring regular, periodic signals (called "heartbeats") from those systems. It listens for regular HTTP requests sent by applications, servers, or IoT devices that need to be monitored. These signals are expected at specific intervals. If a heartbeat is missing SIGNL4 triggers an alert.

This can make sure that for example an internet connection to a monitoring tool is still up or that a sensor is functioning correctly.

## How does it work?

In your SIGNL4 web poral under Integrations -> Gallery -> Heartbeat you can configure the heartbeat monitor. This one expects incoming HTTP requests (GET or POST) in regular intervals and if such a request is missing SIGNL4 will raise an alert. On your end you can configure your monitoring tool, another system or a regular cron job to send HTTP requests in certain intervals, e.g. every two hours. If SIGNL4 receives the request all is fine. If a request is missing for two hours or more SIGNL4 will trigger an alert.

This is a simple method to check your internet connection and to send an alert if the connection is not available anymore.

In the Heartbeat configuration in SIGNL4 you can configure multiple checks per instance. To do so you enter multiple keywords separated by a semicolon, e.g. “sensor1;sensor2”. The content / parameters of your HTTP request must then contain these keywords, e.g.:

```
https:// connect.signl4.com/apps/19f90c13-b77f-4c5e-8a19-661d4d42ee2b_1730abbc-52e8-44ce-aa98-e5c289033241?param=sensor1
```

and

```
https:// connect.signl4.com/apps/19f90c13-b77f-4c5e-8a19-661d4d42ee2b_1730abbc-52e8-44ce-aa98-e5c289033241?param=sensor2
```

The last part (e.g. ?param=sensor1) is the dynamic part. The first part is your SIGNL4 Heartbeat URL that you can find on the Heartbeat configuration page. You can find additional information and help there as well.

If a heartbeat is missing SIGNL4 will trigger an alert.

You can find information about how to easily send heartbeats from Linux and Windows using cron jobs and the Windows Task Scheduler [here](https://docs.signl4.com/samples/heartbeat-cron/heartbeat-cron.html).

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)
