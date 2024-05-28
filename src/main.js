import { createApp } from 'vue';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import Login from './components/Login.vue';
import Welcome from './components/Welcome.vue';

const store = createStore({
  state: {
    user:null,
    token:null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
});

const routes = [{ path: '/', component: Welcome },
{path: '/login', component: Login}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');