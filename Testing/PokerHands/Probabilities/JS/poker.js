class Card{
    //var size;
    constructor(value,rank,suit){
        this.value = value;
        this.rank = rank;
        this.suit = suit;
    }
    toString(){
        return this.rank + this.suit;
    }
}

class Hand{
    constructor(numCards){
        this.hand = [];
        this.max = numCards;
        this.sorted = false;
    }
    addCard(card){
        if(this.hand.length<this.max)
            this.hand.push(card);
    }
    cardAt(index){
        if(index<this.hand.length)
            return this.hand[index];
    }
    valueSort(){
        if(!this.sorted)
            this.hand.sort(function(a, b){return a.value - b.value;});
        this.sorted = true;
    }
    get length(){
        return this.hand.length;
    }
    toString(){
        var allCardsString = [];
        for(var c=0; c<this.hand.length; c++){
            allCardsString.push(this.hand[c].toString());
        }
        return allCardsString.toString();
    }
}

class Deck{
    constructor(shuffleTimes){
        this.suits = ['C','D','H','S'];
        this.deck = [];
        this.init();
        this.shuffle(shuffleTimes);
        this.cardIndex = 0;
    }
    init(){
        this.deck = [];
        this.cardIndex = 0;
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
            var chosenSuit = this.suits[suitIndex];
            var cardSuitRank= chosenSuit+cardRank;
            
            this.deck[c] = new Card(cardValue,cardRank,chosenSuit);
        }
        /*this.deck.push(new Card(1,'A','D'));
        this.deck.push(new Card(1,'A','H'));
        this.deck.push(new Card(1,'A','S'));
        this.deck.push(new Card(2,'2','H'));
        this.deck.push(new Card(2,'2','D'));*/
        //console.log(this.deck);
    }
    shuffle(shuffleTimes){
        //console.log('shuffleDeck()');
        var totalCards = this.deck.length;
        for(var s=0; s<shuffleTimes; s++){
        	for(var c=0; c<totalCards; c++){
                var j= Math.floor(Math.random()*totalCards);
                var tempCard = this.deck[j];
                this.deck[j]=this.deck[c];
                this.deck[c]=tempCard;
            }
        }
    }
    deal(hand,numCards){
        for(var c=0;c<numCards;c++){
            hand.addCard(this.deck[this.cardIndex++]);
        }

    }
    get cardsLeft(){
        return this.deck.length - this.cardIndex;
    }
    toString(){
        var allCardsString = [];
        for(var c=0; c<this.deck.length; c++){
            allCardsString.push(this.deck[c].toString());
        }
        return allCardsString.toString();
    }
}

var numHands = 2598960;

var numHighCard = 0;
var numPair = 0;
var num2Pair = 0;
var num3Kind = 0;
var numStraight = 0;
var numFlush = 0;
var numFullHouse = 0;
var num4Kind = 0;
var numStraightFlush = 0;
var numRoyalFlush = 0;
var allHandsString = "";

for(var h=0; h<numHands; h++){
    var pokerDeck = new Deck(2);
    var pokerHand = new Hand(5);
    
    //console.log(pokerDeck.toString());
    
    pokerDeck.deal(pokerHand,5);
    
    //console.log(pokerHand.toString());
    
    var currMessage = "";
    
    if(isRoyalFlush(pokerHand)){
        currMessage = message(h,"ROYAL FLUSH: " + ++numRoyalFlush);
    }
    else if(isStraightFlush(pokerHand)){
        currMessage = message(h,"STRAIGHT FLUSH: " + ++numStraightFlush);
    }
    else if(ofAKind(pokerHand,4)){
        currMessage = message(h,"FOUR OF A KIND: " + ++num4Kind);
    }
    else if(isFullHouse(pokerHand)){
        currMessage = message(h,"FULL HOUSE: " + ++numFullHouse);
    }
    else if(isFlush(pokerHand)){
        currMessage = message(h,"FLUSH: " + ++numFlush);
    }
    else if(isStraight(pokerHand)){
        currMessage = message(h,"STRAIGHT: " + ++numStraight);
    }
    else if(ofAKind(pokerHand,3)){
        currMessage = message(h,"THREE OF A KIND: " + ++num3Kind);
    }
    else if(twoPair(pokerHand)){
        currMessage = message(h,"2 PAIR: " + ++num2Pair);
    }
    else if(ofAKind(pokerHand,2)){
        currMessage = message(h,"PAIR: " + ++numPair);
    }
    else{
        currMessage = message(h,"HIGH CARD: " + ++numHighCard);
    }
    
    allHandsString+= currMessage;
    //console.log(currMessage);
}



var blob =
    new Blob(
        [allHandsString],
        { type: "text/plain;charset=utf-8" });
//saveAs(blob, "pokerHands.txt");

$("#numRoyalFlush").text(numRoyalFlush);
$("#royalFlush").text(getPercent(numRoyalFlush,numHands));
$("#numStraightFlush").text(numStraightFlush);
$("#straightFlush").text(getPercent(numStraightFlush,numHands));
$("#numFourKind").text(num4Kind);
$("#fourKind").text(getPercent(num4Kind,numHands));
$("#numFullHouse").text(numFullHouse);
$("#fullHouse").text(getPercent(numFullHouse,numHands));
$("#numFlush").text(numFlush);
$("#flush").text(getPercent(numFlush,numHands));
$("#numStraight").text(numStraight);
$("#straight").text(getPercent(numStraight,numHands));
$("#numThreeKind").text(num3Kind);
$("#threeKind").text(getPercent(num3Kind,numHands));
$("#numTwoPair").text(num2Pair);
$("#twoPair").text(getPercent(num2Pair,numHands));
$("#numPair").text(numPair);
$("#pair").text(getPercent(numPair,numHands));
$("#numHighCard").text(numHighCard);
$("#highCard").text(getPercent(numHighCard,numHands));
$("#totalHands").text(totalAll());

$("#diffRoyalFlush").text(findDifference('#royalFrequency','#numRoyalFlush',false));
$("#diffStraightFlush").text(findDifference('#straightFlushFrequency','#numStraightFlush',false));
$("#diffFourKind").text(findDifference('#fourKindFrequency','#numFourKind',false));
$("#diffFullHouse").text(findDifference('#fullHouseFrequency','#numFullHouse',false));
$("#diffFlush").text(findDifference('#flushFrequency','#numFlush',false));
$("#diffStraight").text(findDifference('#straightFrequency','#numStraight',false));
$("#diffThreeKind").text(findDifference('#threeKindFrequency','#numThreeKind',false));
$("#diffTwoPair").text(findDifference('#twoPairFrequency','#numTwoPair',false));
$("#diffPair").text(findDifference('#pairFrequency','#numPair',false));
$("#diffHighCard").text(findDifference('#highCardFrequency','#numHighCard',false));

$("#diffRoyalFlushPerc").text(findDifference('#royalPerc','#royalFlush',true));
$("#diffStraightFlushPerc").text(findDifference('#straightFlushPerc','#straightFlush',true));
$("#diffFourKindPerc").text(findDifference('#fourKindPerc','#fourKind',true));
$("#diffFullHousePerc").text(findDifference('#fullHousePerc','#fullHouse',true));
$("#diffFlushPerc").text(findDifference('#flushPerc','#flush',true));
$("#diffStraightPerc").text(findDifference('#straightPerc','#straight',true));
$("#diffThreeKindPerc").text(findDifference('#threeKindPerc','#threeKind',true));
$("#diffTwoPairPerc").text(findDifference('#twoPairPerc','#twoPair',true));
$("#diffPairPerc").text(findDifference('#pairPerc','#pair',true));
$("#diffHighCardPerc").text(findDifference('#highCardPerc','#highCard',true));


function totalAll(){
    
    return numHighCard + numPair + num2Pair + num3Kind + 
        numStraight + numFlush + numFullHouse + num4Kind + 
        numStraightFlush + numRoyalFlush;
}

function findDifference(frequency,numHands,removeLast){
    var num1 = $(frequency).text();
    var num2 = $(numHands).text();
    
    if(removeLast){
        num1 = num1.substring(0,num1.length-1);
        num2 = num2.substring(0,num2.length-1);
    }
    
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    
    var result = num1-num2 + "";
    
    var decimalPlace = result.indexOf(".");
    
    if(decimalPlace>=0){
        var divisor = 10000000000;
        result *= divisor;
        result = Math.floor(result);
        result /= divisor;
        result += "%";
    }
    
    return result;
}

function message(handNumber,handType){
    return handNumber+" : "+pokerHand.toString()+" : " + handType+"\n";
}

function getPercent(num,times){
    var probabilityString = String((num/times)*100);
    var decimalIndex = probabilityString.indexOf(".");
    //console.log(probabilityString);
    if(probabilityString.length-decimalIndex>6)
        return probabilityString.substring(0,decimalIndex+7) + "%";
    return probabilityString + "%";
}

function isFlush(hand){
    //console.log(hand);
    var i = 0;
    while(i<hand.length-1){
        if(hand.cardAt(i).suit !== hand.cardAt(i+1).suit)
            return false;
        i++;
    }

    return true;
}

function isStraight(hand){    
    hand.valueSort();
    var hasAce = hand.cardAt(0).value == 1;
    
    var i = hasAce?1:0;
    
    while(i<hand.length-1){
        //console.log(i);
        if(hand.cardAt(i).value+1 !== hand.cardAt(i+1).value)
            return false;
        i++;
    }
    
    if(hasAce)
        return hand.cardAt(1).value === 2 || hand.cardAt(1).value ===10;

    return true;
}

function isStraightFlush(hand){
    return isFlush(hand) && isStraight(hand);
}

function isRoyalFlush(hand){
    return isStraightFlush(hand) && hasHighAce(hand);
}

function hasHighAce(hand){
    var ace = false;
    var ten = false;
    for(var c=0;c<hand.length;c++){
        if(hand.cardAt(c).value===10)
            ten = true;
        if(hand.cardAt(c).value===1)
            ace = true;
    }
    
    return ace && ten;
}

function twoPair(hand){
    hand.valueSort();
    
    return hand.cardAt(0).value == hand.cardAt(1).value &&
        hand.cardAt(2).value == hand.cardAt(3).value ||
        hand.cardAt(0).value == hand.cardAt(1).value &&
        hand.cardAt(3).value == hand.cardAt(4).value ||
        hand.cardAt(1).value == hand.cardAt(2).value &&
        hand.cardAt(3).value == hand.cardAt(4).value;
}

function ofAKind(hand,howMany){
    hand.valueSort();
    valueCounts = [];
    var i=0;

    var count = 1;
    var highCount = count;

    while(i<hand.length-1){
        if(hand.cardAt(i).value === hand.cardAt(i+1).value)
            count++;
        else{
            valueCounts.push(count);

            count = 1;
        }
        i++;
    }
    valueCounts.push(count);
    
    return valueCounts.indexOf(howMany)>=0;
}

function isFullHouse(hand){
    //console.log(ofAKind(hand,2),ofAKind(hand,3))
    return ofAKind(hand,2) && ofAKind(hand,3);
}