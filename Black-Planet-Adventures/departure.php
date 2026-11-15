<?php
// This is a fictional Mars tourism schedule, not a real launch announcement.
// PHP calculates the next annual departure on July 20 at 12:00 UTC.
date_default_timezone_set('UTC');
$now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
$year = (int)$now->format('Y');
$launch = new DateTimeImmutable("$year-07-20 12:00:00", new DateTimeZone('UTC'));
if ($launch <= $now) {
    $launch = $launch->modify('+1 year');
}
$secondsLeft = $launch->getTimestamp() - $now->getTimestamp();
$daysLeft = (int)floor($secondsLeft / 86400);
// Server-side if/elseif/else chooses the initial message.
if ($daysLeft < 1) {
    $message = 'Final boarding! Your spaceship is almost ready.';
} elseif ($daysLeft < 7) {
    $message = 'Pack your bags! Mars is calling.';
} elseif ($daysLeft < 30) {
    $message = 'Get ready for your journey!';
} else {
    $message = 'Your Mars adventure is coming!';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Black Planet Adventures | Next Departure</title>
  <link rel="stylesheet" href="style.css">
  <script src="countdown.js" defer></script>
</head>
<body>
<header><h1>Black Planet Adventures</h1><p>Your journey beyond Earth begins here.</p></header>
<nav aria-label="Main navigation"><a href="index.php">Home</a><a href="departure.php" aria-current="page">Mars Departures</a><a href="application.php">Pilot Application</a></nav>
<main class="panel">
  <h2>Next Mars Departure</h2>
  <p>Get ready for your next adventure. Our fictional Mars tour departs every July 20 at 12:00 UTC.</p>
  <p class="launch-date">Scheduled takeoff: <strong><?php echo htmlspecialchars($launch->format('F j, Y \a\t H:i'), ENT_QUOTES, 'UTF-8'); ?> UTC</strong></p>
  <!-- data-launch stores a UTC timestamp for the browser's countdown. -->
  <section class="countdown" aria-label="Time remaining until takeoff" data-launch="<?php echo $launch->getTimestamp() * 1000; ?>">
    <div><strong id="days">--</strong><span>Days</span></div>
    <div><strong id="hours">--</strong><span>Hours</span></div>
    <div><strong id="minutes">--</strong><span>Minutes</span></div>
  </section>
  <p id="launch-message" class="launch-message" aria-live="polite"><?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?></p>
  <p class="fine-print">Demonstration schedule for a class project. Not a real Mars flight.</p>
  <a class="button" href="index.php">Back to Home</a>
</main>
<footer>&copy; <?php echo date('Y'); ?> Black Planet Adventures</footer>
</body>
</html>