<template>
  <div class="dashboard">
    <section class="section">
      <h1 class="title is-2">Dashboard</h1>
      <br>

      <div class="tile is-ancestor">
        <div class="tile is-4 is-vertical is-parent">
          <div class="tile is-child box" v-if="seenlist.length">
              <p class="title">Genres in {{seenlist.length}} Movies <router-link :to="'/seen'">Seen</router-link></p>
              <pie-chart :data="seenlistGenres.data" :labels="seenlistGenres.labels" :colors="seenlistGenres.colors"></pie-chart>
          </div>
          <div class="tile is-child box">
            <p class="title">Two</p>
            {{moviesSeenEachYear}}
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child box">
            <p class="title">Three</p>
          </div>
        </div>
      </div>

      <p class="subtitle is-6" v-if="seenlist.length"><strong>{{seenlist.length}}</strong> movies <router-link :to="'/seen'">seen</router-link></p>
      <p class="subtitle is-6" v-else>You haven't seen any movies yet. Go watch some!</p>
      <!-- <div class="tags has-addons" v-for="(genre, i) in seenlistGenres" :key="'s' + i" v-if="seenlist.length">
        <span class="tag is-success">{{genre.count}}</span>
        <span class="tag is-info">{{genre.name}}</span>
      </div> -->

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
import _ from 'lodash'
import moment from 'moment'
import { getMovieListGenres, getRandomColor } from '@/utils'
import PieChart from '@/utils/PieChart'

export default {
  name: 'Dashboard',
  components: {
    'pie-chart': PieChart
  },
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
      let labels = []
      let data = []
      let colors = []
      const genres = getMovieListGenres(this.seenlist)
      _.each(genres, (val, key) => {
        _.each(val, (v, k) => {
          switch (k) {
            case 'name':
              labels.push(v)
              colors.push(getRandomColor())
              break
            case 'count':
              data.push(v)
              break
          }
        })
      })
      // return getMovieListGenres(this.seenlist)
      return {
        'labels': labels,
        'data': data,
        'colors': colors
      }
    },
    moviesSeenEachYear: function () {
      const years = []
      _.each(this.seenlist, (val, key) => {
        const year = moment(new Date(val.meta.date)).format('YYYY')
        const ix = _.findIndex(years, ['year', year])
        if (ix > -1) {
          years[ix].count++
        } else {
          years.push({'year': year, 'count': 1})
        }
      })
      return years
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
