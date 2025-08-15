<template>
  <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg fixed-start ms-2  bg-white my-2" id="sidenav-main">
    <div class="sidenav-header">
      <i class="fas fa-times p-3 cursor-pointer text-dark opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <RouterLink class="navbar-brand px-4 py-3 m-0" :to="{name: 'dashboard.index'}">
        <img src="/assets/img/logo-ct-dark.png" class="navbar-brand-img" width="26" height="26" alt="main_logo">
        <span class="ms-1 text-sm text-dark">Multi Tenant</span>
      </RouterLink>
    </div>
    <hr class="horizontal dark mt-0 mb-2">
    <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul class="navbar-nav sidebar">
          <li class="nav-item " v-for="nav in sidebar">
            <ProtectedRoute  :route-name="nav.link" :permission="nav.permission"
              class="nav-link"
              :class="new RegExp(`^${nav.matchedRoute.replace('*', '.*')}$`).test($route.name) 
                    ? 'active bg-gradient-dark text-white' 
                    : 'text-dark'"
              >
              <i class="material-symbols-rounded opacity-5">{{nav.icon}}</i>
              <span class="nav-link-text ms-1">{{ nav.name }}</span>
            </ProtectedRoute>
          </li>
      </ul>
    </div>
    <div class="sidenav-footer position-absolute w-100 bottom-0 ">
      <div class="mx-3">
        <button class="btn bg-gradient-dark w-100"  type="button" v-on:click="authStore.logoutUser">Logout</button>
      </div>
    </div>
  </aside>
</template>
<script setup>
import { getStores } from '@/stores';
import ProtectedRoute from './ProtectedRoute.vue'
const { authStore } = getStores()
let sidebar = [
  {
    name: 'Dashboard',
    link: 'dashboard.index',
    matchedRoute: 'dashboard.*',
    icon: 'dashboard',
    permission: 'dashboard',
  },
  {
    name: 'Tenants',
    link: 'tenant.index',
    matchedRoute: 'tenant.*',
    icon: 'groups',
    permission: 'tenant',
  },
  {
    name: 'Plans',
    link: 'plan.index',
    matchedRoute: 'plan.*',
    icon: 'assignment',
    permission: 'plan',
  },
  {
    name: 'Settings',
    link: 'settings',
    matchedRoute: 'settings',
    icon: 'settings',
    permission: 'settings',
  },
  {
    name: 'Customer',
    link: 'customer.index',
    matchedRoute: 'customer.*',
    icon: 'groups',
    permission: 'customer',
  },
  {
    name: 'Subscription',
    link: 'subscription',
    matchedRoute: 'subscription',
    icon: 'orbit',
    permission: 'subscription',
  },
]
</script>
