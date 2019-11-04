import Vue        from 'vue'
import VueRouter  from 'vue-router'
import ShowHome   from '../views/ShowHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path        : '/',
    name        : 'home',
    component   : ShowHome
  },
  {
    path        : '/products',
    name        : 'products',
    component   : () => import('../views/ShowProducts.vue')
  },
  {
    path        : '/categories',
    name        : 'categories',
    component   : () => import('../views/ShowCategories.vue')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
