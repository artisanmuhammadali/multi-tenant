import { disableSubmitBtn, enableSubmitBtn, endLoader, handelException, startLoader, toastrMsg } from '@/assets/utils'
import router from '@/router'
import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { nextTick, ref } from 'vue'

export const useCustomerStore = defineStore('customer', {
  state: () => {
    return {
      data: ref([]),
      dataCount: ref(0),
      page: 1,
      customer: ref({}),
      addresses: ref([]),
      errors: ref({}),
      currentPage: ref(1),
      totalPages: ref(0),
      search: ref(''),
    }
  },

  actions: {
// API Functions
    async fetchAllCustomers(param) {
      startLoader()
      await axios
        .get(`tenant/customer${param}`)
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
    async fetchCustomerDetail(id) {
      startLoader()
      await axios
        .get('tenant/customer/detail/' + id)
        .then(async (response) => {
          this.customer = response.data.data
          this.addresses = response.data.data.addresses
          endLoader()
        })
        .catch((error) => {
          endLoader()
          toastrMsg(error?.response?.data?.message ?? 'Server Error', 'error')
        })
    },
    async createCustomer() {
      if (this.validation()) {
        const data = { 'customer' : this.customer , 'addresses' : this.addresses}
        disableSubmitBtn()
        startLoader()
        await axios
          .post('tenant/customer/store', data)
          .then(async (response) => {
            enableSubmitBtn()
            endLoader()
            toastrMsg('Customer Created Successfully.', 'success')
            await nextTick()
            router.push('/tenant/customer')
          })
          .catch((error) => {
            handelException(error)
            enableSubmitBtn()
            endLoader()
          })
      }
    },
    async updateCustomer() {
      if (this.validation()) {
        disableSubmitBtn()
        const data = { 'customer' : this.customer , 'addresses' : this.addresses}
        startLoader()
        await axios
          .put(`tenant/customer/edit/${this.customer.id}`, data)
          .then(async (response) => {
            enableSubmitBtn()
            endLoader()
            toastrMsg('Customer Updated Succesfully.', 'success')
            await nextTick()
            router.push('/tenant/customer')
          })
          .catch((error) => {
            handelException(error)
            enableSubmitBtn()
            endLoader()
          })
      }
    },
    async deleteCustomer(id) {
      startLoader()
      await axios
        .delete(`tenant/customer/delete/${id}`)
        .then(async (response) => {
          toastrMsg('Customer Deleted Successfully.', 'success')
          await this.fetchAllCustomers('?page=1')
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
      const validate = !!this.customer.first_name && !!this.customer.last_name && !!this.customer.email && !!this.customer.phone_number 
      if (!validate) {
        if (!this.customer.first_name) this.errors.first_name = 'First Name is required.'
        if (!this.customer.last_name) this.errors.last_name = 'Last Name is required.'
        if (!this.customer.email) this.errors.email = 'Email is required.'
        if (!this.customer.phone_number) this.errors.phone_number = 'Phone Number is required.'
        return false
      } else {
        return true
      }
    },
    async pagination(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        await this.fetchAllCustomers('?page=' + page + '&search=' + this.search)
      }
    },
  },
})

// Hot Module Replacement (only for development)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCustomerStore, import.meta.hot))
}
