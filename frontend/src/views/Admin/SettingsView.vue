<template>
  <div class="container-fluid my-3 py-3">
    <div class="row mb-5 justify-content-center">
      <div class="col-lg-8 mt-lg-0 mt-4">
        <!-- Card Basic Info -->
        <div class="card">
          <div class="card-header">
            <h6 class="text-capitalize m-0">Stripe Configuration</h6>
          </div>
          <div class="card-body">
            <form @submit.prevent="appStore.saveSetting">
              <div class="multisteps-form__panel border-radius-xl bg-white js-active" data-animation="FadeIn">
                <div class="row mt-3">
                    <div class="col-12 col-sm-12 mb-3">
                      <div class="form-group">
                        <label class="form-label">Stripe Key <span class="text-danger">*</span></label>
                        <input class="form-control" v-model="appStore.setting.stripe_key" type="text" required>

                      </div>
                      <span v-if="appStore.errors.stripe_key" class="text-danger text-xs">{{
                          appStore.errors.stripe_key
                        }}</span>
                    </div>
                    <div class="col-12 col-sm-12 mb-3">
                      <div class="form-group">
                        <label class="form-label">Stripe Secret <span class="text-danger">*</span></label>
                        <input class="form-control" type="text" v-model="appStore.setting.stripe_secret" required>

                      </div>
                      <span v-if="appStore.errors.stripe_secret" class="text-danger text-xs">{{
                          appStore.errors.stripe_secret
                        }}</span>
                    </div>
                  </div>

                  <div class="d-flex mt-4 justify-content-end gap-3">
                    <button class="btn bg-gradient-dark" :disabled="isDisabled" type="submit">Submit</button>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { isDisabled } from '@/assets/utils';
import { getStores } from '@/stores';
import { onMounted } from 'vue';

const  { appStore } = getStores()
onMounted(async () =>{
  appStore.fetchSetting()
})
</script>
