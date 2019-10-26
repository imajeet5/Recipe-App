export const elements = {
   search: document.querySelector('.search'),
   search__field: document.querySelector('.search__field'),
   results: document.querySelector('.results'),
   results__list: document.querySelector('.results__list'),
   results__pages: document.querySelector('.results__pages'), 
   recipe: document.querySelector('.recipe')
};

export const renderLoader = element => {
   const loader = 
      `<div class="loader">
         <svg>
            <use href="img/icons.svg#icon-cw"></use>
         </svg>
      </div>`;
      element.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
     const loader = document.querySelector(".loader");
     if(loader)
          loader.parentElement.removeChild(loader);
}