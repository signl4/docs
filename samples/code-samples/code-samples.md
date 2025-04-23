---
title: Code Samples
parent: Samples
---

# SIGNL4 Code Samples
{: .no_toc }

You can trigger SIGNL4 alerts by using the [inbound webhook](https://connect.signl4.com/webhook/docs/index.html).

This is an easy and reliable way to integrate with your backend systems. In order to do so we have listed some code samples on how to send webhook requests to SIGNL4.

You need to replace by your SIGNL4 team secret and you can add additional parameters to the alert data according to your needs.

## Table of Contents
{: .no_toc .text-delta }

- TOC
{:toc}

---

## cURL

```bash
curl -X POST 'https://connect.signl4.com/webhook/{team-secret}' -H 'Content-Type:application/json' -d '{"Title":"Test Alert","Text":"Hello world."}'
```

cURL with attachment:

```bash
curl -X POST "https://connect.signl4.com/webhook/{team-secret}"  -F "Title=Camera Alert" -F "Message=Nice view from the office." -F "File=@office-view.jpg" -H "Content-Type: multipart/form-data"
```

## Bash Script

```bash
  # Send SIGNL4 alert from Bash
  
  # SIGNL4 team secret
  team_secret="team-secret"
  
  # Alert data
  data()
  {
    cat <<EOF
  {
    "Title": "Alert",
    "Message": "SIGNL4 alert from Bash Shell"
  }
  EOF
  }
  
  curl -d "$(data)" -H "Content-Type: application/json" "https://connect.signl4.com/webhook/$team_secret"
```

## PowerShell

```powershell
# Send SIGNL4 alert from PowerShell

# SIGNL4 team secret
$team_secret = ""
# Alert data
$data = @{
 "Title"="Alert"
 "Message"="SIGNL4 alert from PowerShell"
} | ConvertTo-Json -Depth 4

Invoke-RestMethod "https://connect.signl4.com/webhook/$team_secret" -Method POST -ContentType "application/json" -Body $data
```

## Node.js

```javascript
// Send SIGNL4 alert from Node.js

// Your SIGNL4 team secret
const teamSecret = 'team-secret'

const https = require('https')

// Alert data
const data = JSON.stringify({
    'Title': 'Alert',
    'Message': 'SIGNL4 alert from Node.js'
})

// SIGNL4 webhook URL
const options = {
  hostname: 'connect.signl4.com',
  port: 443,
  path: '/webhook/' + teamSecret,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  if (res.statusCode != 201) {
      // Error
      console.error('Error: ' + res.statusCode)
      return
  }

  // Success
  res.on('data', d => {
    process.stdout.write(d)
  })
})

// Error
req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()
```

## Python

```python
  # Send SIGNL4 alert from Python
  
  import requests
  
  # Your SIGNL4 team secret
  teamSecret = 'team-secret'
  
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

## C#

```csharp
using System;
using System.IO;
using System.Net;
using System.Text;

// Send SIGNL4 alert from C#

// Your SIGNL4 team secret
string teamSecret = "team-secret";

// Alert data
string json = @"{  
'Title': 'Alert',  
'Message': 'SIGNL4 alert from C#'  
}"; 

sendSIGNL4Alert(teamSecret, json);

public static void sendSIGNL4Alert(string strTeamSecret, string strData)
{
    string url = "https://connect.signl4.com/webhook/" + strTeamSecret;

    try
    {
        HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(url);
        request.Method = "POST";

        byte[] byteArray = Encoding.UTF8.GetBytes(strData);

        request.ContentType = "application/json";
        request.ContentLength = byteArray.Length;

        // Send the request
        Stream dataStream = request.GetRequestStream();
        dataStream.Write(byteArray, 0, byteArray.Length);
        dataStream.Close();

        // Get the response.
        HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        Console.WriteLine(((HttpWebResponse)response).StatusDescription);

        using (dataStream = response.GetResponseStream())
        {
            StreamReader reader = new StreamReader(dataStream);
            string responseFromServer = reader.ReadToEnd();

            Console.WriteLine("Status Code: {0}", (int)response.StatusCode);
            Console.WriteLine(responseFromServer);

            if ((int)response.StatusCode == 201) {
                // Success
                Console.WriteLine("Success");
            }
            else {
                // Error
                Console.WriteLine("Error");
            }
        }

        response.Close();
    }
    catch (Exception e)
    {
        // Error
        Console.WriteLine("Error: " + e.ToString());
    }

}
```

## Go

```go
package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
)

// Send SIGNL4 alert from Go

func main() {
  // Your SIGNL4 team secret
  teamSecret := "team-secret"
  url := "https://connect.signl4.com/webhook/" + teamSecret

  // Alert data
  var jsonStr = []byte(`{
    "Title":"Alert",
    "Message": "SIGNL4 alert from Go"}`)
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    // Error
    fmt.Println("Error")
    panic(err)
  }
  defer resp.Body.Close()

  if resp.StatusCode == 201 {
    // Success
    fmt.Println("Success")
  } else {
    // Error
    fmt.Println("Error: " + resp.Status)
  }

  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("response Body:", string(body))
}
```

## PHP

```php
<?php

// Send SIGNL4 alert from PHP

// Your SIGNL4 team secret
$teamSecret = 'team-secret';

$url = 'https://connect.signl4.com/webhook/' . $teamSecret;
 
// User cURL
$ch = curl_init($url);
 
// Alert data
$data = array(
    'Title' => 'Alert',
    'Message' => 'SIGNL4 alert from PHP'
);

$jsonData = json_encode($data);

// Send the request
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // No echo for curl_errno
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); 
 
//Execute the request
$result = curl_exec($ch);

if (!curl_errno($ch)) {
  $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  if ($http_code == 201) {
    // Success
    echo $result . '\r\n';
  }
  else {
    // Error
    echo 'Error: ' . $http_code . '\r\n';
  }
}
else {
  // Error
  echo 'Error\r\n';
}

curl_close($ch);

?>
```

## Ruby

```ruby
require 'net/http'
require 'uri'
require 'json'

# Send SIGNL4 alert from Ruby

# SIGNL4 team secret
team_secret = "team-secret"

# Alert data
alert_data = { "Title" => "Alert", "Message" => "SIGNL4 alert from Ruby" }.to_json

url = "https://connect.signl4.com/webhook/" + team_secret

res = Net::HTTP.post URI(url),
    alert_data,
    "Content-Type" => "application/json"

# Status
puts res.code
puts res.message

# Body
puts res.body

case res
when Net::HTTPSuccess, Net::HTTPRedirection
  if res.code == "201"
    # Success
    puts "Success"
  else
    # Error
    puts "Error1"
  end
else
  # Error
  puts "Error"
end
``` 

## Flutter / Dart
 
```dart
  import 'dart:convert';
  import 'package:http/http.dart' as http;
  
  void main() {
    print('Sending SIGNL4 alert ...');
  
    sendRequest('SIGNL4 Alert from Dart.');
  }
  
  // Send alert
  Future sendRequest(String title) async {
    // SIGNL4 team secret
    String teamSecret = 'signl4-team-secret';
  
    final response = await http.post(
      Uri.parse('https://connect.signl4.com/webhook/' + teamSecret),
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode({
        'title': title,
      }),
    );
  
    if (response.statusCode == 201) {
      // If the server did return a 201 CREATED response,
      // then parse the JSON.
  
      print(jsonDecode(response.body)['eventId']);
    } else {
      // If the server did not return a 201 CREATED response,
      // then throw an exception.
  
      print('Error: ${response.statusCode}');
  
      throw Exception('Failed to send alert.');
    }
  }
```

## Rust

```rust
// Send SIGNL4 alert from Rust

// In your Cargo.toml, add the following [dependencies]
// reqwest = { version = "0.11", features = ["json"] }
// serde_json = "1.0"
// tokio = { version = "1", features = ["full"] }

use reqwest::Error;
use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), Error> {
    // Your SIGNL4 webhook URL
    let url = "https://connect.signl4.com/webhook/{team-secret}";

    // Create a JSON object
    let request = json!({
        "Title": "Alert",
        "Message": "SIGNL4 alert from Rust"
    });

    // Send the POST request with the JSON payload
    let client = reqwest::Client::new();
    let res = client.post(url)
        .json(&request)
        .send()
        .await?;

    // Print the response status and body
    println!("Response status: {}", res.status());
    let body = res.text().await?;
    println!("Response body: {}", body);

    Ok(())
}
```

## Visual Basic for Applications (VBA)

```vb
' Send a SIGNL4 alert via VBA (e.g. for the PcVue Scripting Engine)

Dim httpRequest
Set httpRequest = CreateObject("MSXML2.ServerXMLHTTP.6.0")

Dim url, data

' SIGNL4 webhook URL including team or integration secret
url = "https://connect.signl4.com/webhook/{team-secret}"
data = "{""title"":""Alert from VBA"", ""message"":""Test.""}"

httpRequest.Open "POST", url, False
httpRequest.setRequestHeader "Content-Type", "application/json"
httpRequest.send data

If httpRequest.Status = 200 Then
    MsgBox "Request successful: " & httpRequest.responseText
Else
    MsgBox "Error: " & httpRequest.Status
End If

Set httpRequest = Nothing
```
