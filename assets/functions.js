//Funzione che avvia il countdown per poi avviare il gioco
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
        elements.countdownElement.innerText = 5;
        elements.countdownElement.style.color = "white";
      }, 1000)
    }
  }, 1000);
}

// Funzione che avvia il gioco
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
      windowElements.timeLeft.innerText = 10;
    }
  }, 1000)
}

// Funzione generica per randomizzare un numero da min a max
function randomizeNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Funzione che valida i numeri in input che non superino il max di 50
function validateNumberInput(input) {
  const value = parseInt(input.value);
  if (value > 50) {
    input.value = 50;
  } else if (value < 0) {
    input.value = 0;
  }
};

// Funzione di confronto dei due array, restituisce un array con i numeri in comune
function getCommonElements(arr1, arr2) {
  return arr1.filter(number => arr2.includes(number));
}

// Funzione per mostrare i risultati in pagina
function showResults(correctArray) {
  console.log(correctArray)
  const howMany = correctArray.length
  const resultText = document.querySelector('#resultsElement > h1')

  // Controllo quanti numeri sono stati indovinati
  if (howMany > 0) {
    resultText.style.color = '#c7ff82';
    resultText.innerText = `Hai indovinato ${howMany} numeri!`;
    if (howMany == 1) {
      resultText.innerText = `Hai indovinato ${howMany} numero!`;
    } else if (howMany == 5) {
      setTimeout(starEffect, 2000)
    } else {
      setTimeout(confettiEffect, 2000)
    }
    // Visualizzo i numeri indovinati creando un elemento div per ognuno
    const resultContainer = document.getElementById('resultContainer');
    for (let i = 0; i < howMany; i++) {
      const numberBox = document.createElement('div');
      numberBox.classList.add('numberBox');
      numberBox.innerText = correctArray[i];
      resultContainer.appendChild(numberBox);
    }
    // Mostro un messaggio che mi dice di non aver indovinato nessun numero
  } else {
    resultText.style.color = '#ff7381';
    resultText.innerText = `Non hai indovinato nessun numero!`;
  }
}

function removeNumberBoxes() {
  const resultContainer = document.getElementById('resultContainer');
  while (resultContainer.firstChild) {
    resultContainer.removeChild(resultContainer.firstChild);
  }
}

function simulateLoading() {
  toggleLoaderVisibility(true); setTimeout(() => toggleLoaderVisibility(false), 2000);
}

function toggleLoaderVisibility(isLoading) {
  elements.loader.classList.toggle('d-none', !isLoading);
  elements.resultsElement.classList.toggle('d-none', isLoading);
}

function starEffect() {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star']
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle']
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

function confettiEffect() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}