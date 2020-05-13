import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Recipe from '@/components/Recipe.vue'

describe('Recipe.vue', () => {
  const recipe = {
    id: "Ai4AYqsDwAmLPRX541mY",
    directions: [
      "Beat the eggs, then cream with the butter and sugar",
      "Mix in bananas, then flour, baking soda/powder, salt, and nuts",
      "Add to greased and floured pan",
      "Bake until brown/cracked, toothpick comes out clean"
    ],
    name: "Banana Bread",
    imageUrl: "https://chowdown.io/images/banana-bread.jpg",
    ingredients: [
      { qty: "4", name: "bananas" },
      { qty: "1/2 cup", name: "butter" },
      { qty: "1/2 cup", name: "sugar" },
      { qty: "2", name: "eggs" },
      { qty: "2 cups", name: "flour" },
      { qty: "1/2 tsp", name: "baking soda" },
      { qty: "1 tsp", name: "baking powder" },
      { qty: "pinch", name: "salt" },
      { qty: "1/4 cup", name: "pecans" }
    ]
  };

  it('displays the recipe image', () => {
    const wrapper = shallowMount(Recipe, {
      computed: {
        recipe: () => recipe
      },
    });
    const image = wrapper.find('img');
    expect(image.attributes('src')).to.equal(recipe.imageUrl);
    expect(image.attributes('alt')).to.equal(recipe.name);
  });

  it('displays the recipe name', () => {
    const wrapper = shallowMount(Recipe, {
      computed: {
        recipe: () => recipe
      },
    });
    expect(wrapper.find('h1').text()).to.equal(recipe.name);
  });

  it('displays the recipe ingredients', () => {
    const wrapper = shallowMount(Recipe, {
      computed: {
        recipe: () => recipe
      },
    });

    const ingredients = wrapper.findAll('.ingredient');
    expect(ingredients.length).to.equal(recipe.ingredients.length);
    for (let i = 0; i < ingredients.length; i++) {
      const ingredientName = ingredients.at(i).get('.ingredient-description').text();
      expect(ingredientName).to.equal(`${recipe.ingredients[i].qty} ${recipe.ingredients[i].name}`);
    }
  });

  it('displays the recipe directions', () => {
    const wrapper = shallowMount(Recipe, {
      computed: {
        recipe: () => recipe
      },
    });

    const directions = wrapper.findAll('.direction');
    expect(directions.length).to.equal(recipe.directions.length);
    for (let i = 0; i < directions.length; i++) {
      expect(directions.at(i).text()).to.equal(recipe.directions[i]);
    }
  });

  it('adds the ingredient to the shopping list when the "Add to Shopping List" link is clicked', async () => {
    const wrapper = shallowMount(Recipe, {
      data() {
        return {
          shoppingList: []
        }
      },
      computed: {
        recipe: () => recipe
      },
    });

    let link = wrapper.find('a');
    expect(link.text()).to.equal('Add to Shopping List');
    
    await link.trigger('click');

    const shoppingList = wrapper.vm.shoppingList;
    expect(shoppingList.length).to.equal(1);
    expect(shoppingList[0]).to.equal(recipe.ingredients[0].name);
    expect(wrapper.find('a').text()).to.equal('Remove from Shopping List');
  });

  it('removes the ingredient from the shopping list when the "Remove from Shopping List" link is clicked', async () => {
    const wrapper = shallowMount(Recipe, {
      data() {
        return {
          shoppingList: [recipe.ingredients[0].name]
        }
      },
      computed: {
        recipe: () => recipe
      },
    });

    let link = wrapper.find('a');
    expect(link.text()).to.equal('Remove from Shopping List');
    
    await link.trigger('click');

    const shoppingList = wrapper.vm.shoppingList;
    expect(shoppingList.length).to.equal(0);
    expect(wrapper.find('a').text()).to.equal('Add to Shopping List');
  });
})
