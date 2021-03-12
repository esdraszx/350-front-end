import Vue from "vue";
import VueRouter from "vue-router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import App from "./App.vue";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import NotFound from "./components/NotFound"
import AdminArticleAdd from "./components/AdminArticleAdd";
import AdminArticleList from "./components/AdminArticleList";
import AdminArticleEdit from "./components/AdminArticleEdit";

Vue.config.productionTip = false;

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { getJwtToken } from "./auth";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);

const checkAuth = function(to, _, next) {
  const token = getJwtToken();
  if (token === undefined || token === "undefined" || token === null) {
    // redirect to login because we don't have token yet
    next({
      path: "/login",
      params: { nextUrl: to.fullPath },
    });
  } else {
    next();
  }
};

const router = new VueRouter({
  routes: [
    { path: "/", component: Landing },
    { path: "/home", component: Home, beforeEnter: checkAuth },
    { path: "/login", component: Login },
    { path: "/logout", component: Logout },
    { path: "/register", component: Register },
    {
      path: "/admin",
      component: Admin,
      beforeEnter: checkAuth,
      children: [
        { path: "add", component: AdminArticleAdd },
        { path: "edit/:id", component: AdminArticleEdit },
        { path: "", component: AdminArticleList },
      ],
    },
    { path: '*', component: NotFound }
  ],
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
