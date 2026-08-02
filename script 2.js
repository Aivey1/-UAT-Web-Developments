document.getElementById("gameForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const weapons = document.getElementById("weapons").value;
    const health = document.getElementById("health").value;
    const points = document.getElementById("points").value;

    document.getElementById("outputUsername").textContent = "User Name: " + username;
    document.getElementById("outputWeapons").textContent = "Weapons: " + weapons;
    document.getElementById("outputHealth").textContent = "Health/Damage: " + health;
    document.getElementById("outputPoints").textContent = "Point Total: " + points;
});
