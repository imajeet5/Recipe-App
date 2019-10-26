import Search from './model/Search';
import Recipe from './model/Recipe';
import List from './model/List';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';

/****Global State of the app
 * --Search Object
 * --Current Recipe Object
 * --Shopping list object
 * --Likes Recipes
 *
 */
const state = {}; //Each time page reload state is empty

window.state = state;

/****************************************** */
/*********Search Controller*************** */
/****************************************** */

const controlSearch = async () => {
   //1) Get query from the view
   const query = searchView.getInput();
   if (query) {
      //2) New search object and add to state
      state.search = new Search(query);
      //3) Use Ajax loader and prepare UI
      searchView.clearInput();
      searchView.clearResults();
      renderLoader(elements.results__list);
      try {
         //4) Search for recipes
         await state.search.getResults();
         if (state.search.result.length > 0) {
            //5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
         } else {
            alert('Recipe Not Found');
            clearLoader();
         }
      } catch (error) {
         alert('API not working. Enter a different API');
         clearLoader();
      }
   }
};

/********Adding Event Listener to search Button***** */

elements.search.addEventListener('submit', e => {
   e.preventDefault();
   controlSearch();
});

/********Adding Event Listener to Paging Button***** */

elements.results__pages.addEventListener('click', event => {
   const btn = event.target.closest('.btn-inline');
   if (btn) {
      const goToPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();
      searchView.renderResults(state.search.result, goToPage);
   }
});

const controlRecipe = async () => {
   //Getting recipe ID from URL
   const recipe_id = window.location.hash.replace('#', '');

   if (recipe_id) {
      //1. Prepare the UI, add AJAX Loader
      recipeView.clearRecipe();
      renderLoader(elements.recipe);

      //2. Highlight selected search item
      if (state.search) searchView.highlighSelected(recipe_id);

      //3. Create new recipe object
      state.recipe = new Recipe(recipe_id);

      //4. Get recipes data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      //5. Calculate the servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //6. Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
   }
};

/****Event Listener for selecting recipe - Hash Change * */

window.addEventListener('load', () => {
   document.location.hash = '';
});
window.addEventListener('hashchange', controlRecipe);

/*****Shopping List controller ********* */

const controlList = () => {
   //Creating new List object
   if (!state.list) state.list = new List();

   //Adding items to the shopping list
   /* try {
      for (var i = 0; i < state.recipe.ingredients.length; i++) {
         if (state.recipe.ingredients[i].count === state.list.shoppingList[i].count) {
            if (i === state.recipe.ingredients.length - 1) {
               console.log('Both are equal');
            }
         } else break;
      }
   } catch (error) {
      console.log(error);
      console.log("Shopping List don't exist");
   }
   console.log(i); */

   //Algorithm to avoid duplicity in the shopping list

   try {
      if (
         state.recipe.ingredients[state.recipe.ingredients.length - 1].name.localeCompare(
            state.list.shoppingList[state.list.shoppingList.length - 1].name
         ) === 0 &&
         state.recipe.ingredients[state.recipe.ingredients.length - 1].count ===
            state.list.shoppingList[state.list.shoppingList.length - 1].count
      ) {
         // console.log('Both are equal');
      } else {
         state.list.addToList(state.recipe.ingredients);
      }
   } catch (error) {
      console.log(error);
      console.log('Shopping Count not defined');
      state.list.addToList(state.recipe.ingredients);   }

   //Render Shopping List to UI
   listView.renderList(state.list.shoppingList);
};

//Handling delete and update list item event in shopping list

elements.shopping__list.addEventListener('click', event => {
   const id = event.target.closest('.shopping__item').dataset.itemid;   

   if (event.target.matches('.shopping__delete, .shopping__delete *')) {
      console.log('Delete Button pressed');
      // Delete from state
      state.list.deleteItem(id);

      // Delete from UI
      listView.deleteItem(id);

      // Handle the count update
   }else if (event.target.matches('.shopping__count-value')){
      const val = parseFloat(event.target.value, 10);
        state.list.updateCount(id, val);
   }
});


/*****Event Listener for button in the recipe area .i.e increase/decrease buttons, like button and add to shopping cart button  */

elements.recipe.addEventListener('click', event => {
   if (event.target.matches('.btn-decrease, .btn-decrease *')) {
      //1. Update servings and Ingredients (decrease)
      if (state.recipe.servings > 1) {
         state.recipe.updateServings('dec');
      }

      //2. Update the servings and ingredients at UI
      recipeView.updateServingsIngredients(state.recipe);
   } else if (event.target.matches('.btn-increase, .btn-increase *')) {
      //1. Update servings and Ingredients (increase)
      state.recipe.updateServings('inc');

      //2. Update the servings and ingredients at UI
      recipeView.updateServingsIngredients(state.recipe);
   } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
      //Add ingredients to shopping list
      controlList();
   } else if (event.target.matches('.recipe__love, .recipe__love *')) {
      //Add recipe to the like list
      console.log('Like button is pressed');
   }
});
