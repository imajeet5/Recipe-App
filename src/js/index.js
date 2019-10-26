import Search from './model/Search';
import Recipe from './model/Recipe'
import {elements, renderLoader, clearLoader} from './view/base';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';


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

      
      //4) Search for recipes
      await state.search.getResults();      


      //5) Render results on UI
      clearLoader();      
      searchView.renderResults(state.search.result)
      
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
   console.log(btn);
   if(btn){
      console.log('Inside Btn');
      const goToPage = parseInt(btn.dataset.goto, 10);
      console.log(goToPage);
      searchView.clearResults();
      searchView.renderResults(state.search.result, goToPage);
   }
});

const controlRecipe = async () => {
   //Getting recipe ID from URL
   const recipe_id = window.location.hash.replace('#', '');

   if(recipe_id) {

   //1. Prepare the UI, add AJAX Loader
   recipeView.clearRecipe();
   renderLoader(elements.recipe);

   //2. Highlight selected search item
   if(state.search) searchView.highlighSelected(recipe_id);

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
   }


   
}



/****Event Listener for selecting recipe - Hash Change * */

window.addEventListener('hashchange', controlRecipe);

