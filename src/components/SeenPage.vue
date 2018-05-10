<template>
  <div class="">
    <section class="section">
      <h1 class="title is-1">Seen Movies</h1>
    </section>
    <section class="container movie-grid">
      <movie-item
        v-for="movie in seenlist"
        :key="movie.imdbID"
        :movie="movie"
        :is-wishlist="false"
        @removeFromSeenlist="removeFromSeenlist($event)"
      ></movie-item>
    </section>
  </div>
</template>

<script>
import store from '@/store'
import MovieItem from '@/components/MovieItem'

export default {
  name: 'SeenPage',
  components: {
    'movie-item': MovieItem
  },
  data () {
    return {
    }
  },
  methods: {
    removeFromSeenlist: function (imdbID) {
      store.dispatch('removeFromSeenlist', imdbID)
    }
  },
  computed: {
    seenlist: function () {
      return store.getters.seenlist
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
