<template>
  <div id="app" v-cloak>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBdtCkuMVHPRAJ9Vtuiv-SxiDefXtmxlcY",
  authDomain: "dgmd-e-28-my-recipe-book.firebaseapp.com",
  projectId: "dgmd-e-28-my-recipe-book"
});

export const db = firebase.firestore();

export default {
  name: "App",
  components: {
    Header
  },
  created() {
    this.$store.dispatch('fetchRecipes');
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 600px;
  margin: 0 auto;
}
</style>
