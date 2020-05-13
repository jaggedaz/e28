<template>
  <div class="recipe-card">
    <img :src="recipe.imageUrl" :alt="recipe.name" @click="handleClick" />
    <div class="recipe-card-body">
      <div class="recipe-card-recipe-name" @click="handleClick">{{ recipe.name }}</div>
      <div v-if="$route.name !== 'favorites'" class="recipe-card-add-remove-favorite">
        <a v-if="favorites.includes(recipe.id)" href="#" @click.stop.prevent="$emit('handleRemoveFromFavorites', recipe.id)">Remove from Favorites</a>
        <a v-else href="#" @click.stop.prevent="$emit('handleAddToFavorites', recipe.id)">Add to Favorites</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['recipe', 'favorites'],
  methods: {
    handleClick() {
      this.$router.push({ name: 'recipe', params: { id: this.recipe.id } });
    }
  }
};
</script>

<style scoped>
.recipe-card {
  border: 1px solid black;
  margin-bottom: 20px;
  width: 280px;
  box-shadow: 3px 3px #ccc;
  border-radius: 3px;
}

.recipe-card-body {
  padding: 20px;
}

.recipe-card-recipe-name {
  cursor: pointer;
  font-weight: 600;
}

.recipe-card-add-remove-favorite {
  margin-top: 10px;
}

img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
}
</style>
