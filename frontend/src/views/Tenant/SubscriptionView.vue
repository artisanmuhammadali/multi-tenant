<template>
  <div class="container-fluid py-2">

    <div class="row my-5">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="d-flex mt-n2 mb-3">
              <div class="avatar avatar-xl bg-gradient-dark border-radius-xl p-2 mt-n4">
                <h1 class="material-symbols-rounded text-white m-0">detector_status</h1>
              </div>
              <div class="ms-3 my-auto">
                <h6 class="mb-0">{{ subscriptionStore.plan.name }}</h6>
              </div>
            </div>
            <hr class="horizontal dark">
            <div class="row">
              <div class="col-6">
                <h6 class="text-sm mb-0">{{ formatDate(subscriptionStore.subscription.created_at , 'MMMM DD, YYYY') }}
                </h6>
                <p class="text-secondary text-sm font-weight-normal mb-0">Subscibe At</p>
              </div>
              <div class="col-6 text-end">
                <h6 class="text-sm mb-0">
                  {{ formatDate(subscriptionStore.subscription.subscription_ends , 'MMMM DD, YYYY') }}</h6>
                <p class="text-secondary text-sm font-weight-normal mb-0">Expire At</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-3 mb-lg-0 mb-4 d-flex" v-for="item in planStore.data">
        <div class="card shadow-lg h-100 w-100" :class="item.active ? 'bg-gradient-dark border-0' : ''">
          <span class="badge rounded-pill  mt-n2 mx-auto"
            :class="item.active ? 'bg-primary' : 'bg-light text-dark'">{{item.name}}</span>
          <div class="card-header text-center pt-4 pb-3"
            :class="item.active ? 'bg-transparent text-white' : ''">
            <h1 class="font-weight-bold mt-2" :class="item.active ? 'text-white' : ''">
              <span :class="item.discount > 0 ? 'text-decoration-line-through' : ''">${{ item.price }}</span>
            </h1>
            <span class="badge bg-primary" v-if="item.discount > 0">{{ item.discount }}% Off</span>
            <h1 class="font-weight-bold mt-2" v-if="item.discount > 0"
              :class="item.active ? 'text-white' : ''">${{ item.price_after_discount }}</h1>
            <p>Valid For {{ item.expire_after }} Days</p>
          </div>
          <div class="card-body text-lg-start text-center pt-0 d-flex flex-column">
            <div class="planDescription mb-auto" v-clean-html="item.description"
              :class="item.active ? 'text-white' : ''"></div>
            <button href="javascript:;" class="btn btn-icon  d-lg-block mt-auto mb-0" :disabled="getDayDiff(subscriptionStore.subscription.subscription_ends) > 0" :class="item.active  ? 'bg-gradient-light':'bg-gradient-dark'">
              {{ getSubscriptionButtonText(item) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import {
    formatDate,
    getDayDiff,
    getSelectLimit,
  } from '@/assets/utils';
  import {
    getStores
  } from '@/stores';
  import {
    onMounted
  } from 'vue';

  const {
    planStore,
    subscriptionStore
  } = getStores()

  onMounted(async () => {
    await fetchList()
    await subscriptionStore.fetchPlans()
  })
  async function fetchList() {
    await planStore.fetchAllPlans(
      '?search=' + planStore.search + '&limit=' + getSelectLimit(),
    )
  }
  const getSubscriptionButtonText = (item) => {
  const daysLeft = getDayDiff(subscriptionStore.subscription.subscription_ends)

  if (daysLeft > 0 && item.active) {
    return 'Already Subscribe'
  }

  if (daysLeft > 0 && !item.active) {
    return `Subscribe After ${daysLeft} Days`
  }

  if (daysLeft <= 0 && item.active) {
    return 'Subscribe Again'
  }

  return 'Subscribe Now'
}

</script>
