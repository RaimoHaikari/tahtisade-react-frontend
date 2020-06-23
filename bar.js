const genres = [
  {
    "genre": "Comedy",
    "numberOfMovies": 20,
    "numberOfReviews": 83,
    "starsAverage": 3.036144578313253,
    "id": 0
  },
  {
    "genre": "Drama",
    "numberOfMovies": 26,
    "numberOfReviews": 138,
    "starsAverage": 3.3731884057971016,
    "id": 1
  },
  {
    "genre": "Romance",
    "numberOfMovies": 3,
    "numberOfReviews": 19,
    "starsAverage": 3.5,
    "id": 2
  },
  {
    "genre": "Animation",
    "numberOfMovies": 5,
    "numberOfReviews": 16,
    "starsAverage": 2.9375,
    "id": 3
  },
  {
    "genre": "Family",
    "numberOfMovies": 7,
    "numberOfReviews": 26,
    "starsAverage": 2.6923076923076925,
    "id": 4
  },
  {
    "genre": "Biography",
    "numberOfMovies": 6,
    "numberOfReviews": 28,
    "starsAverage": 3.2857142857142856,
    "id": 5
  },
  {
    "genre": "Thriller",
    "numberOfMovies": 3,
    "numberOfReviews": 20,
    "starsAverage": 4.15,
    "id": 6
  },
  {
    "genre": "History",
    "numberOfMovies": 1,
    "numberOfReviews": 1,
    "starsAverage": 4,
    "id": 7
  },
  {
    "genre": "Action",
    "numberOfMovies": 5,
    "numberOfReviews": 22,
    "starsAverage": 2.409090909090909,
    "id": 8
  },
  {
    "genre": "Adventure",
    "numberOfMovies": 7,
    "numberOfReviews": 19,
    "starsAverage": 2.6315789473684212,
    "id": 9
  },
  {
    "genre": "Crime",
    "numberOfMovies": 6,
    "numberOfReviews": 30,
    "starsAverage": 2.8666666666666667,
    "id": 10
  },
  {
    "genre": "Documentary",
    "numberOfMovies": 3,
    "numberOfReviews": 4,
    "starsAverage": 4.25,
    "id": 11
  },
  {
    "genre": "War",
    "numberOfMovies": 3,
    "numberOfReviews": 17,
    "starsAverage": 4,
    "id": 12
  },
  {
    "genre": "Sport",
    "numberOfMovies": 1,
    "numberOfReviews": 6,
    "starsAverage": 3.3333333333333335,
    "id": 13
  },
  {
    "genre": "Horror",
    "numberOfMovies": 3,
    "numberOfReviews": 10,
    "starsAverage": 3.1,
    "id": 14
  },
  {
    "genre": "Sci-Fi",
    "numberOfMovies": 2,
    "numberOfReviews": 8,
    "starsAverage": 3.375,
    "id": 15
  },
  {
    "genre": "Mystery",
    "numberOfMovies": 1,
    "numberOfReviews": 4,
    "starsAverage": 3.25,
    "id": 16
  }
]

function compare( a, b ) {

  let byCol = 'genre'

  if ( a[byCol] < b[byCol] ){
    return -1;
  }
  if ( a[byCol] > b[byCol] ){
    return 1;
  }
  return 0;

}

var People = [
  {Name: "Name", Surname: "Surname"},
  {Name:"AAA", Surname:"ZZZ"},
  {Name: "Name", Surname: "AAA"}
];

function dynamicSort(property) {
  
  var sortOrder = 1;

  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }


  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;

      return result * sortOrder;
  }
}

//console.log(People.sort(dynamicSort("Name")))
//console.log(People.sort(dynamicSort("Surname")));
console.log(People.sort(dynamicSort("-Surname")));