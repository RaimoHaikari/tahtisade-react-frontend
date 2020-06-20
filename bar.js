const movies = [
    {
      "googleID": 1,
      "nimi": "Elämää kuoleman jälkeen",
      "wiki": "",
      "imdb": "tt10385556",
      "kavi": "kavi.elonet_elokuva_1603238",
      "img": "elamaaKuolemanJalkeen.jpg",
      "ensiIlta": "2020-03-06T12:00:00.000Z",
      "stars": [
        4,
        3,
        3,
        4
      ],
      "genre": [
        "Drama"
      ],
      "id": "5ee62b717975e31594df28f4"
    },
    {
      "googleID": 2,
      "nimi": "Emma.",
      "wiki": "Q65091224",
      "imdb": "tt9214832",
      "kavi": "kavi.elonet_elokuva_1613316",
      "img": "emma.jpg",
      "ensiIlta": "2020-03-06T00:00:00.000Z",
      "stars": [
        4,
        3
      ],
      "genre": [
        "Drama",
        "Comedy"
      ],
      "id": "5ee66c04b8ecdc1778082e88"
    },
    {
      "googleID": 3,
      "nimi": "Bombshell",
      "wiki": "",
      "imdb": "tt6394270",
      "kavi": "kavi.elonet_elokuva_1612336",
      "img": "bombshell.jpg",
      "ensiIlta": "2020-02-07T00:00:00.000Z",
      "stars": [
        3,
        2,
        3,
        3,
        3
      ],
      "genre": [
        "Biography",
        "Drama"
      ],
      "id": "5ee66c04b8ecdc1778082e89"
    },
    {
      "googleID": 4,
      "nimi": "Birds of Prey",
      "wiki": "Q57177410",
      "imdb": "tt7713068",
      "kavi": "kavi.elonet_elokuva_1612337",
      "img": "birdsOfPrey.jpg",
      "ensiIlta": "2020-02-07T00:00:00.000Z",
      "stars": [
        2,
        2,
        3
      ],
      "genre": [
        "Action",
        "Adventure",
        "Crime"
      ],
      "id": "5ee66c04b8ecdc1778082e8a"
    },
    {
      "googleID": 5,
      "nimi": "A Hidden Life",
      "wiki": "Q27555348",
      "imdb": "tt5827916",
      "kavi": "kavi.elonet_elokuva_1612339",
      "img": "aHiddenLife.jpg",
      "ensiIlta": "2020-02-07T00:00:00.000Z",
      "stars": [
        4,
        4,
        4,
        2
      ],
      "genre": [
        "Biography",
        "Drama",
        "Romance"
      ],
      "id": "5ee66c8f9915f80c140c0a17"
    },
    {
      "googleID": 6,
      "nimi": "La Belle Époque",
      "wiki": "Q63213666",
      "imdb": "tt9172422",
      "kavi": "kavi.elonet_elokuva_1613385",
      "img": "laBelleEpoque.jpg",
      "ensiIlta": "2020-03-13T00:00:00.000Z",
      "stars": [
        3,
        3,
        2,
        3,
        4,
        5
      ],
      "genre": [
        "Comedy",
        "Drama",
        "Romance"
      ],
      "id": "5ee66c8f9915f80c140c0a18"
    },
    {
      "googleID": 7,
      "nimi": "Weathering with You",
      "wiki": "Q59692464",
      "imdb": "tt9426210",
      "kavi": "kavi.elonet_elokuva_1613384",
      "img": "weatheringWithYou.jpg",
      "ensiIlta": "2020-03-13T00:00:00.000Z",
      "stars": [
        3,
        3,
        4,
        4,
        3,
        4
      ],
      "genre": [
        "Animation",
        "Drama",
        "Family"
      ],
      "id": "5ee66c8f9915f80c140c0a19"
    },
    {
      "googleID": 8,
      "nimi": "Aika jonka sain",
      "wiki": "",
      "imdb": "tt9777796",
      "kavi": "kavi.elonet_elokuva_1612002",
      "img": "aikaJonkaSain.jpg",
      "ensiIlta": "2020-03-13T00:00:00.000Z",
      "stars": [
        3,
        3,
        2,
        2,
        2,
        4,
        3
      ],
      "genre": [
        "Drama"
      ],
      "id": "5ee66c8f9915f80c140c0a1a"
    },
    {
      "googleID": 9,
      "nimi": "Mr. Jones",
      "wiki": "Q30963297",
      "imdb": "tt6828390",
      "kavi": "kavi.elonet_elokuva_1613383",
      "img": "mrJones.jpg",
      "ensiIlta": "2020-03-13T00:00:00.000Z",
      "stars": [
        4,
        4,
        4,
        4,
        3,
        4,
        3
      ],
      "genre": [
        "Biography",
        "Drama",
        "Thriller"
      ],
      "id": "5ee66c8f9915f80c140c0a1b"
    },
    {
      "googleID": 10,
      "nimi": "The Cave",
      "wiki": "Q81924220",
      "imdb": "tt7178226",
      "kavi": "kavi.elonet_elokuva_1613321",
      "img": "theCave.jpg",
      "ensiIlta": "2020-03-12T00:00:00.000Z",
      "stars": [
        5
      ],
      "genre": [
        "Documentary",
        "War"
      ],
      "id": "5ee66c8f9915f80c140c0a1c"
    }
  ]

  const genres = [
    {
      "name": "Action",
      "active": false,
      "id": 0
    },
    {
      "name": "Adventure",
      "active": false,
      "id": 1
    },
    {
      "name": "Animation",
      "active": false,
      "id": 2
    },
    {
      "name": "Biography",
      "active": true,
      "id": 3
    },
    {
      "name": "Comedy",
      "active": true,
      "id": 4
    },
    {
      "name": "Crime",
      "active": false,
      "id": 5
    },
    {
      "name": "Documentary",
      "active": false,
      "id": 6
    },
    {
      "name": "Drama",
      "active": false,
      "id": 7
    },
    {
      "name": "Family",
      "active": false,
      "id": 8
    },
    {
      "name": "History",
      "active": false,
      "id": 9
    },
    {
      "name": "Horror",
      "active": false,
      "id": 10
    },
    {
      "name": "Mystery",
      "active": false,
      "id": 11
    },
    {
      "name": "Romance",
      "active": false,
      "id": 12
    },
    {
      "name": "Sci-Fi",
      "active": false,
      "id": 13
    },
    {
      "name": "Sport",
      "active": false,
      "id": 14
    },
    {
      "name": "Thriller",
      "active": false,
      "id": 15
    },
    {
      "name": "War",
      "active": false,
      "id": 16
    }
  ]

const activeGenres =  genres
    .filter(genre => genre.active === true)
    .map(ac => ac.name)

console.log(activeGenres)
console.log(".................................")

// const found = arr1.some(r=> arr2.indexOf(r) >= 0)
const b = movies.filter((movies) => {

    const gList = movies.genre;
    const found = gList.some(g => activeGenres.indexOf(g) >= 0)

    console.log(gList);
    console.log(found);

    console.log(" ........................................")

    return false;

}) 


