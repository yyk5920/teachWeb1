import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// create an axios instance
const service = axios.create({
      baseURL: 'http://localhost:8999/api',
  // baseURL: 'http://8.131.74.41:8081/api',
   // baseURL: "http://47.110.59.214:8999/api",
  //  baseURL: "http://47.114.3.142:8999/api",
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    console.log("进入拦截器,config为：")
    console.log(config)
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      config.headers['X-Token'] = getToken()
      console.log('发送请求前有token加上token:', getToken());
    }
    // if (config.method === 'post') {
      // config.data = qs.stringify(config.data)
      // console.log("console.log(config.data)")
      // console.log(config.data)
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // console.log(response)
    const res = response.data
    if (res.code !== 20000 && res.code !== 20001) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      if(res.code === 20001){
        Message({
          message: res.message || '用户名或密码错误！',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.message || '用户名或密码错误！'))
      }
      else{
        return res
      }
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
