import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Starting of project
/* 
1. User Story: Description of the application's functionality from the user's perspective
> Common formate: As a [type of user], I want [an action] so that [a benefit]. 

Like: 
1. As a user, I want to search for recipes, so that I can find new ideas for meals.
2. As a user, I want to be able to update the number of servings, so that I can cook a meal for different number of people. 
3. As a user, I want to bookmark recipes, so that I can review them later. 
4. As a user, I want to be able to create my own recipes, so that i have them all organized in the same app. 
5. As a user, I want to be able to see my bookmarks and own recipes when I leave the app and come back later, so that I can close the app safely after I'm done.
*/

// const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(10)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} ${res.status}`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// const showRecipe = async function () {
//   try {
//     const data = await getJSON(
//       `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
//     );
//     console.log(data);
//   } catch (err) {
//     console.error(`${err} 💥💥💥`);
//   }
// };

// showRecipe();



const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    recipeView.renderSpinner();
    // Loading recipe from server

    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);

   
  } catch (err) {
    alert(err);
  }
};

// controlRecipes();

//Better and simpler way
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
