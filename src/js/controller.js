import icons from 'url:../img/icons.svg';
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

const renderSpinner = function (parentEl) {
  const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async function () {
  try {
    // Loading recipe from server
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    renderSpinner(recipeContainer);

    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      // `https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e866f`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    console.log(res, data);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    // Render recipe
    const markup = `
        <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${recipe.ingredients
              .map(
                ing => `
              <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing?.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing?.unit}</span>
                ${ing?.description}
              </div>
            </li>
                `
              )
              .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    alert(err);
  }
};

// showRecipe();

//Better and simpler way
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

// const showRecipe2 = async function () {
//   try {
//     const res = await fetch(
//       `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
//     );
//     const data = await res.json();

//     if (!res.ok)
//       throw new Error('Data was missing somehow, Req the server again.');
//     console.log(res, data);
//   } catch (err) {
//     alert(err);
//   }
// };

// showRecipe2();
