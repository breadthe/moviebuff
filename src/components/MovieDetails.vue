<template>
  <div class="modal movie-details" :class="{'is-active': detailsIsOpen}">
    <div class="modal-background"></div>
    <div class="modal-content">

          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <img :src="movie.Poster" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{{movie.Title}}</p>
                  <p class="subtitle is-6">{{movie.Year}}</p>
                  <p>{{movie.Runtime}}</p>
                  <p>{{movie.Genre}}</p>
                  <br>
                  <p><strong>Cast:</strong> {{movie.Actors}}</p>
                  <br>
                  <p>{{movie.Plot}}</p>
                  <section v-if="movie.meta">
                    <hr>
                    <p v-if="movie.meta.theater"><strong>Theater:</strong> {{movie.meta.theater}}</p>
                    <p v-if="movie.meta.date"><strong>Seen on:</strong> {{formatDate(movie.meta.date)}} <span v-if="movie.meta.showTime"><strong>at</strong> {{movie.meta.showTime}}</span></p>
                    <p v-if="movie.meta.ticketPrice"><strong>Ticket price:</strong> ${{movie.meta.ticketPrice}}</p>
                    <p v-if="movie.meta.isMoviePass"><span class="tag is-danger">MoviePass</span></p>
                  </section>
                </div>
              </div>
            </div>
          </div>

    </div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('closeDetails')"></button>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MovieDetails',
  props: {
    'movie': {
      type: Object,
      required: true
    },
    'details-is-open': {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    formatDate: function (dateString) {
      return moment(dateString).format('MMMM Do YYYY')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
