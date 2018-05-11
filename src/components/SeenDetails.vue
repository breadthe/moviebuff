<template>
  <div class="modal seen-movie-details" :class="{'is-active': seenDetailsIsOpen}">
    <div class="modal-background"></div>
    <div class="modal-card">

      <header class="modal-card-head">
        <p class="modal-card-title">{{seenMovie.Title}} <small>({{seenMovie.Year}})</small></p>
        <button class="delete" aria-label="close" @click="$emit('closeSeenDetails')"></button>
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
                    <input class="input" type="text" placeholder="Theater" v-model="meta.theater">
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input class="input" type="text" placeholder="Viewing date" v-model="meta.date">
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <input class="input" type="text" placeholder="Show time" v-model="meta.showTime">
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

              </div>
            </div>
          </article>
      </section>

      <footer class="modal-card-foot">
        <button class="button is-success" @click="saveToSeenlist()"><i class="fa fa-eye"></i>&nbsp;Save</button>
        <button class="button" @click="$emit('closeSeenDetails')">Cancel</button>
      </footer>

    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'SeenDetails',
  components: {
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
        showTime: moment().format('h:mm:ss a'),
        ticketPrice: '',
        isMoviePass: false
      }
    }
  },
  methods: {
    saveToSeenlist: function () {
      const movie = Object.assign(this.seenMovie, {meta: this.meta})
      this.meta = {
        theater: '',
        date: moment().format('MMMM D YYYY'),
        showTime: moment().format('h:mm:ss a'),
        ticketPrice: '',
        isMoviePass: false
      }
      this.$emit('addToSeenlist', movie)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
