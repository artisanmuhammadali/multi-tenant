<template>
  <div class="container-fluid py-2">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-dark shadow-dark border-radius-lg py-3 d-flex justify-content-between px-3 align-items-center">
              <h6 class="text-white text-capitalize m-0">{{ $route.meta.title }}</h6>
              <div class="d-flex gap-2">
                <!-- <input
                  type="text"
                  id="table-search-users"
                  class="form-control border border-light px-2 text-white py-1"
                  placeholder="Search for Tenant"
                  v-model="tenantStore.search"
                  v-on:keyup="
                    tenantStore.fetchAllTenants(
                      '?search=' + tenantStore.search + '&limit=' + getSelectLimit(),
                    )
                  "
                /> -->
                <RouterLink :to="{ name: 'tenant.create' }"
                  class="btn btn-outline-secondary border-light text-white m-0 text-center px-3 d-inline-table">
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
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 p-2">Tenant</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 p-2">Phone Number
                    </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 p-2">Status</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 p-2">Created At</th>
                    <th class="text-secondary opacity-7 p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="tenantStore.data ? tenantStore.data.length : false" v-for="tenant in tenantStore.data">
                    <td>
                      <div class="d-flex py-1">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-sm">{{ tenant.name }}</h6>
                          <p class="text-xs text-secondary mb-0">{{ tenant.email }}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs font-weight-bold mb-0">{{ tenant.phone_number }}</p>
                    </td>
                    <td class="align-middle text-sm">
                      <span class="badge badge-sm "
                        :class="tenant.is_active ? 'bg-gradient-success' : 'bg-gradient-danger'">{{ tenant.is_active ? 'Active' : 'In-Active' }}</span>
                    </td>
                    <td class="align-middle">
                      <span
                        class="text-secondary text-xs font-weight-bold">{{ formatDate(tenant.created_at , 'MMMM DD, YYYY') }}</span>
                    </td>
                    <td class="align-middle">
                      <div class="d-flex gap-2">
                        <RouterLink :to="{name : 'tenant.edit' , params: { id: tenant.user_id } }"
                          class="text-info font-weight-bold text-xs" data-toggle="tooltip"
                          data-original-title="Edit user">
                          <i class="material-symbols-rounded">edit_square</i>
                        </RouterLink>
                        <RouterLink :to="{name : 'tenant.subsciption' , params: { id: tenant.user_id } }"
                          class="font-weight-bold text-xs text-success" data-toggle="tooltip"
                          data-original-title="View Subscription Detail">
                          <i class="material-symbols-rounded">orbit</i>
                        </RouterLink>
                        <button class="text-danger btn p-0 font-weight-bold text-xs" data-toggle="tooltip"
                          data-original-title="Delete user" v-on:click="
                              alertPopup('You won\'t be able to revert this!', 'Yes, delete it!', () =>
                                tenantStore.deleteTenant(tenant.user_id),
                              )
                            ">
                          <i class="material-symbols-rounded">delete</i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-else>
                    <td colspan="5" class="text-center">
                      <p class="text-xs mb-0">No Record Found</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <ListPagination :current-page="tenantStore.currentPage" :total-pages="tenantStore.totalPages"
                :total-items="tenantStore.dataCount" :method="tenantStore.pagination" :limit-method="fetchList">
              </ListPagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import ListPagination from '@/components/ListPagination.vue'
  import {
    onMounted,
    onUnmounted
  } from 'vue'
  import {
    alertPopup,
    formatDate,
    getSelectLimit
  } from '@/assets/utils'
  import {
    getStores
  } from '@/stores'

  const {
    tenantStore
  } = getStores()
  onMounted(async () => {
    await fetchList()
  })
  async function fetchList() {
    await tenantStore.fetchAllTenants(
      '?search=' + tenantStore.search + '&limit=' + getSelectLimit(),
    )
  }
  onUnmounted(async () => {
    tenantStore.$reset()
  })

</script>
