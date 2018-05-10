<template>
  <div class="movie-item">
      <div class="movie-controls">
        <div v-if="isWishlist">
          <button class="button is-success" @click="addToSeenlist(movie)">
            <i class="fa fa-eye" aria-hidden="true"></i>&nbsp;Seen
          </button>
          <!-- <button class="button is-danger" @click="removeFromWishlist(movie.imdbID)"> -->
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
        <img :src="movie.Poster">
      </div>
      <div class="movie-title">{{movie.Title}}</div>
      <div>{{movie.Year}}</div>
  </div>
</template>

<script>
// import store from '@/store'

export default {
  name: 'MovieItem',
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
  data () {
    return {
    }
  },
  methods: {
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
