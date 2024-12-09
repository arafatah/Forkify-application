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

const showRecipe = async function () {
  try {
    const res = await fetch(
      // `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
      `https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e866f`
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
  } catch (err) {
    alert(err);
  }
};

showRecipe();

const showRecipe2 = async function () {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
    );
    const data = await res.json();

    if(!res.ok) throw new Error('Data was missing somehow, Req the server again.')
    console.log(res, data);

  } catch (err) {
    alert(err);
  }
};

showRecipe2();
