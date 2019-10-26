import uniqid from 'uniqid';


export default class List {
   constructor() {
      this.shoppingList = [];
   }
   addToList(ingredients) {
      ingredients.forEach(el => {
         var item = {
            id: uniqid(),
            count: el.count,
            unit: el.unit,
            name: el.name
         };
         this.shoppingList.push(item);
      });
   }

   deleteItem(id) {
      const index = this.shoppingList.findIndex(el => el.id === id);
      this.shoppingList.splice(index, 1); //removes the selected element from the array
   }

   updateCount(id, newCount) {
      this.shoppingList.find(el => el.id === id).count = newCount;
   }
}

