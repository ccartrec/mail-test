<template>
  <div class="mailbox">
    <div class="controls">
      <div class="btn">Новое письмо</div>
      <a>Входящие</a>
      <a>Исходящие</a>
    </div>
    <div class="letters-list">
      <div class="letters">
        <h3>Исходящие</h3>
        <div class="letters-item" v-for="(letter, idx) in outgoing" :key="idx">
          <div class="date">{{ new Date(+letter.date.seconds * 1000) }}</div>
          <div class="sender">{{ letter.sender }}</div>
          <div class="subject">{{ letter.subject }}</div>
          <div class="actions">
            <button class="button is-small is-danger" @click="deleteLocation(location.id)">
              Удалить
            </button>
          </div>
        </div>
        <h3>Входящие</h3>
        <div class="letters-item" v-for="(letter, idx) in incoming" :key="idx">
          <div class="date">{{ new Date(+letter.date.seconds * 1000) }}</div>
          <div class="sender">{{ letter.sender }}</div>
          <div class="subject">{{ letter.subject }}</div>
          <div class="actions">
            <button class="button is-small is-danger" @click="deleteLocation(location.id)">
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="messagebox">
      <form @submit="sendMessage(subject, message, recipient)">
        <h2>Новое сообщение</h2>
        <input v-model="recipient" placeholder="Получатель" class="input">
        <input v-model="subject" placeholder="Тема" class="input">
        <input v-model="message" placeholder="Сообщение" class="input">
        <button type="submit" class="btn">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script>

import { db } from '../main'

export default {
  name: 'HelloWorld',
  data () {
    return {
      letters: [],
      date: '',
      sender: '',
      recipient: '',
      subject: '',
      message: ''
    }
  },
  firestore () {
    return {
      incoming: db.collection('incoming').orderBy('date'),
      outgoing: db.collection('outgoing').orderBy('date')
    }
  },
  methods: {
    sendMessage (subject, message, recipient) {
      const date = new Date()
      db.collection('outgoing').add({ subject, message, recipient, date })
      this.subject = ''
      this.recipient = ''
      this.message = ''
    },
    deleteMessage (type, id) {
      db.collection(type).doc(id).delete()
    }
  }
}
</script>
