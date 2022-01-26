// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import Vant from 'vant';
import 'vant/lib/index.css';
import F2 from '@antv/f2';
import G2 from '@antv/g2plot';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;
// import G2 from '@antv/g2';
Vue.use(Antd);
Vue.prototype.G2 = G2
Vue.prototype.F2 = F2;
Vue.use(Vant);
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
