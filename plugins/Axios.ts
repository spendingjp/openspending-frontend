import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance

  $axios.defaults.xsrfCookieName = 'csrftoken'
  $axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
  $axios.defaults.headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }

  $axios.onRequest((config) => {
    console.log('request to ' + config.baseURL)
    return config
  })

  $axios.onError(error => {
    console.error('axios error ' + error.code)
  })
}

export { $axios }