const recipeContainer = document.querySelector('.recipe');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
}; // https://forkify-api.herokuapp.com/v2
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

//# sourceMappingURL=index.62406edb.js.map
