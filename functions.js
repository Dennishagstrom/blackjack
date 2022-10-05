class Player {
    constructor(name, money = 100, hand = [], bet = 0, totalValue = 0, busted = false, blackjack = false, realHand = []) {
        this.name = name;
        this.money = money;
        this.hand = hand;
        this.bet = bet;
        this.totalValue = totalValue;
        this.busted = busted;
        this.blackjack = blackjack;
        this.realHand = realHand;
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

    getRealHand() {
        return this.realHand;
    }

    drawCard() {
        let card1 = randomCard();
        let card2 = randomCard();
        let realCard1 = cardToSymbols(card1);
        let realCard2 = cardToSymbols(card2);
        this.totalValue = card1[2] + card2[2];
        if(this.totalValue === 21) {
            this.blackjack = true;
        }
        this.hand.push(card1, card2);
        this.realHand.push(realCard1, realCard2);
    }

    hit() {
        let card = randomCard();
        let realCard = cardToSymbols(card);
        this.realHand.push(realCard);
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
const player2 = new Player("aawads")

player2.drawCard();
player2.hit();

let dealer = {
    hand: [],
    totalValue: 0,
    busted: false,
    realHand: [],
    drawCard() {
        let card1 = randomCard();
        let card2 = randomCard();
        let realCard1 = cardToSymbols(card1);
        let realCard2 = cardToSymbols(card2);
        this.hand.push(card1, card2);
        this.realHand.push(realCard1, realCard2);
        this.totalValue = card1[2] + card2[2];
    },
    hit() {
        let card = randomCard();
        let realCard = cardToSymbols(card);
        this.realHand.push(realCard);
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

function colorOfCard(nameOfId, card) {

    if (card === "Hearts" || card === "Diamonds") {
        $(nameOfId).addClass("cardRed");
    } else {
        $(nameOfId).addClass("cardBlack");
    }
}


// // TEST THE GAME
// player1.drawCard();
// console.log(player1.getHand());
// player1.hit();
// console.log(player1.getHand());
// player1.hit();
// console.log(player1.getHand());

dealer.drawCard();
let dealerCards = dealer.hand;
let dealerCard1 = dealerCards[0];
let dealerCard2 = dealerCards[1];
let dealerRealCards = dealer.realHand;
let dealerRealCard1 = dealer.realHand[0];
let dealerRealCard2 = dealer.realHand[1];
let dealerHiddenCard = "🂠";

player1.drawCard();
let playerCards = player1.getHand();
let playerCard1 = playerCards[0];
let playerCard2 = playerCards[1];
let playerRealCards = player1.realHand;
let playerRealCard1 = playerRealCards[0];
let playerRealCard2 = playerRealCards[1];
colorOfCard("#playerCard1", playerCard1[1]);
colorOfCard("#playerCard2", playerCard2[1]);
colorOfCard("#dealerCard1", dealerCard1[1]);
colorOfCard("#dealerCard2", dealerCard2[1]);


$(document).ready(function() {
    $("#draw").click(function() {
        $("#playerValue").css("visibility", "visible");

        $("p span#addDealerCard").text(dealerCard1[0] + " of " + dealerCard1[1] + "...?");

        $("p span#addPlayerCards").text(`${playerCard1[0]} of ${playerCard1[1]} and ${playerCard2[0]} of ${playerCard2[1]}`);
        $("#playerCard1").text(playerRealCard1);
        $("#playerCard2").text(playerRealCard2);
        $("#dealerCard1").text(dealerRealCard1);
        $("#dealerCard2").text(dealerHiddenCard);
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
        $("#newCard").css("visibility", "visible");
        player1.hit();

        let newCard = player1.getHand();
        let newRealCard = player1.getRealHand();

        newRealCard = newRealCard[newRealCard.length - 1];
        newCard = newCard[newCard.length - 1];


        $("p span#hitCard").text(`${newCard[0]} of ${newCard[1]}`);
        $("p span#playerTotalValue").text(player1.totalValue);
        if(newCard[1] === "Hearts" || newCard[1] === "Diamonds") {
            $("#playerRealCards").append($('<p class="card cardRed">' + newRealCard + '</p>'));
        } else {
            $("#playerRealCards").append($('<p class="card cardBlack">' + newRealCard + '</p>'));
        }
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

    $("#stand").click(async function() {
        const timeout = Math.floor(Math.random() * 2500) + 750;
        $("#dealerValue").css("visibility", "visible");
        $("#dealerCard2").text(dealerRealCard2);
        console.log("Dealer is hitting...");


        setTimeout( function() {
            $("p span#addDealerCard").html(dealerCard1[0] + " of " + dealerCard1[1] + " and " + dealerCard2[0] + " of " + dealerCard2[1]);
            $("#hit").css("visibility", "hidden");
            $("#stand").css("visibility", "hidden");
            $("#playAgain").css("visibility", "visible");

                while (dealer.totalValue < 17) {
                    dealer.hit();
                    let newCard = dealer.hand;
                    let newRealCard = dealer.realHand;
                    newRealCard = newRealCard[newRealCard.length - 1];
                    newCard = newCard[newCard.length - 1];
                    console.log(newCard);

                    if(newCard[1] === "Hearts" || newCard[1] === "Diamonds") {
                        $("#dealerRealCards").append($('<p class="card cardRed">' + newRealCard + '</p>'));
                    } else {
                        $("#dealerRealCards").append($('<p class="card cardBlack">' + newRealCard + '</p>'));
                    }
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

        }, timeout);
        });
    });

    $("#playAgain").click(function() {
        location.reload();
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



// A function where the randomcards in the array from randomcard() is converted to symbols
// 🂡_🂢_🂣_🂤_🂥_🂦_🂧_🂨_🂩_🂪_🂫_🂬_🂭_🂮_🂱_🂲_🂳_🂴_🂵_🂶_🂷_🂸_🂹_🂺_🂻_🂼_🂽_🂾_🂱_🃂_🃃_🃄_🃅_🃆_🃇_🃈_🃉_🃊_🃋_🃌_🃍_🃎_🃁_🃑_🃒_🃓_🃔_🃕_🃖_🃗_🃘_🃙_🃚_🃛_🃜_🃝_🃞_
function cardToSymbols(cardArr) {


    let cardSymbols = "";
    let cardsAsCards = [];
    let classCard = "";

    switch (cardArr[0]) {
        case "Ace":
            switch (cardArr[1]) {
                case "Clubs":
                    cardSymbols = "🃑";
                    break;
                case "Hearts":
                    cardSymbols = "🂱";
                    break;
                case "Diamonds":
                    cardSymbols = "🃁";
                    break;
                case "Spades":
                    cardSymbols = "🂡";
                    break;
                default:
                    cardSymbols = "🃟";
                    break;
            }
            break;
        case "Jack":
            switch (cardArr[1]) {
                case "Clubs":
                    cardSymbols = "🃛";
                    break;
                case "Hearts":
                    cardSymbols = "🂻";
                    break;
                case "Diamonds":
                    cardSymbols = "🃋";
                    break;
                case "Spades":
                    cardSymbols = "🂫";
                    break;
                default:
                    cardSymbols = "🃟";
                    break;
            }
            break;
        case "Queen":
            switch (cardArr[1]) {
                case "Clubs":
                    cardSymbols = "🃝";
                    break;
                case "Hearts":
                    cardSymbols = "🂽";
                    break;
                case "Diamonds":
                    cardSymbols = "🃍";
                    break;
                case "Spades":
                    cardSymbols = "🃝";
                    break;
                default:
                    cardSymbols = "🃟";
                    break;
            }
            break;
        case "King":
            switch (cardArr[1]) {
                case "Clubs":
                    cardSymbols = "🃞";
                    break;
                case "Hearts":
                    cardSymbols = "🂾";
                    break;
                case "Diamonds":
                    cardSymbols = "🃎";
                    break;
                case "Spades":
                    cardSymbols = "🂮";
                    break;
                default:
                    cardSymbols = "🃟";
                    break;
            }
            break;
        case 2:
            switch (cardArr[1]) {
                case "Clubs":
                    cardSymbols = "🃒";
                    break;
                case "Hearts":
                    cardSymbols = "🂲";
                    break;
                case "Diamonds":
                    cardSymbols = "🃂";
                    break;
                case "Spades":
                    cardSymbols = "🂢";
                    break;
                default:
                    cardSymbols = "🃟";
                    break;
            }
            break;
        case 3:
            switch (cardArr[1]) {
                case "Clubs":
                    cardSymbols = "🃓";
                    break;
                case "Hearts":
                    cardSymbols = "🂳";
                    break;
                case "Diamonds":
                    cardSymbols = "🃃";
                    break;
                case "Spades":
                    cardSymbols = "🂣";
                    break;
                default:
                    cardSymbols = "🃟";
                    break;
            }
            break;
        case 4:
            switch (cardArr[1]) {
                case "Clubs":
                    cardSymbols = "🃔";
                    break;
                case "Hearts":
                    cardSymbols = "🂴";
                    break;
                case "Diamonds":
                    cardSymbols = "🃄";
                    break;
                case "Spades":
                    cardSymbols = "🂤";
                    break;
                default:
                    cardSymbols = "🃟";
                    break;
            }
            break;
        case 5:
            switch (cardArr[1]) {
                case "Clubs":
                    cardSymbols = "🃕";
                case "Hearts":
                    cardSymbols = "🂵";
                    break;
                case "Diamonds":
                    cardSymbols = "🃅";
                    break;
                case "Spades":
                    cardSymbols = "🂥";
                    break;
                default:
                    cardSymbols = "🃟";
                    break;
            }
            break;
        case 6:
            switch (cardArr[1]) {
                case "Clubs":
                    cardSymbols = "🃖";
                    break;
                case "Hearts":
                    cardSymbols = "🂶";
                    break;
                case "Diamonds":
                    cardSymbols = "🃆";
                    break;
                case "Spades":
                    cardSymbols = "🂦";
                    break;
                default:
                    cardSymbols = "🃟";
                    break;
            }
            break;
        case 7:
            switch (cardArr[1]) {
                case "Clubs":
                    cardSymbols = "🃗";
                    break;
                case "Hearts":
                    cardSymbols = "🂷";
                    break;
                case "Diamonds":
                    cardSymbols = "🃇";
                    break;
                case "Spades":
                    cardSymbols = "🂧";
                    break;
                default:
                    cardSymbols = "🃟";
                    break;
            }
            break;
        case 8:
            switch (cardArr[1]) {
                case "Clubs":
                    cardSymbols = "🃘";
                    break;
                case "Hearts":
                    cardSymbols = "🂸";
                    break;
                case "Diamonds":
                    cardSymbols = "🃈";
                    break;
                case "Spades":
                    cardSymbols = "🂨";
                    break;
                default:
                    cardSymbols = "🃟";
                    break;
            }
            break;
        case 9:
            switch (cardArr[1]) {
                case "Clubs":
                    cardSymbols = "🃙";
                    break;
                case "Hearts":
                    cardSymbols = "🂹";
                    break;
                case "Diamonds":
                    cardSymbols = "🃉";
                    break;
                case "Spades":
                    cardSymbols = "🂩";
                    break;
                default:
                    cardSymbols = "🃟";
                    break;
            }
            break;
        case 10:
            switch (cardArr[1]) {
                case "Clubs":
                    cardSymbols = "🃚";
                    break;
                case "Hearts":
                    cardSymbols = "🂺";
                    break;
                case "Diamonds":
                    cardSymbols = "🃊";
                    break;
                case "Spades":
                    cardSymbols = "🂪";
                    break;
                default:
                    cardSymbols = "🃟";
                    break;
            }
            break;
        default:
            cardSymbols = "🃟";
            break;
    }
    cardsAsCards.push(cardSymbols);
    return cardsAsCards;
}
