const state = {
    user: {
        loggedIn: false,
        data: null
    }
},
    getters = {
        user: (state) => state.user
    },
    actions = {
        fetchUser({ commit }, user) {
            if (user !== null) {
                commit('SET_LOGGED_IN', true);
                if (user) {
                    commit('SET_USER', { displayName: user.displayName, email: user.email })
                } else {
                    commit('SET_USER', null)
                }
            } else {
                commit('SET_LOGGED_IN', false);
            }
        }
    },
    mutations = {
        SET_LOGGED_IN: (state, value) => state.user.loggedIn = value,
        SET_USER: (state, data) => state.user.data = data
    }

export default {
    state,
    actions,
    getters,
    mutations
}