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
  // LOADER
  loader: document.getElementById('loader-wrapper'),
  // GIOCA DI NUOVO
  playAgain: document.querySelector('#resultsElement > button')
}

// Aggiungo la funzionalità al tasto che avvia il gioco
elements.playButton.addEventListener("click", () => {
  elements.playButton.classList.add("d-none");
  startCountdown();
})

// Effettuo la validazione dei campi inseriti, confrontandoli a quelli estratti randomicamente
elements.submitButton.addEventListener("click", () => {
  const numberComparison = [];
  let inputs = document.querySelectorAll('#gameElement input')

  for (const i in inputs) {
    const value = parseInt(inputs[i].value)
    if (!isNaN(value) && !numberComparison.includes(value)) {
      numberComparison.push(value);
    }
  }

  if (numberComparison.length == 5) {
    let correctNumbers = getCommonElements(numberComparison, numbers);
    elements.gameElement.classList.add("d-none")
    simulateLoading();
    showResults(correctNumbers)
    for (const i in inputs) { inputs[i].value = ''; }
  } else {
    alert("Devi inserire cinque numeri diversi per continuare!");
    numberComparison.splice(0, numberComparison.length);
  }
})

// Aggiungo la funzionalità di continuare il gioco attraverso il bottone
elements.playAgain.addEventListener("click", () => {
  elements.resultsElement.classList.add('d-none');
  elements.playButton.classList.remove('d-none');
  numbers.splice(0, numbers.length);
  removeNumberBoxes()
})