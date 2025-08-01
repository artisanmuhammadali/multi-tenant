import TenantForm from "@/views/Admin/Tenent/TenantForm.vue"
import TenantList from "@/views/Admin/Tenent/TenantList.vue"

const tenantRoutes = [
  {
    path: '/tenant',
    name: 'tenant',
    meta: { title: 'Tenant', layout: 'UserLayout', permission: 'tenant' },
    children: [
      {
        path: '',
        name: 'tenant.index',
        component: TenantList,
        meta: { title: 'Tenant List', layout: 'UserLayout', permission: 'tenant' },
      },
      {
        path: 'create',
        name: 'tenant.create',
        component: TenantForm,
        meta: { title: 'Tenant Create', layout: 'UserLayout', permission: 'tenant' },
      },
      {
        path: 'edit/:id',
        name: 'tenant.edit',
        component: TenantForm,
        meta: { title: 'Tenant Update', layout: 'UserLayout', permission: 'tenant' },
      },
    ],
  },
]
export default tenantRoutes
