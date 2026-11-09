<?php
// Receive submitted POST data and safely display it. No database is used.
// htmlspecialchars prevents entered HTML from being interpreted as markup.
function safe($value) { return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8'); }
$fields = [
  'fullName' => 'Full name', 'email' => 'Email address', 'age' => 'Age',
  'flightHours' => 'Flight hours', 'license' => 'Pilot license',
  'training' => 'Willing to train', 'motivation' => 'Why you should be chosen'
];
$submitted = $_SERVER['REQUEST_METHOD'] === 'POST';
$values = [];
foreach ($fields as $key => $label) {
  $values[$key] = trim((string)($_POST[$key] ?? ''));
}
// Server-side checks complement (and do not replace) JavaScript validation.
$valid = $submitted && !in_array('', $values, true)
  && filter_var($values['email'], FILTER_VALIDATE_EMAIL)
  && filter_var($values['age'], FILTER_VALIDATE_INT, ['options' => ['min_range' => 18, 'max_range' => 100]]) !== false
  && filter_var($values['flightHours'], FILTER_VALIDATE_INT, ['options' => ['min_range' => 0, 'max_range' => 100000]]) !== false
  && in_array($values['license'], ['Private Pilot', 'Commercial Pilot', 'Airline Transport Pilot', 'None Yet'], true)
  && in_array($values['training'], ['Yes', 'No'], true)
  && strlen($values['motivation']) >= 20;
?>
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Black Planet Adventures | Application Results</title><link rel="stylesheet" href="style.css"></head>
<body>
<header><h1>Black Planet Adventures</h1><p>Application Summary</p></header>
<nav aria-label="Main navigation"><a href="index.php">Home</a><a href="application.php">Pilot Application</a></nav>
<main class="panel">
<?php if ($valid): ?>
  <h2>Application Received!</h2>
  <p>Thank you for applying. Here is the information you submitted. This is a demonstration; no information has been saved.</p>
  <dl>
    <?php foreach ($fields as $key => $label): ?>
      <dt><?php echo safe($label); ?></dt><dd><?php echo nl2br(safe($values[$key])); ?></dd>
    <?php endforeach; ?>
  </dl>
<?php else: ?>
  <h2>Application Not Submitted</h2>
  <p>Please complete the application with a valid email, age from 18 to 100, whole-number flight hours, and a motivation answer of at least 20 characters.</p>
<?php endif; ?>
<a class="button" href="application.php">Back to Application</a>
</main>
<footer>&copy; <?php echo date('Y'); ?> Black Planet Adventures</footer>
</body>
</html>