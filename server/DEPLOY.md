# Deploying to your own server

This puts the site **and** the mail handler on one box. That's the simpler
arrangement: same origin, so no CORS headers to get wrong, one TLS certificate,
one machine to keep an eye on, and the form posts to a relative path.

The smallest tier anywhere is plenty. This is a static site plus a script that
opens an outbound connection a few times a day — 1 shared CPU and 512 MB is more
than enough. Expect $4–6 a month.

## 1. Point the subdomain at the server

In **Cloudflare** (that's where lucidlydigital.com's DNS lives), add:

    Type    A
    Name    tat
    Content <your server's IPv4 address>
    Proxy   DNS only  (grey cloud)

Grey cloud matters for the next step — Let's Encrypt has to reach the server
directly to issue the certificate. You can switch the proxy on afterwards if you
want Cloudflare's caching; if you do, set **SSL/TLS → Overview → Full (strict)**,
never Flexible.

## 2. Install what's needed

    sudo apt update
    sudo apt install -y nginx nodejs certbot python3-certbot-nginx

Check Node is 18 or newer — `node -v`. The mail handler uses only built-in
modules, so there's nothing to `npm install`, ever.

## 3. Put the site on the box

    sudo mkdir -p /var/www/tat
    # copy the unzipped folder's contents up to the server, e.g.
    rsync -av --delete ./tat-website/ user@your-server:/tmp/tat/
    sudo rsync -av --delete /tmp/tat/ /var/www/tat/
    sudo chown -R www-data:www-data /var/www/tat

`index.html` must sit directly in `/var/www/tat`, with `assets/` beside it. If
`assets/` is missing the photos and logos won't load — that's been the recurring
trap with this site.

## 4. A user for the mail handler

It shouldn't run as root, and it shouldn't run as the web server either.

    sudo useradd --system --no-create-home --shell /usr/sbin/nologin tatmail

## 5. SMTP credentials

    sudo install -m 600 -o tatmail -g tatmail /dev/null /etc/tat-mail.env
    sudo nano /etc/tat-mail.env

Contents:

    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=465
    SMTP_USER=the-sending-mailbox@example.com
    SMTP_PASS=the-app-password
    MAIL_FROM=the-sending-mailbox@example.com
    ALLOW_ORIGIN=https://tat.lucidlydigital.com
    PORT=8080

Mode 600 owned by `tatmail` means only that account and root can read it. **This
file never goes in the repository.** If the repo is public, anything committed
to it is public, and mailbox passwords get scraped out of public repos within
minutes of being pushed.

For Gmail you need an **app password**, not the account password, with
two-factor authentication switched on first. AOL works the same way.

A note on the sending mailbox: don't send *as* the AOL address from a Gmail
server. SPF will fail and the mail will land in spam or be rejected. Either send
through AOL's own SMTP, or send from an address on a domain you control and let
`Reply-To` carry the customer's address — which the handler already sets.

## 6. Start the service

    sudo cp /var/www/tat/server/tat-mail.service /etc/systemd/system/
    sudo systemctl daemon-reload
    sudo systemctl enable --now tat-mail
    sudo systemctl status tat-mail

It restarts on failure and comes back after a reboot. Logs:

    journalctl -u tat-mail -f

## 7. nginx

    sudo cp /var/www/tat/server/nginx.conf.example /etc/nginx/sites-available/tat
    sudo ln -s /etc/nginx/sites-available/tat /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo nginx -t && sudo systemctl reload nginx

## 8. HTTPS

    sudo certbot --nginx -d tat.lucidlydigital.com

Certbot edits the config to redirect http to https and sets up renewal. Confirm
renewal works:

    sudo certbot renew --dry-run

## 9. Switch the forms over

Edit `/var/www/tat/form-config.js`:

    endpoint: "/send"

A relative path, because the site and handler are now on the same domain. From
this point the forms send silently instead of opening the visitor's email
program. Test both — submit one and check the inbox.

If the handler is ever down, the forms fall back to the email program on their
own. Nothing breaks.

## 10. Before you call it live

- **Remove the search-engine blocking.** Delete `robots.txt` and the
  `<meta name="robots" content="noindex, nofollow">` line from all four HTML
  files. Those are there so the preview can't compete with tatitalian.net; leave
  them in and Google will never index the real site either.
- Check `https://tat.lucidlydigital.com` on a phone.
- Submit both forms and confirm the mail arrives at both addresses.

## Updating the site later

    rsync -av --delete ./tat-website/ user@your-server:/tmp/tat/
    sudo rsync -av --delete --exclude server/ /tmp/tat/ /var/www/tat/

Only restart the service if `server/send-mail.js` changed:

    sudo systemctl restart tat-mail

## Spam

The nginx config rate-limits `/send` to 5 submissions a minute per address,
which handles casual abuse. If real spam starts arriving, a hidden honeypot
field is the next step — about ten lines, and it catches most automated
submissions without bothering anyone. Ask and I'll add it.
