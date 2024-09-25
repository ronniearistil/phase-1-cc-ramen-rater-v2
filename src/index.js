// Core Deliverables

// Helper function to create a ramen image element and add it to the #ramen-menu
const createRamenImage = (ramen) => {
  const img = document.createElement('img'); // Create an img tag for each ramen
  img.src = ramen.image; // Set the image source to the ramen's image URL
  img.alt = ramen.name; // Set the alt text to the ramen's name

  // Adding a click event listener to display ramen details when clicked
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
    .catch(error => console.error('Error fetching ramens:', error)); // Handle errors
};

// This function will display ramen details when a ramen image is clicked
const handleClick = (ramen) => {
  const detailImage = document.querySelector('#ramen-detail img'); // Get the detail image element
  const detailName = document.querySelector('.name'); // Get the name element
  const detailRestaurant = document.querySelector('.restaurant'); // Get the restaurant element
  const detailRating = document.getElementById('rating-display'); // Get the rating display element
  const detailComment = document.getElementById('comment-display'); // Get the comment display element

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
