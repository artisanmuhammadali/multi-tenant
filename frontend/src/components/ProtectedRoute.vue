<template>
  <RouterLink :to="{ name: routeName }" :class="(permission, className)" v-can-access="{ permission: permission, user: $auth?.user }">
    <slot></slot>
  </RouterLink>
</template>
<script setup>
defineProps(['routeName', 'permission', 'className'])
</script>
