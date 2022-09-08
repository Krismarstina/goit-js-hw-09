import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

startButton.disabled = true;
let selectedTime = 0;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    if (selectedTime < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    }
    if (selectedTime > Date.now()) {
      startButton.disabled = false;
    }
  },
};

flatpickr(input, options);

startButton.addEventListener('click', onStartButtonClick);

function onStartButtonClick() {
  intervalId = setInterval(() => {
    if (selectedTime >= Date.now()) {
      const deltaTime = selectedTime - Date.now();
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      timerDays.textContent = days;
      timerHours.textContent = hours;
      timerMinutes.textContent = minutes;
      timerSeconds.textContent = seconds;
    } else {
      clearInterval(intervalId);
      Notiflix.Notify.failure('time is over');
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
