document.addEventListener('DOMContentLoaded', function() {
    fetch('/recipes')
        .then(response => response.json())
        .then(data => displayRecipes(data.data))
        .catch(error => console.error('Error fetching recipes:', error));
});

function displayRecipes(recipes) {
    const container = document.getElementById('recipe-container');
    container.innerHTML = '';

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

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('searchQuery').value;
    fetch(`/search?query=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Recipe not found');
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                displayMessage(data.message);
            } else {
                displayRecipes(data.data);
            }
        })
        .catch(error => {
            console.error('Error searching recipes:', error);
            displayMessage(error.message);
        });
});

function displayMessage(message) {
    const container = document.getElementById('recipe-container');
    container.innerHTML = `<p>${message}</p>`;
}

function displayRecipe(recipe) {
    const container = document.getElementById('recipe-container');
    container.innerHTML = `
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
        <p>Ingredients: ${recipe.ingredients}</p>
        <p>Prep Time: ${recipe.preparation_time} minutes</p>
        <p>Difficulty: ${recipe.difficulty}</p>
    `;
}

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('searchQuery').value;
    fetch(`/search?query=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Recipe not found');
            }
            return response.json();
        })
        .then(data => {
            if (data.message === "Recipe not found") {
                displayMessage(data.message);
            } else {
                displayRecipe(data.data[0]);
            }
        })
        .catch(error => {
            console.error('Error searching recipes:', error);
            displayMessage(error.message);
        });
});
