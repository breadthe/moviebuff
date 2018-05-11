<template>
  <div>
    <section class="section">
      <h1 class="title is-2">Dashboard</h1>
      <br>
      <p class="subtitle is-6" v-if="seenlist.length"><strong>{{seenlist.length}}</strong> movies seen</p>
      <p class="subtitle is-6" v-else>You haven't seen any movies yet. Go watch some!</p>
      <p class="subtitle is-6" v-if="wishlist.length"><strong>{{wishlist.length}}</strong> movies on your wishlist</p>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  data () {
    return {
      msg: 'Dashboard'
    }
  },
  computed: {
    ...mapState(['seenlist', 'wishlist'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
