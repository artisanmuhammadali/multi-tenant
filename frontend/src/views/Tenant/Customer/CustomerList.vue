<template>
  <div class="container-fluid py-2">
      <div class="row">
        <div class="col-12">
          <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 d-flex justify-content-between px-3 align-items-center">
                <h6 class="text-white text-capitalize m-0">{{ $route.meta.title }}</h6>
                <div class="d-flex gap-2">
                <RouterLink
                  :to="{ name: 'customer.create' }"
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
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 p-2">Customer</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 p-2">Phone Number</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 p-2">Created At</th>
                      <th class="text-secondary opacity-7 p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="customerStore.data ? customerStore.data.length : false"
                        v-for="customer in customerStore.data">
                      <td>
                        <div class="d-flex py-1">
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">{{ customer.name }}</h6>
                            <p class="text-xs text-secondary mb-0">{{ customer.email }}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0">{{ customer.phone_number }}</p>
                      </td>
                      <td class="align-middle">
                        <span class="text-secondary text-xs font-weight-bold">{{ formatDate(customer.created_at , 'MMMM DD, YYYY') }}</span>
                      </td>
                      <td class="align-middle">
                        <RouterLink :to="{name : 'customer.edit' , params: { id: customer.user_id } }"
                           class="text-info font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                          <i class="material-symbols-rounded">edit_square</i>
                        </RouterLink>
                        <button class="text-danger btn font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Delete user"
                            v-on:click="
                              alertPopup('You won\'t be able to revert this!', 'Yes, delete it!', () =>
                                customerStore.deleteCustomer(customer.user_id),
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
                  :current-page="customerStore.currentPage"
                  :total-pages="customerStore.totalPages"
                  :total-items="customerStore.dataCount"
                  :method="customerStore.pagination"
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

const { customerStore } = getStores()
onMounted(async () => {
  await fetchList()
})
async function fetchList() {
  await customerStore.fetchAllCustomers(
    '?search=' + customerStore.search + '&limit=' + getSelectLimit(),
  )
}
onUnmounted(async () => {
  customerStore.$reset()
})
</script>
