class Card{
  constructor(value,suit){
    this.value=value;
    this.suit=suit;
    this.char=this.value+" of "+this.suit;
  }
}
function cardValue(cardName){
  // Ace > King > Queen > Jack > 10 > 9 > 8 > 7 > 6 > 5 > 4 > 3 > 2
  //Read and extract the value of the card
  //assign number to all the special value so I can compare the value of the card
  switch(String(cardName).split(' ')[0]){
    case 'ace':
      return 14;
    case 'king':
      return 13;
    case 'queen':
      return 12;
    case 'jack':
      return 11;
    default: return parseInt(String(cardName).split(' ')[0]);
  }
  }
class Deck{
  constructor(){
    this.arrayOfCards=[];
  }
  shuffle(){
    for (var i = this.arrayOfCards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.arrayOfCards[i];
        this.arrayOfCards[i] = this.arrayOfCards[j];
        this.arrayOfCards[j] = temp;
    }
}
}
class Player{
  constructor()
  {
    this.hand=[];
  }
  draw(){

  }
  discard(){

  }
}
class Game{
  constructor(array1,array2,collect1,collect2){
     //Each player has 2 arrays (one is what they are holding, one is for the collected if win)
    this.array1=array1;
    this.array2=array2;
    this.collect1=collect1;
    this.collect2=collect2;
    this.score1=0;
    this.score2=0;
  }
compare(cardIndex){
  //function to compare 2 cards from 2 players.
  //put 2 cards in collected deck if one of the player wins
  //take each card out of the player's current deck
  let card1=cardValue(this.array1[cardIndex]);
  let card2=cardValue(this.array2[cardIndex]);
  if (card1>card2){
    this.score1+=1;
    this.collect1.push(this.array1.slice(0,cardIndex+1).concat(this.array2.slice(0,cardIndex+1)));
    this.array1.splice(0,cardIndex+1);
    this.array2.splice(0,cardIndex+1);
  }
  //if player 2 has larger value
  else if (card1<card2){
    this.score2+=1;
    this.collect2.push(this.array2.slice(0,cardIndex+1).concat(this.array1.slice(0,cardIndex+1)));
    this.array1.splice(0,cardIndex+1);
    this.array2.splice(0,cardIndex+1);
  }
  //no score is given but the cards will be removed
  else{
    this.array1.splice(0,cardIndex+1);
    this.array2.splice(0,cardIndex+1);
  }
}
}
//build a deck
let deck = new Deck();
let suit = ['hearts','spades','clubs','diamonds']
let value=['king','queen','jack',"ace",2,3,4,5,6,7,8,9,10]
for (i=0; i<value.length;i++){
  for (k=0; k<suit.length; k++){
    let card = new Card(value[i],suit[k])
    deck.arrayOfCards.push(card.char);
  }
} 


//Keep the original array in case we need this to debug
let originalDeck=deck.arrayOfCards.slice(0,deck.arrayOfCards.length);
console.log(`This is ordered deck`)
console.log(originalDeck)
//create shuffled deck 
deck.shuffle();
let shuffledDeck=deck.arrayOfCards;
console.log(`This is shuffled deck`)
console.log(shuffledDeck)
//deck deal for 2 players
let player1=new Player();
let player2=new Player();
for (i=0; i<shuffledDeck.length;i++){
  if (i%2==0){
    player1.hand.push(shuffledDeck[i]);
  }
  else {player2.hand.push(shuffledDeck[i])};
}
//Showing what the 2 players got originally
console.log(`Player 1's hand`)
console.log(player1.hand.slice(0,player1.hand.length));
console.log(`Player 2's hand`)
console.log(player2.hand.slice(0,player2.hand.length));
//Game loop
let collectCard1=[]; //collected card deck when win for player 1
let collectCard2=[]; //collected card deck when win for player 2
let game = new Game(player1.hand,player2.hand,collectCard1,collectCard2);
//let's play 
do {
  game.compare(0);
} 
while (game.array1.length!=0)
  console.log(`collected stack for player 1`)
  console.log(game.collect1);
  console.log(`collected stack for player 2`)
  console.log(game.collect2);
  if (game.score1>game.score2){
    console.log(`Player 1 wins with ${game.score1} points!!!`)
  }
  else if (game.score2>game.score1){
    console.log(`Player 2 wins with ${game.score2} points!!!`);
  }
  else{
    console.log(`Everybody ties at ${game.score1} points`)
  }