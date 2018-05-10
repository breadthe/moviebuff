<template>
  <section class="section">
    <div class="columns">

      <div class="column is-one-fifth">
      </div>

      <div class="column">
        <div class="movie-results" v-if="searchResults">
            {{totalResults}} results
            <hr>
            <div v-for="movie in searchResults" :key="movie.imdbID" class="movie-item">
              <div class="movie-poster">
                <img :src="movie.Poster" v-if="movie.Poster && movie.Poster != 'N/A'">
                <img src="http://via.placeholder.com/75x100?text=NO+IMAGE" v-else>
              </div>
              <div class="movie-title">
                {{movie.Title}} ({{movie.Year}})
                <div class="action-buttons">
                  <button class="button" :class="{'is-success': isInSeenlist(movie.imdbID)}" @click="addToSeenlist(movie.imdbID)">
                    <i class="fa"
                      :class="{'fa-circle-o-notch fa-spin': addingToSeenlist === movie.imdbID, 'fa-eye': addingToSeenlist !== movie.imdbID && isInSeenlist(movie.imdbID), 'fa-eye-slash': addingToSeenlist !== movie.imdbID && !isInSeenlist(movie.imdbID)}"
                      aria-hidden="true"
                    ></i>&nbsp;Seen
                  </button>
                  <button class="button" :class="{'is-warning': isInWishlist(movie.imdbID)}" @click="addToWishlist(movie.imdbID)">
                    <i class="fa"
                      :class="{'fa-circle-o-notch fa-spin': addingToWishlist === movie.imdbID, 'fa-heart': addingToWishlist !== movie.imdbID && isInWishlist(movie.imdbID), 'fa-heart-o': addingToWishlist !== movie.imdbID && !isInWishlist(movie.imdbID)}"
                      aria-hidden="true"
                    ></i>&nbsp;Wishlist
                  </button>
                </div>
              </div>
            </div>
        </div>

        <div v-else>
          No results for "{{searchString}}"
        </div>
      </div>

      <div class="column is-one-fifth">
      </div>

    </div>
  </section>
</template>

<script>
import store from '@/store'
import axios from 'axios'
import _ from 'lodash'
import { mapState } from 'vuex'
import config from '../../config'

export default {
  name: 'SearchPage',
  components: {
  },
  data () {
    return {
      searchString: '',
      searchResults: [],
      totalResults: 0,
      addingToSeenlist: false,
      addingToWishlist: false
    }
  },
  methods: {
    searchMovie: async function () {
      await store.dispatch('toggleSearching', true)
      store.dispatch('toggleSearching', true)
      this.searchString = this.$route.query.q
      const apikey = config.dev.API_KEY
      const results = await axios.get('http://www.omdbapi.com/?&apikey=' + `${apikey}` + '&type=movie&s=' + `${this.searchString}`)
      await store.dispatch('toggleSearching', false)
      if (results.data) {
        this.totalResults = results.data.totalResults
        this.searchResults = results.data.Search
      }
    },
    addToSeenlist: async function (imdbID) {
      this.addingToSeenlist = imdbID
      const movie = await this.getMovieDetails(imdbID)
      if (movie) {
        store.dispatch('addToSeenlist', movie)
      }
      this.addingToSeenlist = false
    },
    isInSeenlist: function (imdbID) {
      const ix = _.findIndex(this.seenlist, ['imdbID', imdbID])
      return ix > -1
    },
    addToWishlist: async function (imdbID) {
      this.addingToWishlist = imdbID
      const movie = await this.getMovieDetails(imdbID)
      if (movie) {
        store.dispatch('addToWishlist', movie)
      }
      this.addingToWishlist = false
    },
    isInWishlist: function (imdbID) {
      const ix = _.findIndex(this.wishlist, ['imdbID', imdbID])
      return ix > -1
    },
    getMovieDetails: async function (imdbID) {
      const apikey = config.dev.API_KEY
      const results = await axios.get('http://www.omdbapi.com/?&apikey=' + `${apikey}` + '&type=movie&i=' + `${imdbID}`)
      return results.data || false
    }
  },
  computed: {
    ...mapState(['seenlist', 'wishlist'])
  },
  created: function () {
    this.searchMovie()
  },
  watch: {
    '$route': 'searchMovie'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
