<template>
  <div v-if="recipe">
    <img :src="recipe.imageUrl" :alt="recipe.name" />
    <h1>{{ recipe.name }}</h1>
    <h2>Ingredients</h2>
    <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="ingredient">
      <div class="ingredient-description">{{ ingredient.qty }} {{ ingredient.name }}</div>
      <div>
        <a
          v-if="shoppingList.includes(ingredient.name)"
          href="#"
          @click.prevent="handleRemoveFromShoppingList(ingredient.name)"
        >Remove from Shopping List</a>
        <a
          v-else
          href="#"
          @click.prevent="handleAddToShoppingList(ingredient.name)"
        >Add to Shopping List</a>
      </div>
    </div>
    <h2>Directions</h2>
    <ol>
      <li
        v-for="(direction, index) in recipe.directions"
        :key="index"
        class="direction"
      >{{ direction }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shoppingList: []
    };
  },
  created() {
    if (window.localStorage.getItem("shoppingList")) {
      this.shoppingList = JSON.parse(
        window.localStorage.getItem("shoppingList")
      );
    }
  },
  methods: {
    handleAddToShoppingList(ingredientName) {
      this.shoppingList.push(ingredientName);
      window.localStorage.setItem(
        "shoppingList",
        JSON.stringify(this.shoppingList)
      );
    },
    handleRemoveFromShoppingList(ingredientName) {
      this.shoppingList.splice(this.shoppingList.indexOf(ingredientName), 1);
      window.localStorage.setItem(
        "shoppingList",
        JSON.stringify(this.shoppingList)
      );
    }
  },
  computed: {
    recipe() {
      return this.$store.getters.getRecipeById(this.$route.params.id);
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.ingredient {
  display: flex;
  padding-bottom: 10px;
}

.ingredient-description {
  flex-grow: 1;
}

.direction {
  padding-bottom: 10px;
}
</style>
