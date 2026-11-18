// The launch date comes from PHP through the page's data-launch attribute.
const countdown = document.querySelector('.countdown');
const departure = new Date(countdown.dataset.launch).getTime();
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const messageElement = document.getElementById('launch-message');

function updateCountdown() {
  // Never display negative time if the departure has already arrived.
  const remaining = Math.max(0, departure - Date.now());
  const totalMinutes = Math.ceil(remaining / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  daysElement.textContent = String(days);
  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');

  // Conditional messages change automatically as launch approaches.
  let message;
  if (remaining === 0) {
    message = 'The scheduled departure time has arrived!';
  } else if (remaining < 7 * 86400000) {
    message = 'Pack your bags! Launch is less than a week away.';
  } else if (remaining < 30 * 86400000) {
    message = 'Get ready! Your Mars adventure is getting close.';
  } else {
    message = 'Your journey to Mars is on the horizon.';
  }
  // Only change live-region text when necessary to avoid repeated announcements.
  if (messageElement.textContent !== message) messageElement.textContent = message;
}

// Show the countdown immediately, then refresh it once per minute.
updateCountdown();
setInterval(updateCountdown, 60000);
