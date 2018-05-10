<template>
  <nav class="navbar is-warning">
    <div class="container level">
      <div class="level-left">
                <div class="navbar-brand">
                  <router-link class="navbar-item" to="/" append>
                    <!-- <span class="icon"> -->
                      <i class="fa fa-film fa-2x" aria-hidden="true"></i>&nbsp;
                    <!-- </span> -->
                    <span class="site-name">Movie Buff</span>
                  </router-link>
                  <div class="navbar-burger burger" :class="{'is-active': isMobile}" data-target="navbarExampleTransparentExample" @click="isMobile=!isMobile">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div id="navbarExampleTransparentExample" class="navbar-menu" :class="{'is-active': isMobile}">
                  <div class="navbar-start">
                    <router-link class="navbar-item" to="/seen" append>Seen</router-link>
                    <router-link class="navbar-item" to="/wishlist" append>Wishlist</router-link>
                  </div>
                </div>
      </div>
      <div class="level-right">
            <search-bar></search-bar>
      </div>
    </div>
  </nav>

</template>

<script>
import SearchBar from '@/components/SearchBar'

export default {
  name: 'TheHeader',
  components: {
    'search-bar': SearchBar
  },
  data () {
    return {
      isMobile: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
