<template>
  <form @submit.prevent="handleSubmit">
    <h1>Add a Recipe</h1>
    <label>
      Name
      <input type="text" v-model="$v.name.$model" style="width: 50%" :class="{ 'form-input-error': $v.name.$error }" />
      <div v-if="$v.name.$error && !$v.name.required" class="form-feedback-error">Name is required.</div>
    </label>
    <label>
      Image URL
      <input type="text" v-model="$v.imageUrl.$model" style="width: 100%;" :class="{ 'form-input-error': $v.imageUrl.$error }" />
      <div v-if="$v.imageUrl.$error">
        <div v-if="!$v.imageUrl.required" class="form-feedback-error">Image URL is required.</div>
        <div v-if="!$v.imageUrl.url" class="form-feedback-error">Image URL must be a valid URL.</div>
      </div>
    </label>
    <h2>Ingredients</h2>
    <div
      v-for="(v, index) in $v.ingredients.$each.$iter"
      :key="'ingredient-' + index"
      class="ingredient-container"
    >
      <label>
        Qty
        <input type="text" v-model="v.qty.$model" placeholder="1 cup" :class="{ 'form-input-error': v.qty.$error }" />
        <div v-if="v.qty.$error && !v.qty.required" class="form-feedback-error">Qty is required.</div>
      </label>
      <label>
        Name
        <input type="text" v-model="v.name.$model" placeholder="sugar" :class="{ 'form-input-error': v.name.$error }" />
        <div v-if="v.name.$error && !v.name.required" class="form-feedback-error">Name is required.</div>
      </label>
      <div>
        <a href="#" @click.stop.prevent="handleRemoveIngredientClick(index)">Remove Ingredient</a>
      </div>
    </div>
    <div v-if="$v.ingredients.$error && !$v.ingredients.required" class="form-feedback-error">
      At least one ingredient is required.
    </div>
    <div>
      <a href="#" @click.stop.prevent="handleAddIngredientClick">Add Ingredient</a>
    </div>
    <h2>Directions</h2>
    <div v-for="(v, index) in $v.directions.$each.$iter" :key="'step-' + index" class="step-container">
      <label class="step-value">
        Step
        <input type="text" v-model="v.value.$model" :class="{ 'form-input-error': v.value.$error }" />
        <div v-if="v.value.$error && !v.value.required" class="form-feedback-error">Step is required.</div>
      </label>
      <div>
        <a href="#" @click.stop.prevent="handleRemoveStepClick(index)">Remove Step</a>
      </div>
    </div>
    <div v-if="$v.directions.$error && !$v.directions.required" class="form-feedback-error">
      At least one step is required.
    </div>
    <div>
      <a href="#" @click.stop.prevent="handleAddStepClick">Add Step</a>
    </div>
    <input type="submit" value="Save Recipe" />
  </form>
</template>

<script>
import { required, url } from 'vuelidate/lib/validators';

export default {
  name: "AddRecipe",
  data() {
    return {
      name: "",
      imageUrl: "",
      ingredients: [
        { qty: "", name: "" }
      ],
      directions: [
        { value: "" }
      ]
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
      this.$v.$touch();
      if (this.$v.$anyError === false) {
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
  },
  validations: {
    name: { required },
    imageUrl: { required, url },
    ingredients: {
      required,
      $each: {
        qty: { required },
        name: { required }
      }
    },
    directions: {
      required,
      $each: {
        value: { required }
      }
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

.form-input-error {
  border-color: red;
}

.form-feedback-error {
  color: red;
  margin: 5px 0;
}
</style>
