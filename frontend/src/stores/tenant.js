import { disableSubmitBtn, enableSubmitBtn, endLoader, handelException, startLoader, toastrMsg } from '@/assets/utils'
import router from '@/router'
import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { nextTick, ref } from 'vue'

export const useTenantStore = defineStore('tenant', {
  state: () => {
    return {
      data: ref([]),
      dataCount: ref(0),
      page: 1,
      tenant: ref({
        is_active:1
      }),
      errors: ref({}),
      currentPage: ref(1),
      totalPages: ref(0),
      search: ref(''),
    }
  },

  actions: {
// API Functions
    async fetchAllTenants(param) {
      startLoader()
      await axios
        .get(`tenant${param}`)
        .then(async (response) => {
          this.data = response.data.data
          this.totalPages = response.data.meta.last_page
          this.dataCount = response.data.meta.total
          endLoader()
        })
        .catch((error) => {
          endLoader()
          toastrMsg(error?.response?.data?.message ?? 'Server Error', 'error')
        })
    },
    async fetchTenantDetail(id) {
      startLoader()
      await axios
        .get('tenant/detail/' + id)
        .then(async (response) => {
          this.tenant = response.data.data
          endLoader()
        })
        .catch((error) => {
          endLoader()
          toastrMsg(error?.response?.data?.message ?? 'Server Error', 'error')
        })
    },
    async createTenant() {
      if (this.validation()) {
        disableSubmitBtn()
        startLoader()
        await axios
          .post('tenant/store', this.tenant)
          .then(async (response) => {
            enableSubmitBtn()
            endLoader()
            toastrMsg('Tenant Created Successfully.', 'success')
            await nextTick()
            router.push('/tenant')
          })
          .catch((error) => {
            handelException(error)
            enableSubmitBtn()
            endLoader()
          })
      }
    },
    async updateTenant() {
      if (this.validation()) {
        disableSubmitBtn()
        startLoader()
        await axios
          .put(`tenant/edit/${this.tenant.user_id}`, this.tenant)
          .then(async (response) => {
            enableSubmitBtn()
            endLoader()
            toastrMsg('Tenant Updated Succesfully.', 'success')
            await nextTick()
            router.push('/tenant')
          })
          .catch((error) => {
            handelException(error)
            enableSubmitBtn()
            endLoader()
          })
      }
    },
    async deleteTenant(id) {
      startLoader()
      await axios
        .delete(`tenant/delete/${id}`)
        .then(async (response) => {
          toastrMsg('Tenant Deleted Successfully.', 'success')
          await this.fetchAllTenants('?page=1')
          endLoader()
        })
        .catch((error) => {
          endLoader()
          toastrMsg(error?.response?.data?.message ?? 'Server Error', 'error')
        })
    },
    // Helper Functions
    validation() {
      this.errors = {}
      const validate = !!this.tenant.name && !!this.tenant.company_number && !!this.tenant.vat && !!this.tenant.email && !!this.tenant.phone_number  && !!this.tenant.street_address && !!this.tenant.postal_code && !!this.tenant.city && !!this.tenant.country
      if (!validate) {
        if (!this.tenant.name) this.errors.name = 'Company Name is required.'
        if (!this.tenant.company_number) this.errors.company_number = 'Company Number is required.'
        if (!this.tenant.vat) this.errors.vat = 'VAT is required.'
        if (!this.tenant.email) this.errors.email = 'Email is required.'
        if (!this.tenant.phone_number) this.errors.phone_number = 'Company Phone Number is required.'
        if (!this.tenant.street_address) this.errors.street_address = 'Street Address is required.'
        if (!this.tenant.postal_code) this.errors.postal_code = 'Postal Code is required.'
        if (!this.tenant.city) this.errors.city = 'City is required.'
        if (!this.tenant.country) this.errors.country = 'Country is required.'
        return false
      } else {
        return true
      }
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
  import.meta.hot.accept(acceptHMRUpdate(useTenantStore, import.meta.hot))
}
