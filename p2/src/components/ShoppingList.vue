<template>
  <div v-if="shoppingList.length">
    <div v-for="(shoppingListItem, index) in shoppingList" :key="index" class="shopping-list-item">
      <div class="shopping-list-item-description">
        <input type="checkbox" disabled />
        <span>{{ shoppingListItem }}</span>
      </div>
      <div>
        <a href="#" @click.stop.prevent="handleRemoveFromShoppingList(shoppingListItem)">Remove from Shopping List</a>
      </div>
    </div>
  </div>
  <div v-else>Shopping list is empty.</div>
</template>

<script>
export default {
  data() {
    return {
      shoppingList: []
    };
  },
  created() {
    if (window.localStorage.getItem('shoppingList')) {
      this.shoppingList = JSON.parse(window.localStorage.getItem("shoppingList"));
    }
  },
  methods: {
    handleRemoveFromShoppingList(shoppingListItem) {
      this.shoppingList.splice(this.shoppingList.indexOf(shoppingListItem), 1);
      window.localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));
    }
  }
};
</script>

<style scoped>
.shopping-list-item {
  display: flex;
  padding-bottom: 10px;
}

.shopping-list-item-description {
  flex-grow: 1;
}
</style>
