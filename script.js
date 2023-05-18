const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const themeSelector = document.getElementById("theme");
const menuButton = document.getElementById("menu-button");
const menuContent = document.getElementById("menu-content");
let currentQuestion;
let score = 0;

// Charger les thèmes
loadThemes();

// Changer le thème
themeSelector.addEventListener("change", startGame);

function startGame() {
  // Récup catégorie et requêteAPI
  const selectedCategory = themeSelector.value;
  fetch(`https://opentdb.com/api.php?amount=1&category=${selectedCategory}&difficulty=easy&type=multiple`)
    .then((response) => response.json())
    .then((data) => {
      currentQuestion = data.results[0];
      resetState();
      displayQuestion(currentQuestion);
    });
}
menuButton.addEventListener("click", () => {
    menuContent.style.display = menuContent.style.display === "none" ? "flex" : "none";
  });
function resetState() {
  // Supprime boutons de réponses
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function displayQuestion(question) {
  questionElement.innerText = decodeHTMLEntities(question.question);
  const answers = [...question.incorrect_answers, question.correct_answer];
  // Mélange réponses
  answers.sort(() => Math.random() - 0.5);
  // Créer bouton et add listener
  answers.forEach((answer) => {
    const button = createAnswerButton(answer);
    handleAnswerButtonClick(button, answer, currentQuestion);
    answerButtonsElement.appendChild(button);
  });
}

function createAnswerButton(answer) {
  const button = document.createElement('button');
  button.innerText = decodeHTMLEntities(answer);
  button.classList.add('btn');
  return button;
}

function handleAnswerButtonClick(button, answer, question) {
//click -> verif rep
 button.addEventListener("click", () => {
    updateScore(answer, question);
    startGame();
  });
}

function decodeHTMLEntities(text) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

function updateScore(answer, question) {
  // Vérif rép et maj score
  if (answer === question.correct_answer) {
    score++;
    document.getElementById("score-counter").innerText = score;
    alert("Correct!");
  } else {
    alert("Incorrect!");
  }
}

function loadThemes() {
  // Charger thèmes apd JSON
  fetch("themes.json")
    .then((response) => response.json())
    .then((themes) => {
      // Créer option thème et add a themeSelector
      themes.forEach((theme) => {
        const option = document.createElement("option");
        option.value = theme.id;
        option.innerText = theme.name;
        themeSelector.appendChild(option);
      });
      applyTheme(themes[0].themeClass);
      startGame();
    });
}

function applyTheme(themeClass) {
    const body = document.body;
    body.classList.add(themeClass);
  
    const menuContent = document.getElementById("menu-content");
    if (themeClass === "theme-light") {
      menuContent.classList.remove("theme-dark");
      menuContent.classList.add("theme-light");
    } else {
      menuContent.classList.remove("theme-light");
      menuContent.classList.add("theme-dark");
    }
  }
  

const themeSwitch = document.getElementById("checkbox");

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("theme-dark");

});