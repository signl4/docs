---
title: Arduino
parent: Integrations
---

# SIGNL4 Integration with Arduino

When critical systems fail, SIGNL4 is the fastest way to alert your staff, engineers, IT admins on call and “in the field”. SIGNL4 provides reliable notifications via mobile app push, text and voice calls with tracking, escalations and duty scheduling.

[Arduino](https://www.arduino.cc/) is an open-source hardware and software company, project and user community that designs and manufactures single-board microcontrollers and kits for building digital devices. It can be used for prototyping and IoT projects. Arduino also offers an all-in-one IoT platform.

Pairing Arduino with SIGNL4 can enhance your daily operations with an extension to your team wherever it is. The integration does not only allow you to know when a critical issue has occurred but also when it was resolved no matter where you are.

The integration of Arduino and SIGNL4 is done by sending an HTTP Post request.

## Prerequisites
- A SIGNL4 account ([https://www.signl4.com](https://www.signl4.com/))
- A Arduino board and an Arduino account ([https://www.arduino.cc](https://www.arduino.cc/))

There are various options to send HTTP Post requests from Arduino. We use the code sample from [ArduinoJson](https://arduinojson.org/v6/how-to/use-arduinojson-with-httpclient/). You can use the following code whenever you want to send an alert to your SIGNL4 team, for example when sensor value reaches a certain threshold.

```javascript
// Alert data (JSON)
DynamicJsonDocument data(2048);
data["Title"] = "Arduino Alert";
data["Message"] = "Temperature too high.";
data["Temperature"] = "4";

// Serialize JSON document
String json;
serializeJson(data, json);

HTTPClient http;

// Send request to SIGNL4
// Replace "team-secret" with your SIGNL4 team secret
http.begin("https://connect.signl4.com/webhook/team-secret");
http.POST(json);

// Read response
Serial.print(http.getString());

// Disconnect
http.end();
```

## Test it

That is it and now you can test the alert. You can do so by running the above code on your Arduino board. As a result you will receive an alert in your SIGNL4 app.

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-iot.png)
