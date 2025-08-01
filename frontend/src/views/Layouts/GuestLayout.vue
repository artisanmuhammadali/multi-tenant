<template>
  <main class="main-content  mt-0">
    <div class="page-header align-items-start min-vh-100 guest-bg">
      <span class="mask bg-gradient-dark opacity-6"></span>
        <slot />
      </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.body.classList.add('overflow-hidden', 'bg-secondary')
})
</script>
