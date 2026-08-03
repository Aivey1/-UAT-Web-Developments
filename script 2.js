// Get the game form from the HTML page.
const gameForm = document.getElementById("gameForm");

// Run this function when the user clicks the Submit button.
gameForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing when the form is submitted.
    event.preventDefault();

    // Get the values entered by the player in each form field.
    const username = document.getElementById("username").value;
    const weapons = document.getElementById("weapons").value;
    const health = document.getElementById("health").value;
    const points = document.getElementById("points").value;

    // Display the player's username in the output area.
    document.getElementById("outputUsername").textContent =
        "User Name: " + username;

    // Display the player's selected weapon.
    document.getElementById("outputWeapons").textContent =
        "Weapons: " + weapons;

    // Display the player's health or damage amount.
    document.getElementById("outputHealth").textContent =
        "Health/Damage: " + health;

    // Display the player's total points.
    document.getElementById("outputPoints").textContent =
        "Point Total: " + points;
});
