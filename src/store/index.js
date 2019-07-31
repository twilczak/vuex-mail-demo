import Vue from 'vue';
import Vuex from 'vuex';
import {mailbox} from './modules/Mailbox';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mailbox
  }
});
