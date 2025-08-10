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
                            <div class="col-12 col-sm-6 mb-3">
                              <div class="form-group">
                                <label class="form-label">Company Name <span class="text-danger">*</span></label>
                                <input class="form-control" v-model="tenantStore.tenant.name" type="text" required>

                              </div>
                              <span v-if="tenantStore.errors.name" class="text-danger text-xs">{{
                                  tenantStore.errors.name
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-6 mb-3">
                              <div class="form-group">
                                <label class="form-label">Company Number <span class="text-danger">*</span></label>
                                <input class="form-control" type="text" v-model="tenantStore.tenant.company_number" required>

                              </div>
                              <span v-if="tenantStore.errors.company_number" class="text-danger text-xs">{{
                                  tenantStore.errors.company_number
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-6 mb-3">
                              <div class="form-group">
                                <label class="form-label">VAT <span class="text-danger">*</span></label>
                                <input class="form-control" type="text" v-model="tenantStore.tenant.vat" required>

                              </div>
                              <span v-if="tenantStore.errors.vat" class="text-danger text-xs">{{
                                  tenantStore.errors.vat
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-6 mb-3">
                              <div class="form-group">
                                <label class="form-label">Company Email Address <span class="text-danger">*</span></label>
                                <input class="form-control" type="email" v-model="tenantStore.tenant.email" required>

                              </div>
                              <span v-if="tenantStore.errors.email" class="text-danger text-xs">{{
                                  tenantStore.errors.email
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-6 mb-3">
                              <div class="form-group">
                                <label class="form-label">Company Phone Number <span class="text-danger">*</span></label>
                                <input class="form-control" type="text" pattern="\d{11,}" title="Please enter at least 11 digits" v-model="tenantStore.tenant.phone_number" required>
                              </div>
                              <span v-if="tenantStore.errors.phone_number" class="text-danger text-xs">{{
                                  tenantStore.errors.phone_number
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-6 mb-3">
                              <div class="form-group">
                                <label class="form-label">Status/Verification <span class="text-danger">*</span></label>
                                <select v-model="tenantStore.tenant.is_active" class="form-control">
                                  <option value="1">Active</option>
                                  <option value="0">InActive</option>
                                </select>
                              </div>
                              <span v-if="tenantStore.errors.is_active" class="text-danger text-xs">{{
                                  tenantStore.errors.is_active
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-12 mb-3">
                              <div class="form-group">
                                <label class="form-label">Street Address <span class="text-danger">*</span></label>
                                <input class="form-control" type="text" v-model="tenantStore.tenant.street_address" required>
                              </div>
                              <span v-if="tenantStore.errors.street_address" class="text-danger text-xs">{{
                                  tenantStore.errors.street_address
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-3 mb-3">
                              <div class="form-group">
                                <label class="form-label">Bus Number</label>
                                <input class="form-control" type="text" v-model="tenantStore.tenant.bus_number">
                              </div>
                              <span v-if="tenantStore.errors.bus_number" class="text-danger text-xs">{{
                                  tenantStore.errors.bus_number
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-3 mb-3">
                              <div class="form-group">
                                <label class="form-label">Postal Code <span class="text-danger">*</span></label>
                                <input class="form-control" type="text" v-model="tenantStore.tenant.postal_code" required>
                              </div>
                              <span v-if="tenantStore.errors.postal_code" class="text-danger text-xs">{{
                                  tenantStore.errors.postal_code
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-3 mb-3">
                              <div class="form-group">
                                <label class="form-label">City <span class="text-danger">*</span></label>
                                <input class="form-control" type="text" v-model="tenantStore.tenant.city" required>
                              </div>
                              <span v-if="tenantStore.errors.city" class="text-danger text-xs">{{
                                  tenantStore.errors.city
                                }}</span>
                            </div>
                            <div class="col-12 col-sm-3 mb-3">
                              <div class="form-group">
                                <label class="form-label">Country <span class="text-danger">*</span></label>
                                <input class="form-control" type="text" v-model="tenantStore.tenant.country" required>
                              </div>
                              <span v-if="tenantStore.errors.country" class="text-danger text-xs">{{
                                  tenantStore.errors.country
                                }}</span>
                            </div>
                          </div>

                          <div class="d-flex mt-4 justify-content-end gap-3">
                            <RouterLink
                              :to="{ name: 'tenant.index' }"
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
import { isDisabled } from '@/assets/utils'
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue';


const { tenantStore } = getStores()
var method = ref()
const route = useRoute()

onMounted(async () => {
  method.value = tenantStore.createTenant
  if (route.params.id) {
    await tenantStore.fetchTenantDetail(route.params.id)
    method.value = tenantStore.updateTenant
  }
})
onUnmounted(async () => {
  tenantStore.$reset()
})
</script>
