<template>
  <div class="modal seen-movie-details" :class="{'is-active': seenDetailsIsOpen}">
    <div class="modal-background"></div>
    <div class="modal-card">

      <header class="modal-card-head">
        <p class="modal-card-title">{{seenMovie.Title}} <small>({{seenMovie.Year}})</small></p>
        <button class="delete" aria-label="close"></button>
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

                <div class="field">
                  <div class="control">
                    <input class="input" type="text" placeholder="Ticket price" v-model="meta.ticketPrice">
                  </div>
                </div>

                <div class="field">
                  <div class="control">
                    <label class="radio">
                      MoviePass?
                      <toggle-button v-model="meta.isMoviePass"></toggle-button>
                    </label>
                    <!-- <label class="radio">
                      <input type="radio" name="isMoviePass" :value="meta.isMoviePass" v-model="meta.isMoviePass">
                      Yes
                    </label>
                    <label class="radio">
                      <input type="radio" name="isMoviePass" :value="meta.isMoviePass" v-model="meta.isMoviePass" checked="checked">
                      No
                    </label> -->
                  </div>
                </div>

              </div>
            </div>
          </article>
      </section>

      <footer class="modal-card-foot">
        <button class="button is-success">Save changes</button>
        <button class="button">Cancel</button>
      </footer>

    </div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('closeSeenDetails')"></button>
  </div>
</template>

<script>
// import store from '@/store'
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
        date: '',
        showTime: '',
        ticketPrice: '',
        isMoviePass: false
      }
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
