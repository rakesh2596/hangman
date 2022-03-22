const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part'); // head,arm,legs

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)]; // random word
// console.log(selectedWord); //  shows random words from words

const correctLetters = [];  //store correct letters
const wrongLetters = [];  // store wrong letters  

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord.split('').map( letter => `<span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')} 
  `;

  // console.log(wordEl.innerText); above adds on letters by splitting it and mapping it and last joining back to strings using join method
  const innerWord = wordEl.innerText.replace(/\n/g, ''); // when outputs in console, letter display vertically with newline or space, hence to remove the newline and vertical display glabally

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Great You won!😃';
    popup.style.display = 'flex';
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''} 
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display body parts when ever enetered incorrect letters
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Checking if out of the game with incorrect letters
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕';
    popup.style.display = 'flex';
  }
}

// Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
  // console.log(e.keyCode); // every key has an keycode as  ascii
  if (e.keyCode >= 65 && e.keyCode <= 90) {  // should include only letters
    const letter = e.key;

    if (selectedWord.includes(letter)) {   // checking if key is entererd twice or not as we only have correct letter in array
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();   //updates the new letter if not entered into an array
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();  // updating wrong letters into array and showcasing it
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  //  Emptying both the  arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];  // creates new word


  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';  // and hide the popup
});

displayWord();
