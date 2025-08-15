<template>
  <div class="d-flex justify-content-between align-items-center py-2 px-4 w-max-content" v-if="totalItems > 0">
    <ListLimit @change="limitChange" />
    <!-- Pagination -->
    <nav class="pagination d-flex gap-3 align-items-center">
      <p class="m-0 text-sm">
        Showing {{ startItem }}–{{ endItem }} of
        <span class="font-semibold">{{ totalItems }}</span> items
      </p>
      <button
        class="bg-primary text-white uppercase text-sm font-semibold px-4 py-1 rounded"
        :disabled="currentPage === 1"
        v-on:click="method(currentPage - 1 , params)"
      >
        Previous
      </button>
      <button
        class="bg-primary text-white uppercase text-sm font-semibold px-4 py-1 rounded"
        :disabled="currentPage === totalPages"
        v-on:click="method(currentPage + 1 , params)"
      >
        Next
      </button>
    </nav>
  </div>
</template>
<script setup>
import { getSelectLimit } from '@/assets/utils'
import ListLimit from './ListLimit.vue'
import { computed, ref } from 'vue'
const props = defineProps(['totalPages', 'currentPage', 'method', 'limitMethod', 'totalItems' , 'params'])
const limit = ref(getSelectLimit())

function limitChange() {
  limit.value = getSelectLimit()
  props.limitMethod()
}
const startItem = computed(() => {
  return (props.currentPage - 1) * limit.value + 1
})

const endItem = computed(() => {
  const end = props.currentPage * limit.value
  return end > props.totalItems ? props.totalItems : end
})
</script>
