import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '../firebase/firebase'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location){
  return originalPush.call(this, location).catch(e => e);
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pokemon/:id',
    name: 'Pokemon',
    component: () => import(/* webpackChunkName: "pokemon" */ '../views/Pokemon.vue')
  },
  {
    path: '/cardbox',
    name: 'CardBox',
    component: () => import(/* webpackChunkName: "cardbox" */ '../views/CardBox.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/mycards',
    name: 'MyCards',
    component: () => import(/* webpackChunkName: "mycards" */ '../views/MyCards.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  if(requiresAuth && !auth.currentUser){
    next('/auth')
  } else {
    next()
  }
})

export default router
