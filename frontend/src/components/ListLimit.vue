<script setup>
import { getSelectLimit, getSelectOptions, setSelectLimit } from '@/assets/utils'
const emit = defineEmits(['change'])

function updateLimit(event) {
  setSelectLimit(event)
  emit('change')
}
</script>

<template>
  <div class="d-flex align-items-center gap-2">
    <p class="m-0 text-sm">Items per page</p>
    <select
      class="d-block py-[4px] bg-gray-50 border-gray-300 rounded text-sm"
      v-on:change="updateLimit"
    >
      <option
        :value="opt"
        v-for="opt in getSelectOptions"
        :key="opt"
        :selected="getSelectLimit() == opt"
      >
        {{ opt }}
      </option>
    </select>
  </div>
</template>
