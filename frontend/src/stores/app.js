import { disableSubmitBtn, enableSubmitBtn, endLoader, handelException, startLoader, toastrMsg } from '@/assets/utils'
import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      setting: ref({}),
      errors:ref({}),
    }
  },

  actions: {
    async fetchSetting() {
      startLoader()
      await axios
        .get(`setting`)
        .then(async (response) => {
          this.setting = response.data.data
          endLoader()
        })
        .catch((error) => {
          endLoader()
          toastrMsg(error?.response?.data?.message ?? 'Server Error', 'error')
        })
    },
    async saveSetting() {
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
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
