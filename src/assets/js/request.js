import axios from 'axios'
import config from './config'
// import store from '@/store'
// import M from './cookies'
// const vm = this
let Rxports = {
  /**
   * 封装axios，减少学习成本，参数基本跟jq ajax一致
   * @param {String} type 请求的类型，默认post
   * @param {String} url 请求地址
   * @param {String} time 超时时间
   * @param {Object} data 请求参数
   * @param {String} dataType 预期服务器返回的数据类型，xml html json ...
   * @param {Object} headers 自定义请求headers
   * @param {Function} success 请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
   * @param {Function} error 发送请求前
   * @param return
   */
  // 从localstorage中取token
  install (Vue, options) {
    // axios全局默认配置
    axios.defaults.baseURL = config.apiHost
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.defaults.timeout = 10000

    Vue.prototype.ajax = function (opts) {
      if (!opts && typeof opts !== 'object') {
        console.error('ConfigError:', 'request options is not defined')
        return false
      }
      if (!opts.headers || typeof opts.headers !== 'object') opts.headers = {}
      opts.data = opts.data || {}
      if (!opts.url) {
        console.error('ConfigError:', 'request url is not defined')
        return false
      }
      // 发送请求
      axios({
        method: opts.type || 'post',
        url: opts.url,
        data: opts.data,
        headers: opts.headers,
        timeout: opts.time || 30000,
        responseType: opts.dataType || 'json'
      }).then(res => {
        if (res.status === 200) {
          // 成功回调
          if (opts.success && typeof opts.success === 'function') {
            opts.success(res.data)
          }
        } else {
          // 失败回调
          if (opts.error && typeof opts.success === 'function') {
            opts.error(res.error)
          } else {
            console.log(res.error)
          }
        }
      }).catch(error => {
        // 异常处理
        console.log('error', error)
      })
    }
  }
}
export default Rxports
