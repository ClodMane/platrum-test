import Vue from 'vue'
import Vuex from 'vuex'
import usersStore from './modules/users';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users: { ...usersStore, namespaced: true },
  }
})
