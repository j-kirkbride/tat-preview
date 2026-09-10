# The form mail handler

`send-mail.js` receives the party enquiry and job application forms and sends
them on by SMTP. It talks SMTP directly using Node's built-in `tls` module —
no npm packages, nothing to install, nothing to keep patched.

## Why this exists at all

A web browser cannot open an SMTP connection. It has no way to. So a form on a
static site cannot email anyone by itself — something on a server has to do it.
That's all this file is.

**GitHub Pages cannot run this.** It only serves files; it does not execute
code. If the site stays on GitHub Pages, you have two options:

1. Host this script somewhere small that does run code, and point the site at
   it (below).
2. Leave `endpoint` empty in `form-config.js`. The forms still work — they open
   the visitor's own email program with every field already filled in and both
   addresses in the To: line. Fewer submissions get through this way, because
   some people abandon at that step, but it needs no server at all.

## Configure

Set these as environment variables wherever you run it:

    SMTP_HOST     smtp.gmail.com          (or your provider's)
    SMTP_PORT     465                     (or 587)
    SMTP_USER     the mailbox that sends
    SMTP_PASS     its password or app password
    MAIL_FROM     the From: address       (defaults to SMTP_USER)
    ALLOW_ORIGIN  https://tat.lucidlydigital.com
    PORT          8080

**Do not put the password in a file in this repository.** If the repo is public
on GitHub, anything committed to it is public too, and mailbox passwords get
scraped from public repos within minutes.

For Gmail you need an **app password**, not the account password, and two-factor
authentication has to be on first. AOL is the same — a third-party app password
rather than the mailbox one.

## Run it

    SMTP_HOST=smtp.gmail.com \
    SMTP_USER=you@gmail.com \
    SMTP_PASS=your-app-password \
    ALLOW_ORIGIN=https://tat.lucidlydigital.com \
    node server/send-mail.js

Then set `endpoint` in `form-config.js` to wherever it's reachable, e.g.
`https://forms.lucidlydigital.com/send`.

## Where to host it

Anywhere that runs Node. A small always-on box, or a serverless platform — the
handler is a plain `http` server, so it adapts to Cloudflare Workers, a Netlify
Function, or a Render/Railway service with very little change.

If you move the site off GitHub Pages to a host with cPanel, that host almost
certainly has PHP, and a dozen-line PHP script would do the same job with
nothing to keep running. Ask and I'll write it.

## What it will and won't send

There's a hard-coded allow list of recipients near the top:

    tatristorante@aol.com
    jkirkbride13@gmail.com

Only those addresses can ever be mailed, whatever a request asks for. Without
that, anyone who found the endpoint could use it to send mail to anyone, from
your mailbox. Add addresses there and nowhere else.

The Reply-To is set to whoever filled in the form, so hitting reply in the
inbox writes back to the customer rather than to the website.

## Worth adding before it goes live

This handler has no spam protection. A public form endpoint will eventually be
found by bots. Options, cheapest first:

- A honeypot field, hidden with CSS, that real people never fill in — reject
  anything that has it filled. About ten lines.
- Rate limiting by IP.
- Cloudflare Turnstile, which is free and less irritating than reCAPTCHA.

Say the word and I'll add the honeypot; it's the best effort-to-benefit of the
three.
