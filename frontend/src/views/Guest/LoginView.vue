<template>
  <div class="container my-auto">
    <div class="row">
      <div class="col-lg-4 col-md-8 col-12 mx-auto">
        <div class="card z-index-0 fadeIn3 fadeInBottom">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div class="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
              <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
              <div class="row mt-3">
                <div class="col-2 text-center ms-auto">
                  <a class="btn btn-link px-3" href="javascript:;">
                    <i class="fa fa-facebook text-white text-lg"></i>
                  </a>
                </div>
                <div class="col-2 text-center px-1">
                  <a class="btn btn-link px-3" href="javascript:;">
                    <i class="fa fa-github text-white text-lg"></i>
                  </a>
                </div>
                <div class="col-2 text-center me-auto">
                  <a class="btn btn-link px-3" href="javascript:;">
                    <i class="fa fa-google text-white text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="authStore.loginUser">
              <div class="input-group input-group-outline my-3">
                <input
                  class="form-control"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  v-model="authStore.userData.email"
                  required
                  oninvalid="this.setCustomValidity('Please enter your email address.')"
                  oninput="this.setCustomValidity('')"
                />

                <span v-if="authStore.errors.email" class="text-danger">{{
                  authStore.errors.email
                }}</span>
              </div>
              <div class="input-group input-group-outline my-3">
                  <input
                    class="form-control"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    v-model="authStore.userData.password"
                    required
                    oninvalid="this.setCustomValidity('Please enter your password.')"
                    oninput="this.setCustomValidity('')"
                  />
              </div>
              <span v-if="authStore.errors.password" class="text-danger">{{
                  authStore.errors.password
                }}</span>
                <span v-if="authStore.errors.error" class="text-danger">{{
                  authStore.errors.error
                }}</span>
              <div class="text-center">
                <button type="submit"  :disabled="isDisabled" class="btn bg-gradient-dark w-100 my-4 mb-2">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'
import { getStores } from '@/stores'
import { isDisabled } from '@/assets/utils'

const { authStore } = getStores()
onUnmounted(async () => {
  authStore.$reset()
})
const show = ref(true)
</script>
