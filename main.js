const targetDate = new Date('2025-12-31T23:59:59').getTime();

const circleCircumference = 2 * Math.PI * 54;

function setCircleProgress(circle, percent) {
  const offset = circleCircumference * (1 - percent);
  circle.style.strokeDashoffset = offset;
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    clearInterval(timerInterval);
    document.querySelectorAll('.value').forEach(el => el.textContent = '0');
    document.querySelectorAll('.circle-progress').forEach(circle => setCircleProgress(circle, 0));
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.querySelector('#days .value').textContent = days;
  document.querySelector('#hours .value').textContent = hours.toString().padStart(2, '0');
  document.querySelector('#minutes .value').textContent = minutes.toString().padStart(2, '0');
  document.querySelector('#seconds .value').textContent = seconds.toString().padStart(2, '0');

  setCircleProgress(document.querySelector('#days .circle-progress'), days / 365);
  setCircleProgress(document.querySelector('#hours .circle-progress'), hours / 24);
  setCircleProgress(document.querySelector('#minutes .circle-progress'), minutes / 60);
  setCircleProgress(document.querySelector('#seconds .circle-progress'), seconds / 60);
}

document.querySelectorAll('.circle-progress').forEach(circle => {
  circle.style.strokeDasharray = circleCircumference;
  circle.style.strokeDashoffset = circleCircumference;
});

updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);
