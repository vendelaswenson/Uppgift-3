'use strict';

const questions = [
  {
    type: 'radio',
    question: 'Hur tar man sig enklast över till fårö?',
    options: {
      a: 'Via bron över vattnet',
      b: 'Med egen roddbåt',
      c: 'Med bilfärjan',
    },
    correctAnswer: 'c',
  },
  {
    type: 'radio',
    question: 'Hur lång är ön?',
    options: {
      a: '170 km lång',
      b: '210 km lång',
      c: '175 km lång',
    },
    correctAnswer: 'a',
  },
  {
    type: 'radio',
    question:
      'Vad kallas kalkstenar som blivit formade av vind och vatten och som är vanligt på Gotland?',
    options: {
      a: 'Runor',
      b: 'Bunkar',
      c: 'Raukar',
    },

    correctAnswer: 'c',
  },
  {
    type: 'radio',
    question: 'Hur många kyrkoruiner finns i Visby?',
    options: {
      a: 13,
      b: 15,
      c: 7,
    },
    correctAnswer: 'b',
  },
  {
    type: 'radio',
    question: 'Hur lång är Visby ringmur?',
    options: {
      a: '2,9 km lång',
      b: '3,6 km lång',
      c: '3,4 km lång',
    },
    correctAnswer: 'c',
  },
  {
    type: 'radio',
    question: 'Vad kallar en gotlänning sin son för?',
    options: {
      a: 'Grabben',
      b: 'Tjomen',
      c: 'Sorken',
    },
    correctAnswer: 'c',
  },
  {
    type: 'radio',
    question: 'Hur många personer bor på Gotland?',
    options: {
      a: 58000,
      b: 20000,
      c: 76000,
    },
    correctAnswer: 'a',
  },
  {
    type: 'radio',
    question: 'När började Ringmuren byggas?',
    options: {
      a: 'På 1500-talet',
      b: 'På 1250-talet',
      c: 'I slutet på 1100-talet',
    },
    correctAnswer: 'b',
  },
  {
    type: 'checkbox',
    question: 'På vilka sätt kan man ta sig till Gotland från fastlandet?',
    options: {
      a: 'Via bron över vattnet',
      b: 'Med flyg',
      c: 'Med färja',
    },
    correctAnswer: ['b', 'c'],
  },
  {
    type: 'radio',
    question: 'Hur brett är Gotland?',
    options: {
      a: '55 km brett',
      b: '27 km brett',
      c: '62 km brett',
    },
    correctAnswer: 'a',
  },
];

const startOverBtn = document.querySelector('.again');
const startBtn = document.querySelector('.start');
const checkBtn = document.querySelector('.check');
let container = document.querySelector('#quiz');
let containerOfResults = document.querySelector('#results');
const nextBtn = document.createElement('button');
const darkBtn = document.querySelector('.dark');
const lightBtn = document.querySelector('.light');
const buttons = document.querySelectorAll('.btn');
const info = document.querySelector('.info');
const highscoreInfo = document.querySelector('.highscore');
const header = document.querySelector('h1');

let numOfCorrAnswers = 0;
let highscore = 0;

const displayQuiz = () => {
  const displayQuestions = () => {
    let output = [];

    for (let i = 0; i < questions.length; i++) {
      let options = [];
      if (questions[i].type === 'radio') {
        for (let option in questions[i].options) {
          options.push(
            '<input type="radio" name="question' +
              i +
              '" value="' +
              option +
              '">' +
              option +
              ': ' +
              questions[i].options[option]
          );
        }
      } else {
        for (let option in questions[i].options) {
          options.push(
            '<input type="checkbox" name="question' +
              i +
              '" value="' +
              option +
              '">' +
              option +
              ': ' +
              questions[i].options[option]
          );
        }
      }

      output.push(
        '<div class="question">' +
          questions[i].question +
          '</div>' +
          '<div class="answer">' +
          options.join('') +
          '</div>'
      );
    }
    container.innerHTML = output.join('');
  };
  displayQuestions(questions, container);
};

const displayResults = () => {
  let containerOfAnswers = container.querySelectorAll('.answer');
  let userAnswersRadio = [];
  let userAnswersCheckbox = [];
  for (let i = 0; i < questions.length; i++) {
    userAnswersRadio =
      containerOfAnswers[i].querySelector("input[type='radio']:checked") || {};

    userAnswersCheckbox =
      containerOfAnswers[i].querySelectorAll(
        "input[type='checkbox']:checked"
      ) || {};

    if (userAnswersRadio.value === questions[i].correctAnswer) {
      numOfCorrAnswers++;
      containerOfAnswers[i].style.color = 'lightgreen';
    } else {
      containerOfAnswers[i].style.color = 'red';
    }

    for (let j = 0; j < userAnswersCheckbox.length; j++) {
      if (userAnswersCheckbox[j].value === questions[i].correctAnswer[j]) {
        numOfCorrAnswers = numOfCorrAnswers + 0.5;
        console.log(numOfCorrAnswers);
        containerOfAnswers[i].style.color = 'lightgreen';
      } else {
        containerOfAnswers[i].style.color = 'red';
      }
    }
  }

  containerOfResults.innerHTML =
    'You got ' + numOfCorrAnswers + ' out of ' + questions.length;

  containerOfResults.style.color =
    numOfCorrAnswers > questions.length * 0.75
      ? 'green'
      : numOfCorrAnswers > questions.length * 0.5
      ? 'orange'
      : 'black';
};

checkBtn.addEventListener('click', e => {
  e.preventDefault();
  displayResults(questions, container, containerOfResults);

  if (numOfCorrAnswers > highscore) {
    highscore = numOfCorrAnswers;
    highscoreInfo.textContent = highscore + '/ 10';
  }
});

startBtn.addEventListener('click', e => {
  e.preventDefault();
  startBtn.style.visibility = 'hidden';
  displayQuiz(questions, container, containerOfResults, checkBtn);
  nextBtn.innerHTML = 'Next';
  nextBtn.className = 'nextButton';
  document.body.appendChild(nextBtn);
});

startOverBtn.addEventListener('click', e => {
  e.preventDefault();
  startBtn.style.visibility = 'visible';
  nextBtn.style.visibility = 'hidden';
  numOfCorrAnswers = 0;
  container.innerHTML = '';
  containerOfResults.innerHTML = '';
});

darkBtn.addEventListener('click', () => {
  document.body.style.backgroundImage =
    "url('https://3.bp.blogspot.com/-BGNCai6-WVk/V8B6GEfwA5I/AAAAAAAAkFo/R5f8K5d2Yhs5jI1Q7zfze7zsxXTUsyoigCLcB/s1600/925.JPG')";
  checkBtn.style.backgroundColor = 'white';
  checkBtn.style.color = 'black';
  startBtn.style.backgroundColor = 'white';
  startBtn.style.color = 'black';
  darkBtn.style.backgroundColor = 'white';
  darkBtn.style.color = 'black';
  lightBtn.style.backgroundColor = 'white';
  lightBtn.style.color = 'black';
  startOverBtn.style.backgroundColor = 'white';
  startOverBtn.style.color = 'black';
  info.style.color = 'white';
  highscoreInfo.style.color = 'white';
  header.style.color = 'white';
});

lightBtn.addEventListener('click', () => {
  document.body.style.backgroundImage =
    "url('http://www.stadtillstrand.se/wp-content/uploads/2021/05/visby-gotland-skymning.jpg')";
  checkBtn.style.backgroundColor = 'rgb(59, 56, 56)';
  checkBtn.style.color = 'white';
  startBtn.style.backgroundColor = 'rgb(59, 56, 56)';
  startBtn.style.color = 'white';
  darkBtn.style.backgroundColor = 'rgb(59, 56, 56)';
  darkBtn.style.color = 'white';
  lightBtn.style.backgroundColor = 'rgb(59, 56, 56)';
  lightBtn.style.color = 'white';
  startOverBtn.style.backgroundColor = 'rgb(59, 56, 56)';
  startOverBtn.style.color = 'white';
  info.style.color = 'rgb(59, 56, 56)';
  highscoreInfo.style.color = 'rgb(59, 56, 56)';
  header.style.color = 'rgb(59, 56, 56)';
});
