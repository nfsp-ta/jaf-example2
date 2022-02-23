import { createStore } from 'vuex';
import registerCustomerModule from './modules/customer-module';

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});

registerCustomerModule(store);

export default store;
