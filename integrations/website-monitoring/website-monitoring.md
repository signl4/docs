---
title: Website Monitoring
parent: Integrations
---

# SIGNL4 Website Monitoring

The Website Monitoring App checks the availability of a website and queries its URL at configurable intervals. If an error occurs, the website is considered unavailable and your team will be notified. On the other hand, when the website is available again, the created Signl will be resolved automatically by the app.

The monitored website is considered unavailable if one of the following criteria applies:
- Connection to the website cannot be established
- The website returns an HTTP code greater or equal to 500 in the response
- The website has taken too long to respond (optional, time configurable)

In addition, you can specify the number of consecutive test runs in which the website must be unavailable, to be alerted. This reduces false alarms for short, sporadic network problems.

# How does it work?

SIGNL4 supports simple [website monitoring](https://www.signl4.com/blog/website-monitoring-with-signl4/) that you can activate in your SIGNL4 web portal under Integrations -> Gallery -> Website Monitoring.

You can configure a URL to be checked in certain intervals. If the check failed, for example if the website is not available or if an HTTP error code is returned, SIGNL4 will raise an alert and notify the responsible people.

You can use this website monitoring to check the URL of your monitoring tool. If you have an on-premise monitoring tool you need to open a port and let SIGNL4 check the tool’s URL accordingly. A failed check, e.g. an unreachable URL, might indicate a problem with the Internet connection.

If a website check fails SIGNL4 will trigger an alert.

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-alert.png)
