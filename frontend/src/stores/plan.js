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
      plan: ref({
        advance_report:1,
        offline_sync:1,
      }),
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
        .get(`admin/plan${param}`)
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
        .get('admin/plan/detail/' + id)
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
        disableSubmitBtn()
        startLoader()
        await axios
          .post('admin/plan/store', this.plan)
          .then(async (response) => {
            enableSubmitBtn()
            endLoader()
            toastrMsg('Plan Created Successfully.', 'success')
            await nextTick()
            router.push('/admin/plan')
          })
          .catch((error) => {
            handelException(error)
            enableSubmitBtn()
            endLoader()
          })
      
    },
    async updatePlan() {
        disableSubmitBtn()
        startLoader()
        await axios
          .put(`admin/plan/edit/${this.plan.id}`, this.plan)
          .then(async (response) => {
            enableSubmitBtn()
            endLoader()
            toastrMsg('Plan Updated Succesfully.', 'success')
            await nextTick()
            router.push('/admin/plan')
          })
          .catch((error) => {
            handelException(error)
            enableSubmitBtn()
            endLoader()
          })
      
    },
    async deletePlan(id) {
      startLoader()
      await axios
        .delete(`admin/plan/delete/${id}`)
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
