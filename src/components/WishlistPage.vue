<template>
  <div>
    <section class="section">
      <h1 class="title is-1">Wishlist</h1>
    </section>
    <section class="container movie-grid" v-if="wishlist.length">
      <movie-item
        v-for="movie in wishlist"
        :key="movie.imdbID"
        :movie="movie"
        :is-wishlist="true"
        @openSeenDetails="openSeenDetails($event)"
        @removeFromWishlist="removeFromWishlist($event)"
      ></movie-item>
    </section>
    <section class="container has-text-centered" v-else>
      You don't have any movies in your wishlist
    </section>

    <seen-details
      :seen-movie="seenMovie"
      :seen-details-is-open="seenDetailsIsOpen"
      @closeSeenDetails="seenDetailsIsOpen = false"
      @addToSeenlist="addToSeenlist($event)"
    ></seen-details>

  </div>
</template>

<script>
import Vue from 'vue'
import store from '@/store'
import axios from 'axios'
import MovieItem from '@/components/MovieItem'
import SeenDetails from '@/components/SeenDetails'

export default {
  name: 'WishlistPage',
  components: {
    'movie-item': MovieItem,
    'seen-details': SeenDetails
  },
  data () {
    return {
      seenMovie: {},
      seenDetailsIsOpen: false,
      apikey: Vue.config.ENV.OMDB_API_KEY
    }
  },
  methods: {
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
    removeFromWishlist: function (imdbID) {
      store.dispatch('removeFromWishlist', imdbID)
    },
    getMovieDetails: async function (imdbID) {
      const results = await axios.get('http://www.omdbapi.com/?&apikey=' + `${this.apikey}` + '&type=movie&i=' + `${imdbID}`)
      return results.data || false
    }
  },
  computed: {
    wishlist: function () {
      return store.getters.wishlist
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
