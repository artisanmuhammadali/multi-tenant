import { disableSubmitBtn, enableSubmitBtn, endLoader, handelException, startLoader, toastrMsg } from '@/assets/utils'
import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useSubscriptionStore = defineStore('subscription', {
  state: () => {
    return {
      data: ref([]),
      subscription: ref({}),
      plan: ref({}),
      errors:ref({}),
    }
  },

  actions: {
    async fetchPlans() {
      startLoader()
      await axios
        .get(`subscription`)
        .then(async (response) => {
          this.subscription = response.data.subscription
          this.plan = response.data.plan
          endLoader()
        })
        .catch((error) => {
          endLoader()
          toastrMsg(error?.response?.data?.message ?? 'Server Error', 'error')
        })
    },
    async savePlan() {
        disableSubmitBtn()
        startLoader()
        await axios
          .post('setting/store', {...this.setting})
          .then(async (response) => {
            enableSubmitBtn()
            endLoader()
            toastrMsg('The Site Config has been save/updated!', 'success')
          })
          .catch((error) => {
            handelException(error)
            enableSubmitBtn()
            endLoader()
          })

    },
  },
})

// Hot Module Replacement (only for development)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSubscriptionStore, import.meta.hot))
}
