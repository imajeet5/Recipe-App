import axios from 'axios';
import{ key, proxy} from '../config'

export default class Recipe {
     constructor (id) {
          this.id = id;
     }

     async getRecipe() {
          try {
               const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
               this.title = res.data.recipe.title;
               this.author = res.data.recipe.publisher;
               this.img = res.data.recipe.image_url;
               this.url = res.data.recipe.source_url;
               this.ingredients = res.data.recipe.ingredients;
          }catch (error) {
               alert("Error in fetching recipe");
          }
     }

     //Parsing ingredients into uniform data

     parseIngredients() {
          //Convert the longs units in the ingredients (like tablespoon, tablespoons) into small uniform units( to tbsp, tbsp)
          const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
          const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
          const allUnits = [...unitsShort, 'kg', 'g'];

          //This will search for any string from the unitsLong array in the ingredients string and replace it will corresponding element in the unitsShort array

          const newIngredients = this.ingredients.map(el => {
               //1. Uniform Units
               let ingredient = el.toLowerCase();
                    
               for(var i=0; i<unitsLong.length; i++){
                   ingredient = ingredient.replace(unitsLong[i], unitsShort[i]);
               }
              /* unitsLong.forEach((unitLong, i) => {ingredient.replace(unitLong, unitsShort[i]); })  */

              //2. Remove parentheses
              ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

              //3. Separate the ingredients into a new object containing count, unit and ingredientName
              const arrIng = ingredient.split(' ');
              
                    //3.1 Separating the unit from the ingredients
               const unitIndex = arrIng.findIndex(element => allUnits.includes(element));
               console.log(unitIndex);

               let ingredientObject; 
               if(unitIndex > -1) {
                    const arrCount = arrIng.slice(0, unitIndex);
                    let count;
                    if(arrCount.length === 1) {
                         count = eval(arrIng[0].replace('-', '+')); 
                         //for the case when unit is like 4-1/2                         
                    } else {
                         count = eval(arrIng.slice(0, unitIndex).join('+'));     
                    }
                    ingredientObject = {
                         count: count, 
                         unit: arrIng[unitIndex],
                         name: arrIng.slice(unitIndex + 1).join(' ')
                    };
               } else if (parseInt(arrIng[0], 10)){
                    //There is no unit, but first element is a number
                    ingredientObject = {
                         count: parseInt(arrIng[0], 10),
                         unit: '',
                         name: arrIng.slice(1).join(' ')
                    }
               } else if (unitIndex === -1) {
                    //There is no unit and no number in 1st position
                    ingredientObject = {
                         count: 1,
                         unit: '',
                         name: ingredient
                    }
               }
               return ingredientObject;

          });
          this.ingredients = newIngredients;
     }

     calcTime() {
          //Assuming that we need 15 min for each 3 ingredients
          const numIng = this.ingredients.length;
          const periods = Math.ceil(numIng / 3);
          this.time = periods * 15;
     }
     calcServings() {
          this.servings = 4;
     }
     
}