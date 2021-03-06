<template>
  <div class="section search-page">
      <div class="content">
          <div class="movie-results" v-if="searchResults">

            <div class="content has-text-centered">
              Found <strong>{{totalResults}}</strong> results for <strong>"{{searchString}}"</strong>
            </div>

            <pagination-controls
              :search-string="searchString"
              :number-of-pages="numberOfPages"
              :page="page"
              :results-range="resultsRange"
              :total-results="totalResults"
            />
            <hr>

            <div class="">
              <div v-for="movie in searchResults" :key="movie.imdbID" class="movie-item">
                <div class="left-side">
                  <img :src="movie.Poster" v-if="movie.Poster && movie.Poster != 'N/A'">
                  <img src="http://via.placeholder.com/75x100?text=NO+IMAGE" v-else>
                </div>
                <div class="right-side">
                  <div class="movie-year is-size-6">{{movie.Year}}</div>
                  <div class="movie-title is-size-4 has-text-black">{{movie.Title}}</div>
                  <div class="action-buttons">

                    <button
                      class="button"
                      :class="{'is-success': isInSeenlist(movie.imdbID)}"
                      :disabled="isInSeenlist(movie.imdbID)"
                      @click="openSeenDetails(movie.imdbID)"
                    >
                      <i class="fa"
                        :class="{'fa-circle-o-notch fa-spin': addingToSeenlist === movie.imdbID, 'fa-eye': addingToSeenlist !== movie.imdbID && isInSeenlist(movie.imdbID), 'fa-eye-slash': addingToSeenlist !== movie.imdbID && !isInSeenlist(movie.imdbID)}"
                        aria-hidden="true"
                      ></i>&nbsp;Seen
                    </button>

                    <button
                      v-if="!isInSeenlist(movie.imdbID) && !isInWishlist(movie.imdbID)"
                      class="button"
                      @click="addToWishlist(movie.imdbID)"
                    >
                      <i class="fa"
                        :class="{'fa-circle-o-notch fa-spin': addingToWishlist === movie.imdbID, 'fa-heart-o': addingToWishlist !== movie.imdbID}"
                        aria-hidden="true"
                      ></i>&nbsp;Wishlist
                    </button>

                    <button
                      v-if="!isInSeenlist(movie.imdbID) && isInWishlist(movie.imdbID)"
                      class="button is-warning"
                      @click="removeFromWishlist(movie.imdbID)"
                    >
                      <i class="fa"
                        :class="{'fa-circle-o-notch fa-spin': addingToWishlist === movie.imdbID, 'fa-heart': addingToWishlist !== movie.imdbID}"
                        aria-hidden="true"
                      ></i>&nbsp;Wishlist
                    </button>

                  </div>
                </div>
              </div>
            </div>

            <hr>
            <pagination-controls
              :search-string="searchString"
              :number-of-pages="numberOfPages"
              :page="page"
              :results-range="resultsRange"
              :total-results="totalResults"
            />

        </div>

        <div v-else>
          No results for <strong>"{{searchString}}"</strong>
        </div>
      </div>

    <seen-details
      :seen-movie="seenMovie"
      :seen-details-is-open="seenDetailsIsOpen"
      @closeSeenDetails="closeSeenDetails()"
      @addToSeenlist="addToSeenlist($event)"
    ></seen-details>

  </div>
</template>

<script>
import Vue from 'vue'
import store from '@/store'
import axios from 'axios'
import _ from 'lodash'
import { mapState } from 'vuex'
import SeenDetails from '@/components/SeenDetails'
import PaginationControls from '@/components/PaginationControls'

export default {
  name: 'SearchPage',
  components: {
    'seen-details': SeenDetails,
    'pagination-controls': PaginationControls
  },
  data () {
    return {
      searchString: '',
      searchResults: null,
      totalResults: 0,
      resultsPerPage: 10,
      numberOfPages: 0,
      page: 1,
      seenMovie: {},
      seenDetailsIsOpen: false,
      addingToSeenlist: false,
      addingToWishlist: false,
      apikey: Vue.config.ENV.OMDB_API_KEY
    }
  },
  methods: {
    searchMovie: async function () {
      await store.dispatch('toggleSearching', true)
      store.dispatch('toggleSearching', true)
      this.searchString = this.$route.query.q
      this.page = parseInt(this.$route.query.page || 1, 10)
      if (this.searchString) {
        const results = await axios.get('http://www.omdbapi.com/?&apikey=' + `${this.apikey}` + '&type=movie&s=' + `${this.searchString}` + '&page=' + `${this.page}`)
        await store.dispatch('toggleSearching', false)
        if (results.data) {
          this.totalResults = parseInt(results.data.totalResults, 10)
          this.numberOfPages = parseInt(Math.ceil(this.totalResults / this.resultsPerPage), 10)
          this.searchResults = results.data.Search
        }
      }
    },
    openSeenDetails: async function (imdbID) {
      this.addingToSeenlist = imdbID
      const movie = await this.getMovieDetails(imdbID)
      if (movie) {
        this.seenMovie = movie
        this.seenDetailsIsOpen = true
      }
      this.addingToSeenlist = false
    },
    closeSeenDetails: function () {
      this.seenMovie = {}
      this.seenDetailsIsOpen = false
    },
    addToSeenlist: async function (movie) {
      store.dispatch('addToSeenlist', movie)
      this.closeSeenDetails()
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
    removeFromWishlist: function (imdbID) {
      store.dispatch('removeFromWishlist', imdbID)
    },
    isInWishlist: function (imdbID) {
      const ix = _.findIndex(this.wishlist, ['imdbID', imdbID])
      return ix > -1
    },
    getMovieDetails: async function (imdbID) {
      const results = await axios.get('http://www.omdbapi.com/?&apikey=' + `${this.apikey}` + '&type=movie&i=' + `${imdbID}`)
      return results.data || false
    }
  },
  computed: {
    ...mapState(['seenlist', 'wishlist']),
    resultsRange: function () {
      let from, to
      from = this.page === 1 ? 1 : Math.floor((this.page - 1) * this.resultsPerPage + 1)
      to = this.page === this.numberOfPages ? this.totalResults : this.page * this.resultsPerPage
      return {
        from: from,
        to: to
      }
    }
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
