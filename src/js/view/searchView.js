import {elements} from './base';

export const getInput = () => elements.search__field.value;

export const clearInput = () => {
     elements.search__field.value = '';
};

export const clearResults = () => {
     elements.results__list.innerHTML = '';
     elements.results__pages.innerHTML = '';
}

//title shortening algorithm

export const limitRecipeTitle = (title, limit = 17) => {
   const newTitle = [];
   if (title.length > 20) {
      title.split(' ').reduce((acc, cur) => {
         if ((acc + cur).length <= limit) {
            newTitle.push(cur);
         }
         return acc + ' ' + cur;
      }, 0);
      return `${newTitle.join(' ')}...`;
   }
   return title;

};


const renderOneRecipe = recipe => {
     const markup = 
          `<li>
               <a href="#${recipe.recipe_id}" class="results__link">
                    <figure class="results__fig">
                         <img src="${recipe.image_url}" alt="${recipe.title}">
                    </figure>
                    <div class="results__data">
                         <h4 class="results__name">${limitRecipeTitle(recipe.title)}
                         </h4>
                         <p class="results__author">${recipe.publisher}</p>
                    </div>
               </a>
          </li>`
     elements.results__list.insertAdjacentHTML('beforeend', markup);

};

//Creating button element based on current page number and type
const createButton = (pageNumber, type) => {
     const button =  
     `<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? pageNumber - 1 : pageNumber + 1}>
          <span>Page ${type === 'prev' ? pageNumber - 1 : pageNumber + 1}</span>
          <svg class="search__icon">
               <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}">
               </use>
          </svg>
                         
                    </button>`;
     return button;
}


//Pagination Button Rendering algorithm


const renderButtons = (pageNumber, numResults, resultsPerPage) => {
     const lastPage = Math.ceil(numResults / resultsPerPage);
     let button;
     if(pageNumber === 1 && lastPage > 1) {
          //Create only 'go to next page' button
          button = createButton(pageNumber, 'next');

     }else if (pageNumber < lastPage){
          //Create Both Buttons
          button = `${createButton(pageNumber, 'prev')}
                    ${createButton(pageNumber, 'next')}`;

     }else if ( pageNumber === lastPage && lastPage > 1) {
          //Create only 'go to previous page' button
          button = createButton(pageNumber, 'prev');
     }
     elements.results__pages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (results, pageNumber = 1, resultsPerPage = 10) => {
     const start = (pageNumber - 1) * resultsPerPage;
     const end = pageNumber * resultsPerPage; 
     results.slice(start, end).forEach(renderOneRecipe);

     //Render Pagination Buttons
     renderButtons(pageNumber, results.length, resultsPerPage);
}