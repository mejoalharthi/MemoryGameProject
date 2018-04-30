 var cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
   "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
   "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"
 ];

 let CardShuffled = shuffle(cards);
 let open = [];
 let index = [];
 //For Change Classes
 const Card = document.getElementsByClassName("card");
 let MatchedCounter = 0;
 //Display Card
 const listClass = document.getElementsByClassName("deck");
 //moves
 const Moves = document.getElementsByClassName("moves")[0];
 //Movea Counter
 let MovesCounter = 0;
 //stars
 const Stars = document.getElementsByClassName("stars")[0];
 //Creat Element to show rating in Congratulations popup
 const StarsInPopUp = document.createElement("ul");
 StarsInPopUp.classList.add("stars");
 //Time
 const timer = document.getElementsByClassName("Timer")[0];
 let interval;
 let hour = 0,
   minute = 0,
   second = 0;
 //Reset
 const Reset = document.getElementsByClassName("restart")[0];
 Reset.addEventListener("click", ResetGame);


 DisplayCards(CardShuffled);
 StartTimer();
 startGame();
 Rating();

 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
   var currentIndex = array.length,
     temporaryValue, randomIndex;

   while (currentIndex !== 0) {
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;
     temporaryValue = array[currentIndex];
     array[currentIndex] = array[randomIndex];
     array[randomIndex] = temporaryValue;
   }

   return array;
 }

 //Display Game Bord with Shuffled Cards
 function DisplayCards(CardShuffled) {
   var listelement = " ";
   for (var i = 0; i < CardShuffled.length; i++) {
     listelement += "<li class='card '><i class='" + CardShuffled[i] + " '></i></li>";
   }
   listClass[0].innerHTML = listelement;

 }


 //when user start Gaming this function will call all functions
 function startGame() {

   var elm;
   for (let x = 0; x < Card.length; x++) {
     Card[x].onclick = function() {
       elm = Card[x].getElementsByTagName("i")[0].className;
       AddToOpenList(elm, x);
       Rating();
       Congratulations();
     } //EndFunction
   } //EndLoop
 }

 //Add the cliced card to open list
 function AddToOpenList(elm, x) {
   if (open.length < 2) {
     open.push(elm);
     index.push(x);
     Card[x].className = "card disable open show";
   } //end if
   if (open.length === 2) {
     ++MovesCounter;
     Moves.innerHTML = " " + MovesCounter;
     if (open[0] === open[1]) {
       //if Card Matched
       Match(index);
     } else {
       //If Not Matched Call the function & set timer so user can see the two cards
       setTimeout(NotMatch, 450);

     }
   }
 }
 //If The cards Matched Chang Classes
 function Match() {
   MatchedCounter = MatchedCounter + 2;
   Card[index[0]].className = "card disable match";
   Card[index[1]].className = "card disable match ";
   //Remove Cards From Open List
   open.pop();
   index.pop();
   open.pop();
   index.pop();
 }
 //If The cards Not Matched Chang Classes
 function NotMatch() {
   Card[index[0]].className = "card";
   Card[index[1]].className = "card";
   open.pop();
   index.pop();
   open.pop();
   index.pop();
 }

 // For Stars Rating
 function Rating() {

   let showStars = '';
   if (MovesCounter === 0 || MovesCounter <= 12) {
     for (let s = 0; s < 3; s++) {
       showStars += "<li><i class='fa fa-star'></i></li>";
     }
     Stars.innerHTML = showStars;
     StarsInPopUp.innerHTML = showStars;

   } else if (MovesCounter >= 13 && MovesCounter < 17) {
     for (let s = 0; s < 2; s++) {
       showStars += "<li><i class='fa fa-star'></i></li>";
     }
     Stars.innerHTML = showStars;
     StarsInPopUp.innerHTML = showStars;

   } else {
     Stars.innerHTML = "<li><i class='fa fa-star'></i></li>";
     StarsInPopUp.innerHTML = "<li><i class='fa fa-star'></i></li>";

   }
 }

 //Game Timer
 function StartTimer() {
   interval = setInterval(function() {
     timer.innerHTML = calculateTime()
   }, 1000);
 }

 function calculateTime() {

   if (minute === 60) {
     minute = 0;
     hour++;
   }
   if (second === 60) {
     second = 0;
     minute++;
   }
   second++;
   if (minute < 10 && minute > 0) {
     return "0" + minute + " Mins  " + second + " Sec";
   } else {
     return " " + minute + " Mins  " + second + " Sec";
   }

 }

 // Reset every Thing
 function ResetGame() {
   shuffle(cards);
    DisplayCards(CardShuffled);
   hour = 0;
   minute = 0;
   second = 0;

   MovesCounter = 0;
   MatchedCounter = 0;
   Moves.innerHTML = " " + MovesCounter;
   open = [];
   index = [];
   startGame();
   Rating();

   StartTimer();
 }
 // if User Win
 function Congratulations() {
   if (MatchedCounter === 16) {
     //Stop Timer
     clearInterval(interval);
     //sweetalert
     swal(" Your Rating: ", {
       title: "Congratulations.. You Do it in" + timer.textContent + "!",
       content: StarsInPopUp,
       buttons: {
         cancel: "Cancel",
         catch: {
           text: "Play Agin",
           value: "Agin",
         },
       },
     }).then((value) => {
       switch (value) {
         case "Agin":
           ResetGame();
           break;
         default:
           swal("Thank You <3");
       }
     });

   }

 }
