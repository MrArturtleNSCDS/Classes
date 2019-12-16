var deck;
var suits=["C","D","H","S"];
var preloadedImages = [];
var turn;
var numPlayers;
var currentPlayer;
var playerPoints;
var backOfCard;
var dealtCards;
var allCardWrappers;
var winnerWrapper;
var message;
var startButton;
var gameButtons;
var firstGame;

init();

function init(){
    console.log("init()");
    numPlayers = 2;
    backOfCard = new Image();
    backOfCard.src = 'cardPNG/back.png';
    initDeck();
    allCardWrappers = $('.cardsWrapper');
    winnerWrapper = $('#winnerWrapper');
    message = $('#message');
    startButton = $('#startButton');
    gameButtons = $('#gameButtons');
    first = true;
    
    
    $('[startGame]').click(
        function(){
            start();        
        }
    );
    
    $('#hitButton').click(
        function(){
            console.log(playerPoints[0]);
            if(playerPoints[0]<21){
                dealCard(0,checkPlayerPoints,[0]);
            }
        }
    );
    
    $('#stayButton').click(
        function(){
            dealerTurn();
        }
    );
}

function checkPlayerPoints(player){
    console.log(playerPoints[player]);
    updatePlayerPoints(player);
    if(playerPoints[player]>21)
        dealerTurn();
}


function dealerTurn(){
    console.log(playerPoints[0]);
    dealerDeal(true);
}

function initDeck(){
    playerPoints = [];
    deck = [];
    
    for(var p=0; p<numPlayers; p++){
        playerPoints[p]=0;
    }
    
    for(var c=0; c<52; c++){
        var suitIndex=Math.floor(c/13);
        var rank=(c%13)+1;
        
        var cardRank;
        var cardValue;
        
        switch(rank){
            case 1: 
                cardRank = 'A';
                cardValue = 11;
                break;
            case 11: 
                cardRank = 'J';
                cardValue = 10;
                break;
            case 12: 
                cardRank = 'Q';
                cardValue = 10;
                break;
            case 13:
                cardRank = 'K';
                cardValue = 10;
                break;
            default : 
                cardRank = rank;
                cardValue = rank;
        }
        
        var chosenSuit = suits[suitIndex];
        var cardSuitRank= chosenSuit+cardRank;
        
        var currentCardImage = new Image();
        currentCardImage.src = 'cardPNG/' + cardSuitRank +'.png';
        
        preloadedImages.push(currentCardImage);
        
        var currentCard = {suit:chosenSuit,rank:cardRank,image:currentCardImage.src, value:cardValue};
        deck[c] = currentCard;
    }
    //console.log(deck);
}

function start(){
    console.log('start()');
    turn = 0;
    currentPlayer = 0;
    allCardWrappers.html('');
    updateAllPlayersPoints();
    shuffleDeck();
    dealCards(10);
    if(first){
        startButton.fadeOut(200);
        //gameButtons.delay(300).fadeIn();
        first = false;
    }
    else
        winnerWrapper.fadeOut();
    //updateAllPlayersPoints();
    console.log("player points: dealer:" + playerPoints[numPlayers-1] + " player0:" + playerPoints['0']);
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
    dealtCards = 0;
    if(numCards>0)
        dealCard(turn%2,dealCards,[--numCards]);
    else
        updatePlayerPoints(0);
}

function dealCard(player, callBack, params){
    var currentCard=deck[turn];
 
    var currentPlayer = player===numPlayers-1?'#dealer':'#player' + player;
    
    //console.log(currentPlayer, player,turn)
    
    //var cardImage = player===1&&turn===1?backOfCard.src:currentCard.image;
    
    var cardImage = currentCard.image;
    
    $('.cardsWrapper', currentPlayer).append(
        '<img class="card" src="' + cardImage + '" cardid="' + turn + '" />');
    var dealtCard = $('[cardid=' + turn + ']');
    dealtCard.data('value',currentCard.value);
    dealtCard.data('image',currentCard.image);
    TweenMax.from(dealtCard,1,{y:-600,rotation:180,ease: Expo.easeOut,onComplete:callBack, onCompleteParams:params});
    turn++;
}

function dealerDeal(first){
    updatePlayerPoints(1);
    
    if(first){
        var firstCard = $('[cardid=1]');
        firstCard.attr('src',firstCard.data('image'));
    }

    
    if(playerPoints[1]<17){
        dealCard(1,dealerDeal,[false]);
        //cardsDealt++;
    }
    else
        winner();
}

function updateAllPlayersPoints(){
    for(var p=0; p<numPlayers; p++){
        updatePlayerPoints(p);    
    }
}

function updatePlayerPoints(player){
    console.log("updating player points");
    var allPlayerCards = $('.card','[player=' + player + ']');
    var sum = 0;
    var numAs = 0;
    allPlayerCards.each(
        function(){
            var currentValue = $(this).data('value');
            console.log($(this).data('image'));
            if (currentValue === 11)
                numAs++;
            sum+=currentValue;
        }
    );
    
    while(sum>21 && numAs>0){
        numAs--;
        sum-=10;
    } 
    //var index = player==='d'?numPlayers-1:parseInt(player);
    playerPoints[player] = sum;
    $('.playerPoints','[player=' + player + ']').text(sum);
    console.log(playerPoints[player]);
}

function winner(){
    var winningPlayer = 0;
    while(playerPoints[winningPlayer]>21)
        winningPlayer++;
        
    for(var p=winningPlayer; p<numPlayers-1; p++){
        if(playerPoints[p+1] > playerPoints[winningPlayer] && playerPoints[p+1] <=21)
            winningPlayer=p+1;
    }
    var winningString = winningPlayer===numPlayers-1?"DEALER wins!!":"You win!!";
    message.text(winningString);
    winnerWrapper.fadeIn();
}