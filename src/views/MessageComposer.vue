<style>
    :host {
        grid-column: 1 / 3;
        display: grid;
        grid-template-columns: inherit;
    }
</style>

<template>
    <MessageForm :on-send="onSend"></MessageForm>
</template>

<script>
    import MessageForm from '../components/MessageForm';
    import { messageComposerActions } from '../store/modules/MessageComposer';
    import store from '../store';

    export default {
      name: 'MessageComposer',
      components: { MessageForm },
      methods: {
        onSend(message) {
          store.dispatch(messageComposerActions.sendMessage, {message});
          const route = this.$route.path.split('/').filter(element => !!element);
          const mailbox = route[0];
          this.$router.push(`/${mailbox}`);
          // TODO: View sent message if mailbox is outbox?
        }
      }
    }

</script>
