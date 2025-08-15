import { useToast } from 'vue-toast-notification'
import Swal from 'sweetalert2'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ref } from 'vue';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const permissions = [
  {
    id: 'dashboard',
    role: ['super-admin', 'tenant', 'technician' , 'customer'],
  },
  {
    id: 'profile',
    role: ['super-admin', 'tenant', 'technician' , 'customer'],
  },
  {
    id: 'tenant',
    role: ['super-admin'],
  },
  {
    id: 'plan',
    role: ['super-admin'],
  },
  {
    id: 'settings',
    role: ['super-admin'],
  },
  {
    id: 'reports',
    role: ['super-admin'],
  },
  {
    id: 'subscription',
    role: ['tenant'],
  },
  {
    id: 'customer',
    role: ['tenant'],
  }
]
export function formatDate(date, formatString) {
  if (!date) return ''

  try {

    return dayjs(date).tz('Asia/Karachi').format(formatString);
  } catch (error) {
    console.error('Invalid date or format:', error)
    return ''
  }
}
export function getDayDiff(targetDate) {
  const today = dayjs().startOf('day');
  const target = dayjs(targetDate).startOf('day');

  return target.diff(today, 'day'); // positive, 0, or negative
}
export function formatUTC(date) {
  if (!date) return null
  const newDate = date.split(' at ')[0]
  const dateS = new Date(newDate)
  const format = formatDate(dateS, 'YYYY-MM-dd')
  return format
}
export function timeDiff(date) {
  return dayjs().to(dayjs.utc(date).tz('Asia/Karachi'));
}
export async function canAccess(permissionId , user) {
  const permission = permissions.find((p) => p.id === permissionId)
  const requiredRole = permission.role
  const hasRequiredRole = requiredRole.includes(user.role)
  return hasRequiredRole
}
export function toastrMsg(message, type) {
  const $toast = useToast()
  $toast.open({
    message: message,
    type: type,
    position: 'top-right',
  })
}
export async function alertPopup(message, btnText, callback) {
  Swal.fire({
    title: 'Are you sure?',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: btnText,
  }).then(async (result) => {
    if (result.isConfirmed) {
      callback()
    }
  })
}
export const isDisabled = ref(false)
export function disableSubmitBtn() {
  isDisabled.value = true
}
export function enableSubmitBtn() {
  isDisabled.value = false
}
export const donotDistrubLoader = ref(false)
export function startLoader() {
  let element = document.querySelector('.loader-div')
  if (element) {
    element.classList.remove('d-none')
  }
}
export function endLoader() {
  if(donotDistrubLoader.value == false)
  {
    let element = document.querySelector('.loader-div')
    if (element) {
      element.classList.add('d-none')
    }
  }
}
export function getAuthToken() {
  return localStorage.getItem('token') ?? ''
}
export function setAuthToken(token) {
  localStorage.setItem('token', token)
}
export function setSelectLimit(event) {
  const newVal = event.target.value
  localStorage.setItem('limit', newVal)
}
export function getSelectLimit() {
  const limit = localStorage.getItem('limit')
  return limit ? parseInt(limit) : 10
}
export const getSelectOptions = [10, 20, 50, 100]
export function  handelException(error){
  if (error?.response?.data?.errors) {
    Object.values(error.response.data.errors).forEach((messages) => {
        messages.forEach((msg) => {
            toastrMsg(msg, 'error');
        });
    });
  } else {
      toastrMsg(error?.response?.data?.message ?? 'Server Error', 'error');
  }
}
export const froalaConfig = {
  imageUploadURL: import.meta.env.VITE_API_BASE_URL + '/api/editor/upload-image',
  imageUploadMethod: 'POST',
  events: {
      'image.error': function (error, response) {
        console.error('Image upload error:', error, response);
      }
  }
}
export function openMobileNav()
{
  document.body.classList.toggle('g-sidenav-pinned')
}
export function hideMobileNav()
{
  document.body.classList.remove('g-sidenav-pinned')
}