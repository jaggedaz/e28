<template>
  <div>
    <div id="recipe-list">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        :favorites="favorites"
        @handleAddToFavorites="handleAddToFavorites($event)"
        @handleRemoveFromFavorites="handleRemoveFromFavorites($event)"
      />
    </div>
    <div id="add-recipe-container">
      <button @click.prevent="handleAddRecipeClick">Add a Recipe</button>
    </div>
  </div>
</template>

<script>
import RecipeCard from "./RecipeCard.vue";
import { db } from '../App.vue';

export default {
  components: {
    RecipeCard
  },
  created() {
    db.collection('recipes').get().then(querySnapshot => {
      this.recipes = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
    });

    if (window.localStorage.getItem('favorites')) {
      this.favorites = JSON.parse(window.localStorage.getItem('favorites'));
    }
  },
  data() {
    return {
      recipes: [],
      favorites: []
    };
  },
  methods: {
    handleAddToFavorites(recipeId) {
      this.favorites.push(recipeId);
      window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    handleRemoveFromFavorites(recipeId) {
      this.favorites.splice(this.favorites.indexOf(recipeId), 1);
      window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    handleAddRecipeClick() {
      this.$router.push({ name: 'add-recipe' });
    }
  }
};
</script>

<style scoped>
#recipe-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

#add-recipe-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

#add-recipe-container button {
  padding: 15px 150px;
  text-transform: uppercase;
}
</style>
