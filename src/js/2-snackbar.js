import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const delayInput = document.querySelector('input[name="delay"]');

form.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();

  const selectedRadio = document.querySelector('input[name="state"]:checked');
  const delay = Number(delayInput.value);

  const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedRadio.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  prom
    .then(delay => {
      iziToast.success({
        title: '✅',
        position: 'topRight',
        icon: false,
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌',
        position: 'topRight',
        icon: false,
        message: `Rejected promise in ${delay}ms`,
      });
    });

  form.reset();
}
