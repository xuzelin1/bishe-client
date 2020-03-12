const state = () => ({
  userInfo: {},
})

const mutations = {
  setName(state, val) {
    state.userInfo = val
  },
}

const actions = {
  setName: ({
    commit
  }, name) => {
    commit('setName', name)
  },
}

export default {namespaced: true, state, mutations, actions}
