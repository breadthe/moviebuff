<template>
  <div class="dashboard">
    <section class="section">
      <h1 class="title is-2">Settings</h1>
      <br>

      <p class="subtitle">Export/Import</p>
      <p>You can export your saved movie lists in JSON format and then restore them from the saved backup.</p>
      <p>File is saved to your default Downloads directory.</p>
      <br>
      <p>
          <button
            class="button"
            @click.stop="exportData($event)"
          >
            <i class="fa fa-download"
              aria-hidden="true"
            ></i>&nbsp;Export
          </button>
          <button
            class="button"
            @click="importData()"
          >
            <i class="fa fa-upload"
              aria-hidden="true"
            ></i>&nbsp;Import
          </button>
      </p>

    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'Settings',
  data () {
    return {
    }
  },
  methods: {
    exportData: function ($event) {
      const filename = 'moviebuff-data_' + moment(new Date()).format('YYYY-MM-DD_hh.mm.ss') + '.json'
      const exportStr = JSON.stringify({
        seenlist: this.seenlist,
        wishlist: this.wishlist
      })
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(exportStr)

      const link = document.createElement('a')
      link.href = dataUri
      link.style = 'visibility:hidden'
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    importData: function () {
    }
  },
  computed: {
    ...mapState(['seenlist', 'wishlist'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
