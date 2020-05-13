import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import Recipes from './components/Recipes.vue';
import Favorites from './components/Favorites.vue';
import ShoppingList from './components/ShoppingList.vue';
import Recipe from './components/Recipe.vue';
import AddRecipe from './components/AddRecipe.vue';
import store from '@/common/store'

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Recipes, name: 'recipes' },
    { path: '/favorites', component: Favorites, name: 'favorites' },
    { path: '/shopping-list', component: ShoppingList, name: 'shopping-list' },
    { path: '/recipes/:id', component: Recipe, name: 'recipe' },
    { path: '/add-recipe', component: AddRecipe, name: 'add-recipe' }
  ],
  mode: 'history'
});

new Vue({
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app')
