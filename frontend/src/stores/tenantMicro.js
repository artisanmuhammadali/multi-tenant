import { disableSubmitBtn, enableSubmitBtn, endLoader, handelException, startLoader, toastrMsg } from '@/assets/utils'
import router from '@/router'
import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { nextTick, ref } from 'vue'
import { getStores } from '.'

export const useTenantMicroStore = defineStore('tenantMicro', {
  state: () => {
    return {
      data: ref([]),
      selectedSubscription:ref({}),
      dataCount: ref(0),
      page: 1,
      errors: ref({}),
      currentPage: ref(1),
      totalPages: ref(0),
      search: ref(''),
    }
  },

  actions: {
// API Functions
    async fetchTenantSubscription(id) {
      startLoader()
      await axios
        .get(`admin/tenant/subscription/${id}`)
        .then(async (response) => {
          this.data = response.data.data
          endLoader()
        })
        .catch((error) => {
          endLoader()
          toastrMsg(error?.response?.data?.message ?? 'Server Error', 'error')
        })
    },
    async updateTenantSubscription() {
        disableSubmitBtn()
        startLoader()
        const { tenantStore } = getStores()
        await axios
          .post(`admin/tenant/subscription/update/${this.selectedSubscription.id}`, {'subscription_ends':this.selectedSubscription.subscription_ends})
          .then(async (response) => {
            enableSubmitBtn()
            endLoader()
            await this.fetchTenantSubscription(tenantStore.tenant.user_id)
            this.selectedSubscription = {}
            toastrMsg('Tenant Created Successfully.', 'success')
            await nextTick()

          })
          .catch((error) => {
            handelException(error)
            enableSubmitBtn()
            endLoader()
          })
      
    },
    async pagination(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        await this.fetchAllTenants('?page=' + page + '&search=' + this.search)
      }
    },
  },
})

// Hot Module Replacement (only for development)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTenantMicroStore, import.meta.hot))
}
