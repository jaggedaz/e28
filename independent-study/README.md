# Using Vue.js and Firebase Cloud Firestore to Create a Simple To-Do App

*By Josh Grauer*

## Introduction

I really like Firebase.  I like that I can get all my back end services in one place: authentication, database,
serverless functions, and hosting.  Best of  all, the free tier gives you access to everything and a generous
allowance to start out with.  In this independent study I'll be exploring just one component of firebase: the
Firestore.  My goal is to evaluate how well Firestore can be integrated into a Vue.js application and build a
simple CRUD application so that I can learn more about using Firestore and NoSQL databases in general.

## Vue Project Setup

To get things going we'll be using the [Vue CLI](https://cli.vuejs.org/) to quickly create a new Vue project and
stub out our application.  Initially our application will track the to-do items in memory but later we'll update
the project to use Firebase Cloud Firestore to track everything.

Let's get started:

1. Install the Vue CLI globally with `npm install -g @vue/cli`.
2. Navigate to the folder where you'd like your new project to live and run `vue create to-do-manager`.  Press
Enter to accept the default configuration.
3. Now run `npm run serve` to start the application.  Navigate to "http://localhost:8080" within your browser
and verify that the "Welcome to Your Vue.js App" page loads.

<img src="images/vuecli.png" alt="Vue CLI template page" />

Since our application is very basic, we can get rid of a few things that the CLI created, you can delete both
the "assets" and "components" folders.

Now we're ready to build out our application.  Open up `App.vue` and replace it's contents with the following:

```vue
<template>
  <div id="app">
    <form @submit.prevent="handleAdd">
      <input type="text" v-model="newItem" placeholder="To-Do Description" />
      <input type="submit" value="Add To-Do" :disabled="!newItem" />
    </form>
    <hr />
    <h3>To-Do List</h3>
    <ul v-if="items.length">
      <li v-for="(item, index) in items" :key="index">
        {{ item }} <a href="#" @click.prevent="handleDelete(index)">Delete</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      newItem: '',
      items: []
    }
  },
  methods: {
    handleAdd() {
      this.items.push(this.newItem);
      this.newItem = '';
    },
    handleDelete(index) {
      this.items.splice(index, 1);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 600px;
  margin: 100px auto 0 auto;
}
</style>
```

Now if you run the application you'll see that we have a super basic to-do app that allows the user to add and
remove to-do items.  But what happens if you refresh the page?  All of your to-do items disappear!  Let's setup
Firebase to track our to-do list so that we don't lose our items on every page load.

<img src="images/todo-start.png" alt="To-Do App Start" />

## Adding Firebase to the Vue Project

Following the [Cloud Firestore Quickstart](https://firebase.google.com/docs/firestore/quickstart), we'll create a
new Firebase project and database.  I named my project "DGMD E-28 To-Do-Manager" and when creating the database I
chose the "Start in **test mode**" option so that I can skip setting up security for now.

Next we need to create a new "app" within Firebase and associate it with our project.  With your project loaded,
navigate to the "Project Overview" page and you should see a heading at the top reading "Get started
by adding Firebase to your app".  Select the "</>" button since we're adding Firebase to a web app.  For my app
name I chose "To-Do Manager" and I chose not to include Firebase hosting.  Take note of the `firebaseConfig`
object that Firebase shows you after creating your app, you'll need some of these values in a minute.

Now we need to add the Firebase libraries/packages to our Vue project.  Rather than use the `<script>` tag to import
the firebase libraries, I chose to install them as an NPM package using `npm install firebase@7.13.1 --save`.

Next the quickstart will advise you to `require()` Firebase and Cloud Firestore, but I like to stick with ES6 import
syntax so I added the following to the top of `<script>` block within App.vue:

```javascript
import firebase from 'firebase/app';
import 'firebase/firestore';
```

Now we need to initialize Firestore when our app starts up, let's add our initialization code within App.vue between
our imports and the default export.  Remember to replace the placeholder values with the values you noted down earlier.

```javascript
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyA2IZGTB8FdQD1rPn1d1oHmS1Ge8gVRWp4',
  authDomain: 'dgmd-e-28-to-do-manager.firebaseapp.com',
  projectId: 'dgmd-e-28-to-do-manager'
});

let db = firebase.firestore();
```

At this point the application should load without throwing any errors, but we still don't see any to-dos coming
from Firestore.  Let's get that going next.

## Retrieving the To-Do Items from the Firestore Collection

To retrieve the to-do items on load, let's use the `create` lifecycle hook:

```javascript
export default {
  ...
  created() {
    // Retrieve all the to-do items
    db.collection('items')
      .orderBy('sortOrder')
      .get().then((querySnapshot) => this.items = querySnapshot.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        };
      }));
  },
  ...
}
```

You can see that I've picked the name "items" for our collection which is what you'll eventually see show up within
the Database section of your Firebase console.  I'm also planning on storing a `sortOrder` with each to-do item so
I'm using the `orderBy()` method to tell Firestore that I want my results sorted by `sortOrder`.

Interestingly, Firestore returns a [querySnapshot](https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot)
which you can either iterate over with `forEach()` or you can grab the array of values from the `docs` property.
If you use `.docs`, you don't get an array of JSON objects like you might expect, you get an array of
[documentReference](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference) objects.
You can see in my code example that I'm mapping the data within each documentReference into a new object which includes
the ID that Firestore assigned the document.  That ID will come in handy when we want to delete a specific to-do item
later on.

Since we're now tracking each to-do item as an object with properties rather than a simple string, we also need to
update the template to display the to-do description using `item.description` like so:

```vue
{{ item.description }} <a href="#" @click.prevent="handleDelete(index)">Delete</a>
```

Of course our collection is still empty, so let's wire up the "add to-do item" functionality.

## Adding a To-Do Item to the Firestore Collection

To add a new to-do item to our Firestore collection, all we have to do is update our `handleAdd()` method:

```javascript
handleAdd() {
  const newToDo = {
    description: this.newItem,
    sortOrder: this.items.length ? this.items[this.items.length - 1].sortOrder + 1 : 1
  };

  db.collection('items').add(newToDo)
    .then((docRef) => {
      this.items.push({
        ...newToDo,
        id: docRef.id
      });
      this.newItem = '';
    })
    .catch((error) => console.error(`Error adding document: ${error}`));
},
```

You'll notice that I don't update the list of items until we get a successful response from Firestore, this avoids
giving the user the impression that something actually saved even when the call failed.

## Deleting a To-Do Item from the Firestore Collection

Last part!  Let's update our `handleDelete()` method:

```javascript
handleDelete(id, index) {
  db.collection('items').doc(id).delete()
    .then(() => this.items.splice(index, 1))
    .catch((error) => console.error(`Error deleting document: ${error}`));
}
```

Again we only update the list of displayed to-do items when we get a successful response from Firebase.  Easy, right?

Now update our template to pass the item ID with the index:

```vue
{{ item.description }} <a href="#" @click.prevent="handleDelete(item.id, index)">Delete</a>
```

## Conclusion

<img src="images/todo-end.png" alt="To-Do App End" />

This was my first time working with a NoSQL data store and I did find it somewhat confusing that query results
weren't just coming back with the raw data but were coming back with document references.  Maybe that's just a Firestore
thing.  In the end I found that Firestore integrated quite well with Vue and I definitely think I would use it
for my next Vue project.
