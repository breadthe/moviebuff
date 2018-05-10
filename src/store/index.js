import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

const state = {
  searching: false,
  seenlist: [],
  wishlist: []
}

const mutations = {
  TOGGLE_SEARCHING: (state, flag) => {
    state.searching = flag || false
  },

  /* Seenlist */
  INIT_SEENLIST: (state, seenlist) => {
    state.seenlist = seenlist || []
  },
  ADD_TO_SEENLIST: (state, movie) => {
    const seenlist = state.seenlist
    // If the movie is not in the seenlist, add it
    if (_.findIndex(seenlist, ['imdbID', movie.imdbID]) < 0) {
      seenlist.push(movie)
      window.localStorage.setItem('seenlist', JSON.stringify(seenlist))
      state.seenlist = JSON.parse(window.localStorage.getItem('seenlist')) || []
    }
  },
  REMOVE_FROM_SEENLIST: (state, imdbID) => {
    const seenlist = state.seenlist
    // If the movie is in the seenlist, remove it
    // seenlist.push(obj)
    // window.localStorage.setItem('seenlist', JSON.stringify(seenlist))
    // state.seenlist = JSON.parse(window.localStorage.getItem('seenlist')) || []
    const ix = _.findIndex(seenlist, ['imdbID', imdbID])
    if (ix >= 0) {
      seenlist.splice(ix, 1)
      window.localStorage.setItem('seenlist', JSON.stringify(seenlist))
      state.seenlist = JSON.parse(window.localStorage.getItem('seenlist')) || []
    }
  },

  /* Wishlist */
  INIT_WISHLIST: (state, wishlist) => {
    state.wishlist = wishlist || []
  },
  ADD_TO_WISHLIST: (state, movie) => {
    const wishlist = state.wishlist
    // If the movie is not in the wishlist, add it
    if (_.findIndex(wishlist, ['imdbID', movie.imdbID]) < 0) {
      wishlist.push(movie)
      window.localStorage.setItem('wishlist', JSON.stringify(wishlist))
      state.wishlist = JSON.parse(window.localStorage.getItem('wishlist')) || []
    }
  },
  REMOVE_FROM_WISHLIST: (state, imdbID) => {
    const wishlist = state.wishlist
    // If the movie is in the wishlist, remove it
    const ix = _.findIndex(wishlist, ['imdbID', imdbID])
    if (ix >= 0) {
      wishlist.splice(ix, 1)
      window.localStorage.setItem('wishlist', JSON.stringify(wishlist))
      state.wishlist = JSON.parse(window.localStorage.getItem('wishlist')) || []
    }
  }
}

const actions = {
  toggleSearching ({ commit }, flag) {
    commit('TOGGLE_SEARCHING', flag)
  },

  /* Seenlist */
  initSeenlist ({ commit }, seenlist) {
    commit('INIT_SEENLIST', seenlist)
  },
  addToSeenlist ({ commit }, movie) {
    commit('ADD_TO_SEENLIST', movie)
    commit('REMOVE_FROM_WISHLIST', movie.imdbID)
  },
  removeFromSeenlist ({ commit }, imdbID) {
    commit('REMOVE_FROM_SEENLIST', imdbID)
  },

  /* Wishlist */
  initWishlist ({ commit }, wishlist) {
    commit('INIT_WISHLIST', wishlist)
  },
  addToWishlist ({ commit }, movie) {
    commit('ADD_TO_WISHLIST', movie)
  },
  removeFromWishlist ({ commit }, imdbID) {
    commit('REMOVE_FROM_WISHLIST', imdbID)
  }
}

const getters = {
  searching: (state) => { return state.searching || false },
  seenlist: (state) => { return state.seenlist || [] },
  wishlist: (state) => { return state.wishlist || [] }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
