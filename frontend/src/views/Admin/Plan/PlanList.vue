<template>
  <div class="container-fluid py-2">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 d-flex justify-content-between px-3 align-items-center">
                <h6 class="text-white text-capitalize m-0">{{ $route.meta.title }}</h6>
                <div class="d-flex gap-2">
                <!-- <input
                  type="text"
                  id="table-search-users"
                  class="form-control border border-light px-2 text-white py-1"
                  placeholder="Search for Tenant"
                  v-model="planStore.search"
                  v-on:keyup="
                    planStore.fetchAllTenants(
                      '?search=' + planStore.search + '&limit=' + getSelectLimit(),
                    )
                  "
                /> -->
                <RouterLink
                  :to="{ name: 'plan.create' }"
                  class="btn btn-outline-secondary border-light text-white m-0 text-center px-3 d-inline-table"
                >
                  <i class="material-symbols-rounded">add</i>
                </RouterLink>
                </div>

              </div>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 p-2">Name</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 p-2">Expire After</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 p-2">Price</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 p-2">Discount</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 p-2">Price After Discount</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 p-2">Created At</th>
                      <th class="text-secondary opacity-7 p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="planStore.data ? planStore.data.length : false"
                        v-for="plan in planStore.data">
                      <td>
                        <h6 class="mb-0 text-sm">{{ plan.name }}</h6>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0">{{ plan.expire_after }} Days</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0">{{ plan.price }} $</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0">{{ plan.discount }} %</p>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0">{{ plan.price_after_discount }} $</p>
                      </td>
                      <td class="align-middle">
                        <span class="text-secondary text-xs font-weight-bold">{{ formatDate(plan.created_at , 'MMMM DD, YYYY') }}</span>
                      </td>
                      <td class="align-middle">
                        <RouterLink :to="{name : 'plan.edit' , params: { id: plan.id } }"
                           class="text-info font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                          <i class="material-symbols-rounded">edit_square</i>
                        </RouterLink>
                        <button class="text-danger btn font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Delete user"
                            v-on:click="
                              alertPopup('You won\'t be able to revert this!', 'Yes, delete it!', () =>
                                planStore.deletePlan(plan.id),
                              )
                            ">
                          <i class="material-symbols-rounded">delete</i>
                        </button>
                      </td>
                    </tr>
                    <tr v-else>
                      <td colspan="5" class="text-center">
                        <p class="text-xs mb-0">No Record Found</p></td>
                    </tr>
                  </tbody>
                </table>
                <ListPagination
                  :current-page="planStore.currentPage"
                  :total-pages="planStore.totalPages"
                  :total-items="planStore.dataCount"
                  :method="planStore.pagination"
                  :limit-method="fetchList"
                ></ListPagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import ListPagination from '@/components/ListPagination.vue'
import { onMounted, onUnmounted } from 'vue'
import { alertPopup, formatDate, getSelectLimit } from '@/assets/utils'
import { getStores } from '@/stores'

const { planStore } = getStores()
onMounted(async () => {
  await fetchList()
})
async function fetchList() {
  await planStore.fetchAllPlans(
    '?search=' + planStore.search + '&limit=' + getSelectLimit(),
  )
}
onUnmounted(async () => {
  planStore.$reset()
})
</script>
