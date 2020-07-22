reviews = [
  {
    "criticID": "päiviValotie",
    "googleID": 6,
    "stars": 3,
    "link": "Turun Sanomat 13.3.2020",
    "publisher": "Turun Sanomat",
    "name": "Päivi Valotie",
    "elokuvanNimi": "La Belle Époque"
  },
  {
    "criticID": "päiviValotie",
    "googleID": 7,
    "stars": 3,
    "link": "Turun Sanomat 13.3.2020",
    "publisher": "Turun Sanomat",
    "name": "Päivi Valotie",
    "elokuvanNimi": "Weathering with You"
  },
  {
    "criticID": "päiviValotie",
    "googleID": 11,
    "stars": 2,
    "link": "Turun Sanomat 21.2.2020",
    "publisher": "Turun Sanomat",
    "name": "Päivi Valotie",
    "elokuvanNimi": "Se mieletön remppa"
  },
  {
    "criticID": "päiviValotie",
    "googleID": 14,
    "stars": 3,
    "link": "Turun Sanomat 31.1.2020",
    "publisher": "Turun Sanomat",
    "name": "Päivi Valotie",
    "elokuvanNimi": "Little Women"
  },
  {
    "criticID": "päiviValotie",
    "googleID": 17,
    "stars": 3,
    "link": "Turun Sanomat 24.1.2020",
    "publisher": "Turun Sanomat",
    "name": "Päivi Valotie",
    "elokuvanNimi": "Just Mercy"
  },
  {
    "criticID": "päiviValotie",
    "googleID": 18,
    "stars": 4,
    "link": "Turun Sanomat 24.1.2020",
    "publisher": "Turun Sanomat",
    "name": "Päivi Valotie",
    "elokuvanNimi": "Jäähyväiset"
  },
  {
    "criticID": "päiviValotie",
    "googleID": 1,
    "stars": 3,
    "link": "Turun Sanomat 6.3.2020",
    "publisher": "Turun Sanomat",
    "name": "Päivi Valotie",
    "elokuvanNimi": "Elämää kuoleman jälkeen"
  },
  {
    "criticID": "päiviValotie",
    "googleID": 21,
    "stars": 3,
    "link": "Turun Sanomat 14.2.2020",
    "publisher": "Turun Sanomat",
    "name": "Päivi Valotie",
    "elokuvanNimi": "Heinähattu, Vilttitossu ja ärhäkkä koululainen"
  },
  {
    "criticID": "päiviValotie",
    "googleID": 3,
    "stars": 3,
    "link": "Turun Sanomat 7.2.2020",
    "publisher": "Turun Sanomat",
    "name": "Päivi Valotie",
    "elokuvanNimi": "Bombshell"
  },
  {
    "criticID": "päiviValotie",
    "googleID": 24,
    "stars": 2,
    "link": "Turun Sanomat 3.1.2020",
    "publisher": "Turun Sanomat",
    "name": "Päivi Valotie",
    "elokuvanNimi": "Lasse - Best Man"
  },
  {
    "criticID": "päiviValotie",
    "googleID": 25,
    "stars": 2,
    "link": "Turun Sanomat 3.1.2020",
    "publisher": "Turun Sanomat",
    "name": "Päivi Valotie",
    "elokuvanNimi": "Teräsleidit"
  },
  {
    "criticID": "päiviValotie",
    "googleID": 2,
    "stars": 3,
    "link": "Turun Sanomat 6.3.2020",
    "publisher": "Turun Sanomat",
    "name": "Päivi Valotie",
    "elokuvanNimi": "Emma."
  },
  {
    "criticID": "päiviValotie",
    "googleID": 30,
    "stars": 1,
    "link": "Turun Sanomat 21.2.2020",
    "publisher": "Turun Sanomat",
    "name": "Päivi Valotie",
    "elokuvanNimi": "Koiranpäivät"
  },
  {
    "criticID": "päiviValotie",
    "googleID": 35,
    "stars": 3,
    "link": "Turun Sanomat 28.2.2020",
    "publisher": "Turun Sanomat",
    "name": "Päivi Valotie",
    "elokuvanNimi": "The Specials"
  }
];

let compset = [
  {
    "id": "muutKriitikot",
    "reviews": [
      {
        "googleID": 1,
        "count": 4,
        "stars": 3.5
      },
      {
        "googleID": 2,
        "count": 2,
        "stars": 3.5
      },
      {
        "googleID": 3,
        "count": 4,
        "stars": 2.75
      }
    ]
  },
  {
    "id": "riittaVaisanen",
    "reviews": [
      {
        "googleID": "6",
        "count": 4,
        "stars": 3.5
      }
    ]
  }
]

let activeCompsetId = "muutKriitikot"

let sharedMovies = compset
  .filter(c => c.id === activeCompsetId)[0].reviews
  .map(d => d.googleID);

let b = reviews.filter(r => sharedMovies.includes( r.googleID));

console.log(b)