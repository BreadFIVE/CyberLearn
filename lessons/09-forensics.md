---
id: forensics
title: Digital Forensics: Following the Evidence
order: 9
icon: 🕵️
accent: #38d6ff
summary: How investigators recover and prove what happened on a device or network, from file signatures and hidden data to email headers and timelines.
level: Beginner to Intermediate
quest: forensics
---

## Detectives for the digital world

Every time someone uses a computer, they leave traces: files, logs, history, timestamps, network records. **Digital forensics** is the discipline of finding those traces, preserving them carefully, and using them to work out **what happened, when, and who or what was responsible**. It is used by police to investigate crime, by companies to respond to a breach, and by courts to decide disputes.

Forensics is different from other areas of cyber security because it is as much about **being able to prove** something as about finding it. A clever discovery that cannot be shown to be reliable is worth very little. That is why careful method matters as much as technical skill.

By the end of this lesson you will be able to explain the core rules of handling evidence, identify a file by its signature rather than its name, explain how data can be hidden inside other files, read an email header, build a timeline from logs, and describe what network traffic can reveal.

> **Key idea:** **Do not change the evidence.** The first rule of forensics is that the investigator must never alter the original. Everything is done on **copies**, and every step is recorded, so that another expert could repeat it and get the same result.

## Handling evidence properly

Evidence that has been handled carelessly can be thrown out or doubted. UK police guidance on digital evidence rests on four principles, which are widely used by professionals:

1. **No action should change data** that may later be relied on in court.
2. If it is truly necessary to access original data, the person doing so must be **competent** and able to explain what they did and why.
3. An **audit trail** of every process applied to the evidence must be kept, so that an independent expert could repeat the work and get the same result.
4. The person in charge of the investigation is responsible for making sure these rules are followed.

### Imaging and hashing

To avoid touching the original, investigators make an exact, bit-for-bit copy of a drive, called a **forensic image**. They often connect the original through a **write blocker**, a device that lets data be read but never written, so nothing can change by accident.

They then prove the copy is identical using a **hash**. A hash function (covered in the cryptography lesson) produces a fingerprint of the data. If the hash of the image matches the hash of the original, the copy is exact. If even one bit differs, the hash is completely different. The hash is recorded at the start, and checked again later to show that nothing has been tampered with.

### Chain of custody

A **chain of custody** is the written record of who handled the evidence, when, where it was kept, and why. Each handover is signed. If there is a gap ("the laptop was on a desk for three days and nobody knows who touched it"), a defence lawyer can argue the evidence may have been altered.

### Order of volatility

Some evidence disappears quickly. Investigators collect the **most fragile** first:

| Most fragile (collect first) | |
|---|---|
| 1 | Memory (RAM) and running processes. Lost when power is removed |
| 2 | Network connections and the state of the system |
| 3 | Temporary files |
| 4 | Data on disk |
| 5 | Logs held elsewhere and backups. Most durable (collect last) |

This is also why the advice for a suspected infection is often to **isolate** the machine from the network but not to switch it off immediately: switching off destroys the memory.

## Files are not what their names say

A file's **extension** (the letters after the dot, such as `.jpg`) is only a label. Anyone can rename `malware.exe` to `holiday.jpg`. Forensics experts look at what a file really *is*.

Most file types begin with a short, fixed pattern of bytes, called a **file signature** or **magic number**. It tells programs what type of file it is. Here are some common ones, written in hexadecimal:

| File type | Starts with (hex) | Readable as |
|---|---|---|
| PNG image | `89 50 4E 47 0D 0A 1A 0A` | `.PNG` |
| JPEG image | `FF D8 FF` | (not readable text) |
| GIF image | `47 49 46 38` | `GIF8` |
| PDF document | `25 50 44 46` | `%PDF` |
| ZIP archive | `50 4B 03 04` | `PK..` |

> **Example:** An investigator is given a file called `holiday.jpg`. Opening it in a **hex viewer** shows it begins `50 4B 03 04`. That is the ZIP signature, not JPEG. The file is really a ZIP archive that has been disguised. (Note that modern Word, Excel and PowerPoint files, such as `.docx`, are also ZIP archives inside, so context matters.)

On Linux, the `file` command checks a file's real type for you, and tools like `xxd` or a hex editor show the raw bytes.

## Hidden data: steganography

**Cryptography** hides what a message *says*. **Steganography** hides the fact that a message *exists*. A secret can be tucked inside an innocent-looking picture, audio file or document. There are several simple methods you should know about.

* **Appended data.** A JPEG image ends with the bytes `FF D9`. Programs ignore anything after that point, so a hidden file, or a message, can simply be added to the end. The picture still opens normally. Inspecting a file's size and its end can reveal this.
* **Metadata.** Fields such as comments or author names can hold text that is never shown on screen.
* **Least significant bit (LSB).** Each pixel colour is a number, and the *last* bit makes only a tiny change to that colour, too small to see. By replacing the last bit of many pixels, a message can be hidden within a picture.

> **Example:** One pixel's red value is 200, which in binary is `11001000`. To hide the bit `1`, change the last bit: `11001001`, which is 201. The colour changes by one part in 256, which is invisible. Spread across thousands of pixels, it can store a whole message. Reading the last bit of each pixel in order gets the message back.

* **Hidden in plain sight.** Text in the same colour as the background, content in a document's hidden layer, or a file placed inside another.

Detecting steganography uses **statistics** (the numbers in the file do not look natural), file size checks, comparison with an original, and special tools. Often the strongest clue is simply that something does not add up: a small picture that is oddly large.

## Deleted does not mean gone

When you delete a file, the computer normally removes only its **entry** in the file index, and marks the space as free. The actual contents stay on the disk until something else overwrites them. Forensic tools can scan the free space for file signatures and **carve** deleted files back out. That is why people who need to wipe a drive for real use tools that **overwrite** it, or use disk **encryption** so the data is unreadable without the key.

## Email forensics: reading headers

Emails carry a hidden set of **headers** that record their journey. Each mail server that handles the message adds a `Received:` line at the **top**, so you read the route from the **bottom up** (oldest first).

```
Received: from mail.example.org (192.0.2.55) by mx.recipient.example; Mon, 2 Mar 2026 09:14:02 +0000
Received: from [10.1.1.7] (unknown 203.0.113.200) by mail.example.org; Mon, 2 Mar 2026 09:14:00 +0000
From: "Halcyon Bank" <support@halcyonbank.example>
Return-Path: <bounce@halcyonbank-support.example>
Authentication-Results: spf=fail; dkim=none; dmarc=fail
```

Reading it, an investigator asks: where did the message **really** start? (The lowest `Received` line, from `203.0.113.200`, not the bank.) Does the `From` address match the `Return-Path`? Here it does not. Did the authentication checks pass? **SPF** checks that the sending server is allowed to send for the domain, **DKIM** checks a digital signature, and **DMARC** says what to do if these fail. Failing all three is a strong sign of a forged email. Headers are easy to forge in places, so investigators trust the lines added by *their own* servers most.

## Logs and timelines

Computers keep **logs**: records of events such as logins, programs started, files opened and network connections. A **timeline** puts events from different sources in order, so the story emerges.

```
02:10:08  auth.log    Failed password for root from 203.0.113.50
   ...    (19 more failures over about 80 seconds)
02:14:37  auth.log    Accepted password for svc_backup from 203.0.113.50
02:14:59  auth.log    sudo: svc_backup ran: crontab -e
02:15:47  auth.log    session closed for user svc_backup
```

This tells a story: someone guessed at accounts, finally got into one, ran an administrative command, and left. A timeline raises more questions. What did the new scheduled job do? What else happened on this machine at 02:15?

Some tips about time:

* Check the **time zone**. Systems may use UTC, local time or something else. Comparing logs in different time zones leads to errors, so convert everything to one standard (UTC is usual).
* Check that clocks were **accurate**. A computer whose clock is wrong makes the timeline wrong.
* **Correlate** several sources. A log entry means more when a network record, a file timestamp and a user's report all agree.
* Use the **right words**: say "the log shows" and "this is consistent with", and keep what you can prove apart from what you suspect.

## Network forensics

When data crosses a network, it can be recorded in a **packet capture** (a file with the extension `.pcap`), and analysed with a tool such as **Wireshark**. Investigators can see:

* **Who talked to whom,** with which IP addresses and ports, and when.
* **What protocols** were used, and whether something unusual appeared, such as a computer talking to a strange address in another country at 3 a.m.
* **The content** of any traffic that was not encrypted. Old protocols like HTTP and FTP send everything, including passwords, in **plain text**, so a capture can reveal a username and password just as it is typed. This is a good reason to use **HTTPS** and **SSH** instead.
* **Patterns** that suggest attacks: floods of connection attempts, scanning, or regular "beacon" messages sent to a controlling server at fixed intervals.

Even if the content is encrypted, the **metadata** (who, when, how much) can tell an important story.

## Other places evidence hides

Investigators look at **artefacts**, the by-products of normal use:

* **Browser history,** downloads and cached pages.
* **Recently used files** and programs.
* **Connected devices:** records of USB drives that have been plugged in.
* **Photos' metadata:** time, device and sometimes location.
* **Cloud and messaging accounts,** with legal permission.
* **Memory:** passwords, running programs and network connections that are never saved to disk.

## Law and ethics

Forensic work involves private information, so it has strict rules. Investigators must have **legal authority**, such as a warrant, a court order, or an employer's policy and the user's agreement, before they examine a device. They look only at what is **relevant** and keep everything else confidential. And they are **impartial**: their job is to find out what the evidence shows, not to prove a theory. Looking at someone's phone or computer without permission could itself be an offence.

## Report writing

A forensic report should be clear to a non-expert, accurate and complete. It lists what was examined, the tools used, the steps taken, the findings with evidence and what the findings do and do not show. A good analyst says "I could not determine..." whenever that is true.

## What to do next

Try the **Digital Detectives** challenges, where you will identify disguised files, uncover hidden data, read headers and logs and follow a simulated network capture. All of it uses fictional evidence. When you finish, try the **SOC Analyst** lesson to see how defenders use logs and timelines while an attack is still happening.

```quiz
Q: What is the first rule of handling digital evidence?
- Open every file to see what it is
+ Do not change the original: work on copies and record every step
- Delete anything suspicious
- Switch the computer off immediately
? Altering the original can destroy evidence and make it inadmissible. Investigators work on forensic copies.

Q: How do investigators prove that a forensic copy is identical to the original?
- By comparing file sizes only
+ By comparing their hash values
- By renaming the files
- By checking the date they were made
? If the hashes match, the copy is bit-for-bit identical. A single changed bit would give a completely different hash.

Q: What is a chain of custody?
- A series of passwords
+ A written record of who handled the evidence, when and where it was stored
- A type of network cable
- A list of suspects
? Gaps in the chain let others argue the evidence might have been changed.

Q: Which should be collected first, because it is the most fragile?
- Backups
- A printed report
+ Memory (RAM) and running processes
- Files on a disk
? RAM is lost when power is removed, so the order of volatility says to capture it first.

Q: A file called holiday.jpg begins with the bytes 50 4B 03 04. What is it really?
- A JPEG image
+ A ZIP archive
- A PDF document
- A text file
? 50 4B 03 04 is the ZIP signature ("PK"). Extensions are only labels. The signature shows the real type.

Q: What is steganography?
- Encrypting a message so nobody can read it
+ Hiding the existence of a message inside something innocent, like a picture
- Compressing a file
- Deleting data safely
? Cryptography hides what a message says; steganography hides that a message exists.

Q: Why might a small, ordinary-looking JPEG be suspiciously large?
- JPEGs are always large
+ Extra data may have been appended after the end-of-image marker
- It was made on a fast computer
- It has a long file name
? Programs stop reading at the end of the image, so hidden data can sit after it. A file bigger than expected is a clue.

Q: You delete a file and empty the recycle bin. Usually, what has happened to the data?
- It is instantly destroyed
+ The index entry is removed, but the data may remain until overwritten
- It is moved to the cloud
- It is encrypted
? Deletion normally frees the space without wiping it, so forensic tools can often recover the file.

Q: In an email header, in which order should you read the Received lines to follow the journey?
- Top to bottom
+ Bottom to top, because each server adds its line at the top
- Alphabetically
- Only the first line matters
? New Received lines are added at the top, so the oldest, closest to the sender, is at the bottom.

Q: Why must you check time zones when building a timeline from several logs?
- Logs only work in one time zone
+ Mixing time zones gives events in the wrong order, so convert everything to one standard such as UTC
- Time zones do not matter
- Because some logs have no time
? Events can appear to happen in the wrong order if the logs use different time zones or inaccurate clocks.
```

```glossary
Digital forensics :: Recovering and analysing digital evidence in a way that can be relied on and explained.
Forensic image :: An exact, bit-for-bit copy of a drive or device, used so the original is never altered.
Write blocker :: A device that lets data be read from a drive but never written to it.
Hash :: A fixed-length fingerprint of data, used to prove that a copy is identical.
Chain of custody :: The record of who handled evidence, when and where.
Order of volatility :: The principle of collecting the most fragile evidence first.
File signature :: A fixed pattern of bytes at the start of a file that shows its true type, also called a magic number.
Hexadecimal :: A base-16 number system often used to show raw bytes.
Hex viewer :: A tool that shows the raw bytes of a file.
Steganography :: Hiding the existence of a message inside another file.
LSB :: Least significant bit: the final bit of a number, which can be changed invisibly to hide data in an image.
File carving :: Recovering files from raw disk data by recognising their signatures.
Artefact :: A trace left by normal use, such as browser history or a recently opened file.
Header (email) :: Hidden lines in an email that record its journey and authentication checks.
SPF :: An email check that the sending server is allowed to send for the domain.
DKIM :: An email check using a digital signature added by the sending domain.
DMARC :: A policy that says what to do when SPF or DKIM checks fail.
Log :: A record of events on a system, with timestamps.
Timeline :: Events from several sources arranged in time order to show what happened.
Packet capture :: A recording of network traffic, often a .pcap file.
Wireshark :: A free tool for viewing and analysing packet captures.
UTC :: Coordinated Universal Time, the standard used to compare timestamps from different places.
```

```further
Autopsy | https://www.autopsy.com/ | A free digital forensics platform used by professionals and students.
Wireshark | https://www.wireshark.org/ | The standard free tool for looking at network captures; the site has sample captures and guides.
TryHackMe | https://tryhackme.com/ | Guided rooms on forensics, with safe sample evidence. Free to start.
CyberDefenders | https://cyberdefenders.org/ | Free blue-team and forensics challenges using real-style evidence.
NCSC CyberFirst | https://www.ncsc.gov.uk/cyberfirst/overview | UK government programmes and courses for young people.
```
