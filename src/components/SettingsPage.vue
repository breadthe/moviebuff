<template>
  <section class="section settings-page">
    <h1 class="title is-2">Settings</h1>
    <!-- <br> -->

    <div class="columns">
      <div class="column">
        <p class="subtitle">Export</p>
        <p>You can export your saved movie lists in JSON format and then restore them from the saved backup.</p>
        <p>The file is saved to your default Downloads directory.</p>
        <br>

        <button class="button" @click.stop="exportData($event)">
          <i class="fa fa-download" aria-hidden="true"></i>&nbsp;Export
        </button>
      </div>

      <div class="column">

        <p class="subtitle">Import</p>
        <p>Import a previously saved JSON export of your data.</p>
        <p>This will overwrite your existing data.</p>
        <br>

        <div class="field">
          <div class="file" :class="{'has-name is-fullwidth': importedFileName}">
            <form id="fileImportForm">
              <label class="file-label">
                <input class="file-input" type="file" name="import" @change="readFile($event)">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fa fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Import
                  </span>
                </span>
                <span class="file-name" v-text="importedFileName" v-if="importedFileName">
                </span>
              </label>
            </form>
          </div>
        </div>

        <div class="field">
          <div class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <button class="button is-success" @click="restoreConfirm = true" v-if="importedData">
                  Restore
                </button>
                &nbsp;&nbsp;
                <a href="#" @click.prevent.stop="resetImportedData()" v-if="importedData" class="is-size-6 has-text-danger">
                  Cancel
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="notification is-info" v-if="restoreMsg">
          <button class="delete" @click="restoreMsg = null"></button>
          <p>{{restoreMsg}}</p>
          <p v-if="importedSeenlistCount">Seen: <strong>{{importedSeenlistCount}}</strong></p>
          <p v-if="importedWishlistCount">Wishlist: <strong>{{importedWishlistCount}}</strong></p>
        </div>

      </div>

    </div>

    <div class="modal" :class="{'is-active': restoreConfirm}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Restore Data</p>
          <button class="delete" aria-label="close" @click="restoreConfirm = false"></button>
        </header>
        <section class="modal-card-body">
          <p>Are you sure you want to restore the data from <strong>{{importedFileName}}</strong>? This will overwrite your existing data.</p>
          <p v-if="importedSeenlistCount">Seen: <strong>{{importedSeenlistCount}}</strong></p>
          <p v-if="importedWishlistCount">Wishlist: <strong>{{importedWishlistCount}}</strong></p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="restoreData()">Restore</button>
          <button class="button" @click="restoreConfirm = false">Cancel</button>
        </footer>
      </div>
    </div>

  </section>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import store from '@/store'

export default {
  name: 'Settings',
  data () {
    return {
      importedFileName: '',
      importedData: null,
      importedSeenlistCount: null,
      importedWishlistCount: null,
      restoreConfirm: false,
      restoreMsg: null
    }
  },
  methods: {
    exportData: function ($event) {
      const filename = 'moviebuff-data_' + moment(new Date()).format('YYYY-MM-DD_HH.mm.ss') + '.json'
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
    restoreData: async function () {
      // TODO: perhaps handle this more elegantly
      await window.localStorage.setItem('seenlist', JSON.stringify(this.importedData.seenlist))
      await store.dispatch('initSeenlist', JSON.parse(window.localStorage.getItem('seenlist')) || [])
      await window.localStorage.setItem('wishlist', JSON.stringify(this.importedData.wishlist))
      await store.dispatch('initWishlist', JSON.parse(window.localStorage.getItem('wishlist')) || [])
      this.resetImportedData()
      this.restoreConfirm = false
      this.restoreMsg = 'Data restored successfully'
    },
    readFile: async function ($event) {
      const _this = this
      const file = $event.target.files[0]
      if (file) {
        this.importedFileName = file.name
        const reader = new FileReader()
        reader.onload = await function (event) {
          _this.importedData = JSON.parse(event.target.result)
          _this.importedSeenlistCount = _this.importedData.seenlist.length
          _this.importedWishlistCount = _this.importedData.wishlist.length
        }
        reader.onerror = await function () {
          // handle file read error
        }
        await reader.readAsText(file)
      } else {
        _this.resetImportedData()
      }
    },
    resetImportedData: function () {
      // Reset the file input explicitly; simply clearing the data won't reset it properly
      document.getElementById('fileImportForm').reset()
      this.importedFileName = ''
      this.importedData = null
      this.restoreMsg = null
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
