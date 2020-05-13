<template>
  <div v-if="recipes">
    <div v-if="recipes.length" id="favorites">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
    <div v-else>No recipes have been added to the favorites list.</div>
  </div>
</template>

<script>
import RecipeCard from "./RecipeCard.vue";

export default {
  components: {
    RecipeCard
  },
  data() {
    return {
      favorites: []
    };
  },
  created() {
    if (window.localStorage.getItem("favorites")) {
      const favorites = JSON.parse(window.localStorage.getItem("favorites"));
      if (favorites.length) {
        this.favorites = favorites;
      }
    }
  },
  computed: {
    recipes() {
      return this.$store.getters.getRecipesByIds(this.favorites);
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
