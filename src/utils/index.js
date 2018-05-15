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
  return genres
}

export {
  getMovieGenres,
  getMovieListGenres
}
