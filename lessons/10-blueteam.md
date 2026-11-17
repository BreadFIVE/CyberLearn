---
id: blueteam
title: Blue Team: Defending and Responding
order: 10
icon: 🛡️
accent: #7c9cff
summary: How a Security Operations Centre spots attacks, sorts real threats from false alarms, and responds when something goes wrong.
level: Intermediate
quest: blueteam
---

## The defender's job

Attackers only have to be right once. Defenders have to be right every time, all day, across thousands of devices, while the people they protect just want to get on with their work. That is the challenge of the **blue team**: the people responsible for protecting systems, spotting attacks and responding to them.

Many blue teamers work in a **Security Operations Centre (SOC)**, a team that watches an organisation's systems around the clock. Think of it as the control room for cyber security. Alarms come in, someone decides which ones matter, and the team acts. It is one of the biggest entry routes into the cyber industry, and it is a great place for people who like solving puzzles with evidence.

By the end of this lesson you will be able to explain the goals of security, describe what a SOC does and which tools it uses, decide whether an alert is a real threat or a false alarm, read a log to find an attacker, describe the stages of an incident response, and explain the controls that make attacks harder.

> **Key idea:** **Detection and response matter as much as prevention.** No defence is perfect, so organisations assume that eventually something will get through. The question is how quickly they notice, and how well they react.

## What are we protecting? The CIA triad

Security has three goals, remembered as the **CIA triad**:

| Goal | Meaning | Example of failure |
|---|---|---|
| **Confidentiality** | Only the right people can see information | Customer records leaked online |
| **Integrity** | Information is accurate and has not been secretly altered | An attacker changes exam grades |
| **Availability** | Systems and data are there when needed | Ransomware locks all files, or a flood of traffic takes the website offline |

Every incident breaks at least one of these. Naming which one helps the team decide what matters most to protect.

## Inside a SOC

A SOC has **people**, **process** and **technology**.

**People.** Typical roles include:

* **Tier 1 analyst** (or junior analyst): watches the alert queue, decides which alerts are real, and either closes them or passes them up. This is a common first job.
* **Tier 2 analyst:** investigates the serious alerts in depth.
* **Incident responder:** takes charge when a real incident is confirmed.
* **Threat hunter:** goes looking for attackers that the alarms missed.
* **SOC manager:** runs the team, reports to the organisation and improves the process.

**Process.** Written procedures, often called **playbooks**, describe what to do for each type of alert, so people do the right thing under pressure, in the same way every time.

**Technology.** The main tools are:

| Tool | What it does |
|---|---|
| **SIEM** (Security Information and Event Management) | Collects logs from everywhere, searches them, correlates events and raises alerts |
| **Firewall** | Allows or blocks traffic using rules |
| **IDS / IPS** (Intrusion Detection / Prevention System) | Watches network traffic for known bad patterns. An IDS alerts, an IPS also blocks |
| **EDR** (Endpoint Detection and Response) | Watches individual computers for suspicious behaviour and can isolate them |
| **Antivirus / anti-malware** | Detects and blocks known malicious programs |
| **Email security** | Filters phishing and malicious attachments |
| **Vulnerability scanner** | Finds missing patches and weak settings before attackers do |
| **Ticketing system** | Records each case, who is handling it and what was done |

## Alerts and triage

A busy SOC can see **thousands** of alerts a day. Most are **false positives**: alerts that look suspicious but are harmless. A genuine problem is a **true positive**. The danger runs both ways. If analysts waste time on false alarms, they can miss the real one (this is called **alert fatigue**). If they dismiss a real alert, the attack succeeds.

**Triage** means sorting alerts quickly by how serious they are, and how likely they are to be real. For each alert, the analyst asks:

* **What** happened, exactly?
* **Who** or **which system** was involved, and how important is it?
* **When** did it happen? Is it normal for that time?
* **Is it expected?** Is there a normal explanation, such as approved maintenance or a known tool?
* **What is the potential impact** if it is real?
* Is there **other evidence** pointing the same way?

> **Example:** Six alerts arrive at once. A user logged in from the UK at 09:02 with the right password (normal, a false alarm). The IT team ran a port scan at 03:00, but there is an approved maintenance ticket (also expected). But **fifty failed logins in one minute from a foreign address, followed by a success**, is a real threat. And a finance laptop **contacting a known malware server** is serious too. The analyst starts with whatever is *causing damage now*, or could cause the most damage, and works down.

Priority is a mix of **severity** (how bad if real) and **urgency** (is it happening now). Ransomware encrypting a file server right now beats an out-of-date program on a test machine.

## Finding an attacker in the logs

Logs are the memory of a system. Learning to read them is the heart of defence. Here are two worked examples.

### Example 1: a brute-force attack that worked

This extract is from an SSH authentication log (shortened):

```
02:10:08 sshd Failed password for root       from 203.0.113.50
02:10:11 sshd Failed password for admin      from 203.0.113.50
02:10:15 sshd Failed password for test       from 203.0.113.50
   ... (many more failures, many different usernames) ...
02:14:34 sshd Failed password for svc_backup from 203.0.113.50
02:14:37 sshd Accepted password for svc_backup from 203.0.113.50
02:14:59 sudo: svc_backup : COMMAND=/usr/bin/crontab -e
```

An analyst reads the story:

1. **One address** (`203.0.113.50`) tries many usernames in a short time. That is a **brute-force** or password-guessing attack.
2. The staff all log in from internal `10.x` addresses. This address is **external**.
3. Right after a run of failures, the log shows **Accepted password** for `svc_backup`. The attack **succeeded**. A service account with a weak password was the way in.
4. The next line shows the attacker used `sudo` to edit scheduled jobs, which is a classic way to set up something that **keeps running** (this is called **persistence**).

The analyst's response: contain (disable the account, block the address), find out what the scheduled job does, check what else the account touched, and report. The fixes: strong, unique passwords for service accounts, **multi-factor authentication**, **account lockout** after repeated failures, and not exposing SSH to the whole internet.

### Example 2: spotting probing in a web log

A web server's **access log** records every request: address, time, page and **status code**.

```
198.51.100.9 [10:02:11] "GET /admin"          404
198.51.100.9 [10:02:11] "GET /backup.zip"     404
198.51.100.9 [10:02:12] "GET /.env"           404
192.0.2.88   [10:14:40] "GET /products?id=7'"                          500
192.0.2.88   [10:14:41] "GET /products?id=7' UNION SELECT ..."         500
```

* The first address asks for many names that do not exist (`404`, "not found"), and they are all the kind of file a careless site might leave behind. A real visitor makes one or two errors. This pattern means **someone is scanning** for hidden pages.
* The second address adds an **apostrophe** and the words **UNION SELECT** to a link. That is a classic sign of **SQL injection** being tried, and the `500` (server error) responses show that the site struggled with the input.

A defender sees both, blocks or rate-limits the addresses, and, most importantly, checks whether the site is actually vulnerable and fixes it. (The web security lesson explains SQL injection and its fix.)

## Indicators and the attacker's journey

An **indicator of compromise (IoC)** is a clue that a system may have been breached. Examples: a new administrator account at 03:00 on a Sunday, large uploads to an unknown server at night, security software suddenly turned off, a computer contacting a known malicious address.

Defenders think about attacks as a sequence, often described by the **cyber kill chain**:

1. **Reconnaissance:** the attacker researches the target.
2. **Delivery:** the malware or phishing email reaches the victim.
3. **Installation:** the malware sets itself up so it survives a restart.
4. **Command and control:** it contacts the attacker's server for instructions.
5. **Actions on objectives:** the attacker steals data, encrypts files or causes damage.

The useful insight is that the attacker needs *every* step to succeed, but the defender only needs to **break one link**. A related and more detailed catalogue is **MITRE ATT&CK**, a free knowledge base that lists real attacker techniques, which defenders use to check whether they could detect each one.

## Incident response

When an alert turns out to be real, the team switches to **incident response (IR)**. Organisations follow a standard cycle so that nobody has to improvise:

```diagram
  1. Prepare  ->  2. Detect &  ->  3. Contain  ->  4. Eradicate  ->  5. Recover
     (plans,         analyse         (stop it          (remove the        (restore,
      tools,         (what is        spreading)         cause)             check clean)
      training)      this?)                                                  |
         ^                                                                   v
         +-------------------  6. Learn (review, improve)  <----------------+
```

1. **Prepare.** Plans, contact lists, tested backups and trained people, *before* anything happens.
2. **Detect and analyse.** Confirm it is real, work out what is affected, how bad it is and how it got in.
3. **Contain.** Stop it spreading, for example by isolating a machine, disabling an account or blocking an address. The aim is to limit damage *without destroying evidence*.
4. **Eradicate.** Remove the cause: the malware, the bad accounts, the weakness that let it in.
5. **Recover.** Restore systems from clean backups, and watch carefully to make sure the attacker has really gone.
6. **Learn.** A **post-incident review** asks what went well, what did not, and what to change. This step is what makes the team better next time.

### Scenario: ransomware on a PC

A colleague phones: their PC shows a message saying their files are encrypted and demanding payment.

* **First:** isolate it. Unplug the network cable or turn off Wi-Fi, but leave the PC **switched on** (the memory may hold useful evidence). Do **not** pay, delete anything, or restart it.
* **Report** immediately to the incident team, with the time and what the user was doing.
* **Investigate:** how did it get in? Often a phishing attachment. Which other machines are affected?
* **Eradicate and recover:** wipe and rebuild the PC, and restore the files from a clean **offline backup**.
* **Learn:** improve email filtering and training, and check that backups work.

Paying a ransom funds criminals, gives no guarantee of getting data back, and may mark the organisation as a target to be attacked again. The best protection is good, **tested, offline backups**.

### Communication matters

Incident response is as much about people as technology. Keep **clear notes** with times. Tell the right people at the right time: managers, legal, sometimes the regulator (data breaches may need reporting to the ICO within 72 hours) and customers. Use plain language. Say what you know, what you do not know, and what you are doing next. And look after the team: a long incident is tiring, and tired people make mistakes.

## Making attacks harder: controls

Security measures (called **controls**) come in three types:

| Type | Purpose | Examples |
|---|---|---|
| **Preventive** | Stop it happening | Firewalls, MFA, patching, least privilege, locked doors, training |
| **Detective** | Notice it happening | Alerts, log monitoring, intrusion detection, CCTV |
| **Corrective** | Fix things afterwards | Restoring backups, reinstalling, applying a patch, incident response |

No single control is enough, so organisations combine them in **layers**, which is called **defence in depth**. If an attacker gets past one layer, another is waiting. Here are the most effective ones:

* **Multi-factor authentication (MFA)** on every account that supports it, especially email, admin and remote access.
* **Patching:** install security updates promptly. Many successful attacks use flaws for which a fix was already available.
* **Backups** that are tested and stored offline or out of reach. The **3-2-1 rule** is a good guide: three copies, on two different types of storage, with one kept off-site.
* **Least privilege:** people and programs get only the access they need.
* **Segmentation:** keep the network in separate zones, so trouble in one does not spread.
* **Secure configuration:** remove what you do not need, change defaults, turn off unused services.
* **Monitoring and logging,** with someone actually looking at the alerts.
* **Training:** people who know how to spot phishing, and who feel safe reporting mistakes.

### Passwords: what is good advice today?

Security guidance has changed. The UK's NCSC advises: use **long passwords**, such as three random words, instead of complex short ones; **block common passwords** that attackers try first; do **not force frequent changes** (people respond with weak patterns), but **do change** a password if you suspect it has leaked; offer **MFA**; and use a **password manager**. Bad practice includes allowing unlimited login attempts, storing passwords in plain text, and emailing passwords to users.

## Skills and careers

SOC analyst is one of the most common first jobs in cyber. Typical skills include networking and Linux basics, reading logs, understanding common attacks, clear writing, and staying calm under pressure. People often arrive through an apprenticeship, a college course, or from IT support, and many later move into incident response, threat hunting, penetration testing or security engineering. Useful certificates for beginners include **CompTIA Security+** and **CySA+**, and hands-on, practical ones from learning platforms. Shift work is common in a 24-hour SOC, and curiosity and good communication matter as much as technical skills.

## How to practise

* **TryHackMe** has a SOC-focused learning path, with safe, simulated investigations.
* **CyberDefenders** and **Blue Team Labs Online** offer free blue-team challenges with real-style logs and captures.
* **Build a home lab,** install a free SIEM such as Wazuh, and watch the logs of your own machines.
* **Take part in CTFs** with defensive challenges, like CyberQuest.

## What to do next

Try the **SOC Analyst** challenges in CyberQuest: triage alerts, read the logs to find the attacker, and make the decisions an incident responder has to make. It uses the same ideas you have just read about, with fictional data. If you have already read the lessons on networking and Linux, you have a great foundation.

```quiz
Q: Which part of the CIA triad does ransomware that locks every file mainly attack?
- Confidentiality
- Integrity
+ Availability
- Authentication
? Ransomware stops the owner from using their own data, so it attacks availability. (It may attack confidentiality too if the attackers also steal the data.)

Q: What is a false positive?
- A real attack that was missed
+ An alert that looks suspicious but turns out to be harmless
- A successful attack
- A broken firewall
? False positives waste analysts' time. Too many cause alert fatigue, which risks missing real threats.

Q: A SIEM is used to:
- Block all traffic
+ Collect and search logs from many systems, and raise alerts
- Encrypt backups
- Replace antivirus
? A Security Information and Event Management system gathers logs, correlates events and alerts analysts.

Q: Five alerts arrive at once. Which should be handled first?
- A user visiting a blocked social media site
- An out-of-date program on a test machine
+ Ransomware encrypting the main file server right now
- A single failed login on a workstation
? Damage in progress to a critical system beats lower-impact or possible problems.

Q: A log shows many failed logins for different usernames from one external address, then an Accepted line from the same address. What does it suggest?
- A forgotten password
+ A brute-force attack that succeeded
- A normal login
- A failed attack
? Many guesses from one source followed by a success is the pattern of a password-guessing attack that worked.

Q: In a web log, one visitor makes dozens of requests that return 404. What are they probably doing?
- Using the site normally
+ Scanning for hidden or sensitive pages
- Uploading files
- Checking their email
? A normal visitor rarely requests many pages that do not exist. The pattern suggests probing.

Q: Which is the correct order of the early stages of incident response?
- Recover, contain, prepare, detect
+ Prepare, detect and analyse, contain, eradicate, recover, learn
- Contain, prepare, learn, detect
- Detect, recover, learn, prepare
? Planning comes first, then detection, then stopping the spread, removing the cause, restoring, and finally learning from the incident.

Q: A PC shows a ransom note. What should you do first?
- Pay quickly
+ Isolate it from the network (leave it on) and report it
- Delete the note
- Restart it
? Isolation stops the spread. Switching off or restarting can destroy memory evidence and may make things worse. Report straight away.

Q: Which is a corrective control?
- A firewall
- Multi-factor authentication
+ Restoring from a clean backup
- CCTV
? Corrective controls fix problems after they occur. Firewalls and MFA are preventive, and CCTV is detective.

Q: What does the 3-2-1 backup rule suggest?
- Three passwords, two users, one admin
+ Three copies of data, on two types of storage, with one copy kept off-site
- Three backups per year
- One backup, kept in three places at once
? Spreading copies across different storage and locations means one failure, or a ransomware infection, cannot destroy every copy.
```

```glossary
Blue team :: The defenders who protect systems, detect attacks and respond to them.
SOC :: Security Operations Centre: a team that monitors an organisation's systems and responds to threats.
CIA triad :: The three goals of security: confidentiality, integrity and availability.
SIEM :: Security Information and Event Management: a system that collects and analyses logs and raises alerts.
IDS / IPS :: Intrusion Detection System (alerts) and Intrusion Prevention System (alerts and blocks).
EDR :: Endpoint Detection and Response: software that watches computers for suspicious behaviour.
Alert :: A warning from a security tool that something may be wrong.
True positive :: An alert that correctly identifies a real problem.
False positive :: An alert that flags something harmless.
Alert fatigue :: When too many alerts make analysts miss the important ones.
Triage :: Sorting alerts by seriousness and likelihood so the most important are handled first.
Playbook :: A step-by-step procedure for handling a type of alert or incident.
Brute force :: Trying a large number of passwords or keys until one works.
Persistence :: A method an attacker uses to keep access after a restart or logout.
Indicator of compromise :: A clue that a system may have been breached.
Cyber kill chain :: A model of an attack as a series of stages from research to achieving the goal.
MITRE ATT&CK :: A public catalogue of real attacker techniques, used to check defences.
Incident response :: The organised process of dealing with a security incident.
Containment :: Stopping an incident from spreading.
Eradication :: Removing the cause of an incident, such as malware or a bad account.
Ransomware :: Malware that encrypts files and demands payment to restore them.
Defence in depth :: Using several layers of protection.
Segmentation :: Dividing a network into separate zones to limit the spread of an attack.
```

```further
TryHackMe: SOC Level 1 path | https://tryhackme.com/ | Guided, safe investigations for aspiring analysts. Free to start.
CyberDefenders | https://cyberdefenders.org/ | Free blue-team challenges and labs with real-style evidence.
Blue Team Labs Online | https://blueteamlabs.online/ | Hands-on defensive challenges and investigations.
MITRE ATT&CK | https://attack.mitre.org/ | The free catalogue of attacker techniques, used by defenders worldwide.
NCSC: Small Business Guide and 10 Steps | https://www.ncsc.gov.uk/ | Practical, plain-English guidance from the UK's National Cyber Security Centre.
```
