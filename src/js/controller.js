import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

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

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // Loading recipe from server
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // alert(err);
    recipeView.renderError();
  }
};

// controlRecipes();

const controlSearchResults = async function () {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    // Load search results
    await model.loadSearchResults(query);

    // Render search results
    resultsView.render(model.getSearchResultPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

controlSearchResults();

const controlPagination = function (goToPage) {
  console.log(goToPage);

   // Render search results
   resultsView.render(model.getSearchResultPage(goToPage));

   // Render initial pagination buttons
   paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandleRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();

//Better and simpler way
// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
