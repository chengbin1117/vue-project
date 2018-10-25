/**
 * @description： 全局状态数据修改方法（同步）
 */
export default {
  SET_TOKEN: (state, token) => {
    state.token = token || ''
  }
}
