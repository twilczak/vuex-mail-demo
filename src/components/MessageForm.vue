<style>
    :host,
    .inherit-grid {
        grid-column: 1 / 3;
        display: grid;
        grid-template-columns: inherit;
    }

    .message-composer {
        padding: 10px 15px;
    }

    .composer-input {
        display: block;
        padding: 5px;
        font-size: 16px;
        font-family: inherit;
        border-bottom: 1px solid black;
        border-top-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
        resize: none;
        width: 100%;
    }

    .composer-input.invalid {
        border-bottom-color: red;
    }

    .composer-input.invalid::-webkit-input-placeholder {
        color: rgba(255, 0, 0, 0.6);
    }

</style>

<template>
    <div class="inherit-grid">
        <div class="message-controls">
            <router-link :to="cancelLink()" class="message-button message-button--link">Cancel</router-link>
            <button class="message-button" @click="sendMessage" :disabled="sendDisabled()">Send</button>
        </div>
        <div class="message-composer">
            <input class="composer-input" placeholder="recipient" name="recipient" type="text" v-model="recipient" @input="validateInput"/>
            <input class="composer-input" placeholder="subject" name="subject" type="text" v-model="subject" @input="validateInput"/>
            <textarea class="composer-input" placeholder="body" name="body" rows="10" v-model="body" @input="validateInput"></textarea>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'MessageForm',
      data() {
        return {
          body: '',
          subject: '',
          recipient: '',
        };
      },
      methods: {
        cancelLink() {
          const route = this.$route.path.split('/').filter(element => !!element);
          const mailbox = route[0];
          return `/${mailbox}`;
        },
        sendMessage() {
          const {body, subject, recipient} = this;
          this.$emit('sendMessage', {sender: 'Me', body, subject, recipient});
        },
        validateInput(event) {
          if(!event.target.value.trim()) {
            event.target.classList.add('invalid');
          } else {
            event.target.classList.remove('invalid');
          }
        },
        sendDisabled() {
          return !(this.recipient.trim() && this.subject.trim() && this.body.trim());
        }
      }
    }
</script>
