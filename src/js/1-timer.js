import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
let timerId = null;

const startBtn = document.querySelector('[data-start]');
const calendar = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;
startBtn.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    let differenceTime = userSelectedDate - Date.now();

    if (differenceTime > 0) {
      startBtn.disabled = false;
    } else {
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    }
  },
};

flatpickr('#datetime-picker', options);

function startTimer() {
  startBtn.disabled = true;
  calendar.disabled = true;
  timerId = setInterval(() => {
    const curentTime = Date.now();
    const deltaTime = userSelectedDate - curentTime;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      calendar.disabled = false;
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const time = convertMs(deltaTime);
    updateTimer(time);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.innerHTML = addLeadingZero(`${days}`);
  hoursEl.innerHTML = addLeadingZero(`${hours}`);
  minutesEl.innerHTML = addLeadingZero(`${minutes}`);
  secondsEl.innerHTML = addLeadingZero(`${seconds}`);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
