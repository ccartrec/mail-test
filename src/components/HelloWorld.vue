<template>
  <div class="mailbox">
    <div class="controls">
      <div class="btn">Новое письмо</div>
      <a>Входящие</a>
      <a>Исходящие</a>
    </div>
    <div class="letters-list">
      <div class="letters">
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
        <!--div class="letters-item" v-for="(letter, idx) in incoming" :key="idx">
          <div class="date">{{ new Date(+letter.date.seconds * 1000) }}</div>
          <div class="sender">{{ letter.sender }}</div>
          <div class="subject">{{ letter.subject }}</div>
          <div class="actions">
            <button class="button is-small is-danger" @click="deleteLocation(location.id)">
              Удалить
            </button>
          </div>
        </div-->
      </div>
    </div>
    <div class="messagebox">
      <form @submit="addLocation(subject, message)">
        <h2>Новое сообщение</h2>
        <input v-model="subject" placeholder="Тема" class="input">
        <input v-model="message" placeholder="Сообщение" class="input">
        <button type="submit" class="button is-success">Отправить</button>
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
    addLocation (name, image) {
      const createdAt = new Date()
      db.collection('locations').add({ name, image, createdAt })
      // Clear values
      this.name = ''
      this.image = ''
    },
    deleteLocation (id) {
      db.collection('locations').doc(id).delete()
    }
  }
}
</script>
