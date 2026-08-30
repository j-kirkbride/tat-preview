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
- `assets/` — logos and favicons; `assets/photos/` and `assets/video/` for your photography
- `PHOTOS.md` — the list of photos to supply, with filenames and sizes
- `drinks.html` — drinks list (shell only; content comes from `drinks-data.js`)
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
2. **Family names and roles.** Dolores, Anthony, Michelle, Marianne and their titles are from
   2020 reporting and may well be out of date. There's an HTML comment marking this section.
   Cut it or correct it — don't ship stale roles.
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
