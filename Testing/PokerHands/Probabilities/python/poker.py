import math
import random
import timeit

class Card:
    def __init__(self, value, rank, suit):
        self.value = value
        self.rank = rank
        self.suit = suit
    def toString(self):
        return str(self.rank) + "" + str(self.suit);
        
class Hand:
    def __init__(self,numCards):
        self.hand = []
        self.max = numCards
    def addCard(self,card):
        if len(self.hand)<self.max:
            self.hand.append(card)
    def cardAt(self,index):
        if index<len(self.hand):
            return self.hand[index]
    def length(self):
        return len(self.hand)
    def returnValue(self,card):
        return card.value
    def valueSort(self):
        self.hand.sort(key=self.returnValue)
    def toString(self):
        allCards = []
        for c in self.hand:
            allCards.append(c.toString())
        return str(allCards);

class Deck:
    def __init__(self,shuffleTimes):
        self.suits = ['C','D','H','S']
        self.cardIndex = 0
        self.deck = []
        self.init()
        self.shuffle(shuffleTimes)
    def init(self):
        for c in range(52):
            suitIndex = int(c/13)
            cardValue = (c%13)+1
            cardRank = self.cardRank(cardValue)
            chosenSuit = self.suits[suitIndex]; 
            self.deck.append(Card(cardValue,cardRank,chosenSuit))
    def cardRank(self,r):
        switcher={
            1:'A',
            11:'J',
            12:'Q',
            13:'K',
        }
        return switcher.get(r,str(r))
    def shuffle(self,shuffleTimes):
        for s in range(shuffleTimes):
            random.shuffle(self.deck)
    def deal(self, hand, numCards):
        for c in range(numCards):
            hand.addCard(self.deck[self.cardIndex]);
            self.cardIndex+=1
    def toString(self):
        allCards = []
        for c in self.deck:
            allCards.append(c.toString())
        return allCards;

def hasHighAce(hand):
    hasAce = false
    hasTen = false
    for c in hand:
        if c.value == 10:
            hasTen = true
        if c.value == 1:
            hasAce = true
    return hasAce and hasTen
    
def isFlush(hand):
    i = 0
    while i < hand.length()-1:
        if hand.cardAt(i).suit != hand.cardAt(i+1).suit:
            return False
        i += 1
    return True

def isStraight(hand):
    hand.valueSort()
    hasAce = hand.cardAt(0).value == 1
    i = 1 if hasAce else 0
    while i<hand.length()-1:
        if hand.cardAt(i).value+1 != hand.cardAt(i+1).value:
            return False
        i+=1
    if hasAce:
        return hand.cardAt(1).value == 2 or hand.cardAt(1) == 10
    return True
    
def isStraightFlush(hand):
    return isStraight(hand) and isFlush(hand)

#def ofAKind(hand,howMany):
 #   highCount = 0;
    
 #   for c in hand:

numFlushes = 0
numStraight = 0
numStraightFlushes = 0

for h in range(100000):        
    deck = Deck(3)
    hand1 = Hand(5)
    hand2 = Hand(5)

    deck.deal(hand1,5)
    deck.deal(hand2,5)
    
    if isFlush(hand):
        #print(hand.toString() + " ^^^^ FLUSH ^^^^");
        numFlushes += 1
        
    if isStraight(hand):
        #print(hand.toString() + " ^^^^ STRAIGHT ^^^^");
        numStraight += 1
        
    if isStraightFlush(hand):
        #print(hand.toString() + " ^^^^ STRAIGHT FLUSH^^^^");
        numStraightFlushes += 1
        
print("FLUSH: " + str(numFlushes))
print("STRAIGHT: " + str(numStraight))
print("STRAIGHT FLUSH: " + str(numStraightFlushes))