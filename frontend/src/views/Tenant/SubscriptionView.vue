<template>
  <div class="container-fluid py-2">

    <div class="row my-5">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="d-flex mt-n2 mb-3">
              <div class="avatar avatar-xl bg-gradient-dark border-radius-xl p-2 mt-n4">
                <h1 class="material-symbols-rounded text-white m-0">detector_status</h1>
              </div>
              <div class="ms-3 my-auto">
                <h6 class="mb-0">{{ subscriptionStore.plan?.name }}</h6>
              </div>
            </div>
            <hr class="horizontal dark">
            <div class="row">
              <div class="col-6">
                <h6 class="text-sm mb-0">{{ formatDate(subscriptionStore.subscription?.created_at , 'MMMM DD, YYYY') }}
                </h6>
                <p class="text-secondary text-sm font-weight-normal mb-0">Subscibe At</p>
              </div>
              <div class="col-6 text-end">
                <h6 class="text-sm mb-0">
                  {{ formatDate(subscriptionStore.subscription?.subscription_ends , 'MMMM DD, YYYY') }}</h6>
                <p class="text-secondary text-sm font-weight-normal mb-0">Expire At</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-3 mb-lg-0 mb-4 d-flex" v-for="item in planStore.data">
        <div class="card shadow-lg h-100 w-100" :class="item.active ? 'bg-gradient-dark border-0' : ''">
          <span class="badge rounded-pill  mt-n2 mx-auto"
            :class="item.active ? 'bg-primary' : 'bg-light text-dark'">{{item.name}}</span>
          <div class="card-header text-center pt-4 pb-3" :class="item.active ? 'bg-transparent text-white' : ''">
            <h1 class="font-weight-bold mt-2" :class="item.active ? 'text-white' : ''">
              <span :class="item.discount > 0 ? 'text-decoration-line-through' : ''">${{ item.price }}</span>
            </h1>
            <span class="badge bg-primary" v-if="item.discount > 0">{{ item.discount }}% Off</span>
            <h1 class="font-weight-bold mt-2" v-if="item.discount > 0" :class="item.active ? 'text-white' : ''">
              ${{ item.price_after_discount }}</h1>
            <p>Valid For {{ item.expire_after }} Days</p>
          </div>
          <div class="card-body text-lg-start text-center pt-0 d-flex flex-column">
            <div class="planDescription mb-auto" v-clean-html="item.description"
              :class="item.active ? 'text-white' : ''"></div>
            <button href="javascript:;" class="btn btn-icon d-lg-block mt-auto mb-0"
              :disabled="subscriptionBtnState()"
              :class="item.active  ? 'text-black bg-gradient-light':'text-white bg-gradient-dark'"
              v-on:click="selectPlan(item)"
              >
              {{ getSubscriptionButtonText(item) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Checkout Modal -->
<div v-show="showCheckout" class="popup-overlay">
  <div class="popup-content p-4 bg-white rounded shadow-lg">
    <h4>Subscribe to: {{ selectedPlan.name }}</h4>
    <p>Amount: ${{ selectedPlan.price }}</p>
    
    <form id="form" @submit.prevent="submitPayment">
      <div id="card-element" class="mb-3"></div>
      <div id="card-errors" class="text-danger text-sm mb-3"></div>
      <button id="purchase-btn" class="btn btn-primary" :disabled="isSubmitting">
        Pay Now
      </button>
      <button class="btn btn-secondary ms-2" @click="showCheckout = false">Cancel</button>
    </form>
  </div>
</div>

</template>
<script setup>
  import {
    endLoader,
    formatDate,
    getDayDiff,
    getSelectLimit,
    startLoader,
    toastrMsg,
  } from '@/assets/utils';
  import {
    getStores
  } from '@/stores';
  import {
    onMounted,
    ref
  } from 'vue';
  import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';

  const {
    planStore,
    subscriptionStore,
    authStore,
    appStore,
  } = getStores()

  onMounted(async () => {
    await fetchData()
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"proxima-nova", "Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    }

    card = elements.create('card', {
      style,
      hidePostalCode: true
    })
    card.mount('#card-element')

    card.on('change', (event) => {
      const displayError = document.getElementById('card-errors')
      displayError.textContent = event.error ? event.error.message : ''
    })
  })
  async function fetchData()
  {
    await subscriptionStore.fetchPlans()
    await fetchList()
  }
  async function fetchList() {
    await planStore.fetchAllPlans(
      '?search=' + planStore.search + '&limit=' + getSelectLimit(),
    )
  }
  const getSubscriptionButtonText = (item) => {
    const daysLeft = getDayDiff(subscriptionStore.subscription.subscription_ends)

    if (subscriptionStore.plan.price == 0) {
      return 'Subscribe Now'
    }
    if (daysLeft > 0 && item.active) {
      return 'Already Subscribe'
    }

    if (daysLeft > 0 && !item.active) {
      return `Subscribe After ${daysLeft} Days`
    }

    if (daysLeft <= 0 && item.active) {
      return 'Subscribe Again'
    }

    return 'Subscribe Now'
  }
  const subscriptionBtnState = ()=>{
    if (subscriptionStore.plan.price == 0) {
      return false
    }
    return getDayDiff(subscriptionStore.subscription.subscription_ends) > 0
  }
  
  await appStore.fetchSettingByKey('stripe_key')
  const stripePublicKey = appStore.settings['stripe_key']
  const stripe = await loadStripe(stripePublicKey)
  const elements = stripe.elements()

  const selectedPlan = ref({
    name: '',
    price: 0,
    id: null
  })
  const showCheckout = ref(false)
  const isSubmitting = ref(false)
  const amount = ref(0)

  let card

  function selectPlan(plan) {
    selectedPlan.value = plan
    amount.value = plan.price_after_discount
    showCheckout.value = true
  }

  async function submitPayment() {
    isSubmitting.value = true
    startLoader()

    const {
      error,
      paymentMethod
    } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        name: authStore.user.name, // You can also bind this from props or store
      },
    })

    if (error) {
      toastrMsg('Whoops! looks like issue in your card' , 'error')
      isSubmitting.value = false
      endLoader()
      return
    }

    await axios.post('/payment/plans/intent' , JSON.stringify({
        payment_method_id: paymentMethod.id,
        amount: amount.value * 100,
      })).then(async (response) => {
        await handleServerResponse(response)
      })
      .catch(async (error) => {
        endLoader()
        console.log(error)
      })
    
  }

  async function handleServerResponse(response) {
    if (response.error) {
      toastrMsg(response.error.message || 'Payment failed' , 'error')
      isSubmitting.value = false
    } else if (response.requires_source_action) {
      const result = await stripe.handleCardAction(
        response.payment_intent_client_secret,
      )
      handleStripeJsResult(result)
    } else {
      await createTokenAndSubmit(response.data.intent_id)
      endLoader()
    }
  }

  async function handleStripeJsResult(result) {
    if (result.error) {
      toastrMsg(result.error.message || 'Payment failed' , 'error')
      isSubmitting.value = false
    }
    // } else {
    //   const response = await fetch('intent', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-CSRF-Token': document.querySelector('input[name="_token"]').value,
    //     },
    //     body: JSON.stringify({
    //       payment_intent_id: result.paymentIntent.id,
    //     }),
    //   })

    //   const resultJson = await response.json()
    //   if (resultJson.success) {
    //     handleServerResponse(resultJson)
    //   }
    // }
  }

  async function createTokenAndSubmit(id) {
    const respo = await stripe.createToken(card)
    if (respo.error) {
      document.getElementById('card-errors').textContent = respo.error.message
      isSubmitting.value = false
    } else {
      await axios.post('/payment/plans-save'  , {'plan_id' :selectedPlan.value.id , 'intent_id':id}).then(async(response)=>{
        toastrMsg(response.data.message)
        showCheckout.value = false
        await fetchData()

      }).catch(async(error)=>{
        console.log(error)
      })
    }
  }

</script>
