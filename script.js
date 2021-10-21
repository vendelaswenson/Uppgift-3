'use strict';

const questions = [
  {
    question: 'Hur tar man sig enklast över till fårö?',
    options: {
      a: 'Via bron över vattnet',
      b: 'Med egen roddbåt',
      c: 'Med bilfärjan',
    },
    correctAnswer: 'c',
  },
  {
    question: 'Hur lång är ön?',
    options: {
      a: '170 km lång',
      b: '210 km lång',
      c: '175 km lång',
    },
    correctAnswer: 'a',
  },
  {
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
    question: 'Hur många kyrkoruiner finns i Visby?',
    options: {
      a: 13,
      b: 15,
      c: 7,
    },
    correctAnswer: 'b',
  },
  {
    question: 'Hur lång är Visby ringmur?',
    options: {
      a: '2,9 km lång',
      b: '3,6 km lång',
      c: '3,4 km lång',
    },
    correctAnswer: 'c',
  },
  {
    question: 'Vad kallar en gotlänning sin son för?',
    options: {
      a: 'Grabben',
      b: 'Tjomen',
      c: 'Sorken',
    },
    correctAnswer: 'c',
  },
  {
    question: 'Hur många personer bor på Gotland?',
    options: {
      a: 58000,
      b: 20000,
      c: 76000,
    },
    correctAnswer: 'a',
  },
  {
    question: 'När började Ringmuren byggas?',
    options: {
      a: 'På 1500-talet',
      b: 'På 1250-talet',
      c: 'I slutet på 1100-talet',
    },
    correctAnswer: 'b',
  },
  {
    question: 'På vilka sätt kan man ta sig till Gotland från fastlandet?',
    options: {
      a: 'Via bron över vattnet',
      b: 'Med flyg',
      c: 'Med färja',
    },
    correctAnswer: ['b', 'c'],
  },
  {
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

let numOfCorrAnswers = 0;
let highscore = 0;

const displayQuiz = () => {
  const displayQuestions = () => {
    let output = [];

    for (let i = 0; i < questions.length; i++) {
      let options = [];

      for (let option in questions[i].options) {
        options.push(
          '<label>' +
            '<input type="radio" name="question' +
            i +
            '" value="' +
            option +
            '">' +
            option +
            ': ' +
            questions[i].options[option] +
            '</label>'
        );
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
  for (let i = 0; i < questions.length; i++) {
    let userAnswer = (
      containerOfAnswers[i].querySelector(
        'input[name=question' + i + ']:checked'
      ) || {}
    ).value;

    if (userAnswer === questions[i].correctAnswer) {
      numOfCorrAnswers++;
      containerOfAnswers[i].style.color = 'lightgreen';
    } else {
      containerOfAnswers[i].style.color = 'red';
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
    document.querySelector('.highscore').textContent = highscore + '/ 10';
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
