import { MailService } from '../../api/MailService';

export const mailbox = {
  state: {
    isLoading: false,
    inbox: [],
    outbox: [],
  },
  mutations: {
    messagesLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    messagesLoaded: (state, payload) => {
      const {mailbox, messages} = payload;
      state[mailbox] = messages;
      state.isLoading = false;
    },
  },
  actions: {
    fetchMessages: (context, payload) => {
      context.commit('messagesLoading', {...payload});
      MailService
        .getMessages(payload.mailbox)
        .then(messages => {
          context.commit('messagesLoaded', {...payload, messages});
        });
    },
  },
  getters: {
    getMailbox: (state) => (mailbox) => state[mailbox]
  }
};
