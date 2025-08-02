import { useAuthStore } from './auth'
import { useAppStore } from './app'
import { useTenantStore } from './tenant'
import { usePlanStore } from './plan'
import { useSubscriptionStore } from './subscription'

export const getStores = () => ({
  authStore: useAuthStore(),
  appStore: useAppStore(),
  tenantStore: useTenantStore(),
  planStore: usePlanStore(),
  subscriptionStore: useSubscriptionStore()
})
