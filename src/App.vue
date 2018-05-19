<template>
    <div id="app">
            <the-header></the-header>
            <search-bar></search-bar>

            <div class="container is-fluid">
              <router-view></router-view>
            </div>

            <!--<the-footer></the-footer>-->
    </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import SearchBar from '@/components/SearchBar'
import store from '@/store'

export default {
  name: 'App',
  components: {
    'the-header': TheHeader,
    'search-bar': SearchBar
  },
  data: function () {
    return {
      changingRoute: false
    }
  },
  mounted: async function () {
    await store.dispatch('initSeenlist', JSON.parse(window.localStorage.getItem('seenlist')) || [])
    await store.dispatch('initWishlist', JSON.parse(window.localStorage.getItem('wishlist')) || [])
  }
}
</script>

<style lang="sass">
    @import "./assets/index"
</style>
