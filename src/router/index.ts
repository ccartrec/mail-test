import Vue from 'vue'
import Router from 'vue-router'
import MailApp from '@/components/MailApp.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MailApp',
      component: MailApp
    }
  ]
})
