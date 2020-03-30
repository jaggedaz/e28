<template>
  <div id="app">
    <form @submit.prevent="handleAdd">
      <input type="text" v-model="newItem" placeholder="To-Do Description" />
      <input type="submit" value="Add To-Do" :disabled="!newItem" />
    </form>
    <hr />
    <h3>To-Do List</h3>
    <ul v-if="items.length">
      <li v-for="(item, index) in items" :key="index">
        {{ item.description }} <a href="#" @click.prevent="handleDelete(item.id, index)">Delete</a>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: '',
  authDomain: '',
  projectId: ''
});

let db = firebase.firestore();

export default {
  name: 'App',
  data () {
    return {
      newItem: '',
      items: []
    }
  },
  created() {
    // Retrieve all the to-do items
    db.collection('items')
      .orderBy('sortOrder')
      .get().then((querySnapshot) => this.items = querySnapshot.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        };
      }));
  },
  methods: {
    handleAdd() {
      const newToDo = {
        description: this.newItem,
        sortOrder: this.items.length ? this.items[this.items.length - 1].sortOrder + 1 : 1
      };

      db.collection('items').add(newToDo)
        .then((docRef) => {
          this.items.push({
            ...newToDo,
            id: docRef.id
          });
          this.newItem = '';
        })
        .catch((error) => console.error(`Error adding document: ${error}`));
    },
    handleDelete(id, index) {
      db.collection('items').doc(id).delete()
        .then(() => this.items.splice(index, 1))
        .catch((error) => console.error(`Error deleting document: ${error}`));
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 600px;
  margin: 100px auto 0 auto;
}
</style>
