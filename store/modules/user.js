const state = () => ({
  username: [],
})

const mutations = {
  setName(state, val) {
    state.username = val
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
