<template>
  <header>
    <h2>My Recipe Book</h2>
    <nav>
      <router-link :to="{name: 'recipes'}" exact>Recipes</router-link>
      <router-link :to="{name: 'favorites'}">Favorites</router-link>
      <router-link :to="{name: 'shopping-list'}">Shopping List</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  padding: 20px 0 15px 0;
  margin-bottom: 30px;
}

h2 {
  flex-grow: 1;
  margin: 0;
  padding: 0;
}

nav a {
  text-decoration: none;
  color: black;
  margin: 0 5px;
  padding: 0 10px 5px 10px;
  border-bottom: 3px solid transparent;
}

nav a.router-link-active {
  border-bottom: 3px solid lightgray;
  font-weight: bold;
}
</style>
