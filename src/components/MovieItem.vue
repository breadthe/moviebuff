<template>
  <div>
    <div class="movie-item">
        <div class="movie-controls">
          <div v-if="isWishlist">
            <button class="button" @click="openSeenDetails(movie.imdbID)">
              <i class="fa fa-eye" aria-hidden="true"></i>&nbsp;Seen
            </button>
            <button class="button is-danger" @click="removeFromWishlist(movie.imdbID)">
              <i class="fa fa-times" aria-hidden="true"></i>&nbsp;Remove
            </button>
          </div>
          <div v-else>
            <button class="button is-danger" @click="removeConfirm = true">
              <i class="fa fa-times" aria-hidden="true"></i>&nbsp;Remove
            </button>
          </div>
        </div>
        <div class="movie-poster">
          <img :src="movie.Poster" @click="detailsIsOpen = true">
        </div>
        <div class="movie-title-year" @click="detailsIsOpen = true">
          <div class="movie-title">{{movie.Title}}</div>
          <div class="movie-year">{{movie.Year}}</div>
        </div>

        <movie-details :movie="movie" :details-is-open="detailsIsOpen" @closeDetails="detailsIsOpen = false"></movie-details>

    </div>

    <div class="modal" :class="{'is-active': removeConfirm}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Remove From Seen List</p>
          <button class="delete" aria-label="close" @click="removeConfirm = false"></button>
        </header>
        <section class="modal-card-body">
          <p>Are you sure you want to remove <strong>{{movie.Title}}</strong>?</p>
          <p>What has been seen cannot be unseen. By your eyes that is. You can certainly remove it from this list though.</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-danger" @click="removeFromSeenlist(movie.imdbID)">Remove</button>
          <button class="button" @click="removeConfirm = false">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
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
      removeConfirm: false
    }
  },
  methods: {
    openSeenDetails: function (imdbID) {
      this.$emit('openSeenDetails', imdbID)
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
