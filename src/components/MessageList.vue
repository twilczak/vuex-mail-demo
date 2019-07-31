<style>
    .mailbox-list {
        margin: 0;
        padding: 0 10px;
        list-style-type: none;
        list-style-position: inside;
        height: 205px;
        overflow-y: auto;
    }

    .mailbox-list-item,
    .mailbox-list-header {
        display: block;
        padding: 0 5px;
    }

    .mailbox-list-header {
        font-weight: 600;
    }

    .mailbox-list-item {
        transition: background .25s;
    }

    .mailbox-list-item:last-child {
        margin-bottom: 10px;
    }

    .mailbox-list-item:hover {
        background: rgba(225, 225, 225, 0.5);
    }

    .mailbox-list-item.is-selected {
        color: dodgerblue;
    }

    .mailbox-item-link {
        display: block;
        text-decoration: none;
        cursor: pointer;
    }

    .mailbox-item-link.is-active {
        color: dodgerblue;
    }

    .mailbox-list-item .date-sent,
    .mailbox-list-item .recipient,
    .mailbox-list-item .sender,
    .mailbox-list-item .subject,
    .mailbox-list-header .date-sent,
    .mailbox-list-header .recipient,
    .mailbox-list-header .sender,
    .mailbox-list-header .subject {
        display: inline-block;
        padding: 5px;
    }

    .mailbox-list-item .date-sent,
    .mailbox-list-header .date-sent {
        width: 15%;
    }

    .mailbox-list-item .recipient,
    .mailbox-list-item .sender,
    .mailbox-list-header .recipient,
    .mailbox-list-header .sender {
        border-right: 1px solid black;
        width: 24%;
    }

    .mailbox-list-item .subject,
    .mailbox-list-header .subject {
        width: 50%;
        border-right: 1px solid black;
    }

</style>

<template>
    <ol class="mailbox-list">
        <li class="mailbox-list-header">
            <span v-if="isInbox()" class="sender">Sender</span>
            <span v-else class="recipient">To</span>
            <span class="subject">Subject</span>
            <span class="date-sent">Date</span>
        </li>
        <li v-for="message in messages" :key="message.id" :id="message.id" class="mailbox-list-item">
            <router-link :to="viewMessageLink(message)" class="mailbox-item-link" active-class="is-active">
                <span v-if="isInbox()" class="sender">{{message.sender}}</span>
                <span v-else class="recipient">{{message.recipient}}</span>
                <span class="subject">{{message.subject}}</span>
                <span class="date-sent">{{message.dateSent}}</span>
            </router-link>
        </li>
    </ol>
</template>

<script>
    export default {
      name: 'MessageList',
      props: {
        messages: Array
      },
      updated () {
        this.$nextTick(() => {
          const route = this.$route.path.split('/').filter(element => !!element);
          if(route.length > 2) {
            this.scrollMessageIntoView(route[2]);
          }
        });
      },
      methods: {
        isInbox() {
          return this.$route.path.indexOf('inbox') > -1;
        },
        viewMessageLink(message) {
          const mailbox = this.isInbox() ? 'inbox' : 'outbox';
          return `/${mailbox}/view/${message.id}`;
        },
        scrollMessageIntoView(id) {
          const element = document.getElementById(id);
          if( element ) {
            element.scrollIntoView();
          }
        }
      }
    }
</script>
