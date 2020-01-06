<style>
    :host,
    .inherit-grid {
        display: grid;
        grid-column: 1/3;
        grid-template-columns: inherit;
    }

    .message-detail {
        padding: 10px 15px;
    }

    .message-detail > * {
        padding: 5px;
    }

    .message-detail .label {
        font-weight: 600;
    }
</style>

<template>
    <div class="inherit-grid">
        <div class="message-controls">
            <button class="message-button" @click="onDelete(message)">Delete</button>
            <button class="message-button" disabled="disabled">Reply</button>
        </div>
        <div class="message-detail">
            <div class="recipient"><span class="label">To: </span>{{ message.recipient }}</div>
            <div class="sender"><span class="label">From: </span>{{ message.sender }}</div>
            <div class="date-sent"><span class="label">Sent: </span>{{ message.dateSent }}</div>
            <div class="subject"><span class="label">Subject: </span>{{ message.subject }}</div>
            <div class="body">{{ message.body }}</div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'MessageDetail',
      props: {
        message: Object,
        onDelete: Function,
      }
    }
</script>
