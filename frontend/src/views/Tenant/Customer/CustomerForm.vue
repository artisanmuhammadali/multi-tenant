<template>
  <div class="row mt-5">
    <div class="col-12 col-lg-10 m-auto">
      <div class="card">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class="bg-gradient-dark shadow-dark border-radius-lg p-3 ">
            <h6 class="text-white text-capitalize m-0">Customer Information</h6>
          </div>
        </div>
        <div class="card-body">
          <form @submit.prevent="method">
            <div class="row mt-3">
              <div class="col-12 col-sm-6 mb-3">
                <div class="form-group">
                  <label class="form-label">First Name <span class="text-danger">*</span></label>
                  <input class="form-control" v-model="customerStore.customer.first_name" type="text" required>

                </div>
                <span v-if="customerStore.errors.first_name" class="text-danger text-xs">{{
                    customerStore.errors.first_name
                  }}</span>
              </div>
              <div class="col-12 col-sm-6 mb-3">
                <div class="form-group">
                  <label class="form-label">Last Name <span class="text-danger">*</span></label>
                  <input class="form-control" type="text" v-model="customerStore.customer.last_name" required>

                </div>
                <span v-if="customerStore.errors.last_name" class="text-danger text-xs">{{
                    customerStore.errors.last_name
                  }}</span>
              </div>
              <div class="col-12 col-sm-6 mb-3">
                <div class="form-group">
                  <label class="form-label">Email Address <span class="text-danger">*</span></label>
                  <input class="form-control" type="email" v-model="customerStore.customer.email" required>

                </div>
                <span v-if="customerStore.errors.email" class="text-danger text-xs">{{
                    customerStore.errors.email
                  }}</span>
              </div>
              <div class="col-12 col-sm-6 mb-3">
                <div class="form-group">
                  <label class="form-label">Phone Number <span class="text-danger">*</span></label>
                  <input class="form-control" type="text" pattern="\d{11,}" title="Please enter at least 11 digits" v-model="customerStore.customer.phone_number" required>
                </div>
                <span v-if="customerStore.errors.phone_number" class="text-danger text-xs">{{
                    customerStore.errors.phone_number
                  }}</span>
              </div>
              <div class="col-12 col-sm-12 mb-3">
                <div class="form-group">
                  <label class="form-label">Note</label>
                  <textarea v-model="customerStore.customer.note" class="form-control"></textarea>
                </div>
                <span v-if="customerStore.errors.note" class="text-danger text-xs">{{
                    customerStore.errors.note
                  }}</span>
              </div>
            </div>
            <div class="row m-2 bg-light rounded p-2 py-3 border" v-for="(address, index) in customerStore.addresses">
              <div class="d-flex justify-content-between">

                <p class="text-xs text-dark">Address # {{ index + 1 }}</p>

                <div class="d-flex align-items-center">
                  <button
                    title="Remove contact"
                    v-on:click="removeContact(index)"
                    type="button"
                    class="text-danger btn p-0"
                    v-if="index > 0"
                  >
                    <span class="material-symbols-rounded">do_not_disturb_on</span>
                  </button>
                  <button
                    title="Remove contact"
                    v-on:click="deleteContact(index, address.id)"
                    type="button"
                    class="text-danger btn text-xs hidden ms-2"
                    v-if="address.id && index > 0"
                  >
                    <span class="material-symbols-rounded">do_not_disturb_on</span>
                  </button>
                </div>

              </div>
              <div class="col-12 col-sm-12 mb-3">
                <div class="form-group">
                  <label class="form-label">Street Address <span class="text-danger">*</span></label>
                  <input class="form-control" v-model="address.street_address" type="text" required>
                </div>
              </div>
              <div class="col-12 col-sm-4 mb-3">
                <div class="form-group">
                  <label class="form-label">Postal Code<span class="text-danger">*</span></label>
                  <input class="form-control" type="text" v-model="address.postal_code" required>
                </div>
              </div>
              <div class="col-12 col-sm-4 mb-3">
                <div class="form-group">
                  <label class="form-label">City <span class="text-danger">*</span></label>
                  <input class="form-control" type="text" v-model="address.city" required>
                </div>
              </div>
              <div class="col-12 col-sm-4 mb-3">
                <div class="form-group">
                  <label class="form-label">Type <span class="text-danger">*</span></label>
                  <select v-model="address.type" class="form-control">
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div class="col-12 col-sm-12 mb-3">
                <div class="form-group">
                  <label class="form-label">Note</label>
                  <textarea v-model="address.note" class="form-control"></textarea>
                </div>
                <span v-if="customerStore.errors.phone_number" class="text-danger text-xs">{{
                    customerStore.errors.phone_number
                  }}</span>
              </div>
            </div>
            <div class="d-flex justify-content-end">
            <button title="Add more contact" class="btn" v-on:click="addContact" type="button">
              <span class="material-symbols-rounded">add_circle</span>
            </button>
          </div>
            <div class="d-flex justify-content-end gap-3 position-sticky bottom-0 bg-white pt-3 border-top">
              <RouterLink
                :to="{ name: 'customer.index' }"
                class="btn btn-secondary"
              >
                Back
              </RouterLink>
              <button class="btn bg-gradient-dark" :disabled="isDisabled" type="submit">Submit</button>
            </div>
          </form>
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


const { customerStore } = getStores()
var method = ref()
const route = useRoute()

onMounted(async () => {
  addContact()
  method.value = customerStore.createCustomer
  if (route.params.id) {
    await customerStore.fetchCustomerDetail(route.params.id)
    method.value = customerStore.updateCustomer
  }
})
onUnmounted(async () => {
  customerStore.$reset()
})
const addContact = () => {
  customerStore.addresses.push({
    street_address: '',
    postal_code: '',
    city: '',
    type: 'home',
    note: '',
  })
}
function removeContact(index) {
  customerStore.addresses.splice(index, 1)
}
async function deleteContact(index, id) {
  await alertPopup("You won't be able to revert this!", 'Yes, delete it!', () =>
    customerStore.deleteContact(id),
  )
}
</script>
