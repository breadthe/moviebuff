import Vue from 'vue'
import Router from 'vue-router'
import DashboardPage from '@/components/DashboardPage'
import SeenPage from '@/components/SeenPage'
import WishlistPage from '@/components/WishlistPage'
import SearchPage from '@/components/SearchPage'
import SettingsPage from '@/components/SettingsPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardPage
    },
    {
      path: '/seen',
      name: 'Seen',
      component: SeenPage
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: WishlistPage
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchPage
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsPage
    }
  ]
})
