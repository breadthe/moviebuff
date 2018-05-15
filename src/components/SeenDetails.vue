<template>
  <div class="modal seen-movie-details" :class="{'is-active': seenDetailsIsOpen}">
    <div class="modal-background"></div>
    <div class="modal-card">

      <header class="modal-card-head">
        <p class="modal-card-title">{{seenMovie.Title}} <small>({{seenMovie.Year}})</small></p>
        <button class="delete" aria-label="close" @click="closeSeenDetails()"></button>
      </header>

      <section class="modal-card-body">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img :src="seenMovie.Poster">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">

                <div class="field">
                  <div class="control">
                    <input ref="autocomplete" id="theater" class="input" type="text" placeholder="Theater" v-model="meta.theater">
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <datepicker v-model="meta.date" :value="meta.date" :monday-first="true" :input-class="`input`" name="viewingDate"></datepicker>
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <vue-timepicker format="hh:mm A" v-model="meta.showTime"></vue-timepicker>
                  </div>
                </div>

                <div class="field has-addons has-addons-left">
                  <div class="control">
                    <a class="button is-static">
                      $
                    </a>
                  </div>
                  <div class="control">
                    <input class="input" type="text" placeholder="Ticket price" v-model="meta.ticketPrice">
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <label class="radio">
                      MoviePass?
                      <toggle-button v-model="meta.isMoviePass" :value="meta.isMoviePass" :sync="true"></toggle-button>
                    </label>
                  </div>
                </div>

                <br>
                <br>
                <br>
                <br>
                <br>

              </div>
            </div>
          </article>
      </section>

      <footer class="modal-card-foot">
        <button class="button is-success" @click="saveToSeenlist()"><i class="fa fa-eye"></i>&nbsp;Save</button>
        <button class="button" @click="closeSeenDetails()">Cancel</button>
      </footer>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import VueTimepicker from 'vue2-timepicker'
import google from 'google'

export default {
  name: 'SeenDetails',
  components: {
    Datepicker,
    VueTimepicker
  },
  props: {
    'seen-movie': {
      type: Object,
      required: true
    },
    'seen-details-is-open': {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      meta: {
        theater: '',
        date: moment().format('MMMM D YYYY'),
        showTime: {
          hh: moment().format('h'),
          mm: moment().format('mm'),
          a: moment().format('a')
        },
        ticketPrice: '',
        isMoviePass: false
      }
    }
  },
  methods: {
    saveToSeenlist: function () {
      const movie = Object.assign(this.seenMovie, {meta: this.meta})
      this.resetMetadata()
      this.$emit('addToSeenlist', movie)
    },
    closeSeenDetails: function () {
      this.resetMetadata()
      this.$emit('closeSeenDetails')
    },
    resetMetadata: function () {
      this.meta = {
        theater: '',
        date: moment().format('MMMM D YYYY'),
        showTime: {
          hh: moment().format('h'),
          mm: moment().format('mm'),
          a: moment().format('a')
        },
        ticketPrice: '',
        isMoviePass: false
      }
    }
  },
  mounted: function () {
    const _this = this
    const input = document.getElementById('theater')
    const autocomplete = new google.maps.places.Autocomplete(input)
    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace()
      _this.meta.theater = place.name
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
