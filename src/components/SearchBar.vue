<template>
    <div class="field has-addons">
      <div class="control is-expanded" :class="{'is-loading': isSearching}">
        <input class="input is-medium" type="text" placeholder="Find a movie" v-model="searchString" @keyup.enter="searchMovie">
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
.control input {
  border-left: none;
  border-right: none;
  padding-left: 5vw;
  padding-right: 5vw;
}
/* @media screen and (min-width: 641px) {
  .control input {
    padding-left: 5vw;
    padding-right: 5vw;
  }
}
@media screen and (max-width: 640px) {
  .control input {
    padding-left: 10vw;
    padding-right: 10vw;
  }
} */
</style>
