import { elements } from './base';

const renderItem = (id, count, unit, name) =>
   `<li class="shopping__item" data-itemid=${id}>
<div class="shopping__count">
    <input type="number" value="${count}" step="${count}" class="shopping__count-value">
    <p>${unit}</p>
</div>
<p class="shopping__description">${name}</p>
<button class="shopping__delete btn-tiny">
    <svg>
        <use href="img/icons.svg#icon-circle-with-cross"></use>
    </svg>
</button>
</li>
`;

export const renderList = shoppingList => {
   elements.shopping__list.innerHTML = '';

   const markup = shoppingList.map(el => renderItem(el.id, el.count, el.unit, el.name)).join('');

   elements.shopping__list.insertAdjacentHTML('afterbegin', markup);
};

export const deleteItem = id => {
     const item = document.querySelector(`[data-itemid="${id}"]`);
     if(item) item.parentElement.removeChild(item);
  };
  
