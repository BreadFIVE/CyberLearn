---
id: web
title: Web Security Basics
order: 4
icon: 🕸️
accent: #4da3ff
summary: How websites work, why you can never trust what a browser sends, and the classic flaws (SQL injection, XSS, broken access) with their fixes.
level: Beginner to Intermediate
quest: web
---

## Why the web is a big target

Websites are public by design: anyone in the world can send them a request. They also handle valuable things, like accounts, payments and personal data. That combination makes web applications one of the most attacked parts of any organisation. The good news is that most web flaws come from a small number of repeated mistakes, and each one has a well-understood fix.

By the end of this lesson you will be able to explain how a web request works, say why the browser can never be trusted, describe three classic attacks (SQL injection, cross-site scripting and broken access control), and explain how developers prevent each one.

> **Legal note:** Only test websites you own, or that give you written permission, or that are built to be attacked as practice. Probing someone else's site, even gently, can be a crime under the Computer Misuse Act. The lesson on law and ethics explains this properly. Every demonstration here is safe and simulated.

## How the web works

When you open a page, your browser sends an **HTTP request** to a web server, and the server sends back an **HTTP response**. (HTTPS is the same thing carried inside an encrypted connection.)

A request has a **method**, a **path**, some **headers** and sometimes a **body**:

```
GET /products?id=7 HTTP/1.1
Host: shop.example
User-Agent: Mozilla/5.0
Cookie: session=abc123
```

The most common methods are `GET` (fetch something) and `POST` (send something, like a form). The server replies with a **status code**, some headers and the content:

| Code | Meaning |
|---|---|
| 200 | OK: here is the page |
| 301 / 302 | Redirect: go somewhere else |
| 403 | Forbidden: I know who you are, but you may not see this |
| 404 | Not found |
| 500 | Server error: something broke on the server side |

**Headers** carry extra information. A response header such as `Server: Apache/2.4` or `X-Powered-By: PHP/5.3.2` can reveal what software the site runs and which version. That is called **information disclosure**. Attackers collect it, so defenders remove it.

A web application has two halves. The **front end** is what runs in your browser: HTML (structure), CSS (appearance) and JavaScript (behaviour). The **back end** runs on the server and holds the data, usually in a **database**. This split leads to the most important rule in web security.

> **Key idea:** **Never trust the client.** Everything in your browser is under *your* control. You can read it, change it and send anything you like. So the server must check everything it receives, every time, no matter what the page "should" have sent.

## Cookies and sessions

HTTP has no memory: each request stands alone. So how does a site know you are still logged in? When you log in, the server gives your browser a **session identifier** stored in a **cookie**. The browser sends it back with every request, and the server recognises you.

A cookie is just data, so it must be protected:

* If the cookie **contains** your role or user name in a form you can edit (even if it is disguised with Base64), you can change it. A cookie such as `session=eyJ1c2VyIjoiZ3Vlc3QiLCJyb2xlIjoidXNlciJ9` is just Base64 for `{"user":"guest","role":"user"}`. Change `user` to `admin` and the site may believe you.
* The fix: the cookie should be a long, random, unguessable ID. The server keeps your details on its side and looks them up. Never put trust in the cookie's contents.
* Cookie flags help too. **`HttpOnly`** hides the cookie from JavaScript, **`Secure`** sends it only over HTTPS, and **`SameSite`** limits when other sites can make your browser send it.

## Hidden fields and price tampering

A common beginner mistake is to put important data in a form and trust it when it comes back. Look at this:

```
<form action="/buy" method="post">
  <input type="hidden" name="price" value="49.99">
  <button>Buy now</button>
</form>
```

The field is "hidden" only in the sense that it is not drawn on the screen. Anyone can open the browser's **developer tools** (press F12), edit the value to `0.01`, and press Buy. If the server believes the price it was sent, the shop has just sold a hoodie for a penny.

> **Remember:** Hidden form fields, JavaScript checks, disabled buttons, and drop-down lists are all conveniences for honest users. None of them is security. The **server** must look up the real price itself and ignore what the browser says.

## Attack 1: SQL injection

Most web applications store data in a database and talk to it using **SQL** (Structured Query Language). For example, to check a login, the code might build a query by gluing text together:

```
SELECT * FROM users WHERE username = '<what you typed>' AND password = '<what you typed>';
```

If a normal user types `alice` and `secret`, the query is:

```
SELECT * FROM users WHERE username = 'alice' AND password = 'secret';
```

The trouble comes when someone types something that is **not data but SQL**. The apostrophe `'` ends the text early, and whatever follows is treated as part of the query. If an attacker types `admin'--` as the username, the query becomes:

```
SELECT * FROM users WHERE username = 'admin'--' AND password = '';
```

In SQL, `--` starts a **comment**, so everything after it is ignored. The password check has vanished, and the attacker is logged in as admin. A similar trick uses a condition that is always true, such as `' OR '1'='1`. This is **SQL injection**, and it has been responsible for some of the biggest data breaches ever recorded. A stray apostrophe that produces a database error message is itself a warning that a page is vulnerable.

An attacker can go further. With a `UNION SELECT`, they can make the same query return data from a **different table**, such as the list of users and passwords. That is how one small flaw becomes a catastrophic leak.

### The fix

Developers must **never build queries by joining strings**. They use **parameterised queries** (also called prepared statements), where the query and the data travel separately:

```
SELECT * FROM users WHERE username = ? AND password = ?;
```

The database treats whatever arrives in the `?` slots as **data only**, never as SQL commands, so an apostrophe is just an apostrophe. Further layers of defence include: giving the database account only the permissions it needs (**least privilege**), showing users generic error messages instead of database errors, and checking that input looks the way it should.

## Attack 2: Cross-site scripting (XSS)

A page that **echoes back what you give it** has a risk. Consider a search page that shows `Results for: <what you typed>`. If you type the word `mug`, the HTML is `<h2>Results for: mug</h2>`. But what if you type something that is not a word, but HTML code that includes a script?

If the site pastes your text into the page unchanged, the browser cannot tell the difference between the page's own code and the text the visitor supplied. It runs the script as if the website itself had written it. This is **cross-site scripting**, usually shortened to **XSS**.

Why does it matter? A script running in a page can read things that page can read, such as the visitor's session cookie (unless it is `HttpOnly`) or what they type into a form. It can also change what the page shows, for example adding a fake login box. There are two main types:

* **Reflected XSS:** the harmful text is part of a link. The victim has to click a specially made link, and the page reflects the text straight back.
* **Stored XSS:** the harmful text is saved by the site, for example in a comment or a profile, and then served to every visitor who looks at it. This is more dangerous, because victims need not click anything unusual.

### The fix

The cure is **output encoding**. Before putting any user-supplied text into a page, convert the special characters into harmless text equivalents: `<` becomes `&lt;`, `>` becomes `&gt;`, and so on. The browser then *displays* the characters instead of *running* them. Most modern frameworks do this automatically, which is a good reason to use them rather than build everything by hand. A **Content Security Policy** (CSP) header adds another layer by telling the browser which scripts are allowed to run at all.

## Attack 3: Broken access control (IDOR)

Imagine you are logged in as customer 1042, and your invoice is at:

```
https://shop.example/invoice?id=1042
```

What happens if you change the number to `1037`? If the server simply fetches invoice 1037 without checking that it **belongs to you**, you are reading someone else's invoice. This flaw is called an **IDOR** (Insecure Direct Object Reference), and it is one example of the larger problem called **broken access control**. It needs no clever tool: just editing a number.

### The fix

Authentication answers "*who are you?*". **Authorisation** answers "*are you allowed to do this?*". Every request that fetches or changes data must check authorisation on the **server**, using the identity from the session, never an ID supplied by the user. Making IDs long and random helps a little, but it is not a substitute for checking.

## Other common problems

| Problem | What it is | Defence |
|---|---|---|
| Weak authentication | Guessable passwords, unlimited login tries | Strong password rules, lockout or throttling, multi-factor authentication |
| Security misconfiguration | Default passwords, debug pages left on, directory listings, verbose errors | Harden and review every setting, remove what is not needed |
| Outdated components | Using old libraries with known flaws | Keep everything patched and track what you use |
| Information disclosure | Version numbers in headers, secrets in page source, backup files left on the server | Remove them; never put secrets in front-end code |
| CSRF | A malicious site tricks your logged-in browser into sending a request to another site | Anti-CSRF tokens and `SameSite` cookies |
| Sensitive data exposure | Sending or storing data without encryption | HTTPS everywhere, encrypt and hash data at rest |

The **OWASP Top 10** is a regularly updated list of the most serious web application risks, written by a non-profit community. It is the standard checklist for developers and testers, and it is free to read.

## Look inside your own browser

You do not need special tools to start learning how websites work. Every browser has **developer tools** (press F12). On the safest and most useful of its tabs:

* **Elements** or **Inspector** shows the page's HTML, and lets you change it *on your own screen only* (nothing changes on the real server).
* **Network** lists every request the page made, with status codes, headers and cookies. You can see exactly what is sent when you press a button.
* **Application** or **Storage** shows the cookies and other data a site has stored on your device.

Also try right-click, then **View Page Source**. Developers sometimes leave comments in the HTML, and what you find there is a good lesson in what *not* to publish.

## How defenders think

Security for websites is mostly about a few habits, repeated everywhere:

1. **Validate input.** Check that what arrives looks right: the right type, length and range.
2. **Encode output.** Treat user text as text when it goes into a page.
3. **Use parameterised queries.** Keep data and commands apart.
4. **Check access on the server, every time.**
5. **Least privilege.** The web app, the database account and the server each get only the access they need.
6. **Keep everything updated and remove what you do not use.**
7. **Log and monitor.** Odd patterns, such as hundreds of "not found" errors from one visitor, or apostrophes and `UNION SELECT` in addresses, show that someone is probing.
8. **Fix the cause, not the symptom.** Blocking one bad input is not the same as fixing the flaw.

## Practising legally

The right way to try these techniques is on systems made to be attacked. **OWASP Juice Shop** and **DVWA** are deliberately vulnerable web applications you can run on your own computer. **PortSwigger's Web Security Academy** gives free labs for every topic here, in the browser. **TryHackMe** and similar platforms provide guided rooms. All of these are legal, safe and designed for learners.

## What to do next

Try the **Web Warriors** challenges. They use simulated shops, search pages and invoices where you can see the injection, the tampering and the fix side by side. Then read the lesson on law and ethics before trying anything beyond a practice environment.

```quiz
Q: A shop's form has a hidden field containing the price. What is the main problem?
- Hidden fields slow the page down
+ The user can change the value before sending, so the server must not trust it
- Browsers do not support hidden fields
- Prices should be in cookies instead
? Hidden fields are only hidden from view. Anyone can edit them with developer tools, so the server must look up the real price itself.

Q: What does the "never trust the client" rule mean?
- Do not let people use browsers
+ Treat everything arriving from the browser as untrusted and check it on the server
- Clients should be blocked from the internet
- Only trust clients on mobile devices
? The browser is under the user's control, so any value it sends could have been altered.

Q: Why is a cookie that contains {"role":"user"} (encoded in Base64) a bad design?
- Cookies cannot contain JSON
+ The user can decode it, change the role to admin and send it back
- Base64 is too slow
- Cookies must be numbers
? Base64 is encoding, not protection. The session cookie should be a random ID, with the details stored on the server.

Q: What makes SQL injection possible?
- A slow database
+ User input being joined into a query so that it is treated as SQL
- Using HTTPS
- Having too many users
? When user text becomes part of the SQL command, an apostrophe and extra SQL can change what the query does.

Q: What is the correct fix for SQL injection?
- Hide the login page
+ Use parameterised queries so input is treated only as data
- Ask users not to type apostrophes
- Make the database bigger
? Parameterised queries keep the command and the data separate, so input can never become part of the command.

Q: What does cross-site scripting (XSS) allow?
- Reading the server's source code directly
+ Running the attacker's script in other users' browsers, on the vulnerable site
- Breaking the encryption of HTTPS
- Taking over the web server's hardware
? If a site puts untrusted text into a page without encoding it, the browser runs it as if the site wrote it.

Q: What is output encoding?
- Encrypting the whole website
+ Converting special characters like < and > to harmless text before showing user input
- Compressing images
- Translating a page into another language
? Encoding turns < into &lt; so the browser displays the characters instead of running them as code.

Q: You change ?id=1042 to ?id=1037 in a URL and see someone else's invoice. What flaw is this?
- SQL injection
- Cross-site scripting
+ Broken access control (an IDOR)
- A slow connection
? The server fetched the record without checking that it belonged to the logged-in user. The fix is an authorisation check on the server.

Q: An HTTP response header says X-Powered-By: PHP/5.3.2. Why is this a concern?
- It makes the page slower
+ It reveals the technology and version, which helps attackers find known weaknesses
- It is illegal
- It stops cookies working
? This is information disclosure. Attackers look for known flaws in that version, so defenders remove or hide it.

Q: Which status code means "not found"?
- 200
- 301
- 403
+ 404
? 404 means the page does not exist. A scanner hunting for hidden pages will generate many of them in the log.

Q: Which is the best place to practise web hacking skills legally?
- The website of a company you admire
+ A deliberately vulnerable practice app or a learning platform
- Your school's website
- Any website with a bug bounty, without reading its rules
? Only test systems you own or have clear permission to test. Practice apps and learning platforms exist precisely for this.
```

```glossary
HTTP :: The protocol browsers and servers use to request and send web pages.
HTTPS :: HTTP carried inside an encrypted connection.
Request and response :: The browser sends a request; the server sends back a response with a status code.
Status code :: A number in a response that says what happened, such as 200 (OK) or 404 (not found).
Header :: Extra information sent with a request or response, such as cookies or the server software.
Front end :: The part of a web app that runs in the browser: HTML, CSS and JavaScript.
Back end :: The part that runs on the server and manages the data.
Cookie :: A small piece of data a browser stores and sends back to a site, often holding a session ID.
Session :: The period during which the server recognises you as logged in.
Developer tools :: The built-in browser tools (F12) for inspecting a page, requests and cookies.
SQL :: Structured Query Language, the language used to talk to most databases.
SQL injection :: Tricking a website into running attacker-supplied SQL by putting it in an input.
Parameterised query :: A query where data is sent separately from the command, which prevents SQL injection.
XSS :: Cross-site scripting: getting a site to run an attacker's script in other visitors' browsers.
Output encoding :: Converting special characters to harmless text before showing user input in a page.
Authentication :: Checking who you are.
Authorisation :: Checking what you are allowed to do.
IDOR :: Insecure Direct Object Reference: reaching someone else's data by changing an ID the server does not check.
Information disclosure :: A system revealing details, such as software versions, that help attackers.
Least privilege :: Giving each part of a system only the access it needs.
CSRF :: Cross-site request forgery: tricking a logged-in browser into sending an unwanted request.
OWASP Top 10 :: A regularly updated list of the most serious web application security risks.
```

```further
PortSwigger Web Security Academy | https://portswigger.net/web-security | Free, high-quality browser-based labs that cover every topic in this lesson.
OWASP Top 10 | https://owasp.org/www-project-top-ten/ | The standard list of web application risks, with clear explanations.
OWASP Juice Shop | https://owasp.org/www-project-juice-shop/ | A deliberately vulnerable shop you can run locally to practise legally.
TryHackMe | https://tryhackme.com/ | Guided rooms on web security. Free to start.
MDN Web Docs: HTTP | https://developer.mozilla.org/en-US/docs/Web/HTTP | A thorough, free reference for how HTTP works.
```
