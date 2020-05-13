<template>
  <form @submit.prevent="handleSubmit">
    <h1>Add a Recipe</h1>
    <label>
      Name
      <input type="text" v-model="name" style="width: 50%" />
    </label>
    <label>
      Image URL
      <input type="text" v-model="imageUrl" style="width: 100%;" />
    </label>
    <h2>Ingredients</h2>
    <div
      v-for="(ingredient, index) in ingredients"
      :key="'ingredient-' + index"
      class="ingredient-container"
    >
      <label>
        Qty
        <input type="text" v-model="ingredient.qty" placeholder="1 cup" />
      </label>
      <label>
        Name
        <input type="text" v-model="ingredient.name" placeholder="sugar" />
      </label>
      <div>
        <a href="#" @click.stop.prevent="handleRemoveIngredientClick(index)">Remove Ingredient</a>
      </div>
    </div>
    <div>
      <a href="#" @click.stop.prevent="handleAddIngredientClick">Add Ingredient</a>
    </div>
    <h2>Directions</h2>
    <div v-for="(step, index) in directions" :key="'step-' + index" class="step-container">
      <label class="step-value">
        Step
        <input type="text" v-model="step.value" />
      </label>
      <div>
        <a href="#" @click.stop.prevent="handleRemoveStepClick(index)">Remove Step</a>
      </div>
    </div>
    <div>
      <a href="#" @click.stop.prevent="handleAddStepClick">Add Step</a>
    </div>
    <input type="submit" value="Save Recipe" />
  </form>
</template>

<script>
export default {
  name: "AddRecipe",
  data() {
    return {
      name: "",
      imageUrl: "",
      ingredients: [
        { qty: "", name: "" },
        { qty: "", name: "" },
        { qty: "", name: "" }
      ],
      directions: [{ value: "" }, { value: "" }, { value: "" }]
    };
  },
  methods: {
    handleRemoveIngredientClick(index) {
      this.ingredients.splice(index, 1);
    },
    handleAddIngredientClick() {
      this.ingredients.push({ qty: "", name: "" });
    },
    handleRemoveStepClick(index) {
      this.directions.splice(index, 1);
    },
    handleAddStepClick() {
      this.directions.push({ value: "" });
    },
    handleSubmit() {
      this.$store
        .dispatch("addRecipe", {
          name: this.name,
          imageUrl: this.imageUrl,
          ingredients: this.ingredients.filter(ingredient => ingredient.name),
          directions: this.directions
            .filter(step => step.value)
            .map(step => step.value)
        })
        .then(() => {
          this.$router.push({ name: "recipes" });
        });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  padding-bottom: 15px;
}

input[type="text"] {
  display: block;
  margin-top: 5px;
}

input[type="submit"] {
  padding: 15px 50px;
  margin-top: 30px;
  text-transform: uppercase;
}

.ingredient-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.step-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.step-value {
  width: 72%;
}

.step-value input {
  width: 100%;
}
</style>
