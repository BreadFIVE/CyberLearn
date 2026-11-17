---
id: network
title: How Networks Work
order: 1
icon: 📡
accent: #3dd6d0
summary: Addresses, ports, protocols and layers: what really happens between pressing Enter and seeing a web page.
level: Beginner
quest: network
---

## Why start here?

Almost everything in cyber security happens on a network. Phishing emails travel across one. Websites live on one. Attackers reach your computer through one, and defenders watch one for signs of trouble. If you understand how a network behaves normally, you can spot when something is wrong. That is why this lesson comes first.

By the end you will be able to explain what an IP address is, work out which network an address belongs to, describe what a port is, explain how data is split up and sent, and name the devices and tools that engineers use to keep networks running.

> **Key idea:** A network is just computers agreeing on rules for sending messages to each other. Those rules are called **protocols**. Almost every topic in this lesson is either a rule, or something that follows one.

## What is a network?

A **network** is two or more devices connected so they can share data. The devices can be linked by cables, by radio (Wi-Fi) or by light in fibre-optic cable. The size of the network gives it a name:

| Type | Stands for | Example |
|---|---|---|
| LAN | Local Area Network | The devices in your home or classroom |
| WAN | Wide Area Network | A company linking offices in different cities |
| The internet | A network of networks | Millions of LANs and WANs joined together |

Most of what you do online uses the **client–server model**. Your device is the **client**: it asks for something. A **server** is a computer that waits for requests and sends back answers. When you open a website, your browser (the client) asks a web server for the page.

```diagram
   CLIENT                                   SERVER
 (your laptop)  ---- "Please send the ---> (web server)
                      home page"
                <--- "Here is the page" ---
```

Servers are not magic. They are ordinary computers running software that listens for requests. That is useful to remember in security: a server is just something that is waiting to talk to strangers, which is why it has to be defended carefully.

## Addresses: how data finds the right device

If you post a letter, the envelope needs an address. Data on a network works the same way, and it uses two kinds of address.

### MAC addresses

A **MAC address** (Media Access Control address) is a 48-bit number built into a network card by its manufacturer. It is written in hexadecimal, for example `3c:52:82:aa:10:25`. A MAC address identifies the **hardware** and is used for delivery **inside one local network**. A switch uses MAC addresses to send data to the right port. (A MAC address can be changed in software, so it is not proof of identity.)

### IP addresses

An **IP address** (Internet Protocol address) identifies a device **on a network** and is used to send data **between networks**. Unlike a MAC address, it depends on where you are. When you take your phone from home to a café, its MAC address stays the same, but it is given a different IP address by each network.

An **IPv4** address is 32 bits long, written as four groups of 8 bits called **octets**, each shown as a number from 0 to 255:

```
192.168.1.10
```

Computers see the same address in binary. Each octet is 8 bits, and each bit has a place value:

| Place value | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---|---|---|---|---|---|---|---|---|
| Bit | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |

Add up the place values where there is a 1: 128 + 64 = **192**. So `11000000` is 192 in decimal. The whole address `192.168.1.10` is:

```
11000000.10101000.00000001.00001010
```

> **Try it:** Convert `00001010` to decimal. Place values 8 and 2 are switched on, so 8 + 2 = 10. You can check conversions with the Toolkit tab in the Network Navigator challenges.

With 32 bits there are about 4.3 billion possible IPv4 addresses. That sounded like plenty in the 1980s, but it has run out. Two things make up for it. First, **IPv6** uses 128-bit addresses (written in hexadecimal, like `2001:db8::1`), which gives an enormous number of addresses. Second, **private addresses** let many devices share one public address.

### Private and public addresses

Some ranges are reserved for use inside homes and offices. They are **private**, which means they are not routed across the internet:

| Range | Often used by |
|---|---|
| `10.0.0.0` to `10.255.255.255` | Large organisations |
| `172.16.0.0` to `172.31.255.255` | Medium networks |
| `192.168.0.0` to `192.168.255.255` | Home routers |

Everything else is **public** and can be reached across the internet. Notice that `172.32.0.1` is public, because the private range stops at `172.31`. Your home router has one public address, and every device inside has a private one. The router uses **NAT** (Network Address Translation) to swap the private address for the public one on the way out, and swaps it back for replies.

### Who hands out the addresses?

Nobody types addresses into every phone by hand. A **DHCP server** (Dynamic Host Configuration Protocol), usually inside your router, gives each device an address when it joins. The conversation has four steps, sometimes remembered as DORA: the device **D**iscovers ("is there a DHCP server?"), the server makes an **O**ffer, the device **R**equests that address, and the server **A**cknowledges.

## Subnets: splitting a network into pieces

Big networks are divided into smaller **subnets**. This keeps traffic tidy and, importantly for security, lets you keep different groups of devices apart, for example guest Wi-Fi away from the finance computers.

An IP address has two parts: the **network part** (which network am I on?) and the **host part** (which device am I?). A **subnet mask** says where the split is. It is often written as a slash number, called CIDR notation. `/24` means the first 24 bits are the network part, which leaves 8 bits for devices.

| Notation | Mask | Host bits | Addresses in the block |
|---|---|---|---|
| `/24` | `255.255.255.0` | 8 | 256 |
| `/25` | `255.255.255.128` | 7 | 128 |
| `/26` | `255.255.255.192` | 6 | 64 |
| `/27` | `255.255.255.224` | 5 | 32 |

In each block the **first address** is the **network address** (the name of the subnet) and the **last** is the **broadcast address** (a message to everyone). Neither can be given to a device, so the number of **usable hosts** is the block size minus 2.

> **Example:** A device has the address `192.168.10.77/26`. A `/26` block is 64 addresses long, so the blocks in the last octet are 0–63, 64–127, 128–191 and 192–255. The number 77 falls in the block 64–127. So the network address is `192.168.10.64`, the broadcast address is `192.168.10.127`, and the usable addresses are `.65` to `.126`, which is 62 hosts.

The quick method: work out the block size from the mask (256 minus the last mask number, or 2 to the power of the host bits), then find which multiple of that size your number falls in.

## Names: DNS

People are good at names and bad at numbers, so we use names like `www.example.com`. Computers need numbers. The **Domain Name System (DNS)** is the internet's phone book: it turns a name into an IP address.

When you type a web address, your computer asks a **DNS resolver** (often your router, or one run by your internet provider). If the resolver does not already know the answer, it asks a chain of other servers, starting at the root, then the server for `.com`, then the server responsible for `example.com`, and finally gets the address back. The answer is remembered for a while (**cached**) so the next lookup is fast.

DNS matters to security because everything starts with it. If an attacker can make DNS give you the wrong address, you land on a fake website without any mistake on your part. Defenders watch DNS closely because malware often looks up unusual names.

## Ports and protocols

An IP address finds the right computer. A **port number** finds the right **service** on that computer. Think of the IP address as the address of a building and the port as the door number for a particular office inside it. Port numbers run from 0 to 65535. Some are famous because standard services always use them:

| Port | Protocol | Used for |
|---|---|---|
| 21 | FTP | Transferring files (old, sends passwords in the clear) |
| 22 | SSH | Secure remote login |
| 25 | SMTP | Sending email between servers |
| 53 | DNS | Looking up names |
| 80 | HTTP | Web pages (not encrypted) |
| 443 | HTTPS | Web pages, encrypted |

A **protocol** is an agreed set of rules for a conversation. HTTP has rules for asking for a web page. SMTP has rules for passing email along. If both sides follow the rules, they can understand each other even if the computers are built by different companies.

> **Remember:** A port that is open and listening is a door that is unlocked and has someone standing behind it. Services you do not need should not be listening at all. Fewer open doors means less for an attacker to try.

## TCP and UDP: reliable or fast?

Data does not travel as one big lump. It is cut into small pieces called **packets**, sent separately, and put back together at the other end. Two main protocols look after this, and they make different trade-offs.

**TCP** (Transmission Control Protocol) is **reliable**. It checks that every piece arrives, puts them in order, and asks for any lost piece to be sent again. That is what you want for web pages, email and file downloads, where a missing piece would ruin the result.

**UDP** (User Datagram Protocol) is **fast and light**. It sends pieces and does not check. If one is lost, tough. That suits live video calls, online games and quick DNS lookups, where an old packet is worse than useless: it is better to skip it and carry on.

Before sending data, TCP sets up the conversation with a **three-way handshake**:

```diagram
 Client                         Server
   | ---- SYN  ("Can we talk?") ---> |
   | <--- SYN-ACK ("Yes. Can you   --|
   |        hear me?")               |
   | ---- ACK  ("Yes, I can.") ----> |
   |  ======== data flows ========   |
```

**SYN** stands for synchronise and **ACK** for acknowledge. This detail matters later: because every new TCP connection starts with a SYN, a flood of fake SYN messages is one way to overload a server.

## Layers: how the pieces fit together

Network software is organised into **layers**. Each layer has one job and trusts the layers above and below to do theirs. This is why a web browser does not need to know whether you are on Wi-Fi or a cable. The **TCP/IP model** has four layers:

| Layer | Job | Examples |
|---|---|---|
| Application | The programs and their protocols | HTTP, DNS, SMTP |
| Transport | Splits data up, adds port numbers, makes it reliable (or not) | TCP, UDP |
| Internet | Adds IP addresses and finds a route | IP, routers |
| Network access | Moves bits across the local link using MAC addresses | Ethernet, Wi-Fi, switches |

When you send something, data passes **down** the layers on your computer, and each layer wraps it in its own envelope with its own addressing. This wrapping is called **encapsulation**. At the destination, the data passes **up** and each layer removes its own envelope.

You will also meet the seven-layer **OSI model**. It splits the same ideas more finely. From the bottom: 1 Physical (cables and signals), 2 Data link (MAC addresses, switches), 3 Network (IP, routers), 4 Transport (TCP, UDP, ports), 5 Session, 6 Presentation, 7 Application. A memory trick, from layer 1 up: *Please Do Not Throw Sausage Pizza Away*. Engineers often say "that is a layer 2 problem" to mean something is wrong with switching or MAC addresses.

## Devices and layouts

| Device | What it does | Works with |
|---|---|---|
| Switch | Connects devices in one network and forwards data only to the right port | MAC addresses |
| Router | Joins different networks and decides the best path | IP addresses |
| Firewall | Allows or blocks traffic using rules | IPs, ports, protocols |
| Wireless access point | Lets Wi-Fi devices join the wired network | Radio and MAC addresses |
| DNS and DHCP servers | Provide names and addresses | Services on the network |

The way devices are connected is the **topology**. In a **star**, every device connects to one central switch. This is the standard today: if one cable fails only one device is lost, but if the switch fails everything is. In a **bus**, all devices share one cable (cheap, but one break can take everything down). In a **ring**, each device connects to two neighbours. In a **mesh**, devices connect to many others, giving many routes, which is very resilient and used on the internet itself.

## The engineer's toolkit

Network engineers do not guess. They use small command-line tools to gather evidence. These are the same tools used in the Network Navigator quest.

* **`ip a`** (or `ifconfig`, or `ipconfig` on Windows) shows your own addresses. Always check this first.
* **`ping`** sends a small test message and waits for a reply. If a device answers, it is reachable. "Destination host unreachable" or 100% packet loss means it is not.
* **`nslookup`** asks DNS for the address behind a name, so you can tell whether a problem is DNS or something else.
* **`traceroute`** lists every router (called a **hop**) between you and a destination, with the time taken for each. A sudden jump in delay shows where the slowness starts.
* **`arp -a`** shows which MAC address belongs to which IP address on your local network. Each device should have its own. Two IP addresses sharing one MAC can mean something is pretending to be the router.
* **`netstat -an`** shows which ports are listening and which connections are open. An unexpected listening port is worth investigating.

> **Tip:** Work like a doctor. Gather symptoms with one command, form a theory, and test it with the next one. Do not change things until you know what is wrong.

## Where security comes in

Every layer has its own weak points, and defenders protect each one.

* **Eavesdropping.** On an open Wi-Fi network or an unencrypted protocol, anyone nearby can read the traffic. The fix is encryption: HTTPS instead of HTTP, SSH instead of old remote-login tools, and WPA2 or WPA3 on Wi-Fi.
* **Spoofing.** Faking an address, such as a fake DNS answer or pretending to be the router with ARP, so traffic goes to the wrong place. Defenders watch for duplicate MAC addresses and unexpected changes.
* **Denial of service.** Flooding a server with so many requests that real users cannot get in. Defences include filtering and spreading load across many servers.
* **Unneeded open ports.** Services nobody uses but which are still listening. The fix is simple: turn off what you do not need.

The main defensive tools follow from the layers. A **firewall** checks each packet against its rules from the top down and applies the first rule that matches. The safest rule set ends with "deny everything else", called **default deny**: only what is explicitly allowed gets through. **Segmentation** puts different groups of devices on different subnets so that a problem in one place cannot easily spread. And **monitoring** records what normal looks like, so unusual traffic stands out.

## Putting it all together

Let us follow one ordinary action from start to finish: you type `www.example.com` into a browser and press Enter.

1. **DNS.** Your computer asks its DNS resolver for the address of `www.example.com`. The answer comes back, say `203.0.113.80`.
2. **Handshake.** Your computer opens a TCP connection to that address on port 443 (HTTPS), using the three-way handshake.
3. **Encryption.** The two sides agree on encryption keys so nobody in between can read the conversation.
4. **Request.** The browser sends an HTTP request: "please send the home page".
5. **Down the layers.** On your computer, the request is split into TCP segments, wrapped in IP packets, then wrapped in Wi-Fi or Ethernet frames.
6. **Across the networks.** Your router forwards the packets, hop by hop, toward the server. Each router only looks at the IP address and passes the packet on.
7. **Back up the layers.** The server rebuilds the request and sends back the page the same way, in reverse.

Every one of those steps is something a defender can monitor and an attacker can try to abuse. Knowing the steps gives you the map. The rest of the CyberLearn lessons are about specific territories on it.

## What to do next

Try the **Network Navigator** challenges to practise addresses, subnets and the lab tools. If you enjoy it, continue with the lesson on the Linux command line, which is where most network tools live.

```quiz
Q: What does a MAC address identify?
- A user account
+ A piece of network hardware, used for delivery inside one local network
- A website
- A router's location on the internet
? A MAC address belongs to the network card. Switches use it inside a LAN, while IP addresses are used between networks.

Q: A device has the address 192.168.10.77/26. What is its network address?
- 192.168.10.0
+ 192.168.10.64
- 192.168.10.77
- 192.168.10.128
? A /26 block is 64 addresses long. The blocks start at 0, 64, 128 and 192, and 77 falls in the block that starts at 64.

Q: Which of these is a private IP address?
- 8.8.8.8
- 172.32.0.1
+ 172.20.5.9
- 192.169.1.1
? The private 172 range is 172.16.0.0 to 172.31.255.255, so 172.20.5.9 is private. 172.32.x.x and 192.169.x.x are just outside the private ranges.

Q: What is the job of a port number?
- It identifies the computer on the network
+ It identifies the service on a computer that should receive the data
- It encrypts the traffic
- It shows how far away the server is
? The IP address finds the computer. The port number finds the service on it, such as web (80 or 443) or SSH (22).

Q: Which protocol would be the better choice for a live video call, where an old packet is useless?
- TCP
+ UDP
- SMTP
- FTP
? UDP does not stop to re-send lost packets, so it is faster and suits live traffic. TCP's reliability adds delay.

Q: Put the TCP three-way handshake in the correct order.
- ACK, SYN, SYN-ACK
- SYN-ACK, SYN, ACK
+ SYN, SYN-ACK, ACK
- SYN, ACK, SYN-ACK
? The client sends SYN, the server replies SYN-ACK, and the client finishes with ACK. Then data can flow.

Q: Which device joins different networks together and decides the route using IP addresses?
- A switch
+ A router
- A hub
- A wireless access point
? A switch connects devices inside one network using MAC addresses. A router connects networks using IP addresses.

Q: Which command shows each router between you and a destination, with the time taken at each step?
- ping
- nslookup
+ traceroute
- netstat
? traceroute lists every hop. A sudden jump in delay shows where the slowness begins.

Q: In the arp table, two different IP addresses share the same MAC address, and one of them is the router. What might this suggest?
- The network is working perfectly
+ Something may be pretending to be the router (ARP spoofing)
- The DNS server has failed
- A port is closed
? Each device should have its own MAC address. A duplicate can mean a device is impersonating the router to intercept traffic, which is worth investigating.

Q: A firewall's last rule says "deny everything else". What is this approach called?
- Open access
- Port forwarding
+ Default deny
- Network address translation
? Default deny allows only what is explicitly permitted and blocks the rest. It is the safest starting point.

Q: Which TCP/IP layer adds IP addresses and finds a route across networks?
- Application
- Transport
+ Internet
- Network access
? The Internet layer deals with IP addresses and routing. The Transport layer handles ports and reliability.
```

```glossary
Network :: Two or more devices connected so they can share data.
LAN :: Local Area Network: the devices in one home, school or office.
Client and server :: A client asks for something; a server waits for requests and answers them.
Protocol :: An agreed set of rules for how two computers talk to each other.
MAC address :: A 48-bit hardware address built into a network card, used for delivery inside one local network.
IP address :: An address that identifies a device on a network and is used to route data between networks.
Octet :: One group of 8 bits in an IPv4 address, shown as a number from 0 to 255.
Private address :: An IP address in a reserved range that is used inside homes and offices and is not routed on the internet.
NAT :: Network Address Translation: a router swapping private addresses for its public address and back.
DHCP :: The service that automatically gives devices an IP address when they join a network.
Subnet mask :: A number (such as 255.255.255.0 or /24) that shows which part of an address is the network and which is the device.
DNS :: The Domain Name System: it turns names into IP addresses.
Port :: A number that identifies a particular service on a computer, from 0 to 65535.
Packet :: A small piece of data sent across a network, with addressing information attached.
TCP :: A reliable protocol that checks every packet arrives, in order.
UDP :: A fast, lightweight protocol that does not check delivery.
Three-way handshake :: The SYN, SYN-ACK, ACK exchange that sets up a TCP connection.
Encapsulation :: Each layer wrapping data in its own envelope as it passes down the layers.
Router :: A device that joins networks and forwards packets using IP addresses.
Switch :: A device that connects devices in one network and forwards data using MAC addresses.
Firewall :: A device or program that allows or blocks traffic using rules.
Default deny :: A firewall approach that blocks everything except what is explicitly allowed.
Hop :: One router that a packet passes through on its journey.
```

```further
Cisco Networking Academy: free introductory courses | https://www.netacad.com/ | Free self-paced networking courses, including beginner ones.
Cisco Skills for All | https://skillsforall.com/ | Free courses, and access to Packet Tracer, a network simulator for learners.
TryHackMe | https://tryhackme.com/ | Guided, browser-based rooms, including a Network Fundamentals path. Free to start.
Professor Messer | https://www.professormesser.com/ | Free video lessons that follow the CompTIA Network+ topics.
NCSC CyberFirst | https://www.ncsc.gov.uk/cyberfirst/overview | UK government programmes and information for young people interested in cyber security.
```
