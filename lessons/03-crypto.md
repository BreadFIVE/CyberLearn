---
id: crypto
title: Cryptography: Secrets and Proof
order: 3
icon: 🔐
accent: #b58bff
summary: Ciphers, encoding and hashing, and how modern encryption lets strangers share secrets safely.
level: Beginner to Intermediate
quest: crypto
---

## Why cryptography matters

Every time you see the padlock in your browser, send a message on a secure app, or log in to an account, cryptography is quietly protecting you. **Cryptography** is the science of keeping information secret and proving it has not been changed. It is old (Julius Caesar used a cipher two thousand years ago) and it is the foundation that almost all digital security stands on.

By the end of this lesson you will be able to explain the difference between **encoding**, **encryption** and **hashing**, encrypt and break a simple classical cipher by hand, explain why modern systems use two different kinds of encryption together, and describe how a website's password should (and should not) be stored.

> **Key idea:** Cryptography does not make secrets *impossible* to read. It makes reading them **too much work** without the key. Good cryptography is judged by how much work an attacker needs, not by hope.

## The vocabulary

* **Plaintext** is the readable message.
* **Ciphertext** is the scrambled version.
* **Encryption** turns plaintext into ciphertext. **Decryption** turns it back.
* A **cipher** (or algorithm) is the method used.
* A **key** is the secret value that controls the method.

Imagine a padlock. Everyone knows how padlocks work (the cipher), but only the person with the key (the key) can open yours. This is **Kerckhoffs's principle**, a rule since 1883: a system should stay secure even if the attacker knows exactly how it works, as long as the key stays secret. Secret *methods* get discovered. Secret *keys* can be kept.

## Three things people confuse

These three are often mixed up, and mixing them up leads to real security mistakes.

| | Encoding | Encryption | Hashing |
|---|---|---|---|
| Purpose | Make data fit a format | Keep data secret | Prove data is unchanged, or check a password |
| Needs a key? | No | Yes | No |
| Reversible? | Yes, by anyone | Yes, with the key | **No**, it is a one-way trip |
| Example | Base64, hexadecimal | AES, RSA | SHA-256 |

**Encoding** is not security at all. Base64 turns `Hello` into `SGVsbG8=`, but anyone can turn it straight back, because there is no key. Whenever you see a string ending in `=` that looks random, try Base64 first. Hexadecimal, binary and Morse code are encodings too.

**Encryption** needs a key. Without the key, the ciphertext should look like random noise.

**Hashing** turns any input into a fixed-length "fingerprint". You cannot work backwards from the fingerprint to the input. We will come back to hashing shortly.

## Classical ciphers

Before computers, secrets were scrambled by hand. These old ciphers are easy to break today, but they teach the ideas behind modern cryptography, and they are great puzzle material.

### The Caesar cipher

Shift every letter forward by a fixed number of places. With a shift of 3, A becomes D, B becomes E, and so on, wrapping around at Z. The shift is the key.

```
Plain:   A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Cipher:  D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
```

> **Example:** Encrypt `HELLO` with a shift of 3. H becomes K, E becomes H, L becomes O, L becomes O, and O becomes R. The ciphertext is `KHOOR`. To decrypt, shift back by 3, which is the same as shifting forward by 23.

There are only **25 possible keys**, so an attacker can simply try them all. This is called a **brute-force attack**, and it breaks a Caesar cipher in seconds. `ROT13` is a Caesar cipher with a shift of 13. Applying it twice gets you back where you started, which is why it is used to hide spoilers online, not to protect secrets.

### Substitution ciphers and frequency analysis

A **substitution cipher** replaces each letter with a different letter chosen at random. There are about 400 million million million million possible keys (26 factorial), so brute force is hopeless. Yet it can still be broken, and the trick is the **weakness of patterns**.

In English, letters are not used equally often. The most common letters are roughly **E, T, A, O, I, N**. In a long ciphertext, whichever letter appears most is probably E. This is **frequency analysis**.

> **Try it:** Suppose a long ciphertext has `X` as its most common letter. You guess X stands for E. If you see a single-letter word, it is probably A or I. Three-letter words that appear often might be THE. Each guess helps with the next, a bit like a crossword puzzle.

Frequency analysis dates from the 9th century, and it shows an important lesson: a cipher with a huge number of keys can still be weak if it leaks patterns from the original message.

### The Vigenère cipher

To fix the pattern problem, the **Vigenère cipher** uses a *keyword* instead of a single shift. Each letter of the message is shifted by the matching letter of the keyword, which repeats. A = 0, B = 1, C = 2 and so on.

> **Example:** Encrypt `HELLO` with the keyword `KEY`. The key letters repeat: K, E, Y, K, E.
>
> H (7) + K (10) = 17 = **R**. E (4) + E (4) = 8 = **I**. L (11) + Y (24) = 35, minus 26 = 9 = **J**. L (11) + K (10) = 21 = **V**. O (14) + E (4) = 18 = **S**.
>
> The ciphertext is `RIJVS`. Notice that the two Ls became different letters (J and V), so simple frequency counting no longer works.

For about 300 years the Vigenère cipher was called "the indecipherable cipher". It was broken in the 19th century by spotting that the keyword repeats, so the message is really several Caesar ciphers taking turns. Once you know the keyword length, you can break each one with frequency analysis.

### The one-time pad: perfect, but impractical

If the key is **truly random**, **as long as the message**, and **used only once**, the cipher cannot be broken at all, even with unlimited computing power. This is the **one-time pad**. The catch is that you must securely share a key as long as every message, and never reuse any part of it. When people did reuse keys, messages were broken. It is a useful reminder that careless use defeats good cryptography.

### XOR

Computers work in bits. **XOR** ("exclusive or") combines two bits: the result is 1 if the bits are different and 0 if they are the same. XOR has a lovely property: do it twice with the same key and you get the original back. A simple cipher XORs every byte of the message with a key byte. If the key is just one byte, there are only 256 possibilities, so it can be brute-forced instantly. Real ciphers use XOR as a building block, with much more complicated keys around it.

## Modern encryption: two families

Modern cryptography works on huge numbers and bits, not letters. There are two main kinds, and they are used **together**.

### Symmetric encryption

**Symmetric encryption** uses the **same key** to lock and unlock. The standard today is **AES** (Advanced Encryption Standard), used for everything from your Wi-Fi to your phone's storage. It is very fast and very strong. With a 128-bit key there are about 340 undecillion (3.4 × 10^38) keys, which is beyond brute force.

The problem is the **key distribution problem**: how do two people who have never met agree on a secret key, when anyone might be listening? If you send the key over the internet, an eavesdropper can copy it.

### Asymmetric encryption

**Asymmetric encryption** solves this using a **pair of keys**. A **public key** can be shared with the whole world and is used to **lock**. A matching **private key** is kept secret and is used to **unlock**. Whatever the public key locks, only the private key can open.

Think of a postbox. Anyone can post a letter through the slot (the public key), but only the owner with the key to the box (the private key) can take letters out.

The best-known example is **RSA**. Its security rests on a maths problem that is easy one way and extremely hard the other: multiplying two huge prime numbers is easy, but starting from the answer and finding the two primes is very hard.

> **Example:** (with tiny numbers, for illustration) Pick two primes, 3 and 11. Their product is n = 33. Choose a public exponent e = 3 and a matching private exponent d = 7 (they are linked by a formula we will not need here). The public key is (e = 3, n = 33). To encrypt the message 4, calculate 4^3 mod 33. That is 64, and 64 divided by 33 leaves a remainder of 31, so the ciphertext is **31**. To decrypt, calculate 31^7 mod 33, which gives back **4**. ("mod" means "the remainder after dividing".) Real RSA uses primes with hundreds of digits, so factoring n is out of reach.

Asymmetric encryption is slow. So real systems use a clever combination: use asymmetric methods to agree on a secret key, then switch to fast symmetric encryption for the actual data. This is what happens when you visit an HTTPS website.

### Key exchange: Diffie–Hellman

**Diffie–Hellman** lets two people create a shared secret over an open line, without ever sending the secret itself. Think of mixing paint: it is easy to mix two colours, but impossible to un-mix them.

> **Example:** (small numbers) Alice and Bob publicly agree on a base g = 5 and a modulus p = 23. Alice secretly picks a = 6, and sends A = 5^6 mod 23 = **8**. Bob secretly picks b = 15 and sends B = 5^15 mod 23 = **19**. Now Alice calculates 19^6 mod 23 = **2**, and Bob calculates 8^15 mod 23 = **2**. They have the same secret (2), but an eavesdropper who saw only 5, 23, 8 and 19 cannot easily work it out. With big numbers it is practically impossible.

### Digital signatures

Run the key pair the other way and you get a **digital signature**. The sender "signs" a message using the **private** key, and anyone can check it with the **public** key. A valid signature proves two things: the message really came from the key's owner, and it has not been altered. Signatures are how your computer trusts software updates.

## Hashing

A **hash function** takes any input, from one word to a whole film, and produces a fixed-length string of characters called a **hash** or **digest**. The important properties:

* The same input always gives the same hash.
* It is **one-way**: you cannot calculate the input from the hash.
* A tiny change to the input changes the hash completely.
* It should be almost impossible to find two different inputs with the same hash (a **collision**).

Here are the SHA-256 hashes of two words that differ only by a capital letter:

```
hello  ->  2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
Hello  ->  185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969
```

Hashes have two main uses. The first is **integrity**: when you download software, the publisher shows a hash. If your downloaded file gives the same hash, it has not been tampered with. The second is **passwords**.

### Hash algorithms to avoid

**MD5** and **SHA-1** are old and have known weaknesses, because researchers found ways to create collisions. They can still be used to spot accidental damage, but not where security matters. Use **SHA-256** or better.

### How passwords should be stored

A website should **never** store your actual password. If it did, anyone who stole the database would have every password. Instead it stores the **hash**. When you log in, it hashes what you typed and compares the two hashes.

But there are two attacks, and good defenders plan for both:

* **Dictionary attack.** The attacker hashes every word in a big list of common passwords and compares the results with the stolen hashes. A match reveals the password. Weak passwords like `sk8boarding` fall in seconds. A list of already-hashed common passwords is sometimes called a **rainbow table**.
* **Same password, same hash.** If two users choose `password123`, both rows in the database look identical, and cracking one cracks both.

The defence is a **salt**: a random value, different for every user, added to the password before hashing and stored beside the hash. Now identical passwords produce different hashes, and a precomputed table is useless. Real systems also use deliberately **slow** password hashes (such as bcrypt, scrypt or Argon2) so that trying billions of guesses takes far too long.

> **Remember:** A **long, unique passphrase** beats a short complicated password. Four or five random words (for example `correct-horse-lantern-quiet`) are easy to remember and very hard to guess. Use a **password manager** so every site has a different one, and turn on **multi-factor authentication** wherever you can.

## Putting it together: what HTTPS does

When you visit `https://example.com`, your browser and the server use almost everything in this lesson:

1. The server presents a **certificate**: a document containing its public key, **signed** by a trusted authority.
2. Your browser checks the signature, so it knows it is talking to the real site.
3. The two sides use a **key exchange** (like Diffie–Hellman) to agree a fresh secret key.
4. From then on they use fast **symmetric encryption** (AES) for everything, with **hashing** checking that nothing is altered on the way.

That is the padlock. A few seconds, and four different cryptographic ideas working together.

## Common mistakes

* **Treating encoding as encryption.** Base64 and hex hide nothing.
* **Inventing your own cipher.** Professionals use proven, public, heavily tested algorithms. Home-made ones nearly always have flaws.
* **Reusing keys or passwords.** One leak then unlocks many things.
* **Storing passwords in plain text, or with fast, unsalted hashes.**
* **Believing "unbreakable" claims.** Strength depends on the key, the implementation and how it is used.

A note on the future: very large **quantum computers**, if they are built, could break RSA and similar systems. Researchers are already creating new **post-quantum** algorithms, and standards bodies are rolling them out. Cryptography keeps moving.

## What to do next

Try the **Cipher Vault** challenges. You will decode, brute-force and reverse the ideas you have just read about, with tools that do the heavy lifting. If you enjoy it, **CyberChef** (free, from GCHQ) is a brilliant playground for encoding and decoding.

```quiz
Q: Which of these is NOT a form of encryption?
- AES
- RSA
+ Base64
- A Vigenère cipher
? Base64 is an encoding. It has no key, so anyone can reverse it. AES, RSA and Vigenère all depend on keys.

Q: Encrypt HELLO with a Caesar shift of 3. What is the ciphertext?
- IFMMP
- EBIIL
+ KHOOR
- HELLO3
? Move each letter 3 places on: H to K, E to H, L to O, L to O, O to R.

Q: Why is a Caesar cipher easy to break?
- It needs a very long key
+ There are only 25 possible keys, so every one can be tried
- It uses numbers
- It is always printed in capitals
? A tiny key space means a brute-force attack finds the answer in seconds.

Q: What does frequency analysis use to break a substitution cipher?
- The length of the message
+ The fact that some letters, like E and T, appear more often than others
- A list of passwords
- The time the message was sent
? Substitution hides which letter is which, but not how often each one appears. The most common ciphertext letter is probably E.

Q: What is the main weakness of symmetric encryption?
- It is very slow
- It cannot be used for large files
+ The two sides must somehow share the secret key safely
- It only works on text
? Symmetric encryption is fast and strong, but sharing the key over an open network is the hard part. Asymmetric methods and key exchange solve that.

Q: In asymmetric encryption, which key do you share publicly?
- The private key
+ The public key
- Both keys
- Neither key
? The public key can be given to anyone and is used to lock. The private key stays secret and unlocks.

Q: Why does HTTPS use both asymmetric and symmetric encryption?
- Because the law requires it
+ Asymmetric agrees a key safely, then fast symmetric encryption protects the data
- Because symmetric encryption is weaker
- To make websites load more slowly
? Each kind covers the other's weakness: asymmetric solves key sharing, and symmetric is fast enough for all the data.

Q: Which statement about a hash function is true?
- You can reverse a hash to get the original input
+ A tiny change in the input produces a completely different hash
- The same input gives a different hash each time
- Hashes always have the same length as the input
? Hashing is one-way, always gives the same output for the same input, and any small change creates a totally different result.

Q: What does a salt do when storing passwords?
- Makes the password longer for the user to remember
+ Makes identical passwords produce different hashes and defeats precomputed tables
- Encrypts the hash with a key
- Reverses the hash
? A random salt per user means two people with the same password get different hashes, and a ready-made table of hashes no longer works.

Q: Which password is the strongest choice?
- P@ssw0rd!
- sk8boarding
+ A long passphrase of several random words, unique to this site
- The same password used everywhere, with a number at the end
? Length and randomness matter most. A unique passphrase held in a password manager is far harder to crack than short complicated or reused passwords.

Q: What does a digital signature prove?
- That the message is secret
+ That the message came from the key owner and was not changed
- That the message was sent quickly
- That the receiver has a password
? Signing with a private key lets anyone verify with the public key. A valid signature proves who sent it and that it is unchanged.
```

```glossary
Cryptography :: The science of keeping information secret and proving it has not been changed.
Plaintext :: The original, readable message.
Ciphertext :: The scrambled version of a message after encryption.
Cipher :: The method or algorithm used to encrypt and decrypt.
Key :: The secret value that controls how a cipher scrambles a message.
Kerckhoffs's principle :: A system should stay secure even if everything except the key is public.
Encoding :: Changing the format of data (such as Base64). It has no key and gives no secrecy.
Encryption :: Scrambling data so that only someone with the right key can read it.
Hashing :: Turning any input into a fixed-length, one-way fingerprint.
Brute force :: Trying every possible key until one works.
Frequency analysis :: Breaking a cipher by counting how often letters appear.
One-time pad :: An unbreakable cipher that uses a random key as long as the message, used only once.
XOR :: A bit operation that outputs 1 when the two bits differ. Doing it twice with the same key restores the original.
Symmetric encryption :: Encryption that uses the same key to lock and unlock, such as AES.
Asymmetric encryption :: Encryption that uses a public key to lock and a private key to unlock, such as RSA.
Public key :: The half of a key pair that can be shared with anyone.
Private key :: The half of a key pair that must be kept secret.
Key exchange :: A method, such as Diffie–Hellman, for two parties to agree a shared secret over an open line.
Digital signature :: A value made with a private key that proves who sent a message and that it is unchanged.
Collision :: Two different inputs that produce the same hash.
Salt :: A random value added to a password before hashing so identical passwords have different hashes.
Certificate :: A signed document that links a website to its public key.
```

```further
CyberChef (GCHQ) | https://gchq.github.io/CyberChef/ | A free in-browser tool for encoding, decoding, hashing and more. Perfect for experimenting.
Khan Academy: Cryptography | https://www.khanacademy.org/computing/computer-science/cryptography | Free, beginner-friendly video lessons on ciphers and modern cryptography.
Cryptopals | https://cryptopals.com/ | Hands-on programming exercises that build up to real attacks. Challenging, so best for later.
dCode | https://www.dcode.fr/en | A large collection of cipher solvers for puzzles and challenges.
TryHackMe | https://tryhackme.com/ | Guided rooms on cryptography and hashing. Free to start.
```
