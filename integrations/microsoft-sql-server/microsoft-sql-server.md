---
title: Microsoft SQL Server
parent: Integrations
---

# SIGNL4 Integration with Microsoft SQL Server

In industry and production scenarios a lot of machine data is available. This can include the temperature of certain machines, time spans of certain processes, system pressure, power consumption, vibration detection, etc. The data is (or can be made) available in database tables and sometimes it is already being displayed on dashboards on computer screens. In daily operations, it is hard to look at each relevant dashboard all the time. Therefore, it makes sense to send relevant information about critical situations to the responsible users in real time no matter where they are. That is where SIGNL4 comes in.

Integrating SIGNL4 with any database can enhance your daily operations with an extension to your mobile team in the field or on the shop floor.

All it takes to check relevant information and send alerts using SIGNL4 is a little script with a suitable SQL query that checks the database in regular intervals.

Gathering information from a database and sending team alerts in case of critical incidents is achieved with a simple script. In our case we use a JavaScript or PowerShell script that connect to the database, executes an SQL Select statement and sends an alert via SIGNL4 if necessary.

SIGNL4 is a mobile alert notification app for powerful alerting, alert management and for mobile assignment of work items. Get the app at [https://www.signl4.com](https://www.signl4.com/).

Microsoft SQL Server is a widely used database. Of course any other database will work in a similar way.

## Prerequisites

- A SIGNL4 ([https://www.signl4.com](https://www.signl4.com/)) account
- A Microsoft SQL Server database

## How to Integrate

To make your life easier we provide a fully working sample on GitHub at [https://github.com/signl4/signl4-integration-sql-server](https://github.com/signl4/signl4-integration-sql-server). This includes the JavaScript and PowerShell scripts as well as the SQL statements for creating the database table and inserting some sample data.

In SQL Server you can create a database table as follows.

Now you can create script in JavaScript or PowerShell (or whatever language you prefer) to do the following.

Connect to the database.

Execute an SQL Select query to retrieve relevant records.

In our case we just check for temperatures higher than 80 degrees within the last ten minutes.

```sql
SELECT [MachineName], MAX(Temperature) FROM [dbo].[MachineData] WHERE Timestamp > DATEADD(MINUTE, -10, SYSDATETIME()) AND Temperature > 80 GROUP BY [MachineName];
```

You can adapt the query to fit your needs. You can also to some more sophisticated operations here like the average, maximum, number of occurrences or process data from multiple tables as well.

Send the Alert using SIGNL4.

If the above SQL query retrieved some records it means we have a situation worth communicating. In our script we use the SIGNL4 webhook to send the data to SIGNL4.

Of course, we would like to check the database in regular intervals. In Windows the easiest way to do so is to use the Windows Task Scheduler. Here you can create a new task, let it run every ten minutes and let it execute the respective script.

Now you can test your script manually first. Add some sample date into the database table that should trigger an alert. If all runs find you will receive the alert in your SIGNL4 app.

![SQL Server](sql-server.png)

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-iot.png)
