import { GetterTree, Module, Store } from 'vuex';
import Customer from '@/models/customer';

interface CustomerState {
  items: Array<Customer>;
  customer: Customer | null;
  editMode: boolean;
  dialog: boolean;
}

const MODULE_NAME = 'customerModule';
const GET_ITEMS = 'items';
const SET_ITEMS = 'setItems';
const GET_CUSTOMER = 'customer';
const SET_CUSTOMER = 'setCustomer';
const GET_DIALOG = 'dialog';
const SET_DIALOG = 'setDialog';
const GET_EDIT_MODE = 'editMode';
const SET_EDIT_MODE = 'setEditMode';
export const CUSTOMERS_GETTER = `${MODULE_NAME}/${GET_ITEMS}`;
export const CUSTOMERS_MUTATION = `${MODULE_NAME}/${SET_ITEMS}`;
export const CUSTOMER_GETTER = `${MODULE_NAME}/${GET_CUSTOMER}`;
export const CUSTOMER_MUTATION = `${MODULE_NAME}/${SET_CUSTOMER}`;
export const DIALOG_GETTER = `${MODULE_NAME}/${GET_DIALOG}`;
export const DIALOG_MUTATION = `${MODULE_NAME}/${SET_DIALOG}`;
export const EDIT_MODE_GETTER = `${MODULE_NAME}/${GET_EDIT_MODE}`;
export const EDIT_MODE_MUTATION = `${MODULE_NAME}/${SET_EDIT_MODE}`;

const module: Module<CustomerState, {}> = {
  namespaced: true,
  state: {
    items: [],
    customer: null,
    dialog: false,
    editMode: false,
  },
  getters: {
    [GET_ITEMS]: (state) => state.items,
    [GET_CUSTOMER]: (state) => state.customer,
    [GET_DIALOG]: (state) => state.dialog,
    [GET_EDIT_MODE]: (state) => state.editMode,
  } as GetterTree<CustomerState, {}>,
  mutations: {
    [SET_ITEMS](state, payload: Customer[]): void {
      state.items = payload;
    },
    [SET_CUSTOMER](state, payload: Customer | null): void {
      state.customer = payload;
    },
    [SET_DIALOG](state, payload: boolean): void {
      state.dialog = payload;
    },
    [SET_EDIT_MODE](state, payload: boolean): void {
      state.editMode = payload;
    },
  },
};

export default function registerModule(store: Store<{}>): void {
  store.registerModule(MODULE_NAME, module);
}
