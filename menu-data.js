/* =========================================================
   TAT Ristorante Di Famiglia — menu data
   ---------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE THE MENU.
   Nothing here is markup. menu.html renders whatever is below.

   An item looks like:
     { name: "Baked Lasagna",
       desc: "Optional sentence.",
       price: "24.95",                 // or omit entirely
       prices: [ {label:"Lunch", amount:"18.95"},
                 {label:"Dinner", amount:"26.95"} ],
       tag: "House classic" }          // optional small brass label

   A menu with `hidden: true` is kept in the file but not shown
   on the site. Flip it to false when the menu is in season.
   ========================================================= */

window.TAT_MENU = {

  /* Used in the search results line: "3 dishes matching ..." */
  itemNoun: ["dish", "dishes"],

  /* Shown under the page title, applies to every menu. */
  globalNote: "Gluten-free pasta and pizza crust are available. Consuming raw or undercooked meat or eggs may increase your risk of foodborne illness.",

  menus: [

  /* =====================================================
     DINNER
     ===================================================== */
  {
    id: "dinner",
    label: "Dinner",
    blurb: "The full kitchen. Served every day we're open.",
    note: "Full dinners are served with a cup of minestrone or wedding soup, fresh tossed salad and fresh bread.",
    sections: [

      { title: "Appetizers", items: [
        { name: "Fresh Super Jumbo Shrimp Cocktail", desc: "Three shrimp." },
        { name: "Deep Fried Calamari", desc: "Served with homemade marinara sauce." },
        { name: "Sweet Roast Peppers", desc: "Fresh garlic, imported virgin olive oil and spices. Served hot or cold." },
        { name: "Cheese Fingers", desc: "More than a handful of mozzarella sticks, breaded and fried golden brown. Served with homemade marinara." },
        { name: "Breaded Mushroom Caps", desc: "Served with a side of ranch." },
        { name: "Potato Skins", desc: "Served with sour cream." },
        { name: "10\" Cheese Pizza", desc: "Additional toppings $1.75 each." },
        { name: "10\" White Pizza", desc: "No tomato sauce. A blend of four cheeses and garlic oil." }
      ]},

      { title: "Soups", items: [
        { name: "Minestrone Soup", desc: "Vegetables in a tomato broth, garnished with pasta and parmesan." },
        { name: "Italian Wedding Soup", desc: "Noodles, spinach, meatballs and chicken broth." },
        { name: "French Onion Soup au Gratin", desc: "Pint only." }
      ]},

      { title: "Salads",
        note: "Dressings: poppyseed, bacon, 1000 island, French, ranch, homemade Italian, light Italian, raspberry vinaigrette, balsamic vinaigrette, honey mustard. Blue cheese crumbles or creamy blue cheese add $1.95.",
        items: [
          { name: "Antipasto Salad", desc: "Crisp tossed salad in our own dressing with crumbled bleu cheese, salami, ripe olives, oranges, pepperoncini and a whisper of oregano." },
          { name: "Chef Salad", desc: "Tossed lettuce, tomato wedges, hard-boiled egg, Italian ham, turkey breast, cheddar and provolone." },
          { name: "Chicken Salad", desc: "Grilled or deep-fried chicken strips over lettuce with tomato, onion, shredded cheddar and provolone." },
          { name: "Salmon Salad", desc: "Salmon steak over tossed salad with provolone, cheddar, red onion, tomato and black olive." },
          { name: "Spinach Salad", desc: "Fresh spinach with diced egg, mushrooms, bacon and croutons. Hot or cold bacon dressing." },
          { name: "Greek Salad", desc: "Crisp lettuce with feta, olives, tomatoes, onion, pepperoncini and anchovies." },
          { name: "A La Carte Italian Salad", desc: "Garden salad with pepperoncini, tomatoes and black olives." }
      ]},

      { title: "Italian Specialties",
        note: "Choice of side: french fries, baked potato, sweet potato, salad, wedding soup, minestrone soup, cottage cheese, applesauce, coleslaw, pickled beets, mashed potatoes with gravy, vegetable of the day, homemade spaghetti.",
        items: [
          { name: "Sicilian Delight", tag: "Ten courses", desc: "Salad, homemade soup, homemade spaghetti, veal parmigiana, meatball, Sicilian bread, meat-filled ravioli, homemade Italian sausage, a stuffed shell with ricotta, and spumoni ice cream." },
          { name: "Chicken Cacciatore", desc: "Boneless breast sautéed in imported virgin olive oil and wine with mushrooms, green peppers, onions, fresh garlic and tomato sauce." },
          { name: "Breast of Chicken Parmigiana", desc: "Prepared in our own tomato sauce under provolone. Served with a side of homemade spaghetti." },
          { name: "Boneless Breast of Chicken Piccata", desc: "Lightly coated in seasoned flour, sautéed in butter and lemon sauce." },
          { name: "Boneless Breast of Chicken Marsala", desc: "Seasoned flour, butter, a dash of marsala and fresh mushrooms." },
          { name: "Chicken Livers alla Caruso", desc: "Sautéed in pure olive oil and fresh garlic, served over a bed of pasta." },
          { name: "Steak Sicilian", desc: "Tender slices of beef sautéed in imported virgin olive oil with onions and green peppers, simmered in wine with fresh garlic." },
          { name: "Eggplant Parmigiana", desc: "Layers of sautéed eggplant and provolone with parmesan and our own sauce, baked en casserole. Side of homemade spaghetti." },
          { name: "Homemade Italian Sausage Dinner", desc: "Spicy sausage with green peppers, onions, mushrooms and garlic. Side of homemade spaghetti." },
          { name: "Fresh Veal Piccata", desc: "Seasoned flour, sautéed in butter and lemon sauce." },
          { name: "Fresh Veal Marsala", desc: "Seasoned flour, butter, a dash of marsala and fresh mushrooms." },
          { name: "Veal Cutlet Parmigiana", desc: "Baked en casserole with tomato sauce under melted provolone. Side of homemade spaghetti." }
      ]},

      { title: "Pasta", items: [
        { name: "Homemade Spaghetti", tag: "House classic", desc: "A soft, homemade egg noodle — it cannot be cooked al dente. Choice of tomato sauce with meatball, meat sauce, mushroom sauce or marinara." },
        { name: "Regular Spaghetti", desc: "Choice of tomato sauce with meatball, meat sauce, mushroom sauce or marinara." },
        { name: "Angel Hair Spaghetti", desc: "A very fine noodle. Same sauce choices." },
        { name: "Special Lasagna", tag: "House classic", desc: "Not a traditional lasagna. Homemade egg noodles, rich meat sauce and provolone, baked golden brown." },
        { name: "Baked Lasagna", desc: "Traditional. Wide noodles layered with ground beef, ricotta, tomato sauce and provolone." },
        { name: "Homemade Vegetable Lasagna", desc: "Wide noodles layered with fresh vegetables and ricotta in marinara." },
        { name: "Zita alla Sicilian", desc: "Eggplant, meat and ricotta in tomato sauce made with a blend of three Italian cheeses." },
        { name: "Homemade Ravioli", desc: "Jumbo pasta filled with fresh ground beef or ricotta." },
        { name: "Ravioli & Homemade Spaghetti", desc: "Jumbo ravioli served alongside homemade spaghetti." },
        { name: "Ravioli & Rigatoni", desc: "Jumbo ravioli served alongside rigatoni." },
        { name: "Homemade Gnocchi with Meat Sauce", desc: "Tender dumplings of flour, potato and egg under our homemade meat sauce." },
        { name: "Stuffed Shells", desc: "Shells stuffed with cheese, meat, or half and half, under homemade tomato sauce." },
        { name: "Baked Rigatoni with Meat Sauce", desc: "Baked with melted provolone until golden brown." },
        { name: "Rigatoni", desc: "Choice of tomato sauce with meatball, meat sauce, mushroom sauce or marinara." },
        { name: "Cheese Tortellini", desc: "With white cream sauce or tomato sauce." },
        { name: "Fettuccine Alfredo", desc: "Fettuccine in our homemade alfredo sauce." },
        { name: "Chicken Fettuccine Alfredo", desc: "Sautéed chicken with broccoli, peas and pimentos tossed with fettuccine in alfredo." },
        { name: "Seafood Fettuccine Alfredo", desc: "Shrimp, scallops and crab in homemade alfredo with fettuccine." },
        { name: "Chicken Carbonara", desc: "Fettuccine tossed with bacon, mushrooms and chicken in homemade alfredo." },
        { name: "Chicken Piccata Penne", desc: "Penne tossed with chicken, spinach and red peppers in a lemon butter sauce." },
        { name: "Linguine", desc: "With red or white clam sauce." }
      ]},

      { title: "Specialty Pizzas",
        note: "All specialty pizzas are 14\". No substitutions on toppings.",
        items: [
          { name: "The Godfather", tag: "House classic", desc: "Pepperoni, mushroom, sausage, onion, green pepper, hot pepper, black olive." },
          { name: "TAT Special", desc: "Pepperoni, mushroom, sausage, white onion, banana pepper." },
          { name: "Jimmy's Way", desc: "Meatball, tomato, red onion." },
          { name: "Justin's Pic", desc: "Pepperoni, sausage, red onion, hot peppers." },
          { name: "The All Meaty One", desc: "Pepperoni, Italian sausage, bacon, meatball." },
          { name: "The Big Kahuna", desc: "Ham, pineapple, sliced red onion." },
          { name: "Veggie Pie", desc: "Tomato, mushroom, white onion, green pepper, black olive." }
      ]},

      { title: "Specialty White Pizzas",
        note: "All 14\". Extra virgin olive oil, fresh garlic, ricotta, parmesan and provolone — no red sauce on white pizzas.",
        items: [
          { name: "Bella & Baker's Best", desc: "Chicken, bacon, red onion." },
          { name: "Spinach Special", desc: "Spinach, artichoke, red onion, fresh garlic." },
          { name: "Very Veggie", desc: "Tomato, broccoli, mushroom, red onion, artichoke." },
          { name: "Artichoke Special", desc: "Artichoke, sun-dried tomatoes, red onion." }
      ]},

      { title: "Homemade Pizzas",
        note: "Toppings: Italian sausage, meatball, chicken, pepperoni, bacon, hamburger, ham, anchovy, mushroom, green pepper, banana pepper, jalapeño, hot pepper, spinach, artichoke, broccoli, red onion, white onion, fresh garlic, tomato, sun-dried tomato, pineapple, black olive, green olive.",
        items: [
          { name: "Pizza", desc: "Bubbly hot from the hearth, the old-fashioned way. Made to order with homemade tomato sauce and provolone, the way Papa Pete taught us." },
          { name: "White Pizza", desc: "Four cheeses, no red sauce." }
      ]},

      { title: "Sizzlin' Steaks", items: [
        { name: "Prime Rib au Jus" },
        { name: "Broiled Choice Rib Eye Steak", desc: "The heart of the rib." },
        { name: "Grilled Beef Liver and Onions" }
      ]},

      { title: "Seafood", items: [
        { name: "Shrimp Scampi with Linguine", desc: "Jumbo shrimp sautéed in fresh garlic butter over linguine." },
        { name: "Sicilian Haddock" },
        { name: "Salmon Steak over Linguine" },
        { name: "Baked Haddock in Lemon Butter" },
        { name: "Crab Stuffed Sole" },
        { name: "Maryland Crab Cakes" },
        { name: "Perch Dinner", desc: "Broiled or deep fried." },
        { name: "Deep Fried Shrimp" },
        { name: "Seafood Platter Combination", desc: "Shrimp, haddock, perch, scallops and hush puppies. Broiled or deep fried." }
      ]},

      { title: "Poultry", items: [
        { name: "Golden Fried Chicken", desc: "This old-time favorite is pressure fried with flavor-crisp batter." },
        { name: "Breast of Chicken", desc: "Deep fried with flavor-crisp batter." },
        { name: "Breaded Chicken Tenders" },
        { name: "Sautéed Chicken Livers", desc: "With green peppers, onions and mushrooms." },
        { name: "Fried Chicken Livers", desc: "Lightly battered and deep fried." }
      ]},

      { title: "Sandwiches",
        note: "All sandwiches are served with soup and potato chips.",
        items: [
          { name: "Poor Boy", tag: "Since 1929", desc: "Toasted on a miniature loaf of Italian bread with lettuce, tomato, red onion, capicola ham, salami, provolone, Italian seasoning and hot peppers." },
          { name: "Monster Sandwich", desc: "The Poor Boy with Italian sausage and a hint of tomato sauce." },
          { name: "Big Pete", desc: "Homemade Italian sausage, tomato sauce and sautéed peppers on a miniature loaf of Italian bread." },
          { name: "Meatball Sub", desc: "With melted provolone." },
          { name: "Club Sandwich", desc: "Lettuce, tomato, ham, turkey, bacon, American and provolone, toasted." },
          { name: "Fish Sandwich", desc: "Perch or haddock, fried or broiled." },
          { name: "Hamburger with French Fries", desc: "Add cheese $0.50." }
      ]},

      { title: "Desserts", items: [
        { name: "Spumoni Ice Cream" },
        { name: "Cannoli" },
        { name: "Tiramisu" },
        { name: "Italian Lemon Cream Cake" },
        { name: "Triple Layer Chocolate Cake" },
        { name: "Mixed Berry & Custard Cake" },
        { name: "Carrot Cake" },
        { name: "Cheesecake" },
        { name: "Raspberry Cheesecake" },
        { name: "Chocolate Chip Turtle Cheesecake" }
      ]},

      { title: "À la carte", items: [
        { name: "Sicilian Bread" },
        { name: "Garlic Bread", desc: "Add provolone $1.00." },
        { name: "Meatball" },
        { name: "Homemade Italian Sausage" },
        { name: "Side of Pasta", desc: "Homemade spaghetti, regular spaghetti, rigatoni or angel hair with homemade tomato sauce." },
        { name: "Baked Potato" },
        { name: "Sweet Potato" },
        { name: "French Fries" },
        { name: "Bottle of Homemade Italian Dressing" }
      ]}
    ]
  },

  /* =====================================================
     LUNCH
     ===================================================== */
  {
    id: "lunch",
    label: "Lunch",
    blurb: "Lighter portions, same kitchen. Served until 3:00 PM.",
    note: "All light side orders come with your choice of a cup of soup or salad, and fresh bread.",
    sections: [

      { title: "Appetizers", items: [
        { name: "Sweet Roast Peppers", desc: "Fresh garlic, olive oil and spices." },
        { name: "Fried Calamari" },
        { name: "Fried Cheese Fingers", desc: "More than a handful of mozzarella sticks, breaded and fried golden brown, with zesty marinara." },
        { name: "Fried Mushroom Caps" },
        { name: "Onion Rings" },
        { name: "Potato Skins" },
        { name: "10\" Cheese Pizza" }
      ]},

      { title: "Soup & Salad", items: [
        { name: "Minestrone Soup" },
        { name: "Wedding Soup" },
        { name: "Antipasto Salad", desc: "Crisp tossed salad in our special dressing with crumbled bleu cheese, salami, ripe olives, oranges, pepperoncini, oregano and fresh tomatoes." },
        { name: "Chef's Salad", desc: "Tossed lettuce, tomato wedges, hard-boiled egg, Italian ham, turkey breast, cheddar and provolone." },
        { name: "Chicken Salad", desc: "Grilled or deep-fried chicken strips over lettuce with tomato, onion, shredded cheddar and provolone." },
        { name: "À la Carte Italian Salad", desc: "Topped with tomato, black olives and pepperoncini. Add anchovies or tuna $2.25. Add bleu cheese dressing $1.95." }
      ]},

      { title: "House Favorites",
        note: "Served with one side dish: french fries, salad, wedding soup, minestrone soup, cottage cheese, applesauce, coleslaw, pickled beets, mashed potatoes with gravy, vegetable of the day or homemade spaghetti.",
        items: [
          { name: "Homemade Spaghetti", tag: "House classic", desc: "A soft, homemade egg noodle. Cannot be cooked al dente." },
          { name: "Special Lasagna", tag: "House classic", desc: "Not traditional. Homemade egg noodles, rich meat sauce and provolone, baked golden brown." },
          { name: "Baked Lasagna", desc: "Wide noodles layered with ground beef, ricotta, tomato sauce and provolone." },
          { name: "Baked Rigatoni", desc: "Rich meat sauce topped with provolone." },
          { name: "Stuffed Shells", desc: "Stuffed with mild ricotta or ground beef, baked in tomato sauce." },
          { name: "Cheese Tortellini", desc: "Topped with white cream sauce or tomato sauce." },
          { name: "Fettuccine Alfredo" },
          { name: "Chicken Fettuccine Alfredo", desc: "Sautéed chicken with broccoli, peas and pimentos in alfredo." },
          { name: "Linguine with Red or White Clam Sauce" },
          { name: "Chicken Parmigiana", desc: "Tender breast in our special tomato sauce under provolone. Side of homemade spaghetti." },
          { name: "Chicken Cacciatore", desc: "Sautéed in imported olive oil and wine with mushrooms, green peppers, onions and tomato sauce." },
          { name: "Eggplant Parmigiana", desc: "Layers of sautéed eggplant and provolone with parmesan and our special sauce." },
          { name: "Veal Cutlet Parmigiana", desc: "With a side of pasta." },
          { name: "Grilled Beef Liver & Onions" }
      ]},

      { title: "Steak and Seafood",
        note: "Served with two side dishes.",
        items: [
          { name: "Tip Steak", desc: "With mushrooms." },
          { name: "Ground Sirloin", desc: "With mushrooms and onions." },
          { name: "Broiled or Deep Fried Perch" },
          { name: "Baked White Fish", desc: "With lemon butter." },
          { name: "Chicken Tenders" }
      ]},

      { title: "Sandwiches",
        note: "Served with choice of soup, potato chips or french fries.",
        items: [
          { name: "Poor Boy", tag: "Since 1929", desc: "Imported Italian meats and cheese, lettuce, onion, tomato, spices and peppers with our homemade Italian dressing." },
          { name: "Big Pete", desc: "Homemade Italian sausage, tomato sauce and sautéed peppers on a miniature loaf of Italian bread." },
          { name: "Diamond Jim", desc: "Italian dressing, capicola ham, onion, lettuce, turkey and hot pepper cheese." },
          { name: "Meatball Sub", desc: "With melted provolone." },
          { name: "Club Sandwich", desc: "Turkey breast, ham, bacon, lettuce, tomato and cheese." },
          { name: "Reuben Sandwich", desc: "Stacked corned beef, sauerkraut, swiss and 1000 island on rye." },
          { name: "Fried Chicken and Bacon Sandwich", desc: "Deep-fried boneless breast with bacon and cheese." },
          { name: "Fish Sandwich", desc: "Perch or haddock, fried or broiled." },
          { name: "French Bread Pizza", desc: "With choice of one topping." },
          { name: "Hamburger", desc: "Add cheese $0.50." }
      ]}
    ]
  },

  /* =====================================================
     EARLY BIRD
     ===================================================== */
  {
    id: "early-bird",
    label: "Early Bird",
    blurb: "Wednesday through Saturday, 3:30 – 6:00 PM.",
    note: "Must be seated by 6:00 PM or dinner prices apply. No sharing. Early Bird specials do not apply to groups booking the party room. Every Early Bird meal comes with soup, salad, an entrée and a special dessert.",
    sections: [
      { title: "Pasta", items: [
        { name: "Regular Spaghetti, Homemade Spaghetti or Angel Hair", desc: "Choice of one meatball, meat sauce or mushroom sauce." },
        { name: "Rigatoni with Meatball" },
        { name: "Special Lasagna" },
        { name: "Homemade Ravioli", desc: "Two meat or two cheese." },
        { name: "Cheese Tortellini", desc: "With red or white cream sauce." },
        { name: "Fettuccine Alfredo" },
        { name: "Seafood Fettuccine Alfredo" },
        { name: "Eggplant Parmigiana" }
      ]},
      { title: "From the Kitchen", items: [
        { name: "Chicken Cacciatore" },
        { name: "Chicken Piccata" },
        { name: "Chicken Livers a la Caruso" },
        { name: "Breaded Chicken Tender Strips" },
        { name: "Breaded Veal Cutlet Parmigiana" },
        { name: "Broiled Tip Steak" },
        { name: "Grilled Beef Liver & Onions" },
        { name: "Baked or Deep Fried Perch or White Fish" },
        { name: "Deep Fried Clam Strips" }
      ]}
    ]
  },

  /* =====================================================
     BANQUET
     ===================================================== */
  {
    id: "banquet",
    label: "Banquet",
    blurb: "For the party room. Seats 20 to 125.",
    note: "Call (614) 236-1392 to book. Prices are per person.",
    sections: [

      { title: "Family Style Dinners", items: [
        { name: "Basic Italian", price: "31.95", priceSuffix: "per person",
          desc: "Soup du jour; salad with choice of dressing; rigatoni, spaghetti or mostaccioli; fried or baked chicken; Italian sausage; homemade meatballs; hot bread and butter; ice cream or sherbet." }
      ]},

      { title: "Single Entrée Dinners",
        note: "Lunch service must be seated by 3:00 PM. Dinners include soup, salad, hot vegetable, bread and butter, dessert, and coffee or tea. Soup and dessert are not included at lunch prices. Spumoni ice cream or pie is $1.50 extra.",
        items: [
          { name: "Roast Prime Rib au Jus", desc: "14 oz or more, with pasta or potato.", prices: [{label:"Lunch", amount:"25.95"},{label:"Dinner", amount:"37.95"}] },
          { name: "U.S. Choice Ribeye Steak", desc: "8–10 oz, with pasta or potato.", prices: [{label:"Lunch", amount:"27.95"},{label:"Dinner", amount:"34.95"}] },
          { name: "Fresh Veal Parmigiana", desc: "With homemade spaghetti.", prices: [{label:"Lunch", amount:"26.95"},{label:"Dinner", amount:"31.95"}] },
          { name: "Boneless Chicken Breast Parmigiana", desc: "With homemade spaghetti.", prices: [{label:"Lunch", amount:"17.95"},{label:"Dinner", amount:"28.95"}] },
          { name: "Breaded Veal Cutlet Parmigiana", desc: "With homemade spaghetti.", prices: [{label:"Lunch", amount:"18.95"},{label:"Dinner", amount:"27.95"}] },
          { name: "Baked Stuffed Sole with Crabmeat", prices: [{label:"Lunch", amount:"19.95"},{label:"Dinner", amount:"27.95"}] },
          { name: "Seafood Fettuccine Alfredo", prices: [{label:"Lunch", amount:"19.95"},{label:"Dinner", amount:"27.95"}] },
          { name: "Chicken Fettuccine Alfredo", prices: [{label:"Lunch", amount:"20.95"},{label:"Dinner", amount:"26.95"}] },
          { name: "Boneless Breast of Chicken Marsala", desc: "With pasta or potato.", prices: [{label:"Lunch", amount:"17.95"},{label:"Dinner", amount:"26.95"}] },
          { name: "Boneless Breast of Chicken Piccata", desc: "With pasta or potato.", prices: [{label:"Lunch", amount:"18.95"},{label:"Dinner", amount:"26.95"}] },
          { name: "Chicken Piccata Penne", prices: [{label:"Lunch", amount:"18.95"},{label:"Dinner", amount:"26.95"}] },
          { name: "1/4 Roast Chicken with Rosemary", prices: [{label:"Lunch", amount:"18.95"},{label:"Dinner", amount:"25.95"}] },
          { name: "Baked Lasagna with Rich Meat Sauce", prices: [{label:"Lunch", amount:"18.95"},{label:"Dinner", amount:"26.95"}] },
          { name: "Baked Rigatoni with Rich Meat Sauce", prices: [{label:"Lunch", amount:"18.95"},{label:"Dinner", amount:"26.95"}] },
          { name: "Homemade Gnocchi with Meat Sauce", prices: [{label:"Lunch", amount:"18.95"},{label:"Dinner", amount:"26.95"}] },
          { name: "Linguine with Red or White Clam Sauce", prices: [{label:"Lunch", amount:"18.95"},{label:"Dinner", amount:"26.95"}] },
          { name: "Fettuccine Alfredo", prices: [{label:"Lunch", amount:"18.95"},{label:"Dinner", amount:"25.95"}] },
          { name: "Homemade Spaghetti with Meatball", prices: [{label:"Lunch", amount:"17.95"},{label:"Dinner", amount:"23.95"}] },
          { name: "Angel Hair Spaghetti", desc: "Very fine.", prices: [{label:"Lunch", amount:"17.95"},{label:"Dinner", amount:"23.95"}] },
          { name: "Baked Haddock in Lemon Butter", prices: [{label:"Lunch", amount:"18.95"},{label:"Dinner", amount:"26.95"}] },
          { name: "Baked or Deep Fried Perch", desc: "With tartar sauce.", prices: [{label:"Lunch", amount:"18.95"},{label:"Dinner", amount:"25.95"}] }
      ]},

      { title: "Buffets",
        note: "All dinner buffets include rolls and butter, coffee, tea and dessert. Dessert is not included in the lunch price. Buffet dinners are for parties of 40 or more.",
        items: [
          { name: "One entrée", prices: [{label:"Lunch", amount:"17.95"},{label:"Dinner", amount:"27.95"}] },
          { name: "Two entrées", prices: [{label:"Lunch", amount:"19.95"},{label:"Dinner", amount:"29.95"}] },
          { name: "Three entrées", prices: [{label:"Lunch", amount:"21.95"},{label:"Dinner", amount:"31.95"}] },
          { name: "Four entrées", prices: [{label:"Lunch", amount:"23.95"},{label:"Dinner", amount:"33.95"}] }
      ]},

      { title: "Buffet Entrée Choices", items: [
        { name: "Baked Lasagna" }, { name: "Special Lasagna" },
        { name: "Chicken Carbonara" }, { name: "Chicken Cacciatore", desc: "Hunter style or boneless." },
        { name: "Chicken Piccata Penne" }, { name: "Boneless Chicken Breast Parmigiana" },
        { name: "Boneless Breast of Chicken Piccata" }, { name: "Boneless Breast of Chicken Marsala" },
        { name: "Baked or Fried Chicken" }, { name: "Veal Cutlet Parmigiana" },
        { name: "Italian Sausage with Onions and Green Peppers" },
        { name: "Stuffed Shells", desc: "Meat or cheese." },
        { name: "Fettuccine Alfredo" }, { name: "Rigatoni with Meat Sauce" },
        { name: "Baked Haddock" }
      ]},

      { title: "Buffet Sides",
        note: "Choice of two. All buffets include a bowl of salad with three dressings, rolls and butter, coffee, tea and dessert.",
        items: [
          { name: "Buttered Broccoli" }, { name: "Italian Style Green Beans" },
          { name: "Buttered Corn" }, { name: "Buttered Baby Carrots" },
          { name: "Peas & Carrots" }, { name: "Mixed Vegetables" },
          { name: "Au Gratin Potatoes" }, { name: "Scalloped Potatoes" },
          { name: "Parslied Potatoes" }, { name: "Whipped Potatoes" },
          { name: "Homemade or Regular Spaghetti" }, { name: "Mostaccioli (penne)" },
          { name: "Rigatoni" }
      ]},

      { title: "Hors d'oeuvres",
        note: "Available for carryout by the hundred, $85 – $95. Otherwise priced per piece.",
        items: [
          { name: "Cocktail Meatball", price: "0.80", priceSuffix: "per piece" },
          { name: "Breaded Mushrooms", price: "0.95", priceSuffix: "per piece" },
          { name: "Cheese Fingers", price: "0.95", priceSuffix: "per piece" },
          { name: "Jalapeño Poppers", desc: "Stuffed with cheddar or cream cheese.", price: "0.95", priceSuffix: "per piece" },
          { name: "Cocktail Frank in Puff Pastry", price: "0.95", priceSuffix: "per piece" },
          { name: "Bitesize Sausage", price: "1.00", priceSuffix: "per piece" },
          { name: "Zesty Chicken Drummettes", desc: "With blue cheese sauce for dipping.", price: "1.00", priceSuffix: "per piece" },
          { name: "Bitesize Pizza", price: "MP" },
          { name: "Fresh Sweet Roasted Peppers with Garlic", price: "12.95", priceSuffix: "per order" },
          { name: "Antipasto Tray", price: "12.95", priceSuffix: "per guest" },
          { name: "Hot Hors d'oeuvres, Pizza and Salad", desc: "Choice of three hot hors d'oeuvres.", price: "19.95", priceSuffix: "per person" },
          { name: "8 ft. Poor Boy", desc: "Carry out only. Serves 35 to 50.", price: "150.00" }
      ]},

      { title: "Desserts", items: [
        { name: "Ice Cream or Sherbet Pie", price: "1.95" },
        { name: "Spumoni Ice Cream", price: "3.95" }
      ]}
    ]
  },

  /* =====================================================
     GROUP CARRY OUT
     ===================================================== */
  {
    id: "carry-out",
    label: "Group carry out",
    blurb: "Trays and pans to take home. Carry out only.",
    note: "Order ahead by phone: (614) 236-1392.",
    sections: [

      { title: "Pans", note: "Carry out only.", items: [
        { name: "Baked Lasagna", desc: "Half pan serves 6–10, full pan serves 20–25.", prices: [{label:"Half pan", amount:"85.00"},{label:"Full pan", amount:"160.00"}] },
        { name: "Rigatoni, Ziti or Penne", desc: "Half pan serves 8–15, full pan serves 20–30.", prices: [{label:"Half pan", amount:"70.00"},{label:"Full pan", amount:"135.00"}] },
        { name: "Fettuccine Alfredo", desc: "Half pan serves 8–15, full pan serves 20–30.", prices: [{label:"Half pan", amount:"80.00"},{label:"Full pan", amount:"150.00"}] },
        { name: "Chicken Fettuccine Alfredo", desc: "Half pan serves 8–15, full pan serves 20–30.", prices: [{label:"Half pan", amount:"100.00"},{label:"Full pan", amount:"180.00"}] },
        { name: "Salad", desc: "Half pan serves 8–10, full pan serves 15–20.", prices: [{label:"Half pan", amount:"50.00"},{label:"Full pan", amount:"75.00"}] }
      ]},

      { title: "By the Piece", items: [
        { name: "Fried or Baked Chicken — White", desc: "4–5 oz each.", price: "4.95" },
        { name: "Fried or Baked Chicken — Dark", desc: "4–5 oz each.", price: "3.95" },
        { name: "Boneless Breast of Chicken Piccata", price: "10.95" },
        { name: "Boneless Breast of Chicken Parmigiana", price: "10.95" },
        { name: "Boneless Breast of Chicken Marsala", price: "10.95" },
        { name: "Homemade Meatballs", desc: "4–5 oz each.", price: "2.95" },
        { name: "Homemade Italian Sausage", price: "3.50" },
        { name: "Meat or Cheese Ravioli", price: "5.25" }
      ]},

      { title: "Soups & Extras", items: [
        { name: "Wedding Soup", prices: [{label:"Pint", amount:"7.95"},{label:"Quart", amount:"10.95"}] },
        { name: "Minestrone Soup", prices: [{label:"Pint", amount:"7.95"},{label:"Quart", amount:"10.95"}] },
        { name: "Salad Dressing", price: "7.00", priceSuffix: "per bottle" },
        { name: "8 ft. Poor Boy", desc: "Serves 35–50.", price: "155.00" }
      ]},

      { title: "Trays", items: [
        { name: "Meat Tray", desc: "Salami, capicola, turkey breast, ham or beef." },
        { name: "Cheese Tray", desc: "American, swiss, hot pepper, provolone, cheddar." },
        { name: "Cheese Tray — Large", desc: "Imported provolone, American, swiss, hot pepper, cheddar. Serves up to 60.", price: "200.00" },
        { name: "Combination Meat & Cheese Tray", desc: "Choice of three cubed meats and three cubed cheeses." },
        { name: "Relish Tray", desc: "Assorted vegetables, dip, two kinds of olives and pickles." },
        { name: "Fruit Tray with Dip", desc: "In season. Medium serves up to 30, large up to 60.", prices: [{label:"Medium", amount:"150.00"},{label:"Large", amount:"195.00"}] }
      ]}
    ]
  },

  /* =====================================================
     MOTHER'S DAY — seasonal.
     Set hidden:false in the spring to put this tab back up.
     ===================================================== */
  {
    id: "mothers-day",
    label: "Mother's Day",
    hidden: true,
    blurb: "Our Mother's Day menu.",
    note: "All entrées include choice of soup, salad and bread. Select entrées include an extra side dish.",
    sections: [

      { title: "Appetizers", items: [
        { name: "Super Jumbo Shrimp Cocktail", desc: "Three shrimp.", price: "19.95" },
        { name: "Deep Fried Calamari", price: "16.95" },
        { name: "Sweet Roasted Peppers", desc: "With oil, fresh garlic and spices.", price: "13.95" },
        { name: "Deep Fried Cheese Ravioli", desc: "With marinara sauce.", price: "13.95" },
        { name: "Mozzarella Sticks", desc: "With tomato sauce.", price: "12.95" }
      ]},

      { title: "Entrées", items: [
        { name: "Chicken Carbonara", price: "27.95" },
        { name: "Braised Short Ribs of Beef", desc: "With fresh vegetables.", price: "26.95" },
        { name: "Seafood Fettuccine Alfredo", price: "26.95" },
        { name: "Chicken Fettuccine Alfredo", price: "26.95" },
        { name: "Boneless Breast of Chicken Parmigiana", desc: "With homemade spaghetti.", price: "26.95" },
        { name: "Boneless Breast of Chicken Piccata", price: "25.95" },
        { name: "Eggplant Parmigiana", desc: "With homemade spaghetti.", price: "25.95" },
        { name: "Chicken Piccata Penne", price: "24.95" },
        { name: "Baked Lasagna", price: "24.95" },
        { name: "Special Lasagna", price: "24.95" },
        { name: "Fettuccine Alfredo", price: "24.95" },
        { name: "Homemade Spaghetti", price: "21.95" },
        { name: "Rigatoni", price: "21.50" },
        { name: "Fresh Veal Parmigiana with Eggplant", desc: "With a side of homemade spaghetti.", price: "30.95" },
        { name: "Fresh Veal Piccata", price: "29.95" },
        { name: "Fresh Veal Marsala", price: "29.95" },
        { name: "Veal Parmigiana", desc: "With a side of homemade spaghetti.", price: "25.95" }
      ]},

      { title: "Steaks & Prime Rib", items: [
        { name: "Prime Rib au Jus", price: "35.95" },
        { name: "Steak Sicilian", price: "29.95" }
      ]},

      { title: "Seafood", items: [
        { name: "Sicilian Baked Haddock", price: "30.45" },
        { name: "Baked Haddock in Lemon Butter", price: "28.95" },
        { name: "Super Jumbo Shrimp Scampi over Linguine", price: "27.95" },
        { name: "Salmon over Linguine", price: "27.95" },
        { name: "Maryland Crab Cakes", price: "27.95" },
        { name: "Baked Crab-Stuffed Sole", price: "26.95" }
      ]},

      { title: "Side Dishes", items: [
        { name: "Baked Potato" }, { name: "Sweet Potato" },
        { name: "Mashed Potatoes" }, { name: "Homemade Spaghetti" },
        { name: "Vegetable du jour" }, { name: "Cottage Cheese" },
        { name: "Applesauce" }, { name: "Coleslaw" }, { name: "Pickled Beets" }
      ]}
    ]
  }

  ]
};
