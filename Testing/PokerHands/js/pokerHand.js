var deck;
var hand;
var suits=["C","D","H","S"];
var preloadedImages = [];
var backOfCard;
var cardWrapper;
var winnerWrapper;
var message;
var startButton;
var firstGame;
var turn;

var testDeck = 
    [
        {suit:"C",rank:"A",image:"cardPNG/CA.png", value:1},
        {suit:"C",rank:2,image:"cardPNG/C2.png", value:2},
        {suit:"D",rank:3,image:"cardPNG/D3.png", value:3},
        {suit:"C",rank:4,image:"cardPNG/C4.png", value:4},
        {suit:"C",rank:5,image:"cardPNG/C5.png", value:5}
    ];
   
/*var testDeck = 
    [
        {suit:"C",rank:"A",image:"cardPNG/CA.png", value:1},
        {suit:"C",rank:"K",image:"cardPNG/CK.png", value:13},
        {suit:"C",rank:"Q",image:"cardPNG/CQ.png", value:12},
        {suit:"C",rank:"J",image:"cardPNG/CJ.png", value:11},
        {suit:"C",rank:10,image:"cardPNG/C10.png", value:10}
    ];
 /*  
var testDeck = 
    [
        {suit:"C",rank:"A",image:"cardPNG/CA.png", value:1},
        {suit:"H",rank:"A",image:"cardPNG/HA.png", value:1},
        {suit:"S",rank:"A",image:"cardPNG/SA.png", value:1},
        {suit:"D",rank:"A",image:"cardPNG/DA.png", value:1},
        {suit:"C",rank:6,image:"cardPNG/C6.png", value:6}
    ];

var testDeck = 
    [
        {suit:"C",rank:"A",image:"cardPNG/CA.png", value:1},
        {suit:"H",rank:"A",image:"cardPNG/HA.png", value:1},
        {suit:"S",rank:3,image:"cardPNG/S3.png", value:3},
        {suit:"D",rank:3,image:"cardPNG/D3.png", value:3},
        {suit:"C",rank:3,image:"cardPNG/C3.png", value:3}
    ];*/

init();

function init(){
    console.log("init()");
    backOfCard = new Image();
    backOfCard.src = 'cardPNG/back.png';
    initDeck(true);
    cardWrapper = $('.cardsWrapper');
    winnerWrapper = $('#winnerWrapper');
    message = $('#message');
    startButton = $('#startButton');
    firstGame = true;
    
    $('[startGame]').click(
        function(){
            start();        
        }
    );
}

function initDeck(testing){
    hand = [];
    
    if(!testing){
        deck = [];
        
        for(var c=0; c<52; c++){
            var suitIndex=Math.floor(c/13);
            var cardValue=(c%13)+1;
            
            var cardRank;
            //var cardValue;
            
            switch(cardValue){
                case 1: 
                    cardRank = 'A';
                    break;
                case 11: 
                    cardRank = 'J';
                    break;
                case 12: 
                    cardRank = 'Q';
                    break;
                case 13:
                    cardRank = 'K';
                    break;
                default : 
                    cardRank = cardValue;
            }
            
            var chosenSuit = suits[suitIndex];
            var cardSuitRank= chosenSuit+cardRank;
            
            var currentCardImage = new Image();
            currentCardImage.src = 'cardPNG/' + cardSuitRank +'.png';
            
            preloadedImages.push(currentCardImage);
            
            var currentCard = {suit:chosenSuit,rank:cardRank,image:currentCardImage.src, value:cardValue};
            deck[c] = currentCard;
        }
    }
    else
        deck = testDeck;

    console.log(deck);
}

function start(){
    turn=0;
    console.log('start()');
    cardWrapper.html('');
    shuffleDeck();
    dealCards(5);
    if(firstGame){
        startButton.fadeOut(200);
        firstGame = false;
    }
    else
        winnerWrapper.fadeOut();
    //updateAllPlayersPoints();
}

function shuffleDeck(){
    console.log('shuffleDeck()');
    var totalCards = deck.length;
    for(var s=0; s<2; s++){
    	for(var c=0; c<totalCards; c++){
            var j= Math.floor(Math.random()*totalCards);
            var tempCard = deck[j];
            deck[j]=deck[c];
            deck[c]=tempCard;
        }
    }
}

function dealCards(numCards){
    console.log('dealCards()');
    //var firstCard = true;
    if(numCards>0)
        dealCard(dealCards,[--numCards]);
    else{
        checkHand();
    }

}

function dealCard(callBack, params){
    var currentCard=deck[turn];
    hand.push(currentCard);
    
    $('.cardsWrapper').append(
        '<img class="card" src="' + currentCard.image + '" cardid="' + turn + '" />');
        
    var dealtCard = $("[cardid=" + turn + "]");
 
    TweenMax.from(dealtCard,.5,{y:-600,rotation:180,ease: Expo.easeOut,onComplete:callBack, onCompleteParams:params});
    turn++;
}

function checkHand(){
    console.log("flush: " + isFlush(hand));
    console.log("straight: " + isStraight(hand));
    console.log("straight flush: " + isStraightFlush(hand));
    console.log("royal flush: " + isRoyalFlush(hand));
    console.log("2 of Kind: " + ofAKind(hand,2));
    console.log("3 of Kind: " + ofAKind(hand,3));
    console.log("4 of Kind: " + ofAKind(hand,4));
    console.log("5 of Kind: " + ofAKind(hand,5));
    console.log("Full House: " + isFullHouse(hand));
}

function isRoyalFlush(hand){
    return isFlush(hand) && isStraight(hand) && hand[0].value===10;
}

function isStraightFlush(hand){
    return isFlush(hand) && isStraight(hand);
}

function isFlush(hand){
    //console.log(hand);
    var i = 0;
    while(i<hand.length-1){
        if(hand[i].suit !== hand[i+1].suit)
            return false;
        i++;
    }

    return true;
}

function isStraight(hand){
    var valueArray = [];
    for(var i=0; i<hand.length; i++){
        valueArray.push(hand[i].value);
    }
    
    valueArray.sort(function(a, b){return a - b;});
    
    var hasAce = valueArray.indexOf(1)>=0;
    
    i = hasAce?1:0;
    
    while(i<hand.length-1){
        //console.log(i);
        if(valueArray[i]+1 !== valueArray[i+1])
            return false;
        i++;
    }
    
    if(hasAce)
        return valueArray[1]===2 || valueArray[1]===10;

    return true;
}

function isFullHouse(hand){
    return ofAKind(hand,2) && ofAKind(hand,3);
}

function ofAKind(hand,howMany){
    var valueArray = [];
    for(var i=0; i<hand.length; i++){
        valueArray.push(hand[i].value);
    }

    valueArray.sort(function(a, b){return a -  b;});
    
    i=0;
    //var found = false;
    var count = 1;
    var highCount = count;

    while(i<valueArray.length-1 && highCount<howMany){
        //console.log(valueArray[i], valueArray[i+1]);
        if(valueArray[i] === valueArray[i+1])
            count++;
        else{
            if(highCount < count)
                highCount = count;
            count = 1;
        }
        //console.log("count", count);
        i++;
    }
    if(highCount < count)
        highCount = count;
    //console.log(highCount);
    return highCount>=howMany;
}