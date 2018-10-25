/**
 * @description： 全局状态数据修改方法（异步）
 */

export default {
  setToken ({ commit }, data) {
    commit('SET_TOKEN', data)
  }
}
