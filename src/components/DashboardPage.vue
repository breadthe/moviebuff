<template>
  <div class="dashboard">
    <section class="section">
      <h1 class="title is-2">Dashboard</h1>
      <br>

      <p class="subtitle is-6" v-if="seenlist.length"><strong>{{seenlist.length}}</strong> movies <router-link :to="'/seen'">seen</router-link></p>
      <p class="subtitle is-6" v-else>You haven't seen any movies yet. Go watch some!</p>
      <div class="tags has-addons" v-for="(genre, i) in seenlistGenres" :key="'s' + i" v-if="seenlist.length">
        <span class="tag is-success">{{genre.count}}</span>
        <span class="tag is-info">{{genre.name}}</span>
      </div>

      <p class="subtitle is-6" v-if="wishlist.length"><strong>{{wishlist.length}}</strong> movies on your <router-link :to="'/wishlist'">wishlist</router-link></p>
      <div class="tags has-addons" v-for="(genre, i) in wishlistGenres" :key="'w' + i" v-if="wishlistGenres">
        <span class="tag is-warning">{{genre.count}}</span>
        <span class="tag is-info">{{genre.name}}</span>
      </div>

    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getMovieListGenres } from '@/utils'

export default {
  name: 'Dashboard',
  data () {
    return {
      msg: 'Dashboard'
    }
  },
  methods: {
  },
  computed: {
    ...mapState(['seenlist', 'wishlist']),
    seenlistGenres: function () {
      return getMovieListGenres(this.seenlist)
    },
    wishlistGenres: function () {
      return getMovieListGenres(this.wishlist)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
