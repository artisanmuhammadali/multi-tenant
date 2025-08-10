import { createRouter, createWebHistory } from 'vue-router'

import dashboardRoutes from './dashboardRoutes.js'
import { authMiddleware } from './middlewares/authMiddleware.js'
import ForbiddenView from '@/views/Exception/ForbiddenView.vue'
import LoginView from '@/views/Guest/LoginView.vue'
import NotFoundView from '@/views/Exception/NotFoundView.vue'
import adminRoutes from './adminRoutes.js'
import tenantRoutes from './tenantRoutes.js'

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
    ...dashboardRoutes,
    ...adminRoutes,
    ...tenantRoutes,
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
