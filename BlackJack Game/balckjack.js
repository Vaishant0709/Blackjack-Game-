//GAME LOGIC
let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0;

let hidden;
let deck;

let playGame = true; //can play only when this is true (21 se kam hai player ka)

window.onload = () => {
  buildDeck();
  shuffleDeck();
  startGame();
};

function buildDeck() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];
  deck = [];
  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]); //create an array of all cards that matches our img names so that we can draw and display cards
    }
  }
  console.log(deck);
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length); //random number bw 0-51
    //swap places till all cards are shuffled
    temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}
function startGame() {
  const openModalButton = document.querySelector("#modal-open-button");
  const closeModalButton = document.querySelector("#modal-close-button");
  const overlay = document.getElementById("overlay");
  console.log(overlay);
  console.log(closeModalButton);

  openModalButton.addEventListener("click", (e) => {
    console.log(e.target);
    openModal(modal);
  });
  closeModalButton.addEventListener("click", (e) => {
    console.log(e.target);
    closeModal(modal);
  });

  function openModal(modal) {
    if (modal === null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
  }
  function closeModal(modal) {
    if (modal === null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }

  //////
  console.log(document.getElementById("hit"));
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount = checkAce(hidden);

  // console.log(hidden);
  // console.log(dealerSum);
  // console.log(dealerAceCount);

  while (dealerSum < 17) {
    //gicing dealer cards untill sum exceed 17
    let cardImg = document.createElement("img");
    cardImg.setAttribute("class", "dealer-img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount = checkAce(card);
    document.getElementById("dealer-card").append(cardImg);
  }
  console.log(dealerSum);
  for (let i = 0; i < 2; i++) {
    //giving user 2 card
    let cardImg = document.createElement("img");
    cardImg.setAttribute("class", "your-img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount = checkAce(card);
    document.getElementById("your-card").append(cardImg);
  }
  console.log(yourSum);
  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
  document.getElementById("reset").addEventListener("click", () => {
    location.reload();
  });
}
function stay() {
  dealerSum = reduceAce(dealerSum, dealerAceCount); //find min dealer sum
  yourSum = reduceAce(yourSum, yourAceCount); //find min your sum
  playGame = false; //so user cant play again ,ie,hit again
  document.getElementById("hidden").src = "./cards/" + hidden + ".png"; //reveals the card of dealer
  document.getElementById("hidden").setAttribute("class", "dealer-img");

  let message = "";
  if (yourSum > 21) {
    message = "You Lose";
  } else if (dealerSum > 21) {
    message = "You Win";
  } else if (yourSum === dealerSum) {
    message = "tie";
  } else if (yourSum > dealerSum) {
    message = "You Win";
  } else if (yourSum < dealerSum) {
    message = "You Lose";
  }

  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  document.getElementById("results").innerHTML = `<h2>${message}</h2>`;
}

function hit() {
  if (!playGame) {
    return; //if playGame is false , user cant press hit
  }
  //giving user another card
  let cardImg = document.createElement("img");
  cardImg.setAttribute("class", "your-img");
  let card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";
  yourSum += getValue(card);
  yourAceCount = checkAce(card);
  document.getElementById("your-card").append(cardImg);

  if (reduceAce(yourSum, yourAceCount) > 21) {
    playGame = false;
  }
}
function reduceAce(playerSum, playerAceCount) {
  console.log(playerSum);
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}

function getValue(card) {
  let data = card.split("-"); //splitting value into 2 parts
  let value = data[0];

  if (isNaN(value)) {
    //A,J,Q,K
    if (value === "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] === "A") {
    return 1;
  }
  return 0;
}
