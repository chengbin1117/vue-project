/**
*  @description： 业务配置
*  @author： cb
*  @data:  2018.9.14
*/
// 链接到主站的地址
let reqIp = {
  development: 'http://qsjq.demo.sclonsee.com/api/v1',
  production: 'http://qsjq.demo.sclonsee.com/api/v1'
}

export default {
  apiHost: reqIp[process.env.NODE_ENV]
}
