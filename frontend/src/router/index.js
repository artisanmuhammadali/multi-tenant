import { createRouter, createWebHistory } from 'vue-router'

import dashboardRoutes from './dashboardRoutes.js'
import { authMiddleware } from './middlewares/authMiddleware.js'
import ForbiddenView from '@/views/Exception/ForbiddenView.vue'
import LoginView from '@/views/Guest/LoginView.vue'
import NotFoundView from '@/views/Exception/NotFoundView.vue'
import tenantRoutes from './tenantRoutes.js'
import planRoutes from './planRoutes.js'
import SettingsView from '@/views/Admin/SettingsView.vue'
import SubscriptionView from '@/views/Tenant/SubscriptionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: LoginView,
      meta: { title: 'Sign In', layout: 'GuestLayout', guest: true },
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView,
      meta: { title: 'Forbidden Access', layout: 'GuestLayout', exception: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { title: 'App Settings', layout: 'UserLayout', permission: 'settings' },
    },
    {
      path: '/subscription',
      name: 'subscription',
      component: SubscriptionView,
      meta: { title: 'Subscription Plans', layout: 'UserLayout', permission: 'subscription' },
    },
    ...dashboardRoutes,
    ...tenantRoutes,
    ...planRoutes,

    // 404 Not Found route
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: '404 Not Found', layout: 'GuestLayout', exception: true },
    },
  ],
})

router.beforeEach(authMiddleware)
const DEFAULT_TITLE = import.meta.env.VITE_APP_NAME
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - ${DEFAULT_TITLE}` : DEFAULT_TITLE
})

export default router
