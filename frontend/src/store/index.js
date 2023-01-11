import Vue from 'vue'
import Vuex from 'vuex'
import feathers from '@/feathers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async logout ({ commit }) {
      try {
        await feathers.logout()

        commit('setUser', null)

        return true
      } catch (err) {
        return err.message
      }
    },
    async login ({ commit }, payload) {
      try {
        const res = await feathers.authenticate({
          strategy: 'local',
          email: payload.email,
          password: payload.pass
        })

        commit('setUser', res.user)

        return true
      } catch (err) {
        return err.message
      }
    }
  }
})
