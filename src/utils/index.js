import _ from 'lodash'

const getMovieGenres = function (movie) {
  return movie.Genre.split(', ') || []
}

const getMovieListGenres = function (list) {
  let genres = []
  _.each(list, (movie) => {
    _.each(getMovieGenres(movie), (genre) => {
      const ix = _.findIndex(genres, ['name', genre])
      if (ix < 0) {
        genres.push({ 'name': genre, 'count': 1 })
      } else {
        genres[ix].count++
      }
    })
  })
  return _.sortBy(genres, ['count']).reverse()
}

const getRandomColor = function () {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export {
  getMovieGenres,
  getMovieListGenres,
  getRandomColor
}
