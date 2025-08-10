<template>
  <div class="container-fluid py-2">
      <div class="row">
        <div class="col-12">
          <div class="multisteps-form mb-9">
            <!--progress bar-->
            <div class="row">
              <div class="col-12 col-lg-8 mx-auto my-5">
              </div>
            </div>
            <!--form panels-->
            <div class="row">
              <div class="col-12 col-lg-8 m-auto">
                <div class="card">
                  <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-dark shadow-dark border-radius-lg p-3 ">
                      <h6 class="text-white text-capitalize m-0">{{ $route.meta.title }}</h6>
                    </div>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="method">
                      <div class="multisteps-form__panel border-radius-xl bg-white js-active" data-animation="FadeIn">
                        <div class="row mt-3">
                            <div class="col-12 col-sm-12 mb-3">
                              <div class="form-group">
                                <label class="form-label">Name <span class="text-danger">*</span></label>
                                <input class="form-control" v-model="planStore.plan.name" type="text" required>

                              </div>
                              <span v-if="planStore.errors.name" class="text-danger text-xs">{{
                                  planStore.errors.name
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-4 mb-3">
                              <div class="form-group">
                                <label class="form-label">Price <span class="text-danger">*</span></label>
                                <input class="form-control" type="number" min="0" v-model="planStore.plan.price" required>

                              </div>
                              <span v-if="planStore.errors.price" class="text-danger text-xs">{{
                                  planStore.errors.price
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-4 mb-3">
                              <div class="form-group">
                                <label class="form-label">Plan Expire After ( Days ) <span class="text-danger">*</span></label>
                                <input class="form-control" type="number" min="1" max="365" v-model="planStore.plan.expire_after">
                              </div>
                              <span v-if="planStore.errors.expire_after" class="text-danger text-xs">{{
                                  planStore.errors.expire_after
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-4 mb-3">
                              <div class="form-group">
                                <label class="form-label">Discount %</label>
                                <input class="form-control" type="number" min="0" max="100" v-model="planStore.plan.discount">
                              </div>
                              <span v-if="planStore.errors.discount" class="text-danger text-xs">{{
                                  planStore.errors.discount
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-2 flex-fill mb-3">
                              <div class="form-group">
                                <label class="form-label">Users Limit <span class="text-danger">*</span></label>
                                <input class="form-control" type="number" min="1" v-model="planStore.plan.user_limit">
                              </div>
                              <span v-if="planStore.errors.user_limit" class="text-danger text-xs">{{
                                  planStore.errors.user_limit
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-2 flex-fill mb-3">
                              <div class="form-group">
                                <label class="form-label">Device Limit <span class="text-danger">*</span></label>
                                <input class="form-control" type="number" min="1"  v-model="planStore.plan.device_limit">
                              </div>
                              <span v-if="planStore.errors.device_limit" class="text-danger text-xs">{{
                                  planStore.errors.device_limit
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-2 flex-fill mb-3">
                              <div class="form-group">
                                <label class="form-label">Api Limit <span class="text-danger">*</span></label>
                                <input class="form-control" type="number" min="1" v-model="planStore.plan.api_limit">
                              </div>
                              <span v-if="planStore.errors.api_limit" class="text-danger text-xs">{{
                                  planStore.errors.api_limit
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-2 flex-fill mb-3">
                              <div class="form-group">
                                <label class="form-label">Offline Sync<span class="text-danger">*</span></label>
                                <select v-model="planStore.plan.offline_sync" class="form-control">
                                  <option value="1">Active</option>
                                  <option value="0">InActive</option>
                                </select>
                              </div>
                              <span v-if="planStore.errors.offline_sync" class="text-danger text-xs">{{
                                  planStore.errors.offline_sync
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-2 flex-fill mb-3">
                              <div class="form-group">
                                <label class="form-label">Advance Report<span class="text-danger">*</span></label>
                                <select v-model="planStore.plan.advance_report" class="form-control">
                                  <option value="1">Active</option>
                                  <option value="0">InActive</option>
                                </select>
                              </div>
                              <span v-if="planStore.errors.advance_report" class="text-danger text-xs">{{
                                  planStore.errors.advance_report
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-12 mb-3 d-none">
                              <label class="form-label">Description <span class="text-danger">*</span></label>
                              <froala
                                id="edit"
                                :tag="'textarea'"
                                :config="froalaConfig"
                                v-model:value="planStore.plan.description"
                              ></froala>
                              <span v-if="planStore.errors.description" class="text-danger text-xs">{{
                                  planStore.errors.description
                                }}</span>
                            </div>
                          </div>

                          <div class="d-flex mt-4 justify-content-end gap-3">
                            <RouterLink
                              :to="{ name: 'plan.index' }"
                              class="btn btn-secondary"
                            >
                              Back
                            </RouterLink>
                            <button class="btn bg-gradient-dark" :disabled="isDisabled" type="submit">Submit</button>
                          </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { getStores } from '@/stores';
import { froalaConfig, isDisabled } from '@/assets/utils'
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue';


const { planStore } = getStores()
var method = ref()
const route = useRoute()

onMounted(async () => {
  method.value = planStore.createPlan
  if (route.params.id) {
    await planStore.fetchPlanDetail(route.params.id)
    method.value = planStore.updatePlan
  }
})
onUnmounted(async () => {
  planStore.$reset()
})
</script>
