import TenantForm from "@/views/Admin/Tenant/TenantForm.vue"
import TenantList from "@/views/Admin/Tenant/TenantList.vue"
import PlanForm from "@/views/Admin/Plan/PlanForm.vue"
import PlanList from "@/views/Admin/Plan/PlanList.vue"
import SettingsView from '@/views/Admin/SettingsView.vue'
import SubscriptionDetail from "@/views/Admin/Tenant/SubscriptionDetail.vue"


const adminRoutes = [
  {
    path: '/admin',
    name: 'admin',
    meta: { title: 'Admin', layout: 'UserLayout', permission: 'dashboard' },
    children: [
      {
        path: '/settings',
        name: 'settings',
        component: SettingsView,
        meta: { title: 'App Settings', layout: 'UserLayout', permission: 'settings' },
      },
      {
        path: 'tenant',
        name: 'tenant.index',
        component: TenantList,
        meta: { title: 'Tenant List', layout: 'UserLayout', permission: 'tenant' },
      },
      {
        path: 'tenant/create',
        name: 'tenant.create',
        component: TenantForm,
        meta: { title: 'Tenant Create', layout: 'UserLayout', permission: 'tenant' },
      },
      {
        path: 'tenant/edit/:id',
        name: 'tenant.edit',
        component: TenantForm,
        meta: { title: 'Tenant Update', layout: 'UserLayout', permission: 'tenant' },
      },
      {
        path: 'tenant/subsciption/:id',
        name: 'tenant.subsciption',
        component: SubscriptionDetail,
        meta: { title: 'Tenant Subsciption Detail', layout: 'UserLayout', permission: 'tenant' },
      },
      {
        path: 'plan',
        name: 'plan.index',
        component: PlanList,
        meta: { title: 'Plan List', layout: 'UserLayout', permission: 'plan' },
      },
      {
        path: 'plan/create',
        name: 'plan.create',
        component: PlanForm,
        meta: { title: 'Plan Create', layout: 'UserLayout', permission: 'plan' },
      },
      {
        path: 'plan/edit/:id',
        name: 'plan.edit',
        component: PlanForm,
        meta: { title: 'Plan Update', layout: 'UserLayout', permission: 'plan' },
      },
    ],
  },
]
export default adminRoutes
