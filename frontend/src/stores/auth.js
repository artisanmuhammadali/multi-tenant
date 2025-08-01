import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from 'axios'
import { nextTick, ref } from 'vue'
import router from '@/router'
import {
  toastrMsg,
  startLoader,
  endLoader,
  disableSubmitBtn,
  enableSubmitBtn,
  setAuthToken,
  getAuthToken,
} from '@/assets/utils'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null,
      data: null,
      userData: ref({}),
      errors: ref({}),
      file: ref(null),
    }
  },

  actions: {
    // API Functions
    async loginUser() {
      if (this.validation()) {
          await axios
                .post('auth/login', this.userData)
                .then(async (response) => {
                    setAuthToken(response.data.token)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`; // 👈 add this line
                    await this.fetchUser();
                    router.push('/dashboard')
                    endLoader()
                })
                .catch((error) => {
                  console.error(error)
                  endLoader()
                  toastrMsg(error?.response?.data?.message ?? 'Server Error', 'error')
                })
        }
    },
    async logoutUser() {
         await axios.get('auth/logout')
        .then(async (response) => {
            setAuthToken('')
            this.user = null
            router.push('/')
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async fetchUser() {
        await axios.get('user')
        .then(async (response) => {
            this.user = response.data.user
            this.user.isAdmin = this.user.role == 'super-admin'
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async updateProfile() {
      startLoader()
      const formData = new FormData()
      if (this.userData.image) formData.append('image', this.userData.image)
      if (this.userData.signature) formData.append('signature', this.userData.signature)
      await axios
        .put(`user/update-profile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(async (response) => {
          this.user = response.data.user
          this.userData = {}
          toastrMsg('Profile Updated Successfully.', 'success')
          await nextTick()
          endLoader()
          router.push('/user/profile')
        })
        .catch((error) => {
          endLoader()
          toastrMsg(error?.response?.data?.message ?? 'Server Error', 'error')
        })
    },
    async updatePassword() {
      disableSubmitBtn()
      startLoader()
      await axios
        .put(`user/update-password`, this.userData)
        .then(async (response) => {
          this.user = response.data.user
          this.userData = {}
          enableSubmitBtn()
          endLoader()
          toastrMsg('Password Updated Successfully.', 'success')
          await nextTick()
          router.push('/user/profile')
        })
        .catch((error) => {
          enableSubmitBtn()
          endLoader()
          toastrMsg(error?.response?.data?.message ?? 'Server Error', 'error')
        })
    },
    // Helper Functions
    validation() {
      this.errors = {}
      const validate = !!this.userData.email && !!this.userData.password
      if (!validate) {
        if (!this.userData.email) this.errors.email = 'Email is required.'
        if (!this.userData.password) this.errors.password = 'Password is required.'
        return false
      } else {
        return true
      }
    },

    onFileChanged($event) {
      const target = $event.target
      if (target && target.files) {
        this.userData.image = target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.userData.imagePreview = e.target.result
        }
        reader.readAsDataURL(target.files[0])
        if (this.profile.value) {
          this.profile.value = ''
        }
      }
    },
  },
})

// Hot Module Replacement (only for development)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
