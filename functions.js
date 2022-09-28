class Player {
    constructor(name, money = 100, hand = [], bet = 0, totalValue = 0, busted = false, blackjack = false) {
        this.name = name;
        this.money = money;
        this.hand = hand;
        this.bet = bet;
        this.totalValue = totalValue;
        this.busted = busted;
        this.blackjack = blackjack;
    }
    getHand() {
        return this.hand;
    }
    getBet() {
        return this.bet;
    }
    getMoney() {
        return this.money;
    }

    drawCard() {
        let card1 = randomCard();
        let card2 = randomCard();
        this.totalValue = card1[2] + card2[2];
        if(this.totalValue === 21) {
            this.blackjack = true;
        }
        this.hand.push(card1, card2);
    }

    hit() {
        let card = randomCard();
        this.hand.push(card);
        let newTotal = this.totalValue += card[2];
        if (newTotal > 21) {
            this.busted = true;
            return "BUST";
        } else {
        this.totalValue = newTotal;
        }
    }
}

const player1 = new Player("Dennis");

let dealer = {
    hand: [],
    totalValue: 0,
    busted: false,
    drawCard() {
        let card1 = randomCard();
        let card2 = randomCard();
        this.hand.push(card1, card2);
        this.totalValue = card1[2] + card2[2];
    },
    hit() {
        let card = randomCard();
        this.hand.push(card);
        let newTotal = this.totalValue += card[2];
        if (newTotal > 21) {
            this.busted = true;
            return "DEALER BUST";
        } else {
            this.totalValue = newTotal;
        }
    }
}

// // TEST THE GAME
// player1.drawCard();
// console.log(player1.getHand());
// player1.hit();
// console.log(player1.getHand());
// player1.hit();
// console.log(player1.getHand());

console.log("HEI");

dealer.drawCard();
let dealerCards = dealer.hand;
let dealerCard1 = dealerCards[0];
let dealerCard2 = dealerCards[1];

player1.drawCard();
let playerCards = player1.getHand();
let playerCard1 = playerCards[0];
let playerCard2 = playerCards[1];

$(document).ready(function() {
    $("#draw").click(function() {

        $("p span#addDealerCard").text(dealerCard1[0] + " of " + dealerCard1[1] + "...?");

        $("p span#addPlayerCards").text(`${playerCard1[0]} of ${playerCard1[1]} and ${playerCard2[0]} of ${playerCard2[1]}`);
        $("p span#playerTotalValue").text(player1.totalValue);

        if(player1.blackjack === true) {
            $("#blackJack").text("BLACKJACK!").css("visibility", "visible");
            $("#hit").css("visibility", "hidden");
            $("#playAgain").css("visibility", "visible");
            $("#stand").css("visibility", "hidden");
            setTimeout(function() {
                alert("YOU GOT A BLACKJACK! CONGRATULATION!");
            }, 200);
        } else {
            $("#hit").css("visibility", "visible");
            $("#stand").css("visibility", "visible");
        }

        if(playerCard1[0] === "Ace" || playerCard2[0] === "Ace") {
            console.log("You got an ace");
        }

        $("#draw").css("visibility", "hidden");


    });
    $("#hit").click(function() {
        $("#stand").css("visibility", "visible");
        player1.hit();
        let newCard = player1.getHand();
        newCard = newCard[newCard.length - 1];
        $("p span#hitCard").text(`${newCard[0]} of ${newCard[1]}`);
        $("p span#playerTotalValue").text(player1.totalValue);
        if (player1.busted === true) {
            $("#stand").css("visibility", "hidden");
            $("p span#addPlayerCards").text("BUST");
            $("#hit").css("visibility", "hidden");
            $("#playAgain").css("visibility", "visible");
            $("p span#addDealerCard").html(dealerCard1[0] + " of " + dealerCard1[1] + " and " + dealerCard2[0] + " of " + dealerCard2[1]);
            $("p span#dealerTotalValue").text(dealer.totalValue);
            setTimeout(function() {
                alert("You busted!");
            }, 200);
        }
    });

    $("#stand").click(function() {
        $("p span#addDealerCard").html(dealerCard1[0] + " of " + dealerCard1[1] + " and " + dealerCard2[0] + " of " + dealerCard2[1]);
        $("#hit").css("visibility", "hidden");
        $("#stand").css("visibility", "hidden");
        $("#playAgain").css("visibility", "visible");
        while(dealer.totalValue < 17) {
            dealer.hit();
            let newCard = dealer.hand;
            newCard = newCard[newCard.length - 1];
            $("#dealerNewCard").css("visibility", "visible");
            $("p span#dealerHitCard").text(`${newCard[0]} of ${newCard[1]}`);
        }

        if(dealer.totalValue > 21) {
            dealer.busted = true;
        }
        $("p span#dealerTotalValue").text(dealer.totalValue);
        setTimeout(function() {
            let winner = whoWon();
            alert(winner);
            }, 200);

    });

    $("#playAgain").click(function() {
        location.reload();
    });
});

function whoWon () {
    if (player1.totalValue > dealer.totalValue && player1.busted === false || dealer.busted === true) {
        return "You win!";
    } else if (player1.totalValue < dealer.totalValue) {
        return "You lose!";
    } else {
        return "It's a tie!";
    }
}


// function dealCard() {
//     let card1 = 0;
//     let card2 = 0;
//     let totalValue = 0;
//
//     card1 = randomCard();
//     card2 = randomCard();
//
//     console.log(card1, card2);
//
//     totalValue = card1[2] + card2[2];

    // if(totalValue === 21) {
    //     console.log(`Blackjack! With a ${card1[0]} of ${card1[1]} and ${card2[0]} of ${card2[1]}`);
    // } else {
    //     console.log(`You have a ${card1[0]} of ${card1[1]} and ${card2[0]} of ${card2[1]} for a total of ${totalValue}`);
    // }
//
//     return totalValue;
// }



function randomCard() {

    let cardArr = [];

    let card = Math.floor(Math.random() * 52) + 1;
    let cardType = Math.floor(card / 13);
    if(cardType === 4) {
        cardType = 3;
    }
    let cardValue = card % 13;
    let cardName = "";
    let cardSuit = "";
    let cardTotalValue = 0;

    switch (cardType) {
        case 0:
            cardSuit = "Clubs";
            break;
        case 1:
            cardSuit = "Diamonds";
            break;
        case 2:
            cardSuit = "Hearts";
            break;
        case 3:
            cardSuit = "Spades";
            break;
        case 4:
            cardSuit = "Joker";
    }

    switch (cardValue) {
        case 1:
            cardName = "Ace";
            cardTotalValue += 11;

            break;
        case 11:
            cardName = "Jack";
            cardTotalValue += 10;
            break;
        case 12:
            cardName = "Queen";
            cardTotalValue += 10;
            break;
        case 0:
            cardName = "King";
            cardTotalValue += 10;
            break;
        default:
            cardName = cardValue;
            cardTotalValue = cardValue;
    }
    cardArr.push(cardName, cardSuit, cardTotalValue);
    return cardArr;
}


