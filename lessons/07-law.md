---
id: law
title: Law, Ethics and Privacy
order: 7
icon: ⚖️
accent: #ff6b6b
summary: Where the legal and ethical line sits in cyber security, why permission is everything, and how to build skills without breaking the law.
level: Beginner
---

## Curiosity is great. Crime is not.

If you enjoy puzzles, computers and working out how things fit together, cyber security is a brilliant field to be in. It is also a field where a single moment of curiosity can turn into a criminal record. Every year, young people are arrested, not because they set out to cause harm, but because they "just wanted to see if they could". Some of those cases ended careers before they began.

This lesson is the one that keeps you safe. It covers what the law says in the UK, how professionals get permission to test systems, how personal data is protected, and how to practise your skills legally. Everything here is general information to help you understand the idea, not legal advice about a real situation.

> **Key idea:** In cyber security, the difference between a professional and a criminal is often **permission**. The same actions, such as scanning a network or testing a login, can be a well-paid job or a crime depending on whether the owner agreed to it **beforehand and in writing**.

## The Computer Misuse Act 1990

The main UK law is the **Computer Misuse Act 1990** (CMA). It was written when the internet was young, and it has been updated since. It creates several offences. In plain language:

| Section | Offence | Example | Maximum prison sentence |
|---|---|---|---|
| **1** | Unauthorised **access** to a computer or its data | Logging in to someone's account without permission, guessing a password, using a shared login you were not meant to use | Up to 2 years |
| **2** | Unauthorised access **with intent** to commit or help another crime | Getting into a system to steal money or data | Up to 5 years |
| **3** | Unauthorised **acts** that impair a computer or its data | Spreading malware, deleting files, launching a denial-of-service attack | Up to 10 years |
| **3ZA** | Unauthorised acts causing, or risking, **serious damage** (for example to health, the economy or national security) | An attack on critical services | Up to 14 years, or life where it causes or risks serious damage to human welfare or national security |
| **3A** | **Making, supplying or obtaining** tools for use in these offences | Writing or selling malware, or tools designed to commit them | Up to 2 years |

There are a few things to notice.

* **You do not have to cause damage.** Section 1 is about *access*. Looking around a system you have no permission to enter can be an offence even if you touch nothing.
* **You do not have to be good at it.** Using a password you were never given, or one someone left lying around, still counts as unauthorised access.
* **"I was only testing" is not a defence.** Neither is "their security was weak". A door left unlocked does not give you permission to walk in.
* **"Unauthorised" means without the permission of the person entitled to give it.** That is why authorisation is the heart of all professional security work.
* **The law does not have a special exception for "ethical hackers".** Researchers are protected only by the permission they have been given. (This is a known problem, and people have argued for a legal defence for good-faith research, but for now, permission is what protects you.)

> **Legal note:** Things that might feel like harmless fun are not. Using a "booter" or "stresser" service to knock a friend or a game server offline is a denial-of-service attack. Buying one is also an offence, and people have been prosecuted for it.

## Other laws that matter

| Law | Why it matters to security |
|---|---|
| **UK GDPR and Data Protection Act 2018** | Rules for handling personal data. Also makes it an offence to obtain personal data unlawfully. |
| **Fraud Act 2006** | Covers deception for gain, such as phishing and using stolen card details. |
| **Investigatory Powers Act 2016** | Intercepting other people's communications without lawful authority is an offence. This is why you must not "sniff" traffic on networks that are not yours. |
| **Copyright, Designs and Patents Act 1988** | Pirated software, and copying protected material, breaks copyright law. Cracked software is also a common way to catch malware. |
| **Malicious Communications and related online offences** | Threats, harassment and abusive messages are crimes, including when they come from "anonymous" accounts. |

Remember also that the internet crosses borders. A system in another country is covered by *that* country's laws as well, and many countries will co-operate with extradition and investigation. Terms of service are a separate matter: breaking a website's rules is not usually a crime in itself, but it can lead to bans or civil action.

## How professionals get permission

Ethical hackers, whose jobs are to test security, work within a clear framework. A **penetration test** is a security test carried out with the owner's agreement. Before any work starts, professionals have:

1. **A signed contract and written authorisation.** It names who agreed and who has the authority to agree. A manager at a small shop cannot authorise a test of a cloud provider's servers, for example.
2. **A defined scope.** This lists exactly what may be tested: which addresses, which systems, which techniques, and what is **off limits**. Anything not listed is out of scope, and touching it is unauthorised, even if it sits next to something that was in scope.
3. **Rules of engagement.** The dates and times, what to do if something goes wrong, how to avoid damage (for example, no tests that could crash a live system), and who to call.
4. **Confidentiality.** Anything seen during the test must be kept private and handled carefully.
5. **A report.** The aim is to help the organisation fix problems, not to show off.

> **Remember:** Scope is a legal boundary. If you are ever told "test this one server", the **neighbouring** server is not included. When in doubt, stop and ask. Asking costs a minute. A mistake can cost a career.

## Found something? Responsible disclosure

Sometimes you stumble on a security problem without looking for one, such as a page that shows other customers' details. What should you do?

**Coordinated** (or **responsible**) **disclosure** is the accepted approach:

1. **Stop.** Do not dig further to "prove" it. Do not download data. Looking around more can turn an honest discovery into an offence.
2. **Record only what you must,** such as the web address and a short description. Do not keep any personal data you came across.
3. **Report it privately** to the organisation. Many sites publish a `security.txt` file or a "report a vulnerability" page. In the UK the **National Cyber Security Centre (NCSC)** also has a route for reporting vulnerabilities.
4. **Give them time to fix it** before saying anything publicly.
5. **Never demand payment** or threaten to publish. That could be blackmail.

Some companies run **bug bounty programmes** that invite researchers to test their sites and pay for valid reports. These programmes publish strict rules about what is in scope and what is not, and many have age limits. If you read and follow the rules exactly, you have permission. If you step outside them, you do not.

## Data protection and privacy

Personal data is any information about an identifiable living person: a name, an address, a photo, an email address, an IP address, a health record, a location. In the UK, handling it is governed by **UK GDPR** and the **Data Protection Act 2018**, enforced by the **Information Commissioner's Office (ICO)**.

Organisations must follow seven key principles:

| Principle | In plain words |
|---|---|
| Lawfulness, fairness and transparency | Have a lawful reason, and be honest about what you do |
| Purpose limitation | Collect data for a clear purpose and do not reuse it for something unrelated |
| Data minimisation | Collect only what you need |
| Accuracy | Keep it correct and up to date |
| Storage limitation | Do not keep it longer than needed |
| Integrity and confidentiality | **Keep it secure.** This is where cyber security comes in |
| Accountability | Be able to show that you comply |

People have **rights** over their data, including the right to see what an organisation holds, to have errors corrected, and, in many cases, to have it deleted.

If a breach happens, such as stolen data or an exposed database, the organisation may have to tell the ICO within **72 hours** of becoming aware, and sometimes tell the people affected too. Serious failures can lead to fines of up to **£17.5 million or 4% of annual worldwide turnover**, whichever is higher. This is one reason companies invest in security: it is not just good practice, it is the law.

As an individual, you have a stake as well. Your data is protected, and you have a responsibility not to misuse other people's. That means: do not collect information about private individuals without a good reason, do not share screenshots of other people's private messages or details, and do not keep data you do not need.

## Ethics: beyond what is legal

Law sets the minimum. **Ethics** asks what is *right*. Some things are legal but still wrong, and professionals hold themselves to a higher standard. Common ideas in security ethics:

* **Do no harm.** Think about who could be affected by what you do, including people who are not your target.
* **Act with consent.** Respect people's right to control access to their systems and information.
* **Be proportionate.** Use the least intrusive method that does the job.
* **Be honest.** Report what you found truthfully, including your mistakes.
* **Protect confidentiality.** Treat anything you learn through your work as private.
* **Take responsibility.** If something goes wrong, say so promptly.

Professional bodies publish codes of ethics, including **ISC2**, **CREST** and the **BCS (The Chartered Institute for IT)**. They share the same themes: protect people and society, act honourably, and do a diligent job.

You may hear the terms **white hat**, **black hat** and **grey hat**. A **white hat** works with permission to improve security. A **black hat** breaks in for personal gain or to cause harm. A **grey hat** sits in between, often finding problems without permission and then reporting them. Grey hats may mean well, but acting without permission is still against the law, and good intentions are not a legal defence. The safest, most respected path is to be a white hat from the start.

## Where is the line? Some situations

| Situation | Is it OK? |
|---|---|
| Testing a vulnerable app that you installed on your own computer for practice | **Yes.** It is yours. |
| Using a platform's practice rooms and challenges | **Yes,** within their rules. They exist for this. |
| Running a port scan on your school's network "just to look" | **No.** You need written permission. |
| Guessing passwords for a friend's account "as a joke" | **No.** That is unauthorised access. |
| Finding a classmate's logged-in laptop and reading their messages | **No.** Unauthorised access, and a privacy invasion. |
| Reporting a flaw you accidentally found, without exploring further | **Yes.** Report it using the proper route. |
| Looking up a person's public posts to build a profile of them | **Take care.** It may be harassment or a data protection problem. |
| Testing a bug bounty site's in-scope pages according to its rules | **Yes,** if you stay within scope. |
| Downloading "cracked" software or a hacking tool from a random site | **Risky.** It is often malware. |

A useful test before any action: **"Is it mine, or do I have written permission? Is it in scope? Could it harm anyone? Would I be comfortable explaining it to the owner?"** If any answer is "no" or "not sure", stop.

## Real consequences

A conviction under the Computer Misuse Act can bring prison or a youth sentence, and also lasting effects: a **criminal record** can affect university places, job offers and visas, and can prevent you from getting the **security clearance** needed for many cyber jobs. Equipment is seized, and families are affected. The sad part is that the skills that get young people into trouble are exactly the ones that employers pay well for, if they are used legally.

The UK's National Crime Agency runs a programme called **Cyber Choices** that helps young people who are interested in hacking to use their skills legally, and explains the risks of crossing the line. It is worth a read.

## How to build skills legally

The good news is that there are plenty of legal, exciting ways to learn and compete:

* **Capture the Flag (CTF) competitions.** Puzzle-based contests with fake targets. CyberQuest is a CTF.
* **Learning platforms** such as **TryHackMe** and **Hack The Box**, with safe, legal, simulated environments.
* **Your own lab.** Install virtual machines on your own computer and attack *those*. Deliberately vulnerable apps are made for this.
* **Competitions and programmes** such as the **Cyber Security Challenge UK** and the NCSC's **CyberFirst** schemes.
* **Clubs and communities** at school and college, and local meet-ups for security enthusiasts.
* **Bug bounty programmes,** when you are old enough and read the rules.
* **Qualifications and apprenticeships** that lead to a career: T-levels in digital subjects, and many cyber security apprenticeships.

## What to do next

Take a few minutes to try the quiz, and keep the checklist from this lesson handy. When you try the **Red Team Lab** in CyberQuest, notice how the challenges start with *scope and permission* before any technical step. That is not a coincidence: it is how the real job works.

```quiz
Q: Which UK law is mainly concerned with unauthorised access to computers?
- The Fraud Act 2006
+ The Computer Misuse Act 1990
- The Copyright, Designs and Patents Act 1988
- The Investigatory Powers Act 2016
? The CMA 1990 makes unauthorised access, and acts that impair computers, criminal offences.

Q: You log in to a friend's account using their password, without them knowing, "just to see". What is this?
- Legal, because you knew the password
+ Unauthorised access, an offence under the Computer Misuse Act
- A form of penetration testing
- Allowed if you do not change anything
? Section 1 is about access without permission. You do not need to cause damage or be a skilled hacker for it to apply.

Q: What do professionals have before they begin a penetration test?
- A guess about what is allowed
+ Written authorisation and an agreed scope
- A verbal OK from any employee
- Nothing, because they are trained
? Written permission from someone with the authority to give it, and a clear list of what is in scope, is what makes testing legal.

Q: A server is next to the one you are authorised to test. It is not on the scope list. What should you do?
- Test it too, as it is probably fine
+ Leave it alone, because anything out of scope is unauthorised
- Test it quickly and say nothing
- Test it only at night
? Scope is a legal boundary. Out-of-scope systems are not covered by your permission.

Q: You stumble across a page that exposes other customers' details. What is the best response?
- Download everything as proof
+ Stop, record only the basics, and report it privately through the proper route
- Post it on social media
- Ask the company for money to keep quiet
? Coordinated disclosure means not digging further, keeping no personal data and reporting responsibly. Demanding payment could be blackmail.

Q: What is a bug bounty programme?
- A scheme to buy stolen data
+ A scheme where an organisation invites researchers to test defined systems and rewards valid reports
- A game that rewards the fastest attack
- A government fine
? Bug bounties publish rules and a scope. Staying within them gives you permission.

Q: Which UK law protects personal data and is enforced by the ICO?
- The Computer Misuse Act
+ UK GDPR and the Data Protection Act 2018
- The Fraud Act
- The Official Secrets Act
? These laws set the rules on how personal data must be handled and secured.

Q: Under UK GDPR, within what time must many serious data breaches be reported to the ICO?
- 7 days
- 30 days
+ 72 hours
- 6 months
? Organisations must report breaches that risk people's rights within 72 hours of becoming aware of them.

Q: What is the difference between legal and ethical?
- They are the same thing
+ Law is the minimum standard; ethics asks what is right, and some legal acts can still be wrong
- Ethics only applies to doctors
- Ethics is only for hackers
? Professionals aim for more than staying legal. They consider harm, consent and honesty too.

Q: Which is a legal way to practise hacking skills?
- Scanning a local business's website
+ Using a learning platform's practice rooms, or attacking a practice app on your own computer
- Testing your school's network without telling anyone
- Using a stresser service on a game server
? Practice platforms and your own lab exist for this. Everything else requires the owner's permission.
```

```glossary
Computer Misuse Act 1990 :: The main UK law against unauthorised access to computers and damaging acts against them.
Unauthorised access :: Getting into a system or its data without the permission of the person entitled to give it.
Authorisation :: Permission, ideally in writing, from someone with the authority to give it.
Scope :: The exact list of systems and actions that a test is allowed to cover.
Rules of engagement :: The agreed rules for a test: times, methods, limits and contacts.
Penetration test :: A security test carried out with the owner's permission to find weaknesses.
Ethical hacker :: A security professional who works with permission to find and help fix weaknesses.
White hat :: A hacker who works with permission to improve security.
Black hat :: A hacker who breaks in for personal gain or to cause harm.
Grey hat :: A hacker who acts without permission but with no harmful aim, which is still unlawful.
Responsible disclosure :: Reporting a security problem privately and giving the owner time to fix it.
Bug bounty :: A programme that pays researchers for valid reports of flaws in defined systems.
Denial of service :: Overloading a system so that real users cannot use it.
Personal data :: Information about an identifiable living person, such as a name, address or photo.
UK GDPR :: The UK's data protection regulation, working alongside the Data Protection Act 2018.
ICO :: The Information Commissioner's Office, which regulates data protection in the UK.
Data minimisation :: Collecting only the personal data you actually need.
Data breach :: When personal data is lost, stolen or exposed.
Capture the Flag :: A puzzle-based security contest using safe, fictional targets.
Security clearance :: A background check needed for some sensitive jobs, which a criminal record can affect.
```

```further
NCA Cyber Choices | https://www.nationalcrimeagency.gov.uk/cyber-choices | National Crime Agency programme that helps young people use their cyber skills legally.
Computer Misuse Act 1990 (legislation.gov.uk) | https://www.legislation.gov.uk/ukpga/1990/18/contents | The text of the Act itself.
ICO: Information Commissioner's Office | https://ico.org.uk/ | The UK data protection regulator, with plain-English guidance.
NCSC CyberFirst | https://www.ncsc.gov.uk/cyberfirst/overview | Government programmes, courses and competitions for young people.
Cyber Security Challenge UK | https://cybersecuritychallenge.org.uk/ | UK competitions and events for people starting out in cyber.
TryHackMe | https://tryhackme.com/ | Safe, legal practice rooms. Free to start.
```
