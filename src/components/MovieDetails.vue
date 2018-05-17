<template>
  <div class="modal movie-details" :class="{'is-active': detailsIsOpen}">
    <div class="modal-background"></div>
    <div class="modal-content">

          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-128x128">
                    <section class="content">
                      <img :src="movie.Poster" :alt="movie.Title">
                    </section>
                    <section class="content ratings">
                      <div class="is-size-7">
                        <strong>IMDB Rating:</strong>&nbsp;
                        <span class="has-text-weight-bold" :class="{
                          'has-text-success': movie.imdbRating >= 7,
                          'has-text-warning': movie.imdbRating < 7 && movie.imdbRating >= 5,
                          'has-text-danger': movie.imdbRating < 5
                        }">
                          {{movie.imdbRating}}
                        </span>
                      </div>
                      <div class="is-size-7">
                        <strong>Metascore:</strong>&nbsp;
                        <span class="has-text-weight-bold" :class="{
                          'has-text-success': movie.Metascore >= 70,
                          'has-text-warning': movie.Metascore < 70 && movie.Metascore >= 50,
                          'has-text-danger': movie.Metascore < 50
                        }">
                          {{movie.Metascore}}
                        </span>
                      </div>
                    </section>
                  </figure>
                </div>
                <div class="media-content">
                  <p><span class="title is-4 has-text-black">{{movie.Title}}</span> <span class="is-7 has-text-grey">({{movie.Year}})</span></p>
                  <p>{{movie.Runtime}}</p>
                  <div class="tags has-addons" v-for="(genre, i) in genres" :key="'s' + i" v-if="genres.length">
                      <span class="tag is-warning">{{genre}}</span>
                  </div>
                  <br>
                  <p><strong>Cast:</strong> {{movie.Actors}}</p>
                  <br>
                  <p>{{movie.Plot}}</p>
                  <section v-if="movie.meta">
                    <hr>
                    <p v-if="movie.meta.theater"><strong>Theater:</strong> {{movie.meta.theater}}</p>
                    <p v-if="movie.meta.date"><strong>Seen on:</strong> {{formatDate(movie.meta.date)}} <span v-if="movie.meta.showTime"><strong>at</strong> {{formatTime(movie.meta.showTime)}}</span></p>
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
import { getMovieGenres } from '@/utils'

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
      return moment(new Date(dateString)).format('MMMM Do YYYY')
    },
    formatTime: function (showTime) {
      let timeStr = ''
      if (showTime.hh) {
        timeStr += showTime.hh
      }
      if (showTime.mm) {
        timeStr += ':' + showTime.mm
      }
      if (showTime.a) {
        timeStr += ' ' + showTime.a
      }
      return timeStr
    }
  },
  computed: {
    genres: function () {
      return getMovieGenres(this.movie)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
