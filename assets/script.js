// Definisco le variabili
const numbers = [];

// Raccolgo gli elementi in un oggetto
const elements = {
  // ELEMENTI AZIONE
  playButton: document.getElementById('playButton'),
  countdownElement: document.getElementById('countdown'),
  numbersElement: document.getElementById('showNumbers'),
  gameElement: document.getElementById('gameElement'),
  resultsElement: document.getElementById('resultsElement'),

  // BOTTONE SUBMIT
  submitButton: document.getElementById('submitButton'),

  loader: document.getElementById('loader-wrapper'),
}

// Aggiungo la funzionalità al tasto che avvia il gioco
elements.playButton.addEventListener("click", () => {
  elements.playButton.classList.add("d-none");
  startCountdown();
})

elements.submitButton.addEventListener("click", () => {
  const numberComparison = [];
  const inputs = {
    // NUMERI INPUT
    inputNumber1: document.querySelector('#gameElement input:nth-child(1)'),
    inputNumber2: document.querySelector('#gameElement input:nth-child(2)'),
    inputNumber3: document.querySelector('#gameElement input:nth-child(3)'),
    inputNumber4: document.querySelector('#gameElement input:nth-child(4)'),
    inputNumber5: document.querySelector('#gameElement input:nth-child(5)'),
  }

  for (const i in inputs) {
    if (inputs[i].value !== '') {
      numberComparison.push(parseInt(inputs[i].value));
    }
  }

  if (numberComparison.length == 5) {
    const correctNumbers = getCommonElements(numberComparison, numbers);
    elements.gameElement.classList.add("d-none")
    simulateLoading();
    showResults(correctNumbers)
  } else {
    alert("Devi inserire cinque numeri per continuare!");
    numberComparison.splice(0, arr.length);
  }
})


// Creo una funzione che avvii il countdown per poi avviare il gioco
function startCountdown() {
  let countdownNumber = 4;
  elements.countdownElement.classList.remove("d-none")
  const countdownInterval = setInterval(() => {
    elements.countdownElement.innerText = countdownNumber;
    if (countdownNumber > 0) {
      countdownNumber--;
    } else {
      clearInterval(countdownInterval);
      elements.countdownElement.innerText = "Via!";
      elements.countdownElement.style.color = "#c7ff82";
      setTimeout(() => {
        elements.countdownElement.classList.add("d-none");
        startGame()
      }, 1000)
    }
  }, 1000);
}

// Avvio il gioco
function startGame() {
  const windowElements = {
    // CONTATORE 10 SECONDI
    timeLeft: document.querySelector('#showNumbers .timeLeft'),

    // NUMERI VISUALIZZATI
    number1: document.querySelector('#showNumbers .number:nth-child(1)'),
    number2: document.querySelector('#showNumbers .number:nth-child(2)'),
    number3: document.querySelector('#showNumbers .number:nth-child(3)'),
    number4: document.querySelector('#showNumbers .number:nth-child(4)'),
    number5: document.querySelector('#showNumbers .number:nth-child(5)'),
  }

  // Estraggo 5 numeri random da 1 a 50 univoci
  while (numbers.length < 5) {
    const randomNumber = randomizeNumber(1, 50);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  // Assegno i numeri estratti agli elementi
  windowElements.number1.innerText = numbers[0];
  windowElements.number2.innerText = numbers[1];
  windowElements.number3.innerText = numbers[2];
  windowElements.number4.innerText = numbers[3];
  windowElements.number5.innerText = numbers[4];

  // Mostro la finestra e faccio memorizzare i numeri all'utente
  elements.numbersElement.classList.remove("d-none")
  let timeLeftNumber = 9;
  const timeLeftInterval = setInterval(() => {
    windowElements.timeLeft.innerText = timeLeftNumber;
    if (timeLeftNumber > 0) {
      timeLeftNumber--;
    } else {
      clearInterval(timeLeftInterval);
      elements.numbersElement.classList.add("d-none")
      elements.gameElement.classList.remove("d-none")

      // Resetto i numeri per non renderli visibili dall'inspector
      windowElements.number1.innerText = "";
      windowElements.number2.innerText = "";
      windowElements.number3.innerText = "";
      windowElements.number4.innerText = "";
      windowElements.number5.innerText = "";
    }
  }, 1000)
}

function randomizeNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function validateNumberInput(input) {
  const value = parseInt(input.value);
  if (value > 50) {
    input.value = 50;
  } else if (value < 0) {
    input.value = 0;
  }
};

function getCommonElements(arr1, arr2) {
  const commonNumbers = arr1.filter(number => arr2.includes(number));
  return commonNumbers
}

function showResults(correctArray) {
  console.log(correctArray)
  const howMany = correctArray.length
  const resultText = document.querySelector('#resultsElement > h1')

  // Controllo quanti numeri sono stati indovinati
  if (howMany > 0) {
    resultText.style.color = '#c7ff82';
    resultText.innerText = `Hai indovinato ${howMany} numeri!`;

    // Visualizzo i numeri indovinati creando un elemento div per ognuno
    const resultContainer = document.getElementById('resultContainer');
    for (let i = 0; i < howMany; i++) {
      const numberBox = document.createElement('div');
      numberBox.classList.add('numberBox');
      numberBox.innerText = correctArray[i];
      resultContainer.appendChild(numberBox);
    }

  } else {
    resultText.style.color = '#ff7381';
    resultText.innerText = `Non hai indovinato nessun numero!`;
  }
}

function simulateLoading() {
  toggleLoaderVisibility(true); setTimeout(() => toggleLoaderVisibility(false), 2000);
}

function toggleLoaderVisibility(isLoading) {
  elements.loader.classList.toggle('d-none', !isLoading);
  elements.resultsElement.classList.toggle('d-none', isLoading);
}
