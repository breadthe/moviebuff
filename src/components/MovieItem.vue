<template>
  <div class="movie-item">
      <div class="movie-controls">
        <div v-if="isWishlist">
          <button class="button" @click="seenDetailsIsOpen = true">
            <i class="fa fa-eye" aria-hidden="true"></i>&nbsp;Seen
          </button>
          <button class="button is-danger" @click="removeFromWishlist(movie.imdbID)">
            <i class="fa fa-times" aria-hidden="true"></i>&nbsp;Remove
          </button>
        </div>
        <div v-else>
          <button class="button is-danger" @click="removeFromSeenlist(movie.imdbID)">
            <i class="fa fa-times" aria-hidden="true"></i>&nbsp;Remove
          </button>
        </div>
      </div>
      <div class="movie-poster">
        <img :src="movie.Poster" @click="detailsIsOpen = true">
      </div>
      <div @click="detailsIsOpen = true">
        <div class="movie-title">{{movie.Title}}</div>
        <div>{{movie.Year}}</div>
      </div>

      <movie-details :movie="movie" :details-is-open="detailsIsOpen" @closeDetails="detailsIsOpen = false"></movie-details>

      <seen-details
        :seen-movie="movie"
        :seen-details-is-open="seenDetailsIsOpen"
        @closeSeenDetails="seenDetailsIsOpen = false"
        @addToSeenlist="addToSeenlist($event)"
      ></seen-details>

  </div>
</template>

<script>
import store from '@/store'
import MovieDetails from '@/components/MovieDetails'
import SeenDetails from '@/components/SeenDetails'

export default {
  name: 'MovieItem',
  components: {
    'movie-details': MovieDetails,
    'seen-details': SeenDetails
  },
  props: {
    'movie': {
      type: Object,
      required: true
    },
    'is-wishlist': {
      type: Boolean,
      required: false
    }
  },
  data: function () {
    return {
      detailsIsOpen: false,
      seenDetailsIsOpen: false
    }
  },
  methods: {
    addToSeenlist: async function (movie) {
      store.dispatch('addToSeenlist', movie)
      this.closeSeenDetails()
    },
    removeFromWishlist: function (imdbID) {
      this.$emit('removeFromWishlist', this.movie.imdbID)
    },
    removeFromSeenlist: function (imdbID) {
      this.$emit('removeFromSeenlist', this.movie.imdbID)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
