import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
  token: '',
  fullPath: '/'
}

const mutations = {
  // 路由导航的方法
  ChangeFullPath (state, msg) {
    state.fullPath = msg
  }
}

const store = new vuex.Store({
  state,
  mutations
})

export default store
