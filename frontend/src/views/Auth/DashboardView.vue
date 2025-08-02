<script setup>
import { formatDate } from '@/assets/utils';
import { getStores } from '@/stores';
import { onMounted } from 'vue';

const   { appStore } = getStores()
onMounted(async () => {
 await appStore.fetchDashboardStats()
})
</script>

<template>
  <div class="row">
    <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4" v-for="stats in appStore.dashboardStats">
      <div class="card">
        <div class="card-header p-2 ps-3">
          <div class="d-flex justify-content-between">
            <div>
              <p class="text-sm mb-0 text-capitalize">{{ stats.label }}</p>
              <h4 class="mb-0">{{ stats.data }}</h4>
            </div>
            <div class="icon icon-md icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-lg">
              <i class="material-symbols-rounded opacity-10">{{ stats.icon }}</i>
            </div>
          </div>
        </div>
        <hr class="dark horizontal my-0">
        <div class="card-footer p-2 ps-3">
          <p class="mb-0 text-sm">Last update {{ formatDate(new Date , 'YYYY-MM-DD hh:mm A') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
