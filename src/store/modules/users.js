const usersStore = {
  state: {
    userList: JSON.parse(localStorage.getItem('userList')) || [],
  },
  getters: {
    getUserList: state => state.userList,
  },
  mutations: {
    SET_USERS(state, payload) {
      state.userList.push(payload);

      if (payload.parent && payload.parent.length > 0) {
        payload.parent.forEach(parentId => {
          const parentUser = state.userList.find(user => user.id === parentId);
          if (parentUser) {
            if (!parentUser.children) {
              parentUser.children = [];
            }
            if (!parentUser.children.some(child => child.id === payload.id)) {
              parentUser.children.push(payload);
            }
          }
        });
      }

      localStorage.setItem('userList', JSON.stringify(state.userList));
    },
  },
  actions: {
    sendhUser({ commit }, payload) {
      commit('SET_USERS', payload);
    },
  },
};

export default usersStore;
