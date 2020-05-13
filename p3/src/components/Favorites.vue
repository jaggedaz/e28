<template>
  <div v-if="recipes">
    <div v-if="recipes.length" id="favorites">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
    <div v-else>No recipes have been added to the favorites list.</div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import RecipeCard from "./RecipeCard.vue";
import { db } from '../App.vue';

export default {
  components: {
    RecipeCard
  },
  data() {
    return {
      recipes: null
    };
  },
  created() {
    if (window.localStorage.getItem("favorites")) {
      const favorites = JSON.parse(window.localStorage.getItem("favorites"));
      if (favorites.length) {
        db.collection('recipes')
          .where(firebase.firestore.FieldPath.documentId(), 'in', favorites)
          .get().then(querySnapshot => {
            this.recipes = querySnapshot.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              };
            });
          });
      } else {
        this.recipes = [];
      }
    } else {
      this.recipes = [];
    }
  }
};
</script>

<style scoped>
#favorites {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
