<template>
  <component :is="layout || 'div'">
    <router-view />
  </component>
  <AppLoader />
</template>

<script setup>
import AppLoader from './components/AppLoader.vue'
import { shallowRef } from 'vue'
import layouts from './stores/layouts'
import router from './router'

const layout = shallowRef('div')
router.afterEach((to) => {
  layout.value = layouts[to.meta.layout] || 'GuestLayout'
})
</script>
