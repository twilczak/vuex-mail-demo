import { MailService } from '../../api/MailService';

export const mailboxMutations = {
  messagesLoading:  '[Mailbox] Messages Loading',
  messagesLoaded:   '[Mailbox] Messages Loaded',
  messageDeleted:   '[Mailbox] Message Deleted',
  messageSent:      '[Mailbox] Message Sent'
};

export const mailboxActions = {
  fetchMessages: '[Mailbox] Fetch Messages'
};

export const mailbox = {
  state: {
    isLoading: false,
    inbox: [],
    outbox: [],
  },
  mutations: {
    [mailboxMutations.messagesLoading]: (state) => {
      state.isLoading = true;
    },
    [mailboxMutations.messagesLoaded]: (state, payload) => {
      const {mailbox, messages} = payload;
      state[mailbox] = messages;
      state.isLoading = false;
    },
    [mailboxMutations.messageSent]: (state, payload) => {
      const {message} = payload;
      state.inbox = state.inbox.concat([message]);
    },
    [mailboxMutations.messageDeleted]: (state, payload) => {
      const {mailbox, id} = payload;
      const deletedIndex = state[mailbox].findIndex(msg => msg.id === id);
      const result = state[mailbox].slice(0, deletedIndex).concat(state[mailbox].slice(deletedIndex + 1));
      state[mailbox] = result;
    }
  },
  actions: {
    [mailboxActions.fetchMessages]: (context, payload) => {
      context.commit(mailboxMutations.messagesLoading, {...payload});
      MailService
        .getMessages(payload.mailbox)
        .then(messages => {
          context.commit(mailboxMutations.messagesLoaded, {...payload, messages});
        });
    },
  },
  getters: {
    getMailbox: (state) => (mailbox) => state[mailbox]
  }
};
