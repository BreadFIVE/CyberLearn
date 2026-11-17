# CyberLearn

Baseline cyber security lessons that lead into the [CyberQuest](../cyberquest-collection) challenges. Each lesson is a 15 to 20 minute read that explains one area from the ground up, with worked examples, a quiz, a glossary and a "keep learning" list. Then students take the matching CyberQuest challenge set to try it for themselves.

| # | Lesson | Leads into |
|---|---|---|
| 1 | How Networks Work | Network Navigator |
| 2 | The Linux Command Line | Terminal Trainer |
| 3 | Cryptography: Secrets and Proof | Cipher Vault |
| 4 | Web Security Basics | Web Warriors |
| 5 | Social Engineering: Hacking People | Human Firewall |
| 6 | OSINT: Investigating with Open Sources | OSINT Investigator |
| 7 | Law, Ethics and Privacy | (read before lesson 8) |
| 8 | Penetration Testing: Thinking Like an Attacker | Red Team Lab |
| 9 | Digital Forensics: Following the Evidence | Digital Detectives |
| 10 | Blue Team: Defending and Responding | SOC Analyst |

Every lesson page has a contents list, a quiz (saved on the learner's own device only), a glossary, a print button (good for handouts) and a link to its quest. There is also a combined glossary page. No accounts, no tracking, no server: it is plain static HTML.

## Putting it on GitHub Pages

1. Create a repository called `cyberlearn` and push this folder to it.
2. In the repository go to **Settings, Pages**, choose **Deploy from a branch**, branch `main`, folder **`/docs`**, and save.
3. After a minute it appears at `https://<your-username>.github.io/cyberlearn/`.

## Linking to CyberQuest

The lessons link to the quests using the setting `questBase` in `site.config.json`. The default, `../cyberquest-collection/`, works when both repositories are published as project sites under the same GitHub account, with the quest repo named `cyberquest-collection` and its Pages folder set to `/docs`. If you host them somewhere else, change it to the full address, for example `"questBase": "https://example.org/cyberquest/"`, then run `npm run build` and push.

## Changing or adding a lesson

Lessons are plain text files in `lessons/`. Edit one, then:

```
npm run build     # lessons/*.md  ->  docs/*.html
npm test          # checks links, quizzes, the glossary, phone layout and every worked example
git add . && git commit -m "Update lesson" && git push
```

(Run `npm install` once first if you want to run the tests. The build itself needs only Node.)

To add a lesson, copy an existing file to `lessons/11-yourtopic.md` and change it. The top of the file is front matter:

```
---
id: yourtopic            (used for the file name: docs/yourtopic.html)
title: Your Topic
order: 11
icon: 🧩
accent: #38d6ff          (colour for the card and headings)
summary: One sentence that shows on the home page.
level: Beginner
quest: network           (optional: which CyberQuest set it leads into)
---
```

Then write the lesson using this simple markup:

| You write | You get |
|---|---|
| `## Heading` and `### Sub-heading` | Headings. Every `##` heading appears in the contents list |
| `**bold**`, `*italic*`, `` `code` `` | Inline formatting |
| `[text](https://...)` | A link |
| `- item` and `1. item` | Bullet and numbered lists |
| `\| a \| b \|` rows with a `\|---\|---\|` line under the first | A table |
| ```` ``` ```` fenced block | A code block. Use ```` ```diagram ```` for a dashed-outline diagram |
| `> **Key idea:** text` | A coloured call-out. Also `Tip`, `Remember`, `Try it`, `Example`, `Careful`, `Legal note` |

Each lesson also needs three special blocks, usually at the end:

````
```quiz
Q: A question?
- A wrong answer
+ The right answer
- Another wrong answer
? Why the right answer is right (shown after checking).
```

```glossary
Term :: A short definition.
```

```further
Link title | https://example.org/ | One line about it.
```
````

The builder refuses to build if a lesson has fewer than 8 quiz questions or 8 glossary terms, a question without exactly one `+` answer or without an explanation, or a "further" link that is not `https`. The order of the answers is shuffled by the build, so the right answer is not always in the same place.

## Content rules

* **Teach ideas, not attacks.** Lessons explain how attacks work so people can defend against them. They do not contain step-by-step instructions for breaking into real systems, working malware, or anything that needs a real target.
* **Keep the law lesson current.** Lesson 7 describes UK law as understood when it was written. Laws change, so have it checked by someone qualified before relying on it. It is general information, not legal advice.
* **Check worked examples by computing them.** `tools/test.js` recomputes the numbers in the examples (ciphers, subnets, hashes, permissions). If you add a new worked example with numbers, add a check for it there.
* **Examples are fictional.** Companies, people and addresses are made up. IP addresses come from the ranges reserved for documentation (`192.0.2.x`, `198.51.100.x`, `203.0.113.x`).
* **Links:** use the main address of a reputable site rather than a deep link that may move. The tests check the format, but not whether a site is still online.
