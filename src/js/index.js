import Search from './model/Search';
import {elements, renderLoader, clearLoader} from './view/base';
import * as searchView from './view/searchView';

/****Global State of the app
 * --Search Object
 * --Current Recipe Object
 * --Shopping list object 
 * --Likes Recipes
 *
 */
const state = {}; //Each time page reload state is empty

/****************************************** */
/*********Search Controller*************** */
/****************************************** */

const controlSearch = async () => {
   //1) Get query from the view
   const query = searchView.getInput();
   if (query) {
      //2) New search object and add to state
      state.search = new Search(query);
      //4) Use Ajax loader and prepare UI
      searchView.clearInput();
      searchView.clearResults();
      renderLoader(elements.results__list);

      
      //3) Search for recipes
      await state.search.getResults();
      


      //5) Render results on UI
      clearLoader();
      console.log(state.search.result);
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
   const id = window.location.hash.replace('#', '');
   
}



/****Event Listener for selecting recipe - Hash Change * */

window.addEventListener('hashchange', controlRecipe);

