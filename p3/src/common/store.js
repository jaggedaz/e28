import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '../App.vue';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recipes: []
  },
  actions: {
    fetchRecipes(context) {
      db.collection('recipes').get().then(querySnapshot => {
        const recipes = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });

        context.commit('setRecipes', recipes);
      });
    },
    addRecipe(context, recipe) {
      db.collection('recipes').add(recipe)
        .then(docRef => {
          context.commit('addRecipe', {
            ...recipe,
            id: docRef.id
          });
        });
    }
  },
  mutations: {
    setRecipes(state, recipes) {
      state.recipes = recipes;
    },
    addRecipe(state, recipe) {
      state.recipes.push(recipe);
    }
  },
  getters: {
    getRecipeById(state) {
      return function (id) {
        return state.recipes.find(recipe => recipe.id === id);
      }
    },
    getRecipesByIds(state) {
      return function (ids) {
        return state.recipes.filter(recipe => ids.includes(recipe.id));
      }
    }
  }
});
