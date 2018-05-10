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
        @removeFromWishlist="removeFromWishlist($event)"
      ></movie-item>
    </section>
    <section class="container has-text-centered" v-else>
      You don't have any movies in your wishlist
    </section>
  </div>
</template>

<script>
import store from '@/store'
import MovieItem from '@/components/MovieItem'

export default {
  name: 'WishlistPage',
  components: {
    'movie-item': MovieItem
  },
  data () {
    return {
    }
  },
  methods: {
    removeFromWishlist: function (imdbID) {
      store.dispatch('removeFromWishlist', imdbID)
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
