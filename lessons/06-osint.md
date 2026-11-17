---
id: osint
title: OSINT: Investigating with Open Sources
order: 6
icon: 🔎
accent: #ffc247
summary: How investigators, journalists and defenders find out an astonishing amount from public information, and how to protect your own.
level: Beginner
quest: osint
---

## What is OSINT?

**OSINT** stands for **open-source intelligence**. It means finding, checking and connecting information that is **publicly available**: websites, social media, news, public records, maps, photos, online forums. (It has nothing to do with "open-source software". Here, "open" means "anyone can look".)

It sounds simple, but done well it is powerful. Journalists use OSINT to check whether a video is real and where it was filmed. Investigators use it to trace scams. Companies use it to see what an attacker could learn about them. Attackers use it too, which is why security professionals take it seriously: before a criminal sends a convincing phishing email, they will usually spend time on OSINT.

By the end of this lesson you will be able to describe the main OSINT sources and techniques, use search operators to narrow a search, understand what hidden information a photo can contain, reason about where a photo was taken, check whether a claim online is trustworthy, and, importantly, reduce what the internet knows about you.

> **Key idea:** OSINT is **not** about secret access. Everything is public. The skill is in **asking good questions, connecting small facts, and checking that they are true**. A single fact is rarely useful. Five facts pieced together can tell a whole story.

## The intelligence cycle

Professional investigators follow a loop, and you can too:

1. **Question.** What exactly am I trying to find out? A clear question stops you wandering off.
2. **Collect.** Gather information from public sources, and *record where each piece came from*.
3. **Check.** Is it true? Is it current? Can another source confirm it?
4. **Connect.** Link the pieces. What do they tell you together?
5. **Report.** Explain what you found, how sure you are, and what you could *not* confirm.

## Where information lives

| Source | What you might find |
|---|---|
| Search engines | Pages, documents, old versions, mentions of a name or phrase |
| Social media | Photos, locations, friends, interests, job history, writing style |
| Company registers | Directors, addresses and accounts. In the UK, **Companies House** is free and public |
| Domain records (**WHOIS** and **DNS**) | Who registered a website, when, and which servers it uses |
| Web archives | Old copies of pages that have since changed or vanished (the **Wayback Machine**) |
| Maps and satellite images | Buildings, roads, landmarks, the layout of a place |
| Job adverts | Which technology a company uses ("experience with product X required") |
| Code sites | Public code repositories, where people sometimes leave secrets by mistake |
| News and public documents | Court records, planning applications, reports, press releases |

### WHOIS, DNS and archives

When someone registers a website name, a record is created. **WHOIS** lookups can show when a domain was created and sometimes who registered it (though many owners now use **privacy protection** to hide personal details). A scam site is often only a few days old, while a real bank's domain is many years old. **DNS records** show which servers a name points to, so two sites on the same server may be linked. The **Wayback Machine** (archive.org) keeps snapshots of pages over time, so deleted pages and old staff lists can often still be seen.

## Search like a professional

Most people type a few words into a search engine. You can do far better using **search operators**, special symbols that narrow the results. Most major search engines support the following:

| Operator | Meaning | Example |
|---|---|---|
| `"..."` | The exact phrase | `"annual report 2025"` |
| `-word` | Exclude a word | `jaguar -car` |
| `site:` | Only search one website | `site:gov.uk cyber security` |
| `filetype:` | Only certain file types | `filetype:pdf annual report` |
| `intitle:` | Word must be in the page title | `intitle:"staff directory"` |
| `inurl:` | Word must be in the web address | `inurl:careers` |
| `OR` | Either term | `phishing OR smishing` |

Combine them: `site:example.org filetype:pdf "minutes"` asks for PDF files containing the word "minutes", on one site only. Searching this way is sometimes called "Google dorking". It is entirely legal because the search engine is only showing public pages. But it also reveals how **easily** documents that were meant to be private can be found, which is why organisations check their own exposure with the same tools.

## Hidden data in photos: metadata

Every photo is more than a picture. Behind it is **metadata**: data about the data. For photos, the standard is called **EXIF**, and it can include:

| Field | Example | Why it matters |
|---|---|---|
| Camera make and model | Phone model | Might show what device someone owns |
| Date and time taken | 2026-03-02 14:05 | Helps build a timeline |
| **GPS coordinates** | 51.5007, -0.1246 | **Exactly where the photo was taken** |
| Software | Editing program used | Might show the picture was edited |
| Orientation, settings | Exposure, flash | Technical detail |

GPS metadata is the big one. A photo taken at home and shared without a second thought can give away your address. Most big social networks **strip** this data when you upload, but sending a photo as a file by email or putting it on a small website often does not. You can see a photo's metadata on most computers (right-click, then Properties or Get Info), or with a free EXIF viewer.

> **Careful:** Before you share a photo as a file, check whether location is switched on for your camera. Turning off geotagging is a quick, valuable habit.

## Following a person's trail: pivoting

A **pivot** means using one piece of information to find the next. Typical pivots:

* **Username to profiles.** People often reuse the same username across sites. If you find `skate_kate_92` on one site, searching for it can reveal other accounts, each with a few more clues.
* **Email to accounts.** An email address can reveal which services someone uses.
* **Photo to place.** A reverse image search shows where else a picture appears and where it first appeared.
* **Company to people.** An employer's website leads to staff names, which lead to their public profiles.

This is exactly why defenders worry. Each pivot adds a fact an attacker could use in a convincing message ("Hi Kate, I saw your post about the skate park..."). It is also why the **ethics** section of this lesson matters.

## Geolocation: where was this taken?

**Geolocation** is the skill of working out *where* an image was taken without any GPS data. Investigators have used it to confirm where news footage was filmed. You do it by collecting small clues and narrowing down:

1. **Language and writing.** Shop signs, road signs, graffiti, the alphabet used.
2. **Road details.** Which side the traffic drives on, the colour of the road markings, the shape of road signs and street lights, the type of number plates.
3. **Landscape.** Mountains, coast, desert, type of trees, farmland.
4. **Buildings.** Style of houses, roof shapes, materials.
5. **Landmarks.** A church spire, a bridge, a distinctive tower. Search engines and maps can match these.
6. **Sun and shadows.** The direction of shadows suggests the time of day and hemisphere.
7. **Everything together.** Check candidate places on **satellite and street-level maps**.

> **Example:** A photo shows cars driving on the left, a red pillar box on the corner, a sign reading "Chemist" and brick terraced houses. Together, that points strongly to the United Kingdom. A second photo shows a river bend and a stone bridge with three arches; matching that outline on a map narrows it to one town. No single clue gave the answer. The **combination** did.

## Checking what is true

The internet is full of fakes, mistakes and old pictures reused for new events. Whatever you find, ask:

* **Who** published it, and why? Do they have a reason to mislead?
* **When** was it really created? Old photos often return with a new caption.
* **Where** did it start? Look for the **original source**, not a copy of a copy.
* Do **other independent sources** confirm it?
* Is the image **reused**? A reverse image search can show earlier appearances.

A simple method with a catchy name is **SIFT**: **S**top (do not react straight away), **I**nvestigate the source, **F**ind better coverage, **T**race claims back to their origin. Being able to say "I could not verify this" is a mark of a good investigator, not a weak one.

Be aware, too, that photos, voices and videos can now be **generated by AI**. Look for odd hands or text, inconsistent shadows, and above all check where the item came from.

## Good practice: record as you go

* **Write down every source** with the web address and the date you saw it. Pages change.
* Take **screenshots**, and note the date and time.
* Keep **facts** (what you saw) apart from **assessment** (what you think it means).
* State your **confidence**: confirmed, likely, possible.
* Stay **calm and open-minded**. Wanting a particular answer is how investigators go wrong.

## Ethics and the law

Because OSINT feels harmless, it is easy to cross lines without noticing. Keep these in mind:

* **Public does not mean fair game.** Just because something *can* be found does not mean you *should* gather it, especially about private individuals. Collecting and compiling information about a person can cause real harm.
* **Never use OSINT to stalk, harass, or expose ("doxx") anyone.** That can be a criminal offence, and it hurts real people.
* **Respect data protection law.** In the UK, personal information is protected by UK GDPR and the Data Protection Act 2018. Collecting and storing personal data has rules, even when it is public.
* **Stay passive.** OSINT means looking at what is already public. Logging in with someone else's details, tricking someone into sharing, or probing a system is a different thing and may be illegal.
* **Think about purpose.** Have a good reason, keep to it, and collect only what you need.
* **Practise on yourself, on fictional targets, or on challenges designed for the purpose.** That is exactly what the quests do: every person and company in them is made up.

## Protecting yourself: shrinking your footprint

The best way to understand OSINT is to try it **on yourself**. Search your own name, usernames and phone number, and see what comes up. Then:

1. **Review privacy settings** on every social account. Make profiles private where possible, and check who can see your friends and posts.
2. **Turn off location tagging** on your camera and in posts.
3. **Avoid clues in photos:** school uniform badges, house numbers, street signs, car number plates, tickets and documents on desks.
4. **Use different usernames** for different purposes, and avoid usernames that include your real name or birth year.
5. **Close old accounts** you no longer use. Forgotten profiles still count as footprint.
6. **Check for breaches.** Services like Have I Been Pwned tell you whether your email appeared in a known data leak.
7. **Think before you post** about plans: "away all week" tells burglars something, and "Day 1 at my new job at X" tells scammers something.

Organisations do the same: they search for themselves, check what staff post, tidy up old pages, and remove metadata from documents before publishing them.

## What to do next

Try the **OSINT Investigator** challenges. They give you metadata, usernames, map clues, domain records and archived pages for fictional people and companies, and ask you to piece together the answers. If you enjoy it, the **Bellingcat** online guides and the free *Trace Labs* and *OSINT Dojo* resources are excellent next steps. Then read the lesson on law and ethics before doing anything beyond practice material.

```quiz
Q: What does OSINT mean?
- Open-source software integration tools
+ Open-source intelligence: information found from public sources
- Online security internet network test
- Official secret intelligence
? OSINT is about public information. It has nothing to do with open-source software.

Q: What does the search operator site:gov.uk do?
- Hides results from gov.uk
+ Limits results to pages on gov.uk
- Finds sites that link to gov.uk
- Searches only for government files
? site: restricts a search to a single website or domain.

Q: Which search finds only PDF files?
- pdf only
+ filetype:pdf
- inurl:pdf
- type=pdf
? The filetype: operator limits results to a file type.

Q: Which piece of photo metadata is most dangerous to share by accident?
- The camera brand
+ The GPS coordinates
- The orientation
- The file size
? GPS metadata can reveal the exact place a photo was taken, such as someone's home.

Q: What is a "pivot" in an investigation?
- Deleting evidence
+ Using one piece of information to find the next
- Turning a photo round
- Sending a message
? A pivot links facts together, such as finding other accounts from a username.

Q: Which of these clues helps most in working out where a photo was taken?
+ A combination of language, road markings, landscape and landmarks
- The file name
- The time on your own computer
- The brightness of the image
? No single clue is enough. Several small clues together narrow it down.

Q: Which tool shows old copies of web pages that have since changed or disappeared?
- WHOIS
- A VPN
+ The Wayback Machine
- Ping
? The Wayback Machine at archive.org keeps snapshots of pages over time.

Q: You find a dramatic photo claiming to show today's news. What is the best first step?
- Share it quickly
+ Search for its origin, checking where it first appeared and when
- Assume it is true if lots of people shared it
- Assume it is false because it is on social media
? Old images are often reused. Trace it back to the source and look for independent confirmation.

Q: Which of these is NOT good ethical OSINT practice?
- Having a clear, legitimate purpose
+ Gathering and publishing a private person's details because it is possible
- Recording your sources
- Practising on fictional targets
? Public does not mean fair game. Compiling private people's details can cause harm and may be illegal.

Q: Which habit best reduces your own OSINT footprint?
- Using the same username everywhere
+ Turning off location tagging and checking privacy settings
- Posting plans in advance
- Keeping every old account open
? Limiting what is public, especially location and personal details, makes you harder to profile.
```

```glossary
OSINT :: Open-source intelligence: information gathered, checked and connected from public sources.
Metadata :: Data about data, such as when and where a photo was taken.
EXIF :: The standard format for photo metadata, which can include camera, time and GPS location.
Geotag :: Location data attached to a photo or post.
Geolocation :: Working out where a photo or video was taken from its visible clues.
Pivot :: Using one piece of information to find another.
Footprint :: The trail of information about you or an organisation that exists online.
Search operator :: A symbol or keyword, such as site: or filetype:, that narrows a search.
WHOIS :: A public lookup that shows registration details for a domain name.
DNS record :: Information that links a name to a server, which can show relationships between sites.
Web archive :: A service that stores old copies of web pages.
Reverse image search :: Searching with a picture to find where else it appears.
Verification :: Checking that a piece of information is true, current and from a reliable source.
SIFT :: A method for checking information: Stop, Investigate the source, Find better coverage, Trace claims to the origin.
Passive collection :: Looking only at information that is already public, without interacting with the target.
Doxxing :: Publishing someone's private information to expose or harass them.
Data protection :: Laws, such as UK GDPR, about how personal information may be collected and used.
Privacy settings :: Controls that decide who can see your accounts and posts.
```

```further
Bellingcat's online guides | https://www.bellingcat.com/resources/ | Free guides from the investigative group on verification and geolocation.
Trace Labs | https://www.tracelabs.org/ | Community that uses OSINT for good, with learning resources and events (check age rules).
Have I Been Pwned | https://haveibeenpwned.com/ | Check whether your email appeared in a known data breach.
Wayback Machine | https://archive.org/web/ | Browse old versions of web pages.
Companies House | https://www.gov.uk/get-information-about-a-company | Free, official information about UK companies.
```
