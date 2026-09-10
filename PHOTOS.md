# Photos

## What's in place

Your 17 dish photos are cropped, compressed and live on the site. They're a consistent set
— overhead, on the dark marble — and they hold together well, especially in the gallery,
where the marble reads as one continuous surface running behind the tiles.

| Slot | Photo used |
|---|---|
| Hero slide 1 | Italian sausage dinner |
| Hero slide 2 | Parmigiana platter |
| Hero slide 3 | Seafood fettuccine alfredo |
| Hero slide 4 | Spaghetti with meatball |
| Private parties | Dessert spread · Italian sausage dinner |
| Gallery (15 tiles) | Spaghetti, angel hair, baked rigatoni, zita, chicken marsala, chicken piccata, antipasto salad, chef salad, cannoli, tiramisu, cheesecake, chocolate cake, caramel pecan cheesecake, stuffed shells, strawberry cheesecake |
| Our Story header | The wall sconce beside the framed TAT history |
| Our Story archive strip | Wedding soup · Spumoni · Shrimp scampi |
| Our Story kitchen | Spaghetti with meatball |

A few photos are used in more than one place. That's invisible in practice — the hero is
full-screen and rotating, the parties images are small and side by side.

## Two things to check

**`carrot_cake.jpg` is captioned "Caramel pecan cheesecake."** The photo shows a pale
cheesecake with pecans and a caramel drizzle, which is not what the filename says. I went with
what's visible rather than the filename. If it really is carrot cake, tell me and I'll change
the caption — it's one line in `index.html`.

**`breast_of_eggplant_parmigiana.jpg`** — the filename mixes "breast" and "eggplant", and in
the photo the cutlet is under enough cheese that I can't tell which it is. It's used as a
hero and story image, where nothing is captioned, so no wrong label is showing. Worth
confirming before it goes anywhere with text attached.

## The second batch

The six warm, white-tablecloth photos are from a different, older shoot than the marble set —
softer light, shallower focus. Mixing them into the gallery would have broken the run of
marble, so they've all gone to the Our Story page, where the warm tint pulls them together.

**The sconce photo is now the Our Story header.** It's the only interior shot in anything sent
so far, and the framed picture of the old building is visible beside it. A warm, dim wall with
the restaurant's own history hanging on it beats a plate of food for a page about ninety-six
years on one corner.

The wedding soup, the spumoni and the shrimp scampi fill the three-photo strip below the
timeline. The soup shot has a hand in it, which is the only human presence on the site.

**Everything is now in use.** The stuffed shells and the strawberry cheesecake went into the
gallery, which is now 15 tiles — five rows of three, so nothing is left ragged. They sit in the
last row together, so the shift from marble to white tablecloth reads as one change at the
bottom rather than two odd tiles scattered through the grid.

## Still needed

One slot is empty, showing a "PHOTO COMING" tile:

**`story-poor-boy.jpg`** — the Poor Boy sandwich, shot **portrait** (1200 × 1500). It sits
beside the story about the six-year trademark fight over the name. It's the one dish on the
site with a story attached and there's still no picture of it.

## Worth shooting when you can

The photo set is all plated food, which is why the hero reads as a very tight close-up — a
full-screen 16:9 plate shot on a tall browser window crops in hard. It works, but a hero
really wants width and air. If a camera is ever back in the building:

- **The dining room**, wide, with tables set. Would improve the homepage hero and the parties
  section. The sconce photo has the Our Story header covered.
- **The building from South James Road.** Ninety-six years on one corner and there's no photo
  of it anywhere on the site.
- **Someone from the family**, in the room. The story page talks about four generations and
  shows no faces.
- **The Poor Boy**, portrait.

## Adding a photo later

Save it into `assets/photos/` with the filename above. Nothing else to change — the slot picks
it up. Filenames are case-sensitive on most web servers.

## Optional video

`assets/video/hero.mp4` — if present, plays behind the homepage headline instead of the four
stills. Leave it out and the stills run as a slideshow. Keep it short, silent, under about
8 MB, 1920 × 1080.

## Still on SpotHopper

No photos or video. What remains is the **reservations widget** and the **jobs link** — real
booking tools, not images. If TAT moves off SpotHopper, search the four HTML files for
`tmt.spotapps.co`; there are 29.


## Catering section removed

The homepage catering section was cut at the owner's request — TAT no longer caters offsite.
`catering-table.jpg` was deleted with it; the same dish (zita alla Sicilian) is still in the
gallery, so no photograph was lost.

Worth considering: they do still do **large group meals and carry-out**, and there's a whole
Group carry out menu on the menu page that the homepage no longer points at anywhere. That's a
real revenue line with no route to it from the front page. A short section in the same slot —
"Feeding a crowd" or similar, linking to `menu.html#carry-out` — would fill the gap without
saying the word catering. Not built, since it wasn't asked for.
