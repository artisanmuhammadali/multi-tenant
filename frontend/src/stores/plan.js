import { disableSubmitBtn, enableSubmitBtn, endLoader, handelException, startLoader, toastrMsg } from '@/assets/utils'
import router from '@/router'
import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { nextTick, ref } from 'vue'

export const usePlanStore = defineStore('plan', {
  state: () => {
    return {
      data: ref([]),
      dataCount: ref(0),
      page: 1,
      plan: ref({}),
      errors: ref({}),
      currentPage: ref(1),
      totalPages: ref(0),
      search: ref(''),
    }
  },

  actions: {
// API Functions
    async fetchAllPlans(param) {
      startLoader()
      await axios
        .get(`plan${param}`)
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
    async fetchPlanDetail(id) {
      startLoader()
      await axios
        .get('plan/detail/' + id)
        .then(async (response) => {
          this.plan = response.data.data
          endLoader()
        })
        .catch((error) => {
          endLoader()
          toastrMsg(error?.response?.data?.message ?? 'Server Error', 'error')
        })
    },
    async createPlan() {
      if (this.validation()) {
        disableSubmitBtn()
        startLoader()
        await axios
          .post('plan/store', this.plan)
          .then(async (response) => {
            enableSubmitBtn()
            endLoader()
            toastrMsg('Plan Created Successfully.', 'success')
            await nextTick()
            router.push('/plan')
          })
          .catch((error) => {
            handelException(error)
            enableSubmitBtn()
            endLoader()
          })
      }
    },
    async updatePlan() {
      if (this.validation()) {
        disableSubmitBtn()
        startLoader()
        await axios
          .put(`plan/edit/${this.plan.id}`, this.plan)
          .then(async (response) => {
            enableSubmitBtn()
            endLoader()
            toastrMsg('Plan Updated Succesfully.', 'success')
            await nextTick()
            router.push('/plan')
          })
          .catch((error) => {
            handelException(error)
            enableSubmitBtn()
            endLoader()
          })
      }
    },
    async deletePlan(id) {
      startLoader()
      await axios
        .delete(`plan/delete/${id}`)
        .then(async (response) => {
          toastrMsg('Plan Deleted Successfully.', 'success')
          await this.fetchAllPlans('?page=1')
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
      const validate = !!this.plan.name && !!this.plan.description && !!this.plan.price
      if (!validate) {
        if (!this.plan.name) this.errors.name = 'Name is required.'
        if (!this.plan.description) this.errors.description = 'Description is required.'
        if (!this.plan.price) this.errors.price = 'Price is required.'
        return false
      } else {
        return true
      }
    },
    async pagination(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        await this.fetchAllPlans('?page=' + page + '&search=' + this.search)
      }
    },
  },
})

// Hot Module Replacement (only for development)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlanStore, import.meta.hot))
}
