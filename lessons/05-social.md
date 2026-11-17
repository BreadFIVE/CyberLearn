---
id: social
title: Social Engineering: Hacking People
order: 5
icon: 🎭
accent: #ff8fb1
summary: Why attackers target people instead of machines, the tricks they use, and the habits that stop them.
level: Beginner
quest: social
---

## The easiest way in

Imagine you want to break into a building. You could spend weeks studying the locks and the alarm. Or you could put on a high-visibility jacket, carry a box, smile, and ask someone to hold the door. Which is faster?

**Social engineering** is the art of manipulating people into giving away information or access, rather than breaking technology. It works because people are helpful, trusting, busy and polite, and attackers know it. A great many real breaches begin not with clever code but with a convincing message or phone call. Technology can have strong locks, but it still has people in it.

By the end of this lesson you will be able to name the main types of social engineering attack, explain the psychological tricks they use, analyse a suspicious message, and describe the habits that protect you and the organisations you will work for.

> **Key idea:** Being fooled is **not** a sign of being stupid. These attacks are designed by professionals to work on normal, intelligent people, especially when they are tired, rushed or worried. The aim of this lesson is not to make you paranoid. It is to give you a calm, repeatable way to check.

## The attacker's playbook

Most social engineering attacks follow the same four steps:

1. **Research.** The attacker learns about the target: job titles, colleagues, the software used, who the boss is, even holiday dates. Much of this is public. (This step uses open-source intelligence, which is covered in its own lesson.)
2. **Hook.** They contact the target with a believable story, called a **pretext**: "I am from IT support", "I am your manager", "your parcel could not be delivered".
3. **Play.** They use a psychological lever to get the victim to act before thinking: click, share, pay, or open a door.
4. **Exit.** They take what they need and disappear, often leaving the victim unaware that anything happened.

## Why it works: the psychology

Researchers, notably Robert Cialdini, have described several powerful forces that influence how people decide. Attackers use them deliberately.

| Lever | How people respond | Attacker's line |
|---|---|---|
| **Authority** | We obey people who seem to be in charge | "This is the CEO. I need this done now." |
| **Urgency** | Pressure stops us thinking | "Your account will be closed in 30 minutes." |
| **Fear** | We act to avoid harm | "Suspicious activity detected on your account." |
| **Liking** | We help people we like or who are like us | Friendly chat, shared interests, a compliment |
| **Reciprocity** | We feel we owe a favour | "I helped you out, so can you help me?" |
| **Social proof** | We follow what others do | "Everyone in your team has already done this." |
| **Scarcity** | We hurry for rare things | "Only three left. Offer ends tonight." |
| **Curiosity or greed** | We want to know, or we want a prize | "You have won", "See who viewed your profile" |

Learn to spot the feeling. If a message is making you **rushed, scared or excited**, that is a signal to slow down. Real organisations almost never need you to act within minutes.

## The main types of attack

### Phishing and its relatives

**Phishing** is a fraudulent message, usually email, that pretends to come from a trusted source and tries to get you to click a link, open an attachment or hand over details. The name is a pun on fishing: the sender casts a wide net.

| Type | What it is |
|---|---|
| **Phishing** | A bulk message sent to many people, hoping a few will respond |
| **Spear phishing** | A message made for **one** person or company, using real details about them. Much more convincing |
| **Whaling** | Spear phishing aimed at senior people, such as directors or finance chiefs |
| **Smishing** | Phishing by SMS or messaging apps ("Your parcel is held, pay a fee") |
| **Vishing** | Phishing by voice call ("This is your bank's fraud team") |
| **Quishing** | Phishing with a malicious QR code, often stuck over a real one |
| **Business email compromise (BEC)** | An attacker impersonates a boss or supplier to trick staff into paying money or changing bank details |

### Pretexting

**Pretexting** means inventing a believable scenario to extract information. A caller who says they are from the IT help desk and need you to "verify" your password is pretexting. A good pretext includes small true details, such as a real manager's name or a real system, to build trust.

### Baiting

**Baiting** offers something tempting. The classic example is leaving a USB drive labelled "Salaries" in a car park, hoping someone plugs it in. The drive may be set up to install malware. Online, "free" software or films often play the same role.

### Physical attacks

* **Tailgating** (or piggybacking) means following an authorised person through a secure door. Most people will hold a door open for someone carrying a heavy box.
* **Shoulder surfing** means watching someone type a password or PIN, or read a screen.
* **Dumpster diving** means searching bins for documents, notes or devices with useful information. This is why sensitive paper is shredded.
* **Impersonation** means posing as a cleaner, delivery driver, engineer or auditor to be let in.

## Worked example: analysing a suspicious email

Read this message as if it landed in your inbox:

```
From: Halcyon Bank Security <alerts@halcyonbank-secure.example>
To: you@mail.example
Subject: URGENT: Your account will be suspended

Dear Customer,

We detected unusual activity on your account. To avoid permanent
suspension within 24 hours, you must verify your identity now:

   https://halcyonbank.example.verify-login.example/secure

Failure to act will result in loss of access.
Halcyon Bank Security Team
```

Work through it with the checklist below.

**1. Who is it from?** The real bank's domain is `halcyonbank.example`. This message comes from `halcyonbank-secure.example`, a **lookalike**. Attackers register names that look right at a glance. Always read the part of the address after the `@`.

**2. How does it greet you?** "Dear Customer" is generic. A real bank that knows you usually uses your name. (But careful: spear phishing *will* use your name, so a personal greeting does not prove it is real.)

**3. What is the pressure?** "Within 24 hours", "permanent suspension", "loss of access". This is urgency and fear working together.

**4. Where does the link really go?** Hover your mouse over a link (without clicking) to see its true destination. Read the domain from the **right**, just before the first single slash. In the link above, the real domain is `verify-login.example`. The words `halcyonbank.example` at the start are only a **subdomain** put there to fool you.

**5. What does it want?** It wants you to log in on a page the attacker controls. The page will look exactly like the bank's, and will capture whatever you type.

> **Tip:** Do not use links in the message at all. Open your bank's app, or type the address yourself, and check whether there is any real alert. Verify through a **different channel** from the one the message arrived on.

### Spotting the warning signs

* The sender's domain is slightly off, or does not match the organisation.
* Urgency, threats or an offer that seems too good.
* A request for passwords, codes, payment or personal details. Real organisations do not ask for passwords by email or phone.
* A link whose real address differs from the text shown.
* Unexpected attachments, especially `.exe`, `.zip` or "enable macros" documents.
* A message from someone you know, but out of character or from a new address.

A note on spelling mistakes: they used to be a giveaway, but AI tools now write fluent, convincing messages in any language. **Do not rely on bad grammar to spot a scam.** Check the sender, the link and the request instead.

## Voice calls and fake voices

**Vishing** works because a phone call feels personal and puts you on the spot. A caller may spoof the number so it appears to be your bank or your workplace, because caller ID is easy to fake. A typical script: the caller claims there has been fraud, reads out a few real-sounding details, and then asks you to "confirm" a one-time code or move money to a "safe account". The one-time code they ask for is the one your bank just texted you, because the caller is trying to log in as you at that moment.

> **Remember:** Your bank will never ask you to move money to a "safe account", and will never ask for your full PIN, password or a one-time code. If you are unsure, hang up and call the number on the back of your card, from a different phone if you can.

New tools can also **clone a voice** from a few seconds of audio, or generate a realistic fake video. Criminals have used cloned voices to pose as relatives in trouble. A sensible defence for families and teams is a pre-agreed **code word**, and a rule: *for any unusual request for money or access, confirm by a second route, however convincing the voice sounds.*

## Real-world examples

* **A recruitment spreadsheet (2011).** The security company RSA was breached after an employee opened an email attachment called "2011 Recruitment plan". It was a spear-phishing message and the attachment contained a hidden exploit. One small mistake opened the door to a very large company.
* **A phone call to staff (2020).** Attackers took over high-profile Twitter accounts after phoning employees, pretending to be IT support, and persuading them to enter credentials on a fake internal page.
* **Fake invoices (2013 to 2015).** A fraudster posed as a hardware supplier and sent convincing invoices to two of the world's largest technology companies, which together paid out over a hundred million dollars before it was discovered.

In each case no password was cracked and no firewall was beaten. A person was convinced.

## Defending against it

### What you can do

1. **Pause.** If something feels urgent or emotional, stop for a minute. Urgency is the attacker's best friend.
2. **Verify through a second channel.** Call the person on a number you already know. Use the official app or website you typed yourself.
3. **Check, don't click.** Look at the sender's real address and hover over links.
4. **Protect your accounts.** Use a **password manager** and **multi-factor authentication (MFA)**. Even if you hand over a password, MFA gives you a second barrier.
5. **Be careful what you share.** Social media posts about your school, job, friends and plans give attackers material for convincing stories.
6. **Report it.** Forward suspicious emails to your IT team, or in the UK to the NCSC at **report@phishing.gov.uk**, and forward scam texts to **7726**. Reporting protects others.

### What organisations do

* **Training and simulations,** done kindly, so people learn without being shamed.
* **A no-blame reporting culture.** The most important thing is that people report mistakes *quickly*. If staff fear punishment, they hide it, and the attacker has more time.
* **Technical controls.** Email filtering, and email authentication standards (**SPF, DKIM and DMARC**) that make it harder to fake a company's domain. MFA on every account.
* **Verification procedures.** For example, any change to bank details must be confirmed by phoning a known number, and large payments need two people to approve.
* **Physical security.** Visitor badges, escorting visitors, a polite rule that nobody is let in without a badge, and shredding sensitive paper.

### If you think you have been caught

Do not feel embarrassed. Act quickly:

1. **Tell someone straight away** (your IT team, your bank, a trusted adult). Speed limits the damage.
2. **Change the password** on the affected account, from a device you trust, and anywhere you reused it.
3. **Turn on MFA** if it was not already on.
4. **Check for signs of misuse:** unfamiliar logins, forwarding rules in your email, strange messages sent from your account.
5. **If you paid money,** contact your bank at once. If a device was infected, disconnect it from the network and ask for help.

## What to do next

Try the **Human Firewall** challenges. You will judge real-looking emails and texts, play out phone-call scenarios and make the decisions an employee has to make. Then try the **OSINT** lesson to see how attackers gather the information that makes their stories convincing.

```quiz
Q: What is social engineering?
- Writing software for social media
+ Manipulating people into giving up information or access
- Building computer networks in a school
- A type of encryption
? Social engineering targets people rather than technology.

Q: A message is sent to thousands of people hoping a few respond. What is this called?
- Spear phishing
- Whaling
+ Phishing
- Pretexting
? Bulk, untargeted messages are plain phishing. Spear phishing is aimed at one person or organisation, and whaling at senior targets.

Q: What is smishing?
- Phishing by phone call
+ Phishing by text message
- Phishing by QR code
- Phishing by USB drive
? Smishing is SMS phishing. Vishing is by voice call.

Q: Which of these is the strongest warning sign?
- The email has a company logo
+ A demand to act within hours or lose your account, with a link to log in
- The email was sent during the day
- The email is long
? Urgency and threats, combined with a request to log in through a link, are classic signs. Logos are easy to copy.

Q: Where is the real domain in https://halcyonbank.example.verify-login.example/secure ?
- halcyonbank.example
+ verify-login.example
- secure
- The whole address is the domain
? Read from the right, up to the first single slash. The words at the start are only a subdomain placed to fool you.

Q: Someone you do not know follows you through a secure door by carrying a heavy box. What is this?
+ Tailgating
- Vishing
- Baiting
- Smishing
? Tailgating (or piggybacking) is following an authorised person through a door without proving who you are.

Q: A caller says they are your bank and asks you to read out the one-time code just texted to you. What should you do?
- Read it out, because they are the bank
+ Hang up and call the number on the back of your card
- Give half of the code
- Ask them to text it again
? Banks never ask for one-time codes. The caller is probably logging in as you right now. Hang up and phone a number you know is genuine.

Q: Why is it no longer safe to rely on spelling mistakes to spot a scam?
- Scammers have stopped using email
+ AI tools write fluent, convincing messages
- Spelling mistakes are never found in real emails
- Spell-checkers remove all errors from emails
? Checking the sender, the link and what the message asks for is more reliable than hunting for typos.

Q: Which habit most reduces the damage if you do hand over a password?
- Using the same password everywhere
+ Multi-factor authentication
- Deleting your email
- Writing passwords on a sticky note
? A second factor means the stolen password alone is not enough to get in.

Q: Why do organisations want a no-blame culture for reporting phishing?
- Because mistakes do not matter
+ So people report quickly instead of hiding it, which limits the damage
- So that nobody has to be trained
- So the IT team has less work
? Speed is everything in an incident. If people fear being punished they stay quiet, and the attacker has more time.
```

```glossary
Social engineering :: Manipulating people into giving information or access.
Pretext :: A made-up scenario used to make a request seem believable.
Phishing :: A fraudulent message that pretends to be from a trusted source to get you to click, open or reveal something.
Spear phishing :: Phishing aimed at one specific person or organisation, using real details about them.
Whaling :: Spear phishing aimed at senior people.
Smishing :: Phishing by SMS or messaging apps.
Vishing :: Phishing by voice call.
Quishing :: Phishing that uses a malicious QR code.
Business email compromise :: Impersonating a boss or supplier by email to get staff to pay money or change bank details.
Pretexting :: Inventing a believable scenario to extract information.
Baiting :: Offering something tempting, such as a USB drive or free download, to deliver malware.
Tailgating :: Following an authorised person through a secure door.
Shoulder surfing :: Watching someone enter a password or read a screen.
Lookalike domain :: A web or email address that closely resembles a real one.
Subdomain :: A prefix on a web address, such as the word before the main domain.
Multi-factor authentication :: Logging in with more than one proof of identity, such as a password and a code.
Password manager :: A tool that stores a different strong password for every account.
SPF, DKIM and DMARC :: Email standards that help receivers check that a message really came from the domain it claims.
Deepfake :: A fake image, audio or video made with AI to look or sound real.
Social proof :: The pull of doing what other people seem to be doing.
```

```further
NCSC: Phishing guidance | https://www.ncsc.gov.uk/collection/phishing-scams | UK government advice on spotting and reporting phishing and scam messages.
Action Fraud | https://www.actionfraud.police.uk/ | The UK's national reporting centre for fraud and cybercrime.
Google Phishing Quiz | https://phishingquiz.withgoogle.com/ | A free quiz that tests your ability to spot phishing emails.
Have I Been Pwned | https://haveibeenpwned.com/ | Check whether your email address appeared in a known data breach.
TryHackMe | https://tryhackme.com/ | Guided rooms on phishing and social engineering. Free to start.
```
