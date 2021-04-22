import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'

import Home from "@/pages/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
		path: '/',
		redirect: '/home',
	},
	{
		path: '/home',
    name: 'Home',
    component: Home
	},
  {
    path: '/user',
    name: "User",
    component: ()=> import("@/pages/User.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
