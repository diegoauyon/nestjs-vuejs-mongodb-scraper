import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/views/Home';
import ViewComponent from '@/components/boat/View';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: { name: 'home' } },
    { path: '/home', name: 'home', component: HomeComponent },
    { path: '/boat/:id', name: 'View', component: ViewComponent }
  ]
});
