(function() {
const tempAnswers = [
  'random',
  'words',
  'here',
];

const GUESS_BUTTON_CLASS_NAME = 'guess-button';
const MAX_STRIKES = 6;
const LETTER_SPOTS = [];
const strikeBox = document.getElementById('strike-box');
const guessContainer = document.getElementById('answer-input-container');
const ANSWER_WORD = setAnswer();

let correctGuesses = 0;
let totalStrikes = 0;

function setAnswer() {
  const randomWord = tempAnswers[Math.floor(Math.random() * tempAnswers.length)];
  return randomWord.split('');
}

function initializeGame() {
  const container = document.getElementById('answer-letters');

  ANSWER_WORD.forEach(() => {
    const newSpan = document.createElement('span');
    newSpan.className = 'answer-letter-spot';
    newSpan.innerHTML = '_';
    LETTER_SPOTS.push(newSpan);
    container.appendChild(newSpan);
  });

  initializeClickableGuesses();
}

function initializeClickableGuesses() {
  const possibleGuesses = [];
  let startCode = 'A'.charCodeAt(0);
  let endCode = 'Z'.charCodeAt(0);

  for (let i = startCode; i <= endCode; i++) {
    possibleGuesses.push(String.fromCharCode(i));
  }  

  possibleGuesses.forEach(possibleGuess => {
    let guessButton = document.createElement('button');
    guessButton.innerHTML = possibleGuess;
    guessButton.className = GUESS_BUTTON_CLASS_NAME;
    guessButton.ariaLabel = `submit ${possibleGuess} as guess`;
    guessContainer.appendChild(guessButton);
  });

  guessContainer.addEventListener('click', guessClickEvent);
}

function guessClickEvent(event) {
  if (event.target.className === GUESS_BUTTON_CLASS_NAME) {
    event.target.disabled = true;
    submitGuessClick(event.target.innerHTML.toLocaleLowerCase());
  }
}

function checkAnswer(guess) {
  let correctGuess = false;

  ANSWER_WORD.forEach((letter, idx) => { 
    if (letter.toLocaleLowerCase() === guess) {
      correctGuess = true;
      LETTER_SPOTS[idx].innerHTML = guess;
      correctGuesses++;
    }
  });

  if (!correctGuess) {
    totalStrikes++;
    strikeBox.innerHTML = totalStrikes;
    if (totalStrikes >= MAX_STRIKES) {
      endGame('Game Over - Better Luck Next Time');
    }
  } else if(correctGuesses === ANSWER_WORD.length) {
    endGame('YOU WIN!');
  }
}

function setWarning(guess) {

}

function endGame(endGameMessage) {
  guessContainer.innerHTML = endGameMessage;
  guessContainer.removeEventListener('click', guessClickEvent);
}

function submitGuessClick(guess) {
  const isValidGuess = guess.match(/[a-z]/);
  if (isValidGuess) {
    checkAnswer(guess);
  } else {
    setWarning(guess);
  }
}

initializeGame(); 
})()