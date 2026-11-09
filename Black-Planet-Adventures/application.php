<?php // This page displays the form. JavaScript checks the answers before POST submission. ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Black Planet Adventures | Pilot Application</title>
  <link rel="stylesheet" href="style.css">
  <script src="validation.js" defer></script>
</head>
<body>
<header><h1>Black Planet Adventures</h1><p>Pilot Recruitment</p></header>
<nav aria-label="Main navigation"><a href="index.php">Home</a><a href="application.php" aria-current="page">Pilot Application</a></nav>
<main class="panel">
  <h2>Apply to Pilot a Mars Tour</h2>
  <p>Complete all seven questions. Fields are checked before your application is submitted.</p>
  <!-- POST transfers form values to a separate PHP results page. -->
  <form id="pilotForm" action="results.php" method="post" novalidate>
    <label for="fullName">1. Full name</label>
    <input id="fullName" name="fullName" type="text" maxlength="80" required placeholder="Alex Explorer">
    <label for="email">2. Email address</label>
    <input id="email" name="email" type="email" maxlength="120" required placeholder="alex@example.com">
    <label for="age">3. How old are you?</label>
    <input id="age" name="age" type="number" min="18" max="100" step="1" required placeholder="30">
    <label for="flightHours">4. How many flight hours have you completed?</label>
    <input id="flightHours" name="flightHours" type="number" min="0" max="100000" step="1" required placeholder="1500">
    <label for="license">5. What type of pilot license do you hold?</label>
    <select id="license" name="license" required>
      <option value="">Choose a license</option>
      <option value="Private Pilot">Private Pilot</option>
      <option value="Commercial Pilot">Commercial Pilot</option>
      <option value="Airline Transport Pilot">Airline Transport Pilot</option>
      <option value="None Yet">None Yet</option>
    </select>
    <fieldset><legend>6. Are you willing to train for long-distance space missions?</legend>
      <label class="choice"><input type="radio" name="training" value="Yes" required> Yes</label>
      <label class="choice"><input type="radio" name="training" value="No"> No</label>
    </fieldset>
    <label for="motivation">7. Why should we choose you to fly tourists to Mars?</label>
    <textarea id="motivation" name="motivation" rows="4" maxlength="500" required placeholder="Tell us about your skills and motivation..."></textarea>
    <p id="errorMessage" class="error" role="alert" aria-live="polite"></p>
    <button type="submit">Submit Application</button>
  </form>
</main>
<footer>&copy; <?php echo date('Y'); ?> Black Planet Adventures</footer>
</body>
</html>