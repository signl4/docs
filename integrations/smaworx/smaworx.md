---
title: SMAWORX
parent: Integrations
---

# SIGNL4 Integration with SMAWORX

[SMAWORX](https://www.smaworx.io/) combines service management and IT security management the smart way. It offers Enterprise-Service Management (ESM), IT Security Management, Enterprise Service Management (ESM), and IT Asset Management (ITAM) all in one solution. [SMAWORX Alert](https://www.smaworx.io/alert) directly integrates with SIGNL4 for reliable mobile alerting.

## Prerequisites

- A [SIGNL4](https://www.signl4.com/) account
- A [SMAWORX](https://www.smaworx.com/) account

## How to integrate?

Integrating SIGNL4 with SMAWORX is straightforward.

### 1. ESM  

The ESM integration uses OpenText SMAX. You can configure the integration as described [here](https://docs.signl4.com/integrations/opentext-smax/opentext-smax.html).

### 2. Security  

The Security integration is done via SMAWORX Insight which is based on [Enginsight](https://enginsight.com/). Here you can either use a wehbook to integrate with SIGNL4, i.e. automatically send an email to your SIGNL4 team email. Or, you can use the integration platform as described in the next step.

### 3. Integration  

More sophisticated integrations und multi-step alerting is supported using n8n and Frends.

You can find more information about how to integrate SIGNL4 with n8n [here]( https://docs.signl4.com/integrations/n8n/n8n.html).

SMAWORX uses [Frends](https://frends.com/) as their integration platform. Here you can use the HTTP Request task for triggering (or closing) a SIGNL4 alert. You can use the following parameters:  
**Method**: POST  
**Url**: Your SIGNL4 webhook URL including team or integration secret.  
**Message**: JSON alert payload including placeholders. Find more information [here](https://docs.signl4.com/integrations/webhook/webhook.html).  

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](signl4-smaworks.png)


