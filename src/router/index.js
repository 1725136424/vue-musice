import Vue from 'vue'
import VueRouter from 'vue-router'
const Recommend = () => import('./../views/Recommend')
const Singer = () => import('./../views/Singer')
const Rank = () => import('./../views/Rank')
const Search = () => import('./../views/Search')
const Detail = () => import('./../views/Detail')
const Personal = () => import('./../views/Personal')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      { path: 'detail/:id/:type', component: Detail }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      { path: 'detail/:id/:type', component: Detail }
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      { path: 'detail/:id/:type', component: Detail }
    ]
  },
  { path: '/search', component: Search },
  { path: '/personal', component: Personal }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
