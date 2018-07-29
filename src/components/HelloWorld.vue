<template>
  <div>
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

    <hr>

    <form @submit="addLocation(subject, message)">
      <h2>Новое сообщение</h2>
      <input v-model="subject" placeholder="Тема" class="input">
      <input v-model="message" placeholder="Сообщение" class="input">
      <button type="submit" class="button is-success">Отправить</button>
    </form>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .letters-item {
    display: flex;
    border-bottom: 1px solid red;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input, button {
  margin-bottom: 10px;
}
</style>
