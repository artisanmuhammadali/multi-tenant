import { disableSubmitBtn, enableSubmitBtn, endLoader, handelException, startLoader, toastrMsg } from '@/assets/utils'
import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      setting: ref({}),
      settings: ref([]),
      dashboardStats: ref({}),
      errors:ref({}),
    }
  },

  actions: {
    async fetchDashboardStats() {
      startLoader()
      await axios
        .get(`dashboard-stats`)
        .then(async (response) => {
          this.dashboardStats = response.data.data
          endLoader()
        })
        .catch((error) => {
          endLoader()
          toastrMsg(error?.response?.data?.message ?? 'Server Error', 'error')
        })
    },
    async fetchSetting() {
      startLoader()
      await axios
        .get(`admin/setting`)
        .then(async (response) => {
          this.setting = response.data.data
          endLoader()
        })
        .catch((error) => {
          endLoader()
          toastrMsg(error?.response?.data?.message ?? 'Server Error', 'error')
        })
    },
    async fetchSettingByKey(key) {
      startLoader()
      await axios
        .get(`admin/setting/get/${key}`)
        .then(async (response) => {
          const key = Object.keys(response.data)[0];
          const value = response.data[key];          
          this.settings[key] = value;
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
          .post('admin/setting/store', {...this.setting})
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
