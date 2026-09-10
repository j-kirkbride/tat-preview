/* =========================================================
   TAT — form mail handler
   ---------------------------------------------------------
   Receives a form submission from the website and sends it on
   by SMTP. Speaks SMTP directly over Node's built-in tls
   module — no npm packages, nothing to install, nothing to
   keep updated.

   Run it:      node server/send-mail.js
   Deploy it:   see server/README.md

   Configure it with environment variables:

     SMTP_HOST     e.g. smtp.gmail.com
     SMTP_PORT     465 for implicit TLS (default), or 587
     SMTP_USER     the mailbox that sends
     SMTP_PASS     its password or app password
     MAIL_FROM     the From: address (defaults to SMTP_USER)
     ALLOW_ORIGIN  the site's address, e.g. https://tat.lucidlydigital.com
     PORT          port to listen on (default 8080)
   ========================================================= */

'use strict';

const http = require('http');
const tls = require('tls');
const net = require('net');

const CFG = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
  from: process.env.MAIL_FROM || process.env.SMTP_USER,
  origin: process.env.ALLOW_ORIGIN || '*',
  listen: parseInt(process.env.PORT || '8080', 10)
};

/* Only these addresses can ever be mailed. Without this, anyone who finds
   the endpoint could use it to send mail to anyone — a open relay with
   your name on it. */
const ALLOWED_RECIPIENTS = [
  'tatristorante@aol.com',
  'jkirkbride13@gmail.com'
];

/* ---------- a small SMTP client ---------- */

function smtpSend({ from, to, subject, text, replyTo, attachment }) {
  return new Promise((resolve, reject) => {
    const implicitTLS = CFG.port === 465;
    let socket = implicitTLS
      ? tls.connect({ host: CFG.host, port: CFG.port, servername: CFG.host })
      : net.connect({ host: CFG.host, port: CFG.port });

    let buffer = '';
    let queue = [];
    let done = false;

    const fail = (err) => { if (!done) { done = true; try { socket.destroy(); } catch (e) {} reject(err); } };
    const finish = () => { if (!done) { done = true; try { socket.end(); } catch (e) {} resolve(); } };

    socket.setTimeout(20000, () => fail(new Error('SMTP timed out')));
    socket.on('error', fail);

    // Wait for a reply whose code matches, then run the next step.
    function expect(codes, next) { queue.push({ codes, next }); }

    function onLine(line) {
      // Multi-line replies look like "250-STARTTLS"; only the last has a space.
      if (/^\d{3}-/.test(line)) return;
      const code = parseInt(line.slice(0, 3), 10);
      const step = queue.shift();
      if (!step) return;
      if (!step.codes.includes(code)) return fail(new Error('SMTP said: ' + line));
      try { step.next(); } catch (e) { fail(e); }
    }

    socket.on('data', (chunk) => {
      buffer += chunk.toString('utf8');
      let i;
      while ((i = buffer.indexOf('\r\n')) !== -1) {
        const line = buffer.slice(0, i);
        buffer = buffer.slice(i + 2);
        onLine(line);
      }
    });

    const write = (s) => socket.write(s + '\r\n');

    const upgradeToTLS = () => {
      const plain = socket;
      plain.removeAllListeners('data');
      socket = tls.connect({ socket: plain, servername: CFG.host }, () => {
        socket.on('data', (chunk) => {
          buffer += chunk.toString('utf8');
          let i;
          while ((i = buffer.indexOf('\r\n')) !== -1) {
            const line = buffer.slice(0, i);
            buffer = buffer.slice(i + 2);
            onLine(line);
          }
        });
        expect([250], authenticate);
        write('EHLO tatitalian.net');
      });
      socket.on('error', fail);
    };

    const authenticate = () => {
      expect([334], () => {
        expect([334], () => {
          expect([235], sendEnvelope);
          write(Buffer.from(CFG.pass).toString('base64'));
        });
        write(Buffer.from(CFG.user).toString('base64'));
      });
      write('AUTH LOGIN');
    };

    const sendEnvelope = () => {
      expect([250], () => {
        let n = 0;
        const nextRcpt = () => {
          if (n < to.length) {
            expect([250, 251], nextRcpt);
            write('RCPT TO:<' + to[n++] + '>');
          } else {
            expect([354], () => {
              expect([250], () => { expect([221], finish); write('QUIT'); });
              write(body());
              write('.');
            });
            write('DATA');
          }
        };
        nextRcpt();
      });
      write('MAIL FROM:<' + from + '>');
    };

    const body = () => {
      // A lone "." on a line would end the message early, so escape it.
      const safeText = text.replace(/\r?\n/g, '\r\n').replace(/^\./gm, '..');

      const common = [
        'From: TAT Website <' + from + '>',
        'To: ' + to.join(', '),
        replyTo ? 'Reply-To: ' + replyTo : null,
        'Subject: ' + subject,
        'MIME-Version: 1.0',
        'Date: ' + new Date().toUTCString()
      ].filter(Boolean);

      if (!attachment) {
        return common.concat([
          'Content-Type: text/plain; charset=utf-8'
        ]).join('\r\n') + '\r\n\r\n' + safeText;
      }

      const boundary = 'tat_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
      // Base64 must be wrapped; SMTP lines cannot exceed 998 characters.
      const wrapped = attachment.data.replace(/[^A-Za-z0-9+/=]/g, '').replace(/(.{76})/g, '$1\r\n');
      const filename = attachment.name.replace(/[\r\n"\\]/g, '').slice(0, 120) || 'resume';

      return common.concat([
        'Content-Type: multipart/mixed; boundary="' + boundary + '"'
      ]).join('\r\n') + '\r\n\r\n' + [
        '--' + boundary,
        'Content-Type: text/plain; charset=utf-8',
        'Content-Transfer-Encoding: 7bit',
        '',
        safeText,
        '',
        '--' + boundary,
        'Content-Type: ' + attachment.type + '; name="' + filename + '"',
        'Content-Transfer-Encoding: base64',
        'Content-Disposition: attachment; filename="' + filename + '"',
        '',
        wrapped,
        '--' + boundary + '--',
        ''
      ].join('\r\n');
    };

    if (implicitTLS) {
      expect([220], () => { expect([250], authenticate); write('EHLO tatitalian.net'); });
    } else {
      expect([220], () => {
        expect([250], () => { expect([220], upgradeToTLS); write('STARTTLS'); });
        write('EHLO tatitalian.net');
      });
    }
  });
}

/* ---------- the web endpoint ---------- */

const server = http.createServer((req, res) => {
  const cors = {
    'Access-Control-Allow-Origin': CFG.origin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); return res.end(); }
  if (req.method !== 'POST') { res.writeHead(405, cors); return res.end('POST only'); }

  let raw = '';
  req.on('data', (c) => {
    raw += c;
    if (raw.length > 6 * 1024 * 1024) { req.destroy(); }   // 4 MB file + base64 overhead
  });

  req.on('end', async () => {
    try {
      const payload = JSON.parse(raw);
      const to = (payload.to || []).filter((a) => ALLOWED_RECIPIENTS.includes(a));
      if (!to.length) throw new Error('no allowed recipient');
      if (!payload.text) throw new Error('empty message');

      let attachment = null;
      if (payload.attachment && payload.attachment.data) {
        const a = payload.attachment;
        const bytes = Math.floor(String(a.data).length * 3 / 4);
        if (bytes > 4.5 * 1024 * 1024) throw new Error('attachment too large');
        if (!/^[A-Za-z0-9+/=\s]+$/.test(a.data)) throw new Error('attachment not base64');
        const ok = /\.(pdf|docx?|txt|rtf)$/i.test(a.name || '');
        if (!ok) throw new Error('attachment type not allowed');
        attachment = { name: a.name, type: String(a.type || 'application/octet-stream').replace(/[^\w.+\/-]/g, ''), data: a.data };
      }

      await smtpSend({
        from: CFG.from,
        to,
        subject: payload.subject || 'Message from the TAT website',
        text: payload.text,
        attachment,
        // Replying to the notification replies to the person who wrote in.
        replyTo: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.fields && payload.fields.email || '')
          ? payload.fields.email : null
      });

      res.writeHead(200, Object.assign({ 'Content-Type': 'application/json' }, cors));
      res.end('{"ok":true}');
    } catch (err) {
      console.error('send failed:', err.message);
      res.writeHead(500, Object.assign({ 'Content-Type': 'application/json' }, cors));
      res.end('{"ok":false}');
    }
  });
});

if (!CFG.host || !CFG.user || !CFG.pass) {
  console.error('Missing SMTP settings. Set SMTP_HOST, SMTP_USER and SMTP_PASS.');
  process.exit(1);
}

server.listen(CFG.listen, () => {
  console.log('TAT mail handler listening on port ' + CFG.listen);
  console.log('Sending through ' + CFG.host + ':' + CFG.port + ' as ' + CFG.user);
});
