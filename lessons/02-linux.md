---
id: linux
title: The Linux Command Line
order: 2
icon: 🐧
accent: #8dff7a
summary: Move around, read, search and protect files from a terminal, the everyday skill behind servers, hacking tools and most of the internet.
level: Beginner
quest: linux
---

## Why learn the command line?

Most of the internet runs on Linux. The web servers behind the sites you use, the routers in your home, Android phones, and most of the supercomputers in the world all run it. Almost every security tool is built for it too, and when a company is investigating an attack on a server, they will usually be typing commands, not clicking buttons.

The **command line** (also called the **terminal** or **shell**) lets you control a computer by typing instructions. It looks old-fashioned, but it has real advantages. It is fast, it can be automated, it works over a slow connection to a computer on the other side of the world, and it shows you exactly what is happening instead of hiding it behind menus.

By the end of this lesson you will be able to find your way around a Linux file system, read and search files, build a simple **pipeline** to analyse a log, understand file permissions, and explain why running as an administrator all the time is dangerous.

> **Key idea:** A command is a short sentence: *a verb, then the things it acts on*. For example, `ls documents` means "list the contents of the documents folder". Options (starting with `-`) adjust how the verb behaves.

## What exactly is Linux?

**Linux** is an **operating system** (OS), like Windows or macOS: the software that sits between the hardware and your programs. Strictly, Linux is the **kernel**, the core part that talks to the hardware. Around the kernel, different groups bundle other software to make a complete system called a **distribution** (distro). Ubuntu, Debian, Fedora and Kali Linux are all distributions. Kali is popular with security professionals because it comes with many testing tools pre-installed.

Linux is **open source**: anyone can read the code, and thousands of people check it. This is a strength, but it does not mean Linux is automatically secure. Security comes from how a system is set up and looked after.

The **shell** is the program that reads what you type and runs it. The most common one is called **bash**. When you open a terminal you see a **prompt**, which looks something like this:

```
student@trainer:~$
```

That reads: user `student`, on computer `trainer`, currently in `~` (your home folder), and `$` means you are an ordinary user. (An administrator's prompt ends in `#` instead.)

## The file system

Windows has drive letters like `C:`. Linux has one big tree that starts at a single point called the **root**, written `/`. Everything, including every disk and device, is somewhere under it. The important branches are:

| Folder | What lives there |
|---|---|
| `/home` | Each user's personal files (your home folder is `/home/yourname`) |
| `/etc` | System-wide settings, kept as plain text files |
| `/var` | Data that changes: logs, mail, websites. Logs are in `/var/log` |
| `/tmp` | Temporary files that anyone can write to |
| `/bin` and `/usr/bin` | The programs (commands) themselves |
| `/root` | The home folder of the administrator account |

```diagram
/
├── home
│   └── student
│       ├── documents
│       └── notes.txt
├── etc
├── var
│   └── log
│       └── auth.log
└── tmp
```

A key idea in Linux is **"everything is a file"**. Settings, logs and even hardware appear as files, so the same few commands work on almost everything.

> **Remember:** Linux is **case-sensitive**. `Notes.txt` and `notes.txt` are two different files. Many beginners lose time to this.

## Finding your way around

Three commands do most of the work of moving about.

* **`pwd`** (print working directory) tells you where you are right now.
* **`ls`** (list) shows what is in the current folder. Add `-l` for a detailed "long" listing, and `-a` to include hidden files.
* **`cd`** (change directory) moves you somewhere else.

```
student@trainer:~$ pwd
/home/student
student@trainer:~$ ls
documents  downloads  notes.txt  welcome.txt
student@trainer:~$ cd documents
student@trainer:~/documents$ pwd
/home/student/documents
```

### Absolute and relative paths

A **path** is the address of a file. An **absolute path** starts at the root with `/` and works from anywhere, like a full postal address: `/home/student/documents/cv.txt`. A **relative path** starts from where you are now, like "the second door on the left": `documents/cv.txt`.

Some special shortcuts help with relative paths:

| Shortcut | Meaning |
|---|---|
| `.` | The current folder |
| `..` | The folder above this one |
| `~` | Your home folder |
| `/` | The root of the whole file system |

So `cd ..` goes up one level, and `cd` on its own takes you home. If you ever feel lost, `pwd` will tell you where you are.

### Hidden files

Any file whose name starts with a dot is **hidden**: a plain `ls` will not show it. Settings files such as `.bashrc` are hidden to keep your folders tidy. Hiding is not a security feature. `ls -a` shows everything. Attackers often hide their files with a dot, so defenders know to look.

## Reading files

* **`cat file`** prints the whole file on the screen. Good for short files.
* **`head file`** shows the first 10 lines, and **`tail file`** shows the last 10. Logs grow at the bottom, so `tail` shows the latest events. Add `-n 20` to choose how many lines.
* **`less file`** lets you scroll through a long file (press `q` to quit).
* **`wc -l file`** counts the lines in a file.

## Making, copying, moving and deleting

| Command | Does | Example |
|---|---|---|
| `mkdir` | Makes a folder | `mkdir backup` |
| `touch` | Creates an empty file | `touch notes.txt` |
| `cp` | Copies a file | `cp notes.txt backup` |
| `mv` | Moves **or** renames a file | `mv draft.txt final.txt` |
| `rm` | Deletes a file | `rm old.tmp` |

Notice that **renaming is just moving to a new name**, which is why one command does both jobs.

> **Careful:** `rm` is **permanent**. There is no recycle bin and no undo. `rm -r` deletes a whole folder and everything inside it. Always look first with `pwd` and `ls`, read the name twice, and copy anything important somewhere safe. Professionals follow a habit: *check, back up, delete, confirm*.

### Writing into files

The `echo` command prints text. The symbol `>` redirects that text into a file instead of the screen, replacing whatever was there. The symbol `>>` adds to the end instead.

```
echo "hello world" > hello.txt
echo "a second line" >> hello.txt
cat hello.txt
```

## Getting help

Nobody remembers every option. Two habits will take you a long way. Type **`man`** followed by a command to read its manual, for example `man ls`. Most commands also accept `--help`. Press **Tab** to auto-complete file names, and press the **Up arrow** to bring back earlier commands. Experienced users type much less than you would think.

## Searching: find and grep

Two commands are the heart of investigation work.

**`find`** searches for files by **name**:

```
find /home/student -name "passwords_old.txt"
find . -name "*.txt"
find . -type d
```

The `*` is a wildcard that matches anything, so `*.txt` means "every file ending in .txt". `-type d` means folders only.

**`grep`** searches **inside** files for text, and prints the matching lines:

```
grep "Failed password" /var/log/auth.log
grep -i error logfile.txt
grep -c "Failed password" /var/log/auth.log
```

Useful options: `-i` ignores upper and lower case, `-c` counts matching lines instead of printing them, `-n` shows line numbers, `-v` inverts the match (shows lines that do *not* contain the text), and `-r` searches every file in a folder.

## Pipes: joining commands together

This is where the command line becomes powerful. A **pipe**, written `|`, takes the output of one command and feeds it into the next. Small tools, each doing one job, can be chained into something clever.

Useful partners for pipes are: `sort` (sort lines), `uniq -c` (collapse repeated lines and count them, but only neighbouring ones, so sort first), `cut` (pick out one column), and `head` (keep only the first few lines).

### Worked example: who keeps failing to log in?

A log file records login attempts. Each line looks like this:

```
2026-03-02 02:10:08 sshd Failed password for root from 203.0.113.9 port 52000
```

Splitting that line at the spaces, the 9th piece is the IP address. We want to find which IP address failed most often. Build the pipeline one step at a time:

```
grep "Failed" /var/log/auth.log                         only the failed lines
  | cut -d " " -f 9                                     keep column 9: the IP address
  | sort                                                put equal addresses together
  | uniq -c                                             count each address
  | sort -nr                                            biggest count first
  | head -1                                             show only the top one
```

Written as one line, it is:

```
grep "Failed" /var/log/auth.log | cut -d " " -f 9 | sort | uniq -c | sort -nr | head -1
```

The result might read `7 203.0.113.9`: that address failed seven times. A defender would now block it and check whether any attempt succeeded. A job that would take minutes to do by eye takes a second.

> **Tip:** When a pipeline gives a strange answer, run it again with only the first stage. Then add one stage at a time and look at the output after each. That is how experienced engineers debug them too.

## Users and permissions

Linux is a **multi-user** system. Every file has an **owner** and a **group**, and a set of **permissions** that says what each kind of person may do. Look at the long listing:

```
student@trainer:~$ ls -l
-rw-r--r--  1 student student   154 Mar  2 11:40 notes.txt
-rwxr-xr-x  1 student student    34 Mar  2 11:40 backup.sh
drwxr-xr-x  1 student student  4096 Mar  2 11:40 documents
```

The first column is the permission string. Read it in four parts:

```
 -   rw-   r--   r--
 |    |     |     |
type owner group others
```

The first character shows the type: `-` for a file, `d` for a directory (folder). The next nine characters are three groups of three: the **owner**, the **group**, and **everyone else**. In each group, `r` means read, `w` means write (change), `x` means execute (run as a program), and a dash means that permission is missing.

So `-rw-r--r--` means: a file, the owner can read and write it, the group and everyone else can only read it. And `-rw-rw-rw-` means anybody on the system can change the file, which is almost always a mistake.

### Permission numbers

Permissions can also be written as numbers: **read = 4, write = 2, execute = 1**. Add them for each group:

| Number | Means | Typical use |
|---|---|---|
| 600 | Owner read and write; nobody else anything | Private files, SSH keys |
| 644 | Owner read and write; others read | Ordinary files |
| 755 | Owner everything; others read and run | Programs and scripts |
| 777 | Everyone everything | Almost never a good idea |

You change permissions with **`chmod`**. For example `chmod 600 diary.txt`, or `chmod +x script.sh` to switch on the execute permission. A script will refuse to run until it has `x`:

```
student@trainer:~$ ./script.sh
bash: ./script.sh: Permission denied
student@trainer:~$ chmod +x script.sh
student@trainer:~$ ./script.sh
Access granted.
```

The `./` means "the one in this folder". Linux deliberately does not run programs from the current folder unless you say so, which stops someone tricking you into running a harmful program that has the same name as a normal command.

## Administrators and least privilege

Every Linux system has a powerful account called **root** that can do anything, including destroy the whole system. Everyday work should be done as an ordinary user. When something genuinely needs administrator rights, you put **`sudo`** in front of that one command, which means "run this single command as the administrator". Only certain users are allowed to use `sudo`, and each use is recorded in the log.

This is the **principle of least privilege**: every user and program should have only the access it needs and nothing more. If an attacker takes over an account with few privileges, the damage is limited. If they take over root, they have the whole machine. Many real attacks are a two-step: first get any foot in the door, then find a way to **escalate privileges** to root. Careful permissions and careful use of `sudo` are the defence.

## Linux and Windows side by side

If you know Windows commands, these are the nearest equivalents:

| Job | Linux | Windows |
|---|---|---|
| Show where you are | `pwd` | `cd` (with no argument) |
| List files | `ls` | `dir` |
| Show a file | `cat` | `type` |
| Copy / move / delete | `cp` / `mv` / `rm` | `copy` / `move` / `del` |
| Search inside files | `grep` | `findstr` |
| Show IP address | `ip a` | `ipconfig` |

## A first look at scripting

Because commands are just text, you can save a list of them in a file and run them all at once. That file is a **script**. Here is a simple backup script:

```
#!/bin/bash
mkdir -p backup
cp notes.txt backup
echo "Backup finished"
```

The first line, `#!/bin/bash`, tells the system which shell should run it. After `chmod +x`, you can run it with `./backup.sh`. Scripts are how system administrators automate boring jobs, and how defenders analyse thousands of log lines automatically. The same power is why attackers like scripts too, which is why unknown scripts should never be run without reading them first.

## Safe habits

* **Look first.** `pwd` and `ls` cost nothing. A typo with `rm` can cost a lot.
* **Read before you run.** Never paste a command from the internet unless you understand each part.
* **Use the least power needed.** Stay as an ordinary user. Use `sudo` for single commands only.
* **Practise in a safe place.** A practice terminal, a virtual machine, or a learning platform cannot harm anything real. Practise only on systems you own or have permission to use.

## What to do next

Try the **Terminal Trainer** challenges. The terminal there is simulated, so you can make mistakes (even with `rm`) at no risk. When you are comfortable, the free *Linux Fundamentals* rooms on TryHackMe and the *Bandit* game from OverTheWire are the classic next steps.

```quiz
Q: What does the command pwd do?
- Changes your password
+ Prints the folder you are currently in
- Lists the files in a folder
- Deletes the current folder
? pwd stands for "print working directory". It is the first thing to run when you are not sure where you are.

Q: Which of these is an absolute path?
- documents/cv.txt
- ../projects
+ /home/student/notes.txt
- ./script.sh
? An absolute path starts at the root with a forward slash. The others are relative to where you are now.

Q: How can you see hidden files, whose names start with a dot?
- ls -h
+ ls -a
- ls -l
- ls --secret
? The -a option means "all". Hiding a file with a dot only keeps it out of a plain ls. It is not a security feature.

Q: Which command moves a file and can also rename it?
- cp
- rm
+ mv
- touch
? mv moves a file to a new place or a new name. Renaming is just moving to a new name.

Q: What happens when you run rm on a file?
- It goes to a recycle bin and can be restored
+ It is deleted permanently, with no undo
- It is hidden
- It is archived
? Linux has no recycle bin for the command line. Check the name twice and back up anything important.

Q: What does the pipe symbol | do?
- Redirects output into a file
+ Feeds the output of one command into the next command
- Runs two commands at the same time and ignores the output
- Deletes duplicate lines
? A pipe connects commands so that small tools can be chained into a bigger job. The symbol > redirects into a file instead.

Q: Why must you use sort before uniq -c when counting repeated lines?
- uniq only works on numbers
+ uniq only collapses neighbouring identical lines
- sort makes the file smaller
- uniq crashes on unsorted input
? uniq compares each line only with the one before it. Sorting puts identical lines next to each other so they are counted together.

Q: A file shows the permissions -rw-r--r--. Who can change it?
- Everybody
+ Only the owner
- Only the group
- Nobody
? The first group (rw-) is the owner, who can read and write. The group and others have only r, so they can only read.

Q: What does chmod 600 do to a file?
- Lets everyone read and write it
+ Lets only the owner read and write it
- Makes it executable
- Deletes it after 600 seconds
? 6 is 4 (read) plus 2 (write) for the owner, and the two zeros give nobody else any permission. It suits private files.

Q: What is the principle of least privilege?
- Everyone should use the root account so nothing is blocked
+ Users and programs should have only the access they need
- Only the newest users are given permissions
- Passwords should be as short as possible
? If an account with limited privileges is taken over, the damage is limited. Giving everything root access makes a compromise much worse.

Q: A script refuses to run with "Permission denied". What is the most likely fix?
- Delete the script and create it again
+ Give it the execute permission with chmod +x
- Restart the computer
- Rename it with a dot at the start
? A file must have the x permission before it can be run as a program.
```

```glossary
Linux :: An open-source operating system kernel, and the family of systems built around it.
Distribution :: A complete Linux system made by bundling the kernel with other software, such as Ubuntu or Kali.
Terminal :: The window where you type commands.
Shell :: The program that reads your commands and runs them. The most common one is bash.
Prompt :: The text shown before your cursor, such as student@trainer:~$.
Root (directory) :: The top of the Linux file system, written /.
Root (account) :: The all-powerful administrator account on a Linux system.
Path :: The address of a file or folder. It can be absolute (starts with /) or relative.
Hidden file :: A file whose name starts with a dot, which a plain ls does not show.
Pipe :: The | symbol, which passes the output of one command to the next.
Redirect :: Sending output into a file with > (replace) or >> (add to the end).
Wildcard :: A symbol such as * that matches any text, as in *.txt.
Permissions :: Settings that say who may read, write or execute a file.
Owner :: The user who owns a file and has the first set of permissions.
chmod :: The command that changes a file's permissions.
sudo :: A command that runs one other command with administrator rights.
Least privilege :: Giving users and programs only the access they need.
Privilege escalation :: Gaining higher access than you were given, such as moving from an ordinary user to root.
Script :: A text file containing a list of commands that run together.
Log :: A file that records events, such as logins, usually in /var/log.
```

```further
TryHackMe: Linux Fundamentals | https://tryhackme.com/ | Browser-based rooms that teach Linux step by step. Free to start; search for "Linux Fundamentals".
OverTheWire: Bandit | https://overthewire.org/wargames/bandit/ | A free game that teaches the command line through a series of levels. Safe and legal to play.
Linux Journey | https://linuxjourney.com/ | A free, clearly written guide that takes you from the basics onwards.
The Linux Command Line (William Shotts) | https://linuxcommand.org/tlcl.php | A free online book that is good for going deeper.
NCSC CyberFirst | https://www.ncsc.gov.uk/cyberfirst/overview | UK government programmes and courses for young people interested in cyber security.
```
