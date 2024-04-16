document.getElementById('recipeForm').addEventListener('submit', function(e) {
    e.preventDefault();

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
});
