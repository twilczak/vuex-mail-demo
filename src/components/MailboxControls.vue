<style>
    .mailbox-button {
        margin: 5px;
        padding: 10px;
        background: white;
        border: 1px solid black;
        border-radius: 2px;
        transition: background .25s;
        width: 130px;
        display: block;
        text-align: center;
        font-family: inherit;
        font-size: inherit;
    }

    .mailbox-button:hover {
        background: rgba(225, 225, 225, 0.5);
    }

    .mailbox-button:disabled,
    .mailbox-button:disabled:hover {
        border: 1px solid #afafaf;
        color: #afafaf;
        background: white;
    }

    .mailbox-button.is-active {
        color: dodgerblue;
    }
</style>

<template>
    <div>
        <router-link to="/inbox" class="mailbox-button" active-class="is-active">Inbox</router-link>
        <router-link to="/outbox" class="mailbox-button" active-class="is-active">Outbox</router-link>
        <router-link :to="composeMessageLink()" class="mailbox-button">Compose</router-link>
    </div>
</template>

<script>
  export default {
    name: 'MailboxControls',
    methods: {
      composeMessageLink() {
        const mailbox = this.$route.path.indexOf('inbox') > -1 ? 'inbox' : 'outbox';
        return `/${mailbox}/compose`;
      }
    }
  }
</script>
