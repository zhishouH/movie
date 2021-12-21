import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowTabbar: true, // 底部导航栏的隐藏与显示
    userInfo: { // 用户信息-用户名和密码
      username: '',
      password: ''
    },
    detailFrom: '',
    collect: [],
    comment: []
  },
  mutations: {
    'hindTabbarMutations' (state, data) {
      state.isShowTabbar = data
    },
    'showTabbarMutations' (state, data) {
      state.isShowTabbar = data
    },
    'setDetailFrom' (state, data) {
      state.detailFrom = data
    },
    'setCollect' (state, data) {
      state.collect = [...this.state.collect, data]
    },
    'setComment' (state, data) {
      state.comment = [...this.state.comment, data]
    }
  },
  actions: {
  },
  modules: {
  }
})
