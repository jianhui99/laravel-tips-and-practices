import { createStore } from "vuex";
import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import * as modules from './modules'

const store = createStore({
  state,
  getters,
  actions,
  mutations,
  modules,
});

export default store;
