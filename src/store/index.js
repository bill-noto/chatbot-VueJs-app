import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false,
    loggedInAs: null,
    messageCounter: 0
  },
  getters: {
    totalMsgCounter(state){
      return state.messageCounter * 2;
    }
  },
  mutations: {
    changeLoginUser(state, user){
      state.isLoggedIn = true;
      state.loggedInAs = user
    },
    logOutUser(state){
      state.isLoggedIn = false;
      state.loggedInAs = null
    },
    increaseCounter(state) {
      state.messageCounter++;
    }
  },
  actions: {
    popUpAd (){
      setTimeout(function (){
        var choice = confirm('You just won $1.000.000.000.000.000. Click to claim it now!!!!!!!')
        if (choice) {
          alert('Good Idea!')
        }
      },5000)
    }
  },
  modules: {
  }
})
