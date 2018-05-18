<template>
<div class="level">
  <div class="level-left">
    <div class="level-item">
      <div class="pagination-wrapper" v-if="numberOfPages > 1">
        <router-link class="button is-light" :class="{'is-static': page === 1}" :disabled="page === 1" :to="previousPage" append>
          <i class="fa fa-arrow-left"></i>
        </router-link>
        &nbsp;
        <router-link class="button is-light" :class="{'is-static': page === numberOfPages}" :disabled="page === numberOfPages" :to="nextPage" append>
          <i class="fa fa-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </div>
  <div class="level-right">
    <div class="level-item">
      Showing&nbsp;<strong>{{resultsRange.from}}</strong>-<strong>{{resultsRange.to}}</strong>&nbsp;of&nbsp;<strong>{{totalResults}}</strong>&nbsp;total results&nbsp;for&nbsp;<strong>"{{searchString}}"</strong>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'PaginationControls',
  props: {
    'search-string': {
      type: String,
      required: true,
      default: ''
    },
    'number-of-pages': {
      type: Number,
      required: true
    },
    'page': {
      type: Number,
      required: true,
      default: 1
    },
    'previous-page': {
      type: String,
      required: true
    },
    'next-page': {
      type: String,
      required: true
    },
    'results-range': {
      type: Object,
      required: true
    },
    'total-results': {
      type: Number,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
