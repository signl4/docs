---
title: Raspberry Pi
parent: Integrations
---

# SIGNL4 Integration with Raspberry Pi

When I started with my first Raspberry mini computer, I selected Windows 10 IoT Core as the operating system. This allowed for using Visual Studio and C#. It is not that difficult to call a webhook from your C# code, though a couple of pitfalls await you when your build your Raspberry project (I connected a temperature/humidity sensor and wanted to send regular data from my office room via SIGNL4).

Here is what the C# code looks like.

First of all, we need to define the webhook URL:

```csharp
private const string Signl4APIUrl = "https://connect.signl4.com/webhook/{team-secret}";
```

Note that {team-secret} represents the unique identifier of the team you wish to send notification to (the ‘team secret’).

Then, we need to define our JSON object which will contain the data for the webhook call:

```csharp
 [JsonObject]
        public class Data
        {
            [JsonProperty(Order = 5)]
            public string Location { get; set; }
            [JsonProperty(Order = 4)]
            public string Humidity { get; set; }
            [JsonProperty(Order = 3)]
            public string Temperature { get; set; }
            [JsonProperty(Order = 2)]
            public string Body { get; set; }
            [JsonProperty(Order = 1)]
            public string Title { get; set; }
        }
```

The next sniplet is where you assemble the JSON object and fill it with values:

```csharp
var data = new Data 
{
 // this is a specific object containing data read from the sensor
  Title = "Critical Temperature",
  Body = "Room temperature is at " + string.Format("{0:0.0} °C", this.Temperature),
  Temperature = string.Format("{0:0.0} °C", this.Temperature),
  Humidity = string.Format("{0:0.0}%", this.Humidity),
  Location = "South Room"
};

try
{
  var response = await PostAsync(Signl4APIUrl, data);
  if (response == null)
  {
    return;
  }
  await response.Content.ReadAsStringAsync();
}
catch (Exception ex)
{
  // do something 
}
```

Above code contains a reference to a method “PostAsync”. Here it is:

```csharp
public static async Task<HttpResponseMessage> PostAsync<T>(string strUrl, T content)
{
  var client = new HttpClient(new HttpClientHandler { AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate });
  HttpContent httpContent = null;
  if (content != null)
  {
   httpContent = new StringContent(JsonConvert.SerializeObject(content), Encoding.UTF8, "application/json");
  }
    return await client.PostAsync(strUrl, httpContent);
}
```

BTW, you need to include the following use statements:

```csharp
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text;
using Newtonsoft.Json;
```

Your projects package manifest needs to include “Internet (Client)” in the Capabilities section.

And here is what the result should look like in your SIGNL4 app (assuming you have created a Service/System triggering on ‘Temperature’).

Happy Coding!

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-iot.png)
