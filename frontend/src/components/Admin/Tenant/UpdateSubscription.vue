<template>
    <div class="popup-overlay">
        <div class="popup-content p-4 bg-white rounded shadow-lg">
            <h4>Subscribe to: {{ tenantMicro.selectedSubscription.plan?.name }}</h4>
            
            <form id="form" @submit.prevent="tenantMicro.updateTenantSubscription">
                <div class="row mt-3">
                    <div class="col-12 col-sm-12 mb-3">
                        <div class="form-group">
                            <label class="form-label">Subscription Ends <span class="text-danger">*</span></label>
                            <input 
                                class="form-control" 
                                :min="minDate"
                                v-model="tenantMicro.selectedSubscription.subscription_ends" 
                                type="date" 
                                required
                            >
                        </div>
                    </div>
                </div>
            <button id="purchase-btn" class="btn btn-primary" :disabled="isDisabled">
                Submit
            </button>
            <button class="btn btn-secondary ms-2" @click="closePopup">Cancel</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { formatDate, isDisabled } from '@/assets/utils';
import { getStores } from '@/stores';

const { tenantMicro} = getStores()
const emit = defineEmits(['close'])
const minDate = formatDate(new Date(), 'YYYY-MM-DD')

// Close the popup and emit the event
const closePopup = () => {
  emit('close')
}
</script>