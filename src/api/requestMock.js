// 对axios进行二次封装
import axios from 'axios'
// 引入进度条插件
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'


// 配置axios
const requests = axios.create({
    baseURL: '/mock',
    timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // 进度条开始
    nProgress.start()
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