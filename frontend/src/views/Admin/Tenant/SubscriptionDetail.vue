<template>
  <div class="row px-2 px-md-4">
      <div class="page-header min-height-300 border-radius-xl mt-4 profile-bg">
        <span class="mask opacity-6"></span>
      </div>
      <div class="card card-body mx-3 mx-md-4 mt-n6">
        <div class="row gx-4">
          <div class="col-auto">
            <div class="avatar avatar-xl position-relative">
              <img src="/assets/img/logo-ct-dark.png" alt="profile_image" class="w-100 border-radius-lg shadow-sm p-3">
            </div>
          </div>
          <div class="col-auto my-auto">
            <div class="h-100">
              <h5 class="mb-1">
                {{ tenantStore.tenant.name }}
              </h5>
              <p class="mb-0 font-weight-normal text-sm">
                {{ tenantStore.tenant.email }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4 px-2 px-md-4">
      <div class="col-lg-12 col-12">
        <div class="card">
          <div class="card-header pb-0 px-3">
            <h6 class="mb-0">Subscription Information</h6>
          </div>
          <div class="card-body pt-4 p-3">
            <ul class="list-group">
              <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg" v-for="subscription in tenantMicro.data">
                <div class="d-flex flex-column">
                  <h6 class="mb-3 text-sm">{{ subscription.plan?.name }}</h6>
                  <span class="mb-2 text-xs">Subscription Start: <span class="text-dark font-weight-bold ms-sm-2">{{ formatDate(subscription?.created_at , 'MMMM DD, YYYY') }}</span></span>
                  <span class="mb-2 text-xs">Subscription Ends: <span class="text-dark ms-sm-2 font-weight-bold">{{ formatDate(subscription?.subscription_ends , 'MMMM DD, YYYY') }}</span></span>
                  <span class="text-xs">Status: <span class="text-dark ms-sm-2 font-weight-bold"><span class="badge badge-sm "
                      :class="subscription.active ? 'bg-gradient-success' : 'bg-gradient-danger'">{{ subscription.active ? 'Active' : 'In-Active' }}</span></span></span>
                </div>
                <div class="ms-auto text-end">
                  <button v-if="subscription.active" v-on:click="openModal(subscription)" class="btn btn-link text-dark px-3 mb-0" title="Edit Subscription"><i class="material-symbols-rounded text-sm me-2">edit_square</i></button>
                </div>
                <UpdateSubscription
                  v-if="tenantMicro.selectedSubscription && tenantMicro.selectedSubscription.id == subscription.id"
                  :item="subscription"
                  @close="closeModal"
                  :page="'list'"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import UpdateSubscription from '@/components/Admin/Tenant/UpdateSubscription.vue';
import { formatDate } from '@/assets/utils';
import { getStores } from '@/stores';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const { tenantMicro , tenantStore } = getStores()

onMounted(async()=>{
  if (route.params.id) {
    await tenantStore.fetchTenantDetail(route.params.id)
  }
  await tenantMicro.fetchTenantSubscription(route.params.id)
})

function openModal(item) {
  tenantMicro.selectedSubscription = item
}
function closeModal() {
  tenantMicro.selectedSubscription = null
}
onUnmounted(()=>{
    tenantMicro.$reset()
})

</script>