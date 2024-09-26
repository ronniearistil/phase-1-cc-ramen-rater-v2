// Core Deliverables

// Cache DOM elements that will be reused frequently
const detailImage = document.querySelector('#ramen-detail img');
const detailName = document.querySelector('.name');
const detailRestaurant = document.querySelector('.restaurant');
const detailRating = document.getElementById('rating-display');
const detailComment = document.getElementById('comment-display');

// Helper function to create a ramen image element and add it to the #ramen-menu
const createRamenImage = (ramen) => {
  const img = document.createElement('img'); // Create an img tag for each ramen
  img.src = ramen.image; // Set the image source to the ramen's image URL
  img.alt = ramen.name; // Set the alt text to the ramen's name

  // Add a click event listener to display ramen details when clicked
  img.addEventListener('click', () => handleClick(ramen));

  // Append the ramen image to the #ramen-menu div
  document.getElementById('ramen-menu').appendChild(img);
};

// Function to fetch and display all ramen images in the #ramen-menu div
const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json()) // Convert the response to JSON
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu'); // Get the ramen menu div
      ramenMenu.innerHTML = ''; // Clear the ramen menu in case it has existing content

      // Loop through each ramen object and use the helper function to create and append the image
      ramens.forEach(ramen => createRamenImage(ramen));

      // Automatically display the first ramen's details when the page loads
      if (ramens.length > 0) {
        handleClick(ramens[0]); // Show the first ramen by default
      }
    })
    .catch(error => console.error(`Error fetching ramens: ${error}`)); // Handle errors
};

// This function will display ramen details when a ramen image is clicked
const handleClick = (ramen) => {
  // Update the ramen details in the DOM
  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;

  // Store the ramen ID in the edit and delete forms for later use
  document.getElementById('edit-ramen').dataset.id = ramen.id;
  document.getElementById('delete-button').dataset.id = ramen.id;
};

// Function to handle the submission of a new ramen
const addSubmitListener = () => {
  const form = document.getElementById('new-ramen'); // Get the new ramen form

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    // Create a new ramen object from the form inputs
    const newRamen = {
      name: document.getElementById('new-name').value, // Use the correct ID
      restaurant: document.getElementById('new-restaurant').value, // Use the correct ID
      image: document.getElementById('new-image').value, // Use the correct ID
      rating: document.getElementById('new-rating').value, // Use the correct ID
      comment: document.getElementById('new-comment').value // Use the correct ID
    };

    // Ensure all fields are filled before submitting
    if (!newRamen.name || !newRamen.restaurant || !newRamen.image || !newRamen.rating || !newRamen.comment) {
      alert("Please fill out all fields.");
      return;
    }

    // Use the helper function to create and append the new ramen image to the menu
    createRamenImage(newRamen);

    // Clear the form after submission
    form.reset();
  });
};

// Main function that calls core deliverables when the DOM is fully loaded
const main = () => {
  displayRamens(); // Display all ramen images (Core Deliverable)
  addSubmitListener(); // Set up the form to add new ramen (Core Deliverable)
};

// Ensure that the DOM is fully loaded before running the main function
document.addEventListener('DOMContentLoaded', main);

// Advanced Deliverables

// Helper function to remove a ramen image by name
const removeRamenImageByName = (ramenName) => {
  const ramenMenu = document.getElementById('ramen-menu'); // Get the ramen menu div
  const ramenImages = ramenMenu.getElementsByTagName('img'); // Get all the ramen images

  // Loop through each image in the #ramen-menu to find the one matching the ramen's name
  for (let img of ramenImages) {
    if (img.alt === ramenName) { // Match by alt text (ramen name)
      ramenMenu.removeChild(img); // Remove the matching ramen image from the DOM
      break; // Exit the loop after removing the correct ramen
    }
  }
};

// Function to handle deleting a ramen when the delete button is clicked (non-persisted)
const setupDeleteListener = () => {
  const deleteButton = document.getElementById('delete-button'); // Get the delete button

  deleteButton.addEventListener('click', () => {
    const ramenName = detailName.textContent; // Get the ramen name

    // Remove the ramen image from the menu using the helper function
    removeRamenImageByName(ramenName);

    // Clear the ramen details section to remove the deleted ramen's info
    detailImage.src = ''; // Clear the detail image
    detailName.textContent = ''; // Clear the ramen name
    detailRestaurant.textContent = ''; // Clear the restaurant name
    detailRating.textContent = ''; // Clear the rating
    detailComment.textContent = ''; // Clear the comment
  });
};

// Function to handle editing a ramen's rating and comment (non-persisted)
const setupEditListener = () => {
  const form = document.getElementById('edit-ramen'); // Get the edit ramen form

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    // Get the new rating and comment values from the form
    const newRating = document.getElementById('new-rating').value; // Get new rating input value
    const newComment = document.getElementById('new-comment').value; // Get new comment input value

    // Update the displayed ramen details in the DOM with the new rating and comment
    detailRating.textContent = newRating; // Update rating in the DOM
    detailComment.textContent = newComment; // Update comment in the DOM

    // Clear the edit form after submission
    form.reset();
  });
};

// Call these advanced deliverables after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  setupDeleteListener(); // Setup for deleting a ramen (non-persisted)
  setupEditListener(); // Setup for editing ramen details (non-persisted)
});
