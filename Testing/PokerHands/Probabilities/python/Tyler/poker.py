import random
import operator

def check_if_same(nums):
    same = True
    for i in range(len(nums)-1):
        if nums[i] != nums[i+1]:
            same = False
    return same

suits = ['heart','spade','club','diamond']
values = ['ace','two','three','four','five','six','seven','eight','nine','ten','jack','queen','king']

class card:
    def __init__(self,suit,value,rank):
        self.suit = suit
        self.value = value
        self.rank = rank
    def card_print(self):
        return self.suit +' '+ self.value +' '+str(self.rank)
    def return_rank(self):
        return self.rank
    def return_suit(self):
        return self.suit


class deck:
    def __init__(self):
        self.all_cards = []
        for suit in suits:
            for value in values:
                rank = values.index(value)
                self.all_cards.append(card(suit,value,rank))
    def show_deck(self):
        return self.all_cards


class hand:
    def __init__(self):
        self.deck = deck().show_deck()    
        self.shuffled_cards = []
    def return_value(self,card):
        return card.value
    def deal(self):
        numbers = random.sample(range(len(self.deck)),5)
        for i in numbers:
            self.shuffled_cards.append(self.deck[i])
        self.shuffled_cards.sort(key = operator.attrgetter('rank'))
        return self.shuffled_cards


def print_card(held_hand):
    for card in held_hand:
        print(card.card_print())

def check_of_a_kind(hand):
    check_num = None
    times = 1
    cards = []
    for i in hand:
        if i.return_rank() == check_num:
            times+=1
            cards.append(i.return_rank())
        check_num = i.return_rank()        
    if times == 2:
        return 'TWO OF A KIND'
    if times == 3:
        if check_if_same(cards) == True:
            return 'THREE OF A KIND'
        else:
            return 'TWO PAIR'
    if times == 4:
        if check_if_same(cards) == True:
            return 'FOUR OF A KIND'
        else:
            return 'FULL HOUSE'

def check_if_flush(hand):
    is_flush = True
    first_suit = hand[0].return_suit()
    for i in hand:
        if i.return_suit() != first_suit:
            is_flush = False
    return is_flush

def check_if_straight(hand):
    first_num = hand[0].return_rank()
    num_add = 0
    is_straight = True
    for i in hand:
        if first_num+num_add != i.return_rank():
            is_straight = False
        num_add+=1
    return is_straight

def check_if_straight_with_ace(hand):
    first_num = hand[1].return_rank()
    num_add = 0
    is_straight = True
    if hand[0].return_rank() == 0 and hand[1].return_rank() == 9:
        for i in range(1,len(hand)):
            if first_num+num_add != hand[i].return_rank():
                is_straight = False
            num_add+=1  
    if hand[0].return_rank() != 0 or hand[1].return_rank() != 9:
        is_straight = False
    return is_straight

number_of_hands = {
    'royal flush' : 0,
    'straight flush' : 0,
    'straight' : 0,
    'flush' : 0,
    'full house' : 0,
    'four of a kind' : 0,
    'three of a kind' : 0,
    'two pair' : 0,
    'pair' : 0
}


def find_hand(hand):
    if check_if_straight_with_ace(hand) and check_if_flush(hand):
        number_of_hands['royal flush'] += 1
    elif check_if_flush(hand) and check_if_straight(hand):
        number_of_hands['straight flush'] += 1
    elif check_if_straight_with_ace(hand) or check_if_straight(hand):
        number_of_hands['straight'] += 1
    elif check_if_flush(hand):
        number_of_hands['flush'] += 1
    elif check_of_a_kind(hand) == 'TWO OF A KIND':
        number_of_hands['pair'] += 1
    elif check_of_a_kind(hand) == 'THREE OF A KIND':
        number_of_hands['three of a kind'] += 1
    elif check_of_a_kind(hand) == 'TWO PAIR':
        number_of_hands['two pair'] += 1
    elif check_of_a_kind(hand) == 'FOUR OF A KIND':
        number_of_hands['four of a kind'] += 1
    elif check_of_a_kind(hand) == 'FULL HOUSE':
        number_of_hands['full house'] += 1


for i in range(50000):
    find_hand(hand().deal())

for hand in number_of_hands:
    if number_of_hands[hand] != 0:
        print(hand,'=', number_of_hands[hand]/500000 * 100,'%')
    else:
        print(hand, '=', 0,'%')
print(number_of_hands)