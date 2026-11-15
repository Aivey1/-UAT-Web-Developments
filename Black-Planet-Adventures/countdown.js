// Countdown logic runs in the browser; no database or file storage is used.
const countdown = document.querySelector('.countdown');
const launchTime = Number(countdown.dataset.launch);
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const messageElement = document.getElementById('launch-message');

function updateCountdown() {
  // Recalculate from the current time instead of subtracting 60 seconds:
  // this stays accurate even if the browser tab was asleep.
  const remaining = Math.max(0, launchTime - Date.now());
  const totalMinutes = Math.ceil(remaining / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  daysElement.textContent = String(days);
  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');

  // Friendly messages change automatically as departure approaches.
  if (remaining === 0) {
    messageElement.textContent = 'It is launch time! Bon voyage!';
  } else if (remaining < 86400000) {
    messageElement.textContent = 'Final boarding! Your spaceship is almost ready.';
  } else if (remaining < 7 * 86400000) {
    messageElement.textContent = 'Pack your bags! Mars is calling.';
  } else if (remaining < 30 * 86400000) {
    messageElement.textContent = 'Get ready for your journey!';
  } else {
    messageElement.textContent = 'Your Mars adventure is coming!';
  }
}
// Show the clock immediately, then refresh once each minute.
updateCountdown();
setInterval(updateCountdown, 60000);
