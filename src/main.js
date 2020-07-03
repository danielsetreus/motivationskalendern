import Vue from 'vue'
import App from './App.vue'
import store from './store/store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './assets/css/app.scss'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('mkConfig', JSON.stringify(state.config));
});

new Vue({
  store,
  beforeCreate() {
		this.$store.commit('initialiseStore');
	},
  render: h => h(App),
}).$mount('#app')
