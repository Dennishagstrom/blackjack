function playBlackJack() {
    let playerCards = [];
    let playerScore = 0;
    let playerHasAce = false;
    let computerCards = [];
    let computerScore = 0;
    let computerHasAce = false;

    playerCards.push(hitOrStay());
    playerCards.push(hitOrStay());

    if (playerCards[0] === "Ace of Clubs") {
        playerHasAce = true;
    } else if (playerCards[1] === "Ace of Clubs") {
        playerHasAce = true;
    }

    computerCards.push(hitOrStay());
    computerCards.push(hitOrStay());

    if (computerCards[0] === "Ace of Clubs") {
        computerHasAce = true;
    } else if (computerCards[1] === "Ace of Clubs") {
        computerHasAce = true;
    }

    while (playerScore < 21) {
        if (playerCards[playerCards.length - 1] !== "stay") {
            playerCards.push(hitOrStay());
        } else {
            break;
        }
    }

    if (!playerHasAce) {
        for (let i = 0; i < playerCards.length; i++) {
            if (player



    }

}

playBlackJack();