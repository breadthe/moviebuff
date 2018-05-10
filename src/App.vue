<template>
    <div id="app">
            <the-header></the-header>

            <div class="container is-fluid">
              <router-view></router-view>
            </div>

            <!--<the-footer></the-footer>-->
    </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import store from '@/store'

export default {
  name: 'App',
  components: {
    'the-header': TheHeader
  }
}
</script>

<style lang="sass">
    @import "./assets/index"
</style>
