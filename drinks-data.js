/* =========================================================
   TAT Ristorante Di Famiglia — drinks data
   ---------------------------------------------------------
   Same shape as menu-data.js, and rendered by the same code
   in script.js. Edit this file to change the drinks list.

     { name: "Peroni", desc: "Optional line.", price: "6.50" }

   Two prices (glass and bottle, say):
     { name: "Chianti, Ruffino",
       prices: [ {label:"Glass", amount:"9"}, {label:"Bottle", amount:"34"} ] }

   Omit price entirely and nothing is shown.
   A menu with hidden:true stays here but is not displayed.
   ========================================================= */

window.TAT_MENU = {

  /* Used in the search results line: "3 drinks matching ..." */
  itemNoun: ["drink", "drinks"],

  globalNote: "We card. Please drink responsibly — and let your server know if you'd like a recommendation to go with your meal.",

  menus: [

  /* =====================================================
     COCKTAILS
     ===================================================== */
  {
    id: "cocktails",
    label: "Cocktails",
    blurb: "A short list, built around Italian liqueur.",
    note: "Full bar. Anything not listed here, just ask your server.",
    sections: [
      { title: "Specialty Cocktails", items: [
        { name: "Key Lime Martini", desc: "Citrus vodka, Tessora limone lime, soda." },
        { name: "Limoncello Spritzer", desc: "Tessora limoncello, cranberry, soda." },
        { name: "Tessora Limoncello", desc: "A classic Italian liqueur, bright lemon with a bold finish." },
        { name: "Tessora Cream al Limone", desc: "Smooth and velvety, with a soft, creamy lemon flavour." }
      ]}
    ]
  },

  /* =====================================================
     WINE
     ===================================================== */
  {
    id: "wine",
    label: "Wine",
    blurb: "Reds, whites and sparkling, by the glass or the bottle.",
    note: "Ask your server about the house rosé, chablis and burgundy.",
    sections: [

      { title: "Red Wines", items: [
        { name: "Chianti, Ruffino", desc: "Medium bodied, spicy, generously flavoured." },
        /* DESCRIPTION REMOVED — the old site described this Chianti as
           "apple, lemon and vanilla", which was copied from a Chardonnay.
           Ask the family for the right tasting note. */
        { name: "Chianti Classico Riserva, Banfi" },
        { name: "Sangiovese", desc: "Rich, smooth and full bodied with a spicy finish." },
        { name: "Cabernet Sauvignon, Red Diamond", desc: "Very smooth, velvety, with ripe blackberry." },
        { name: "Cabernet Sauvignon, Robert Mondavi Private Selection", desc: "Deep, rich, round fruit with a smooth finish." },
        { name: "Merlot, 14 Hands", desc: "Smooth and full bodied, with chocolate and cherry." },
        { name: "Pinot Noir", desc: "Medium bodied, ripe cherry and strawberry." },
        { name: "Red Blend, Apothic", desc: "A fruity blend of syrah, zinfandel and merlot." },
        { name: "Red Blend, 19 Crimes", desc: "Shiraz based, with dark berry, vanilla, chocolate and spice." },
        { name: "Red Sangria", desc: "Balanced red blend with bright fruit." }
      ]},

      { title: "White Wines", items: [
        { name: "Pinot Grigio, Bollini", desc: "Fragrant, with delicate aromas of white flowers." },
        { name: "Pinot Grigio, Folonari", desc: "Crisp citrus with distinctive floral aromas." },
        { name: "Chardonnay, Kendall-Jackson", desc: "Fresh and clean, round floral aromas." },
        { name: "Chardonnay, Kenwood", desc: "Tropical fruit, apricot and mango." },
        /* DESCRIPTION REMOVED — the old site gave this the same note as the
           Chianti Riserva. Needs a real one. */
        { name: "Chardonnay, Sebastiani" },
        { name: "Moscato, Dolce Note", desc: "An exotic fruit bouquet with an elegant finish." },
        /* DESCRIPTION REMOVED — the old site described this Riesling as a
           "balanced red blend", copied from the Red Sangria. */
        { name: "Johannisberg Riesling, Chateau" }
      ]},

      { title: "Blush", items: [
        { name: "White Zinfandel, Beringer", desc: "Fresh, crisp floral bouquet with mellow fruit." }
      ]},

      { title: "Champagne & Sparkling", items: [
        { name: "Korbel Brut", desc: "Lightly dry with a crisp finish." },
        { name: "Mondoro Asti Spumante", desc: "Floral bouquet, soft semi-sweet fruit." },
        { name: "Cinzano Asti Spumante", desc: "Sweet sparkling moscato." }
      ]},

      { title: "House Wines", items: [
        { name: "Rosé, Chablis & Burgundy", desc: "By the glass, half carafe or carafe." }
      ]}
    ]
  },

  /* =====================================================
     BEER
     ===================================================== */
  {
    id: "beer",
    label: "Beer",
    blurb: "Bottles and cans, including a couple from down the road.",
    sections: [

      { title: "Domestic", items: [
        { name: "Budweiser" },
        { name: "Bud Light" },
        { name: "Miller Lite" },
        { name: "Coors Light" },
        { name: "Yuengling" },
        { name: "Yuengling Light" }
      ]},

      { title: "Premium", items: [
        { name: "Michelob Ultra" },
        { name: "Sam Adams Boston Lager" },
        { name: "Blue Moon" }
      ]},

      /* Thirsty Dog is an Akron brewery and Columbus Brewing is four miles
         from the dining room — both were filed under "Imported" on the old
         site. Grouped here instead. Merge back if you'd rather. */
      { title: "Ohio Craft", items: [
        { name: "Columbus Brewing IPA", desc: "6.3% · Columbus, Ohio." },
        { name: "Thirsty Dog Old Leghumper Porter", desc: "Akron, Ohio." }
      ]},

      { title: "Imported", items: [
        { name: "Peroni", desc: "Italy." },
        { name: "Birra Moretti Light", desc: "Italy." },
        { name: "Corona", desc: "Mexico." },
        { name: "Heineken", desc: "Netherlands." }
      ]},

      { title: "IPA", items: [
        { name: "Samuel Adams Rebel IPA", desc: "6.5%" },
        { name: "Goose Island IPA", desc: "5.9%" }
      ]},

      { title: "Non-Alcoholic", items: [
        { name: "O'Doul's" }
      ]}
    ]
  },

  /* =====================================================
     NON-ALCOHOLIC
     ===================================================== */
  {
    id: "beverages",
    label: "Non-alcoholic",
    blurb: "Coffee, tea and soft drinks.",
    sections: [

      { title: "Coffee & Tea", items: [
        { name: "Regular Coffee" },
        { name: "Decaf Coffee" },
        { name: "Hot Tea" },
        { name: "Iced Tea" }
      ]},

      { title: "Soft Drinks", items: [
        { name: "Fountain Soft Drinks", desc: "Free refills. 7up, Dr. Pepper, RC, Diet RC." },
        { name: "Canned Soft Drinks", desc: "Coke, Diet Coke, Diet 7up." },
        { name: "Lemonade" },
        { name: "Perrier", desc: "Bottled sparkling water." }
      ]},

      { title: "Milk", items: [
        { name: "Milk" },
        { name: "Chocolate Milk" }
      ]}
    ]
  }

  ]
};
