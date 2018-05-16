// import Vue from 'vue'
import SearchBar from '@/components/SearchBar'

describe('SearchBar', () => {
  it('has a created hook', () => {
    expect(typeof SearchBar.created).toBe('function')
  })

  // it('should render correct contents', () => {
  //   const Constructor = Vue.extend(SearchBar)
  //   const vm = new Constructor().$mount()
  //   expect(vm.$el.querySelector('.field').textContent)
  //     .to.equal('Welcome to Your Vue.js App')
  // })
})
