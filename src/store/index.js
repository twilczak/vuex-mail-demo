import Vue from 'vue';
import Vuex from 'vuex';
import {mailbox} from './modules/Mailbox';
import {messageReader} from './modules/MessageReader';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mailbox,
    messageReader
  }
});
