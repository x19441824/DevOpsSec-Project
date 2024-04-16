document.addEventListener('DOMContentLoaded', function() {
    fetch('/recipes')
        .then(response => response.json())
        .then(data => displayRecipes(data.data))
        .catch(error => console.error('Error fetching recipes:', error));
});

function displayRecipes(recipes) {
    const container = document.getElementById('recipe-container');
    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
            <p>Ingredients: ${recipe.ingredients}</p>
            <p>Prep Time: ${recipe.preparation_time} minutes</p>
            <p>Difficulty: ${recipe.difficulty}</p>
        `;
        container.appendChild(recipeElement);
    });
}
