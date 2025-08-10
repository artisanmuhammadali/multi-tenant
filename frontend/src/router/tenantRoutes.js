import CustomerForm from "@/views/Tenant/Customer/CustomerForm.vue"
import CustomerList from "@/views/Tenant/Customer/CustomerList.vue"
import SubscriptionView from "@/views/Tenant/SubscriptionView.vue"


const tenantRoutes = [{
  path: '/tenant',
  name: 'tenant',
  meta: {
    title: 'Admin',
    layout: 'UserLayout',
    permission: 'dashboard'
  },
  children: [{
      path: '/subscription',
      name: 'subscription',
      component: SubscriptionView,
      meta: { title: 'Subscription Plans', layout: 'UserLayout', permission: 'subscription' },
    },
    {
      path: 'customer',
      name: 'customer.index',
      component: CustomerList,
      meta: { title: 'Customer List', layout: 'UserLayout',permission: 'customer' },
    },
    {
      path: 'customer/create',
      name: 'customer.create',
      component: CustomerForm,
      meta: { title: 'Customer Create', layout: 'UserLayout', permission: 'customer' },
    },
    {
      path: 'customer/edit/:id',
      name: 'customer.edit',
      component: CustomerForm,
      meta: { title: 'Customer Update', layout: 'UserLayout' ,permission: 'customer' },
    },
  ],
}, ]
export default tenantRoutes
