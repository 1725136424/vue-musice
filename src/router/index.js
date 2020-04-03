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
  { path: '/rank', component: Rank },
  { path: '/search', component: Search },
  { path: '/personal', component: Personal }
]

const router = new VueRouter({
  routes
})

export default router
