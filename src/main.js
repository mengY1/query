import Vue from 'vue'
import App from '@/App'
import store from '@/store'
//头部
import head from '@/components/header/head'
Vue.component("z-head",head);

Vue.config.productionTip = false
App.store = store
App.mpType = 'app'

// Vue.prototype.globalData = getApp().globalData
const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#FFB90C',
      navigationBarTitleText: '奇集查询',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom'
    },
    navigateToMiniProgramAppIdList: ["wx99418b7b5cdcc4d4"]
  },
}
