# TAT Ristorante Di Famiglia — website rebuild

## Download the ZIP, not the individual files

Grab **`tat-website.zip`** and unzip it. The site is a folder — the HTML files need the
`assets/` folder sitting next to them, and saving the files one at a time leaves that behind.
That's what causes the photos to show as "PHOTO COMING" and the logos to vanish.

After unzipping you should see this, all at the same level:

    index.html   story.html   menu.html   drinks.html
    styles.css   script.js    menu-data.js   drinks-data.js
    assets/      robots.txt   README.md      PHOTOS.md
    .nojekyll    .gitattributes

Open `index.html`. If `assets/` isn't there beside the HTML, the photos won't load.

Hand-written HTML / CSS / JS. No frameworks, no build step. Open `index.html` in a browser.

## Brand assets

**The logos are embedded directly in `styles.css` as data URIs.** There is no image file to
lose when the site is zipped, copied or moved, which is what was going wrong before. Open
`index.html` on its own and the logos appear.

The same artwork is also saved as normal files in `assets/`, in case you'd rather serve it
that way:

| File | Use |
|---|---|
| `logo-lockup.png` | Full lockup (mark + RISTORANTE DI FAMIGLIA). Header and footer. |
| `logo-mark.png` | The mark alone. Used on the story page's name plate. |
| `app-icon.png` | 512px, white ground. Social sharing / PWA. |
| `apple-touch-icon.png` | 180px, for iOS home screens. |
| `favicon.ico`, `favicon-32.png`, `favicon-16.png` | Browser tab icons. |

To switch from embedded to files, find the `LOGO` block near the top of `styles.css` and
replace each `url('data:image/png;base64,...')` with `url('assets/logo-mark.png')` and
`url('assets/logo-lockup.png')`.

Brand colours sampled from the artwork: red **#ED0827**, green **#039741**. The red replaced
the slightly-off `#E50827` the old site used; both are in `:root` in `styles.css`.

The header and footer both use the full lockup. Because the lockup is about 3:1, it needs
real height for "RISTORANTE DI FAMIGLIA" to stay readable, so the header is taller than a
typical one: **104px at rest, tightening to 76px once you scroll.** Those two numbers are
`--header-h` and `--header-h-stuck` in `:root`. Change them there and everything that has to
sit below the header follows automatically — the menu and drinks tab bars, the story page's
sticky name plate, and the scroll offset for jump links.

The header is built from two tokens that add up to `--header-h`:

    --topbar-h   44px   the gift-card strip
    --nav-h      96px   the row with the logo and navigation

Adjust either and the total recalculates itself.

The story page's name plate still uses the mark on its own. That block is about the T-A-T
letters, and the plate is only 180px wide, so the lockup's tagline would be unreadable there.
Swap `logo-mark` for `logo-lockup` on that element if you'd rather it matched.

The artwork is flat red and green, so the PNGs are palette-quantised: the lockup is 16 KB and
the mark 22 KB, down from 80 KB and 167 KB, with no visible loss. If you ever get hold of the
original vector (.ai/.eps/.svg), an inline SVG would be sharper again and smaller still.

## Files
- `index.html` — homepage
- `story.html` — Our Story / about page
- `menu.html` — food menu (shell only; content comes from `menu-data.js`)
- `menu-data.js` — **the entire food menu lives here**
- `form-config.js` — **where the form emails go**; edit this, nothing else
- `server/` — the mail handler, nginx config, systemd unit, and `DEPLOY.md`
- `assets/` — logos and favicons; `assets/photos/` and `assets/video/` for your photography
- `PHOTOS.md` — the list of photos to supply, with filenames and sizes
- `drinks.html` — drinks list (shell only; content comes from `drinks-data.js`)
- `accessibility.html` — accessibility statement, linked from every footer
- `drinks-data.js` — **the entire drinks list lives here**

`menu.html` and `drinks.html` are the same page with a different data file attached, so any
change to the rendering, tabs or search applies to both.
- `styles.css` — all styling (design tokens live in `:root` at the top)
- `script.js` — nav, hero slideshow, reviews carousel, gallery lightbox, open/closed status, form validation

## Images

**No photos or video come from SpotHopper any more.** Every image slot points at a local file
under `assets/photos/`, and the optional hero video at `assets/video/hero.mp4`.

**PHOTOS.md** lists what's in place and what's still missing.

The 17 supplied dish photos are cropped and compressed into their slots. Four slots still have
no photo — the Poor Boy sandwich and the three-image archive strip on the Our Story page — and
those draw a neutral "PHOTO COMING" tile rather than a broken-image icon, so the site is safe
to demo. Each starts working the moment a file is dropped into `assets/photos/`.

The gallery was rebuilt as a uniform 16:9 grid. It was a mosaic with double-height and
double-width tiles, which would have cropped these overhead plate shots badly — every photo in
the set is 16:9, so every tile is now 16:9 too.

What still points at SpotHopper is the **reservations widget** and the **jobs page** — real
booking tools, not images, so they've been left alone. If TAT moves off SpotHopper, search the
four HTML files for `tmt.spotapps.co`; there are 29 of them.

## Design tokens
Edit these in `styles.css`:

    --ink    #14100E   near-black
    --wine   #6E1216   deep sauce red
    --red    #E50827   TAT brand red (from the old site)
    --brass  #C8A24A   aged sign gold
    --ivory  #F7F2E7   page background

Type: Bodoni Moda for display, Jost for body. Jost is a Futura revival — Futura is from
1927, two years before TAT opened.

## Still wired to third parties
Order (order.online), reservations + jobs (spotapps), gift cards (Toast), menu and about
pages (old site URLs). Update these if any of them change.

## ⚠️ Verify the Our Story page before publishing

Most of the history on `story.html` is not on the current TAT website. It's assembled from
published reporting — chiefly a March 2020 CMH Gourmand piece, Columbus Underground, Yelp,
and a WOSU *Columbus Neighborhoods* episode — not from the family. **Have the family read it
and confirm before it goes live.** Specific things to check:

1. **Surname spelling.** Sources use both *Corrova* and *Carrova*. The page uses **Corrova**
   (the more common spelling). Confirm which is right.
2. ~~**Family names and roles.**~~ **Corrected by the owner.** Jimmy Corrova passed away in
   2021 and Anthony in 2022. The restaurant is now run by Jimmy's daughters, Michelle and
   Marianne, and the family section reflects that. Dolores still appears once, in the 1955
   timeline entry, as a historical fact about who opened the second location — not as a claim
   about who works there now. Roles confirmed by the owner: both
   are owners and operators, Marianne front of house and Michelle back of house. One thing
   still open — whether the family wants Jimmy and Anthony acknowledged anywhere on the page
   beyond the passing mention of Jimmy. That's their call, not a design decision.
3. **The pizza date.** The timeline says "1930s" for the first pizza in Columbus. One source
   says 1934; the restaurant just claims "first." Pin down the year if the family knows it.
4. **The Poor Boy trademark.** Confirm TAT still holds it, and check the decade.
5. **The 1955 date** for the second location — one source hedges between 1954 and 1955.
6. **"Ninety-six years"** appears in the hero and closing paragraph. It'll need bumping in 2027.

There's also a mural by local artist Carl Weisenberger in the restaurant depicting the TAT
airline story. Worth photographing and adding to the name section — it's the perfect image
for it.

## Editing the menu

Open `menu-data.js`. It's the only file to touch — no HTML. Each item is one line:

    { name: "Baked Lasagna", desc: "Optional sentence.", price: "24.95" }

Two prices (a lunch and a dinner rate, or half and full pan):

    { name: "Baked Lasagna",
      prices: [ {label:"Lunch", amount:"18.95"}, {label:"Dinner", amount:"26.95"} ] }

Leave `price` out entirely and no price shows. Add `tag: "House classic"` for the small
brass label. A whole menu with `hidden: true` stays in the file but doesn't appear on the
site — that's how the Mother's Day menu is set right now. Flip it to `false` in the spring.

Menus are deep-linkable: `menu.html#banquet`, `menu.html#early-bird`, `drinks.html#beer`.

`itemNoun` at the top of each data file sets the word used in the search results line —
"4 dishes matching" on the food menu, "3 drinks matching" on the drinks list.

Descriptions are escaped before rendering, so write a real character (·, é, "), not an HTML
entity (`&middot;`) — an entity will show up literally on the page.

### ⚠️ Most dishes have no prices

Your current site shows no prices at all on the lunch, dinner or early bird menus — only the
banquet, carry-out and Mother's Day menus are priced, and those prices are carried over here
as-is. Guests almost always want to see prices before booking, and it's the single most
common complaint about restaurant sites. Add them in `menu-data.js` and they'll appear with
a dotted leader running out to the figure, the way a printed menu sets them.

Also worth confirming before launch: the banquet and carry-out prices scraped from the old
site may be stale, and a few descriptions had typos that were corrected here (e.g.
"tomtoes", "Sherbert", "Fettucine").

### ⚠️ Errors found in the old drinks list

While transcribing, several tasting notes on the old site turned out to be copied from the
wrong wine. Rather than invent replacements, those descriptions were **removed** and marked
with a comment in `drinks-data.js`. Please supply the right ones:

1. **Chianti Classico Riserva, Banfi** — was described as "apple, lemon and vanilla", which
   is the note from a Chardonnay.
2. **Chardonnay, Sebastiani** — had that same Chianti note pasted onto it.
3. **Johannisberg Riesling, Chateau** — was described as a "balanced red blend", copied
   from the Red Sangria. It's a white.

Also corrected: "Miler Lite" → Miller Lite, "Reisling" → Riesling, "Chateu" → Chateau,
"fruti" → fruity, "Moretti's Light" → Birra Moretti, "Samuel Adams Rebel PA" → Rebel IPA.
**Mondoro Asti Spumante was listed twice** — the duplicate was dropped.

Two beers were filed under "Imported" that aren't: Thirsty Dog is from Akron and Columbus
Brewing is a few miles from the dining room. They're now under "Ohio Craft", which seems
worth featuring. Merge them back if you'd rather.

Like the food menu, **the drinks list has no prices anywhere.** Wine by the glass versus the
bottle is the most common thing guests want to know. The `prices` field handles it:

    { name: "Chianti, Ruffino",
      prices: [ {label:"Glass", amount:"9"}, {label:"Bottle", amount:"34"} ] }

## Not done yet
- Prices throughout both menus
- Newsletter form is front-end validation only — connect it to Mailchimp/Klaviyo/etc.
- Real logo file (the wordmark is set in type right now)


## Changelog

**Click-blocking bug (fixed).** `.lightbox` carried the `hidden` attribute but the stylesheet
set `.lightbox { display: grid }`. Author CSS outranks the browser's built-in
`[hidden] { display: none }`, so the lightbox stayed in the layout as a transparent,
full-viewport, `z-index: 120` overlay — it intercepted every click on the page. Fixed with a
global `[hidden] { display: none !important; }` rule plus `pointer-events` guards on both
overlays. If you add another overlay later, give it the same treatment.

**No-JS fallback.** Scroll-reveal sections start at `opacity: 0`, so with JavaScript disabled
the page would have been blank in places. A `<noscript>` block now forces them visible.


**Homepage sections removed** (at your request): the newsletter sign-up, the "What people
say" reviews carousel, and the hero's slide dots and pause button. The hero still cycles
through its four headlines on its own; it just has no visible controls now. The CSS and
JavaScript for all three were deleted too, not just the markup, so nothing dead is left
behind.

One accessibility note on that: with the dots and pause button gone there's no way for a
visitor to stop the hero rotation. Anyone with "reduce motion" turned on in their OS still
gets a static hero, so the main case is covered, but it's worth knowing.


**Sticky-header fix.** The menu and drinks tab bars were sticking to `top: 0`, which put them
underneath the fixed site header — partly hidden before, completely hidden once the header
grew for the full lockup. They now stick to `var(--header-h-stuck)`, as do the story page's
name plate and the scroll offset for menu jump links.


## Gift-card strip

A slim utility bar sits above the navigation on all four pages, holding **Order gift cards**
and **Check balance**. Both point at Toast, the same destinations the old site used. On the
left is a one-line tagline; that's hidden on phones and the two links centre themselves.

The strip folds away when you scroll, so the tightened header stays compact and every sticky
element below it keeps the same offset. The gift-card links are also still in the mobile menu
and the footer.


## Putting it online at tat.lucidlydigital.com

The site is plain HTML, CSS and JS — no build step, no database, no server-side code. Any
static host will serve it. Upload the folder as-is, keeping `assets/` alongside the HTML
files. `index.html` is the entry point.

**Preview safeguards are already in place.** Every page carries
`<meta name="robots" content="noindex, nofollow">` and there's a `robots.txt` that disallows
everything. That stops Google indexing the staging copy and competing with the live
tatitalian.net. **Remove both before launch** — the meta tag is commented in each file's
`<head>`, and `robots.txt` should be deleted or emptied.

### Option A — Netlify (fastest, doesn't touch your existing hosting)

1. Go to app.netlify.com/drop and drag the unzipped folder onto the page. It's live in
   seconds on a random URL.
2. Site configuration → Domain management → Add a domain → `tat.lucidlydigital.com`.
3. Netlify gives you a target like `your-site-name.netlify.app`. At whoever manages DNS for
   lucidlydigital.com, add a CNAME record: host `tat`, value that target.
4. Wait for DNS to propagate (usually minutes, up to a few hours), then let Netlify issue the
   free HTTPS certificate.

### Option B — your existing host, if it has cPanel

1. cPanel → Domains → Create A New Domain → `tat.lucidlydigital.com`. It'll make a folder,
   usually `public_html/tat`.
2. File Manager → open that folder → Upload the zip → Extract. Make sure `index.html` sits at
   the top of that folder, not inside a nested subfolder.
3. cPanel → SSL/TLS Status → run AutoSSL so the subdomain gets HTTPS.

### Optional: put a password on it

If you don't want the unfinished site publicly reachable, Cloudflare Access has a free tier
that puts an email-code gate in front of a subdomain. Netlify offers password protection on
paid plans. Neither is required — the noindex tags mean it won't surface in search either
way.

### Before the preview

Drop the photos into `assets/photos/` first — see PHOTOS.md. Any slot without a file shows a
"PHOTO COMING" tile, which is fine mid-build but you'll want the real ones for a client
meeting.


## Hosting on GitHub Pages

`.nojekyll` is in the root on purpose. Without it, GitHub Pages runs every push through Jekyll,
which ignores files and folders whose names begin with an underscore and can quietly drop
assets. This site needs no build step at all — the empty `.nojekyll` file tells Pages to serve
the files exactly as they are.

`.gitattributes` marks the photos and logos as binary so Git never tries to "fix" line endings
inside them, which would corrupt them.

Both files start with a dot, so your operating system may hide them. On Windows, turn on
**View → Hidden items** in File Explorer before copying files into the repo, or they'll be left
behind.

One repository serves one custom domain, so put this in its own repo rather than a subfolder of
the repo that serves lucidlydigital.com.


## Design revision — lighter palette

Owner feedback was that the site read too dark and was hard to use on a phone. Nine sections
were painted near-black; the page is now light by default and dark is used as an accent.

- Header and the gift-card strip: cream, not near-black, and the header no longer floats
  transparently over the hero.
- Catering, Hours & location, the story page's name block, and both menu pages: cream.
- The marquee is wine red rather than near-black — colour instead of darkness.
- Still dark on purpose: the hero photo (needs a scrim for the white headline to read) and
  the footer, which is the single dark anchor at the end of the page.
- Body text moved from weight 300 to 400. Thin weights look elegant on a desktop monitor and
  turn to mush on a phone in daylight.

On phones specifically: the hero no longer fills the entire screen before you scroll, the
gallery is two across rather than one giant tile per screen, buttons are taller, and small
uppercase labels are floored at a readable size. The map is in full colour now instead of
greyscale.

Checked at 390, 768 and 1280px on all four pages: no sideways scrolling, no text under 11px,
no JavaScript errors.


## Legibility pass

Feedback was that text was hard to read on the cream background. Measured contrast first: ink
on cream is 16.9:1 and the soft body colour 13.8:1, both well past AAA. So it was never the
colours — it was the typeface. Bodoni is a high-contrast didone whose hairline strokes are
designed for display sizes and visually disappear at body sizes. Darkening the colour would
not have fixed a stroke one pixel wide.

What changed:

- Small and mid-size Bodoni moved from weight 400 to 500/600 — headings in the timeline, the
  visit cards, family names, the marquee, pull quotes and captions. The extra font weights are
  now loaded from Google Fonts.
- `font-optical-sizing: auto` turned on, so the variable font thickens its strokes at small
  sizes instead of keeping display hairlines.
- **Menu item names moved from Bodoni to Jost at weight 500.** A didone at 17px repeated down
  a 250-item list is the worst case for this problem; the sans is far steadier there.
- `--muted` darkened from `#6B6058` to `#574E47`, taking small grey labels from 5.5:1 to
  roughly 7:1.
- Lead paragraphs now use the full-strength ink rather than the softened one.

White panels were added behind the densest text, as suggested: the menu and drinks item lists,
the Hours & location cards, the story page's family cards and name plate, and the stats block
on the homepage. White against cream lifts the reading surface, raises contrast to 15.4:1, and
gives the long lists an edge to sit inside. There's a `--surface` token in `:root` if you want
to tint those panels rather than leave them pure white.


## Typeface change

The legibility pass above helped but didn't go far enough — the report was still that text
"gets very thin". At that point weight adjustments had run out of road, because the problem was
the two typefaces themselves:

- **Bodoni Moda** is a didone. Thick stems, hairline everything else. That is the design, and
  it is the wrong design for anything below headline size.
- **Jost** is a Futura revival — geometric, even, and thin by nature. The 1927 Futura tie-in to
  TAT's 1929 opening was a nice idea that lost to readability.

They've been replaced:

    --f-display   Bodoni Moda  ->  Fraunces
    --f-body      Jost         ->  Karla

**Fraunces** is a soft serif with low stroke contrast — it keeps the warm, old-signage feel
without the hairlines. **Karla** is a grotesque with even stroke weight that holds up at body
size far better than a geometric sans.

Both are Google Fonts, both variable. Display sizes were reduced slightly and line-height
opened up, because Fraunces carries more weight per character than Bodoni and needs less size
to read as large. Small uppercase labels, buttons and menu item names moved to weight 600–700.

Both tokens are in `:root` in `styles.css`. Changing typeface again means editing those two
lines and the Google Fonts `<link>` in the four HTML files.


## Owner revisions, second round

Homepage: the marquee line about sauce and pasta became "Your favorites, made from scratch".

Our Story page:
- Header headline was "Ninety-six years on one family's watch" — now "The same family since 1929".
- The name section heading was "The restaurant is named after an airline" — now "Where the
  name comes from". The airline story itself is unchanged; only the headline went.
- The timeline heading was "Four addresses, one kitchen", which promised addresses and then
  listed other things. Now "How we got here".
- Removed the claim that Jimmy taped himself cooking every recipe before heart surgery. It came
  from published reporting and the owner says it isn't true. Worth noting the same source
  supplied several other details on this page — see the verification list above.
- The family section was rewritten. See item 2 in the verification list.


## Forms

Two forms, both opening as a dialog rather than a separate page: **Book a party** in the
parties section, and **Work with us** in the strip along the top of every page. The old
SpotHopper jobs link is gone from all four pages.

Both are built by `script.js` rather than written into the HTML, so the markup isn't repeated
four times. Any element with `data-form="party"` or `data-form="job"` opens the matching
dialog — that's all it takes to add another trigger anywhere.

They validate before sending, trap keyboard focus inside the dialog, close on Escape, and
work on a phone.

### Where the mail goes

`form-config.js` — recipients and the mail endpoint, in one file:

    to:       tatristorante@aol.com, jkirkbride13@gmail.com
    endpoint: (empty)

### The bit that needs a decision

**A browser cannot send SMTP.** It has no way to open an SMTP connection, so a form on a
static site cannot email anyone by itself — something running on a server has to do it.
**GitHub Pages only serves files; it cannot run code.**

So `endpoint` is empty, and the forms currently **fall back to opening the visitor's own email
program** with every field filled in and both addresses in the To: line. That works today, on
GitHub Pages, with no server — but some people abandon at that step, so you'll lose
submissions.

To have them send silently, `server/send-mail.js` is ready to go. It speaks SMTP directly
using Node's built-in `tls` module — no npm packages, as asked.

**Deploying to your own server: follow `server/DEPLOY.md`.** It puts the site and the mail
handler on one box, which is the simpler arrangement — same origin, so no CORS to get wrong,
one certificate, and the form posts to the relative path `/send`. Supplied alongside it:

- `server/nginx.conf.example` — serves the site, proxies `/send`, caches assets, rate-limits
  the form to 5 submissions a minute per address, and blocks public access to `server/`
- `server/tat-mail.service` — systemd unit so the handler restarts on failure and survives a
  reboot, running as its own unprivileged user with credentials in `/etc/tat-mail.env`

The handler refuses to mail anyone outside a hard-coded allow list, so it can't be turned into
an open relay by whoever finds the endpoint.

### Two things worth doing before it's live

**Check the email address.** The forms send to `tatristorante@aol.com`, as instructed. The
contact link on the site says `tatristorante@aol.net`, which is what the old site used. One of
them is wrong — worth confirming which.

**Add spam protection.** A public form endpoint gets found by bots eventually. A hidden
honeypot field is about ten lines and catches most of it; `server/README.md` lists the options.


## Resume uploads

The job form now takes an optional resume: PDF, Word, txt or rtf, up to 4 MB. The browser reads
the file, sends it alongside the answers, and the mail handler attaches it to the email as a
proper MIME attachment.

Three limits have to agree, so if you ever raise one, raise all three:

    script.js                     MAX_FILE            4 MB
    server/send-mail.js           request cap         6 MB (base64 inflates by a third)
    server/nginx.conf.example     client_max_body_size 8m

The handler checks the file extension and that the payload really is base64 before it will
attach anything.

**One thing the fallback can't do.** With `endpoint` empty, the forms hand off to the visitor's
own email program — and a web page cannot attach a file to that. Someone who picks a resume
before the mail handler is live gets told so, and is asked to email it separately or call. Once
you deploy the handler, attachments work properly. It's another reason to get the server up.

## Accessibility statement

`accessibility.html` replaces the footer link that went nowhere. It is written against what the
site verifiably does, not boilerplate — I audited all five pages first and fixed three real
problems found in the process.

It runs about 260 words across four sections, which is in the normal range for a restaurant.
An earlier draft was 646 words; the cut removed a nine-bullet list of technical features
(nobody reads those, and they date the moment the site changes) and a paragraph of commitment
boilerplate. What was kept is the part that does work: the phone number, the admission that the
third-party ordering and booking sites aren't ours, the offer to read the menu aloud, and a
response-time commitment.

The three problems the audit found:

- The homepage had **four `<h1>` elements** (the four rotating hero headlines). All four sat in
  the DOM and a screen reader announced every one. Now a single `<h1>` containing spans.
- Footer headings jumped from `<h2>` to `<h4>`, skipping a level. Now `<h3>`.
- The logo link took its name from a child element. It now carries its own `aria-label`.

After those fixes: one `<h1>` per page, no skipped heading levels, no unnamed interactive
elements, no images without alt text, no untitled iframes.

### Read this before publishing it

**I am not a lawyer and this is not legal advice.** Have your attorney read the page before it
goes live. What I can tell you plainly:

- **A statement on its own protects nobody.** Most ADA website claims against restaurants are
  settled on what the site actually does. The page helps because it shows intent, gives a
  contact route, and commits to a response time — but it is evidence of effort, not a shield.
  The real protection is the site being usable, which is why the audit above mattered more than
  the wording.
- **Do not claim more than is true.** The page says we *aim* at WCAG 2.1 AA and lists where we
  fall short, including that no independent audit has been done. A page claiming full
  conformance that a plaintiff's expert then disproves is worse than having no page at all.
- **The "In the restaurant" section has a placeholder** and an HTML comment marking it. It
  currently says to phone with questions and that service animals are welcome. It does **not**
  claim anything about ramps, doorways, restrooms or parking, because I have not seen the
  building. Fill it in from a real walk-through, or leave it as it is. Publishing an unchecked
  claim about the premises is the thing that causes trouble.
- **The response commitment is five business days.** That is a promise in writing. Shorten it,
  lengthen it, or keep it — but it needs to be one the restaurant will actually keep.
- **Keep the review date current.** It reads 10 September 2026.


## Mobile audit

Prompted by a report of buggy behaviour on iPhone. Audited with real device profiles
(iPhone SE, 13, 13 Pro Max, Pixel 5, iPad) in portrait and landscape, across all five pages.
Nine genuine faults found and fixed:

1. **Body scroll lock didn't work on iOS.** Overlays used `overflow: hidden` on `body`, which
   iOS Safari ignores — the page kept scrolling behind the menu, the lightbox and the forms,
   then jumped to the top when they closed. This was almost certainly the "buggy UI". Replaced
   with a pin-and-restore lock in JS that records the scroll offset, fixes the body, and puts
   it back on close. Verified: opening at 1200px, scrolling behind, closing, returns to 1200px.
2. **No safe-area insets anywhere.** The sticky Call/Reserve/Order bar sat underneath the
   iPhone home indicator, so the bottom of each button couldn't be tapped. Added
   `env(safe-area-inset-*)` to the bottom bar, the header, the mobile menu, the modals and the
   footer clearance.
3. **The menu search box was 14.4px.** iOS zooms the whole page when an input under 16px takes
   focus, and doesn't zoom back out. Now 16px.
4. **Tap targets under Apple's 44pt guidance** — menu tabs at 38px, footer links at 17px,
   arrow links at 27px, social buttons at 42px, gift-card links at 22px. All now at least 44px.
   Inline phone and email links inside sentences are left alone; WCAG exempts those and padding
   them would break the line.
5. **The menu tab strip ran off-screen with no sign it scrolled.** Added a fade at the right
   edge and scroll-snap.
6. **`svh` units with no fallback.** Fine on iOS 15.4+, broken below. Each now has a plain `vh`
   line above it.
7. **Default grey tap flash** replaced with a faint brand tint.
8. **`-webkit-text-size-adjust: 100%`** added — iOS otherwise inflates text in landscape.
9. **`overscroll-behavior: contain`** on overlays, so scrolling to the end of a modal doesn't
   start dragging the page behind it.

One self-inflicted bug found during the work: a blanket find-and-replace rewrote two lines
*inside* the new scroll-lock helper, making it call itself instead of toggling the class. Caught
by testing rather than by reading, which is the argument for testing.

Two regressions caught the same way: raising the gift-card links to 44px made the top strip wrap
to two lines on a 390px screen, and tightening it for that still overflowed at 320px. Both fixed
with tracking adjustments and by dropping the gift icon below 360px.

Final state: no horizontal overflow, no tap target under 44px outside inline text, no JS errors,
on all five pages across five device profiles in both orientations.

**What this testing can't cover.** The audit ran in Chromium with iPhone device emulation, not
in Safari on a real handset. Emulation gets viewport, touch and pixel density right; it does not
reproduce WebKit's own rendering quirks, and `env(safe-area-inset-*)` reports 0 in the sandbox
because there's no notch to measure. The safe-area fixes are correct by construction but have
not been seen on real glass. Worth a look on the actual phone.


## Reservations moved off SpotHopper

All 25 reservation links now point at:

    https://reservations-lyart.vercel.app/

Across five files: index (6), story (5), menu (5), drinks (5), accessibility (4). Every one was
the same URL, so it was a single find-and-replace.

**No reference to SpotHopper remains anywhere in the site.** Photos, video, jobs and now
reservations have all been moved off. The only thing still on an outside service is ordering
(order.online) and gift cards (Toast), both of which are deliberate.

If the reservation URL ever changes again, it's the same five HTML files and nothing else — no
CSS, no JS, no data files:

    grep -rl 'reservations-lyart.vercel.app' *.html | \
      xargs sed -i 's|https://reservations-lyart.vercel.app/|NEW_URL|g'
