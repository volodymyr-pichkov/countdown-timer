const targetDate = new Date("2025-12-31T23:59:59").getTime();
const circleRadius = 54;
const circleCircumference = 2 * Math.PI * circleRadius;

const units = [
  { key: "days", max: 365 },
  { key: "hours", max: 24 },
  { key: "minutes", max: 60 },
  { key: "seconds", max: 60 },
];

function setCircleProgress(element, percent) {
  const offset = circleCircumference * (1 - Math.min(Math.max(percent, 0), 1));
  element.style.strokeDashoffset = offset;
}

function updateCountdown() {
  const now = Date.now();
  const distance = targetDate - now;

  if (distance <= 0) {
    clearInterval(timerInterval);
    units.forEach(({ key }) => {
      elements[key].value.textContent = "0";
      setCircleProgress(elements[key].circle, 0);
    });
    return;
  }

  const time = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };

  units.forEach(({ key, max }) => {
    const val = time[key];
    elements[key].value.textContent =
      key === "days" ? val : val.toString().padStart(2, "0");
    setCircleProgress(elements[key].circle, val / max);
  });
}

function initCircles() {
  units.forEach(({ key }) => {
    const el = document.querySelector(`.countdown__item--${key}`);
    if (!el) return;

    const circle = el.querySelector(".countdown__circle-progress");
    circle.style.strokeDasharray = circleCircumference;
    circle.style.strokeDashoffset = circleCircumference;

    elements[key] = {
      value: el.querySelector(".countdown__value"),
      circle: circle,
    };
  });
}

const elements = {};
initCircles();
updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);
