import { canAccess } from '@/assets/utils'

export default {
  async mounted(el, binding) {
    const { permission, user } = binding.value
    const access = await canAccess(permission, user)
    if (!access) {
      el.parentNode?.removeChild(el)
    }
  },
}
