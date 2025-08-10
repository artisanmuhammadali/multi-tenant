import { useAuthStore } from './auth'
import { useAppStore } from './app'
import { useTenantStore } from './tenant'
import { usePlanStore } from './plan'
import { useSubscriptionStore } from './subscription'
import { useCustomerStore } from './customer'
import { useTenantMicroStore } from './tenantMicro'

export const getStores = () => ({
  authStore: useAuthStore(),
  appStore: useAppStore(),
  tenantStore: useTenantStore(),
  planStore: usePlanStore(),
  subscriptionStore: useSubscriptionStore(),
  customerStore: useCustomerStore(),
  tenantMicro: useTenantMicroStore()
})
