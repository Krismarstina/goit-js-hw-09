const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);
let intervalId = null;

function onStartButtonClick() {
  intervalId = setInterval(changeBackgroundColor, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
}

function onStopButtonClick() {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBackgroundColor() {
  body.style.backgroundColor = getRandomHexColor();
}
