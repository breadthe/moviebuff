<template>
  <div class="movie-item">
      <div class="movie-controls">
        <div v-if="isWishlist">
          <button class="button is-success" @click="moveToSeenlist(movie.imdbID)">
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

  </div>
</template>

<script>
import store from '@/store'
import MovieDetails from '@/components/MovieDetails'

export default {
  name: 'MovieItem',
  components: {
    'movie-details': MovieDetails
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
      detailsIsOpen: false
    }
  },
  methods: {
    moveToSeenlist: function (imdbID) {
      // if (this.isInWishlist(imdbID)) {
      store.dispatch('moveToSeenlist', imdbID)
      // }
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
