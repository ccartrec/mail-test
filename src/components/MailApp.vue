<template>
  <div class="mailbox">
    <div class="controls">
      <div class="btn" @click="writeMessage">Новое письмо</div>
      <a @click="incomingView = true">Входящие</a>
      <a @click="incomingView = false">Исходящие</a>
    </div>
    <div class="letters-list">
      <div v-if="!incomingView">
        <h3>Исходящие</h3>
        <div class="letters-item" v-for="(letter, idx) in outgoing" :key="idx" @click="viewMessage('outgoing', letter.subject, letter.recipient, letter.message)">
          <div class="date">{{ timeConverter(+letter.date.seconds) }}</div>
          <div class="sender">{{ letter.recipient }}</div>
          <div class="subject">{{ letter.subject }}</div>
          <div class="actions">
            <button title="Удалить" @click.stop="deleteMessage(1, letter.id)"></button>
          </div>
        </div>
      </div>
      <div v-if="incomingView">
        <h3>Входящие</h3>
        <div class="letters-item" v-for="(letter, idx) in incoming" :key="idx" @click="viewMessage('incoming', letter.subject, letter.sender, letter.message)">
          <div class="date">{{ timeConverter(+letter.date.seconds) }}</div>
          <div class="sender">{{ letter.sender }}</div>
          <div class="subject">{{ letter.subject }}</div>
          <div class="actions">
            <button title="Удалить" @click.stop="deleteMessage(2, letter.id)"></button>
          </div>
        </div>
      </div>
    </div>
    <div class="messagebox">
      <form v-if="newMessage" @submit="sendMessage(subject, message, recipient)">
        <h2>Новое сообщение</h2>
        <input v-model="recipient" placeholder="Получатель" class="input">
        <input v-model="subject" placeholder="Тема" class="input">
        <input v-model="message" placeholder="Сообщение" class="input">
        <button type="submit" class="btn">Отправить</button>
      </form>
      <div v-else class="viewMessage">
        <div>Письмо {{this.letterType === 'incoming' ? 'от' : 'для'}} <b>{{this.sender}}</b></div>
        <div>Тема: <b>{{this.subject}}</b></div>
        <hr>
        <div>{{this.message}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { db } from '../main'

export default {
  name: 'mailApp',
  data () {
    return {
      outgoing: [],
      incoming: [],
      date: '',
      sender: '',
      recipient: '',
      subject: '',
      message: '',
      incomingView: true,
      newMessage: true,
      letterType: ''
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
      db.collection((type === 1 ? 'outgoing' : 'incoming')).doc(id).delete()
    },
    timeConverter (timestamp) {
      let a = new Date(timestamp * 1000)
      let months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
      let year = a.getFullYear()
      let month = months[a.getMonth()]
      let date = a.getDate()
      let hour = a.getHours()
      let min = a.getMinutes()
      let sec = a.getSeconds()
      let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
      return time
    },
    viewMessage (letterType, subject, sender, message) {
      this.newMessage = false
      this.letterType = letterType
      this.subject = subject
      this.sender = sender
      this.message = message
    },
    writeMessage () {
      this.newMessage = true
      this.subject = ''
      this.message = ''
    }
  }
}
</script>
