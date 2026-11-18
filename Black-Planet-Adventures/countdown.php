<?php
// Fictional scheduled launch date; stored directly in code, not a database.
// UTC keeps the same departure instant for visitors in any time zone.
$launch = new DateTimeImmutable('2027-07-01 12:00:00', new DateTimeZone('UTC'));
$launchISO = $launch->format('Y-m-d\TH:i:s\Z');
$secondsLeft = $launch->getTimestamp() - time();
// PHP chooses an initial message; JavaScript keeps it current afterward.
if ($secondsLeft <= 0) {
  $message = 'The scheduled departure time has arrived!';
} elseif ($secondsLeft < 7 * 86400) {
  $message = 'Pack your bags! Launch is less than a week away.';
} elseif ($secondsLeft < 30 * 86400) {
  $message = 'Get ready! Your Mars adventure is getting close.';
} else {
  $message = 'Your journey to Mars is on the horizon.';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Black Planet Adventures | Mars Departure Countdown</title>
  <link rel="stylesheet" href="style.css">
  <script src="countdown.js" defer></script>
</head>
<body>
<header><h1>Black Planet Adventures</h1><p>Your journey beyond Earth begins here.</p></header>
<nav aria-label="Main navigation">
  <a href="index.php">Home</a>
  <a href="application.php">Pilot Application</a>
  <a href="countdown.php" aria-current="page">Mars Countdown</a>
</nav>
<main class="panel">
  <h2>Next Mars Departure</h2>
  <p>Our next <strong>fictional demonstration flight</strong> is scheduled for <strong><?php echo htmlspecialchars($launch->format('F j, Y \a\t g:i A'), ENT_QUOTES, 'UTF-8'); ?> UTC</strong>.</p>
  <!-- Server-rendered text remains useful even when JavaScript is disabled. -->
  <section class="countdown" data-launch="<?php echo htmlspecialchars($launchISO, ENT_QUOTES, 'UTF-8'); ?>" aria-label="Time remaining to departure">
    <div class="countdown-grid" role="timer" aria-label="Time until launch">
      <div><strong id="days">--</strong><span>Days</span></div>
      <div><strong id="hours">--</strong><span>Hours</span></div>
      <div><strong id="minutes">--</strong><span>Minutes</span></div>
    </div>
    <p id="launch-message" aria-live="polite"><?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?></p>
  </section>
  <p class="countdown-note">Countdown refreshes every minute. Times are based on your device clock.</p>
  <a class="button" href="application.php">Apply to Be a Pilot</a>
</main>
<footer>&copy; <?php echo date('Y'); ?> Black Planet Adventures</footer>
</body>
</html>