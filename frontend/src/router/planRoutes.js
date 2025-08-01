import PlanForm from "@/views/Admin/Plan/PlanForm.vue"
import PlanList from "@/views/Admin/Plan/PlanList.vue"

const planRoutes = [
  {
    path: '/plan',
    name: 'plan',
    meta: { title: 'Plan', layout: 'UserLayout', permission: 'plan' },
    children: [
      {
        path: '',
        name: 'plan.index',
        component: PlanList,
        meta: { title: 'Plan List', layout: 'UserLayout', permission: 'plan' },
      },
      {
        path: 'create',
        name: 'plan.create',
        component: PlanForm,
        meta: { title: 'Plan Create', layout: 'UserLayout', permission: 'plan' },
      },
      {
        path: 'edit/:id',
        name: 'plan.edit',
        component: PlanForm,
        meta: { title: 'Plan Update', layout: 'UserLayout', permission: 'plan' },
      },
    ],
  },
]
export default planRoutes
