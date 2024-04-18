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

function displayRecipes(recipes) {
    const container = document.getElementById('recipe-container');
    container.innerHTML = ''; // Clear previous results
    
    if (recipes.length === 0) {
        displayMessage("Recipe not found");
        return;
    }

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

const recipeData = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    ingredients: document.getElementById('ingredients').value,
    preparation_time: document.getElementById('preparation_time').value,
    difficulty: document.getElementById('difficulty').value
};

fetch('/recipes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipeData)
})
.then(response => response.json())
.then(data => {
    alert('Recipe added successfully!');
    window.location.href = '/'; // Redirect to index page
})
.catch((error) => {
    console.error('Error:', error);
});
