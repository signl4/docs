---
title: Back-Channel Connectivity
parent: Samples
description: Learn how to securely connect SIGNL4 with on-premises monitoring and IT systems for status updates using firewalls, VPNs, reverse proxies, tunnels, and gateways.
permalink: /samples/back-channel-connectivity/
redirect_from:
  - /samples/back-channel-connectivity/back-channel-connectivity.html
  - /samples/back-channel-connectivity/back-channel-connectivity
---

# Connecting SIGNL4 Back to On-Premises Systems

Many monitoring, IT operations, and service management tools can run inside a private network or on-premises environment. Examples include [Checkmk](https://docs.signl4.com/integrations/checkmk/), [Zabbix](https://docs.signl4.com/integrations/zabbix/), [PRTG](https://docs.signl4.com/integrations/prtg/), [Icinga](https://docs.signl4.com/integrations/icinga/), [OTRS](https://docs.signl4.com/integrations/otrs/), [Keep](https://docs.signl4.com/integrations/keep/), and certain deployments or connected environments involving [ServiceNow](https://docs.signl4.com/integrations/servicenow/), [Datadog](https://docs.signl4.com/integrations/datadog/), or [Zendesk](https://docs.signl4.com/integrations/zendesk/).

SIGNL4 can receive events from these systems and notify the right people. Some integrations also support communication in the opposite direction. For example, when an engineer acknowledges or closes an alert in SIGNL4, this status can be sent back to the originating system.

Because SIGNL4 runs in the cloud, the target system or API must be reachable from the Internet. There are several ways to achieve this securely.

## Open a Firewall Port

A firewall can allow inbound HTTPS traffic to the required API endpoint.

For security, access should be limited to the necessary endpoint and protected using authentication, TLS, and, where possible, IP filtering.

**Typical setup:** Forward TCP port 443 from the firewall to the internal API or web server.

**Advantages:** Simple and direct.  
**Considerations:** Requires an inbound firewall rule and exposes an endpoint to the Internet.

## Reverse Proxy

A reverse proxy exposes only the required API endpoint while the actual application remains inside the private network.

Common reverse proxies include:

- Nginx
- Apache HTTP Server
- Traefik
- HAProxy
- Microsoft IIS

For example, `https://alerts.example.com/api/` could be forwarded to an API running on an internal server.

**Advantages:** Fine-grained control over endpoints, authentication, TLS, logging, and rate limiting.  
**Considerations:** The proxy itself needs to be reachable from the Internet.

## VPN

A VPN provides a secure network connection between otherwise separate networks.

Common technologies include:

- WireGuard
- OpenVPN
- IPsec
- Tailscale

The internal API can then remain private and be reached through the VPN connection.

**Advantages:** Strong network-level isolation without exposing the application directly.  
**Considerations:** Requires VPN infrastructure, routing, and access management.

## Outbound Tunnel

An outbound tunnel establishes a connection from the private network to an external service. Requests arriving at the public endpoint are forwarded through this existing connection.

Popular examples include:

- Cloudflare Tunnel
- ngrok
- Tailscale Funnel

For example, an internal service such as `https://localhost:5000` can be made securely reachable through a public HTTPS address without opening an inbound firewall port.

**Advantages:** Usually no inbound firewall rule is required and setup can be quick.  
**Considerations:** Introduces an additional service or component.

## Reverse SSH Tunnel

A reverse SSH tunnel connects an internal server to an Internet-accessible server.

For example, a tunnel can forward a port on a public Linux server to an API running inside the private network:

```text
Internet → Public Server → SSH Tunnel → Internal API
```

Tools such as `ssh` or `autossh` can be used to establish and maintain such a connection.

**Advantages:** Lightweight and based on standard technologies.  
**Considerations:** Availability, authentication, monitoring, and automatic reconnection need to be managed.

## Cloud Relay or Gateway

A small cloud-hosted service can receive status updates and forward them to the internal system.

Possible implementations include:

- A small application on Azure, AWS, or Google Cloud
- An Azure Function or AWS Lambda
- A webhook relay service
- A custom API gateway or integration service

The relay can also validate requests, transform data, queue messages, or apply additional authentication.

**Advantages:** Very flexible and well suited for more complex environments.  
**Considerations:** Adds another component that needs to be deployed, secured, and maintained.

## Choosing the Right Approach

The best option depends on the existing network architecture, security requirements, and available infrastructure.

For simple environments, a firewall rule or reverse proxy might be sufficient. Outbound tunnels are convenient when opening inbound firewall ports is not desirable, while VPNs or cloud gateways can be suitable for more controlled or complex environments.

In all cases, only the required endpoints should be made accessible, communication should use HTTPS where applicable, and appropriate authentication and access restrictions should be configured.