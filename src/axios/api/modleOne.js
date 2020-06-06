import base from './base' // 导入默认请求网址接口列表
import axios from '@/axios/http' // 导入http中的axios实例

// 创建请求实例 然后就可以在index文件即api接口统一管理出口文件中引入了
const modleOne = {
  // ************** get请求列表 **************

  // 第一个get请求
  menuGet () {
    return axios.get(`${base.book}/dataone`) // 注意此处是`不是 '
  },

  // 用户管理中心用户数据请求
  userDataGet () {
    return axios.get(`${base.book}/userData`) // 注意此处是`不是 '
  },

  // 权限管理，权限列表数据请求
  authorityListGet () {
    return axios.get(`${base.book}/authorityListData`)
  },
  // 权限管理， 用户列表数据请求
  userAuthListGet () {
    return axios.get(`${base.book}/userAuthListData`)
  },
  // 权限列表，角色列表分配权限数据
  userAuthListAllGet () {
    return axios.get(`${base.book}/userAuthListAll`)
  },
  // ************** post请求列表 **************

  // 第一个post请求
  firstPostRequest (msg) {
    return axios.post(`${base.video}/boring`, msg)
  }
}

// 输出
export default modleOne
