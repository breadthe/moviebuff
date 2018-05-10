import Vue from 'vue'
import Vuex from 'vuex'
// import _ from 'lodash'

Vue.use(Vuex)

const state = {
  searching: false,
  seenlist: [],
  wishlist: []
}

const mutations = {
}

const actions = {
}

const getters = {
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
