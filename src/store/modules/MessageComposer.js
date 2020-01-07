import { MailService } from '../../api/MailService';
import { mailboxMutations } from './Mailbox';

export const messageComposerMutations = {
  messageSending: '[Message Composer] Message Sending',
  messageSent:    '[Message Composer] Message Sent'
};

export const messageComposerActions = {
  sendMessage: '[Message Composer] Send Message'
};

export const messageComposer = {
  state: {
    isSending: false,
  },
  mutations: {
    [messageComposerMutations.messageSending]: (state) => {
      state.isSending = true;
    },
    [messageComposerMutations.messageSent]: (state) => {
      state.isSending = false;
    }
  },
  actions:{
    [messageComposerActions.sendMessage]: (context, payload) => {
      const {message} = payload;
      context.commit(messageComposerMutations.messageSending);
      return MailService
        .sendMessage(message)
        .then((message) => {
          context.commit(messageComposerMutations.messageSent, {message});
          context.commit(mailboxMutations.messageSent, {message});
          return message;
        })
    }
  }
};
