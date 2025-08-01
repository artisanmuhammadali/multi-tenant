<template>
  <SideBar></SideBar>
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <NavBar></NavBar>
    <div class="container-fluid py-2">
      <slot />
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'

onMounted(() => {
  document.body.classList.add('g-sidenav-show', 'bg-gray-100')
})
</script>
