import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VueRouter from 'vue-router'
import LastImages from './components/LastImages.vue'
import UploadImage from './components/UploadImage.vue'
import ShowImage from './components/ShowImage.vue'
import SearchImages from './components/SearchImages.vue'
import Redirect from './components/Redirect.vue'
import EditImage from './components/EditImage.vue'
import ErrorComponent from './components/ErrorComponent.vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter)

const routes = [
  {path: '/', component: LastImages},
  {path: '/home', component: LastImages},
  {path: '/imagenes', component: LastImages},
  {path: '/subir-imagen', component: UploadImage},
  {path: '/imagen/:id', name: 'image', component: ShowImage},
  {path: '/editar/:id', name: 'edit', component: EditImage},
  {path: '/buscador/:searchString', component: SearchImages},
  {path: '/redirigir/:searchString', component: Redirect},
  {path: '*', component: ErrorComponent},
]

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
