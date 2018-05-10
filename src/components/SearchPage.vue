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
                  <button class="button" :class="{'is-success': isInSeenlist(movie.imdbID)}" @click="addToSeenlist(movie)">
                    <i class="fa" :class="{'fa-eye': isInSeenlist(movie.imdbID), 'fa-eye-slash': !isInSeenlist(movie.imdbID)}" aria-hidden="true"></i>&nbsp;Seen
                  </button>
                  <button class="button" :class="{'is-warning': isInWishlist(movie.imdbID)}" @click="addToWishlist(movie)">
                    <i class="fa" :class="{'fa-heart': isInWishlist(movie.imdbID), 'fa-heart-o': !isInWishlist(movie.imdbID)}" aria-hidden="true"></i>&nbsp;Wishlist
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

export default {
  name: 'SearchPage',
  components: {
  },
  data () {
    return {
      searchString: '',
      searchResults: [],
      totalResults: 0
    }
  },
  methods: {
    searchMovie: async function () {
      await store.dispatch('toggleSearching', true)
      store.dispatch('toggleSearching', true)
      this.searchString = this.$route.query.q
      const results = await axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=1a10e7c5&type=movie&s=' + `${this.searchString}`)
      await store.dispatch('toggleSearching', false)
      if (results.data) {
        this.totalResults = results.data.totalResults
        this.searchResults = results.data.Search
      }
    },
    addToSeenlist: function (movie) {
      store.dispatch('addToSeenlist', movie)
    },
    isInSeenlist: function (imdbID) {
      const ix = _.findIndex(this.seenlist, ['imdbID', imdbID])
      return ix > -1
    },
    addToWishlist: function (movie) {
      store.dispatch('addToWishlist', movie)
    },
    isInWishlist: function (imdbID) {
      const ix = _.findIndex(this.wishlist, ['imdbID', imdbID])
      return ix > -1
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
