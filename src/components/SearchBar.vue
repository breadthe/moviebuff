<template>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input class="input" type="text" placeholder="Find a movie" v-model="searchString" @keyup.enter="searchMovie">
      </div>
      <div class="control">
        <a class="button is-info" @click="searchMovie" :disabled="!searchString.length">
          <i class="fa fa-fw" :class="{'fa-circle-o-notch fa-spin': isSearching, 'fa-search': !isSearching}"></i>
        </a>
      </div>
    </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'SearchBar',
  components: {
  },
  data () {
    return {
      searchString: '',
      searchResults: []
    }
  },
  methods: {
    searchMovie: async function () {
      this.$router.replace({path: 'search', query: { q: this.searchString }})
    },
    clearSearch: function () {
      this.searchString = ''
      this.searchResults = []
    }
  },
  computed: {
    isSearching: function () {
      return store.getters.searching
    }
  },
  watch: {
    '$route' (to, from) {
      // Clear the search bar only when navigating away from the Search page
      if (to.name !== 'Search') {
        this.searchString = ''
      }
    }
  },
  created: function () {
    // When searching from a page different than Search, keep the string in the search bar
    const searchString = this.$router.history.current.query.q
    if (searchString) {
      this.searchString = searchString
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
