import Vue from 'vue'
import App from './App.vue'
import VueNumeral from 'vue-numeral-filter';
import VueHtml2Canvas from 'vue-html2canvas';
import titleMixin from './mixins/title';

Vue.use(VueHtml2Canvas);
Vue.use(VueNumeral, {
  locale: 'en-gb'
});

Vue.mixin(titleMixin);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
