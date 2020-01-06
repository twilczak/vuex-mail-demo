<style>
    .message-reader {
        grid-column: 1 / 3;
        display: grid;
        grid-template-columns: inherit;
    }
</style>

<template>
    <div class="message-reader">
        <MessageDetail :message="message" :on-delete="onDelete"></MessageDetail>
    </div>
</template>

<script>
    import store from '../store';
    import {messageReaderActions} from '../store/modules/MessageReader';
    import MessageDetail from '../components/MessageDetail';

    function getRouteParams(to) {
      const route = to.path.split('/').filter(element => !!element);
      const mailbox = route[0];
      const id = route[2];

      return {mailbox, id};
    }

    function fetchMessage(to, from, next) {
      const payload = getRouteParams(to);
      store.dispatch(messageReaderActions.fetchMessage, payload);
      next();
    }

    export default {
      name: 'MessageReader',
      components: { MessageDetail },
      computed: {
        message () {
          return store.state.messageReader.message;
        }
      },
      beforeRouteEnter: fetchMessage,
      beforeRouteUpdate: fetchMessage,
      methods: {
        onDelete(message) {
          const {mailbox} = getRouteParams(this.$route);
          const {id} = message;
          store
            .dispatch(messageReaderActions.deleteMessage, {id, mailbox})
            .then(() => this.$router.replace(`/${mailbox}`));
        },
      }
    }
</script>
