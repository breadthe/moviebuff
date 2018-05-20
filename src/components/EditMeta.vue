<template>
  <section class="">

            <div class="field">
              <div class="control">
                <input ref="autocomplete" id="theater" class="input" type="text" placeholder="Theater" v-model="cachedMeta.theater">
              </div>
            </div>

            <div class="field">
              <div class="control">
                <datepicker v-model="cachedMeta.date" :value="cachedMeta.date" :monday-first="true" :input-class="`input`" name="viewingDate"></datepicker>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <vue-timepicker format="hh:mm A" v-model="cachedMeta.showTime"></vue-timepicker>
              </div>
            </div>

            <div class="field has-addons has-addons-left">
              <div class="control">
                <a class="button is-static">
                  $
                </a>
              </div>
              <div class="control">
                <input class="input" type="text" placeholder="Ticket price" v-model="cachedMeta.ticketPrice">
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="radio">
                  MoviePass?
                  <toggle-button v-model="cachedMeta.isMoviePass" :value="cachedMeta.isMoviePass" :sync="true"></toggle-button>
                </label>
              </div>
            </div>

          <button class="button is-success" @click="updateSeenlist()">Update</button>
          <button class="button" @click="closeEditMeta()">Cancel</button>

  </section>

</template>

<script>
import Datepicker from 'vuejs-datepicker'
import VueTimepicker from 'vue2-timepicker'
import google from 'google'
import store from '@/store'

export default {
  name: 'EditMeta',
  components: {
    Datepicker,
    VueTimepicker
  },
  props: {
    'imdb-id': {
      type: String,
      required: true
    },
    'meta': {
      type: Object,
      required: true
    }
  },
  methods: {
    updateSeenlist: function () {
      store.dispatch('updateSeenlist', {imdbID: this.imdbId, meta: this.cachedMeta})
      this.closeEditMeta()
    },
    closeEditMeta: function () {
      this.$emit('closeEditMeta')
    }
  },
  mounted: function () {
    const _this = this
    const input = document.getElementById('theater')
    const autocomplete = new google.maps.places.Autocomplete(input)
    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace()
      _this.cachedMeta.theater = place.name
    })
  },
  created: function () {
    this.cachedMeta = Object.assign({}, this.meta)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
