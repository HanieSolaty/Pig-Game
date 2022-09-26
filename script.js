'use strict';

let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');
let dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let currentScore0 = document.querySelector('#current--0');
let currentScore1 = document.querySelector('#current--1');
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
let activePlayer;
let endGame;
let totalScore;

const initFunc = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add('hidden');
  activePlayer = currentScore0;
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
  endGame = 0;
  totalScore = score0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

const switchPlayer = function () {
  activePlayer.textContent = '0';
  if (activePlayer === currentScore0) {
    activePlayer = currentScore1;
    totalScore = score1;
  } else {
    activePlayer = currentScore0;
    totalScore = score0;
  }
  player1.classList.toggle('player--active');
  player0.classList.toggle('player--active');
};

const checkWinner = function () {
  let current =
    Number(activePlayer.textContent) + Number(totalScore.textContent);
  if (current >= 100) {
    dice.classList.add('hidden');
    endGame = 1;
    totalScore.textContent = current;
    activePlayer.textContent = '0';
    let winner = activePlayer === currentScore0 ? 0 : 1;
    console.log(winner);
    document
      .querySelector(`.player--${winner}`)
      .classList.add('player--winner');
  }
};

const rolling = function () {
  if (!endGame) {
    let num = Math.floor(Math.random() * 6) + 1;
    dice.src = `dice-${num}.png`;
    dice.classList.remove('hidden');
    if (num !== 1) {
      activePlayer.textContent = String(Number(activePlayer.textContent) + num);
      checkWinner();
    } else switchPlayer();
  }
};

const holding = function () {
  if (!endGame) {
    checkWinner();
    totalScore.textContent =
      Number(activePlayer.textContent) + Number(totalScore.textContent);
    if (!endGame) switchPlayer();
  }
};

initFunc();

btnNew.addEventListener('click', initFunc);
btnRoll.addEventListener('click', rolling);
btnHold.addEventListener('click', holding);
