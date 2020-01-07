import { MailService } from '../../api/MailService';
import { mailboxMutations } from './Mailbox';

export const messageReaderMutations = {
  messageLoading:  '[Message Reader] Message Loading',
  messageLoaded:   '[Message Reader] Message Loaded',
  messageDeleting: '[Message Reader] Message Deleting',
  messageDeleted:  '[Message Reader] Message Deleted'
};

export const messageReaderActions = {
  fetchMessage:  '[Message Reader] Fetch Message',
  deleteMessage: '[Message Reader] Delete Message'
};

export const messageReader = {
  state: {
    isLoading: false,
    message: {}
  },
  mutations: {
    [messageReaderMutations.messageLoading]: (state) => {
      state.isLoading = true;
    },
    [messageReaderMutations.messageLoaded]: (state, payload) => {
      const {message} = payload;
      state.message = message;
      state.isLoading = false;
    },
    [messageReaderMutations.messageDeleting]: (state) => {
      state.isLoading = true;
    },
    [messageReaderMutations.messageDeleted]: (state) => {
      state.isLoading = false;
      state.message = {};
    },
  },
  actions: {
    [messageReaderActions.fetchMessage]: (context, payload) => {
      const {id, mailbox} = payload;
      context.commit(messageReaderMutations.messageLoading);
      MailService
        .getMessage(mailbox, id)
        .then(message => {
          context.commit(messageReaderMutations.messageLoaded, {message});
        })
    },
    [messageReaderActions.deleteMessage]: (context, payload) => {
      const {id, mailbox} = payload;
      context.commit(messageReaderMutations.messageDeleting);
      MailService.deleteMessage(mailbox, id)
        .then(() => {
          context.commit(messageReaderMutations.messageDeleted, {mailbox, id});
          context.commit(mailboxMutations.messageDeleted, {mailbox, id});
        });
    }
  }
};
