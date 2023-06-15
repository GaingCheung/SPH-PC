// 对axios进行二次封装
import axios from 'axios'
// 引入进度条插件
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '../store'

// 配置axios
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // 进度条开始
    nProgress.start()
    if(store.state.detail.uuid_token){
      config.headers.userTempId = store.state.detail.uuid_token
    }
    if(store.state.user.token){
      config.headers.token = store.state.user.token
    }
    return config
})

// 响应拦截器
requests.interceptors.response.use((response) => {
    nProgress.done()
    return response.data
  }, (error) => {
    return Promise.reject(new Error('faile'));
  });

export default requests