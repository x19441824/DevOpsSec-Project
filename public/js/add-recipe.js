// Listen for form submission
document.getElementById('recipeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const ingredients = document.getElementById('ingredients').value;
    const preparation_time = document.getElementById('preparation_time').value;
    const difficulty = document.getElementById('difficulty').value;

    // Create recipe object
    const recipeData = {
        title: title,
        description: description,
        ingredients: ingredients,
        preparation_time: preparation_time,
        difficulty: difficulty
    };

    // Send POST request to save the recipe
    fetch('/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add recipe');
        }
        return response.json();
    })
    .then(data => {
        alert('Recipe added successfully!');
        window.location.href = '/'; // Redirect to index page
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add recipe');
    });
});

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
