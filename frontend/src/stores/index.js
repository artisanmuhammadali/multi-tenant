import { useAuthStore } from './auth'
import { useAppStore } from './app'
import { useTenantStore } from './tenant'
import { usePlanStore } from './plan'

export const getStores = () => ({
  authStore: useAuthStore(),
  appStore: useAppStore(),
  tenantStore: useTenantStore(),
  planStore: usePlanStore(),
})
