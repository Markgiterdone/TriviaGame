// Trivia Game

$(document).ready(function() {

// --------------------- Variables below ----------------------
var right = 0;
var wrong = 0;
var unAnswered = 0;

// Possible variable to calculate and hold time "to click" durations
var time = 20;
var timeLimit = 20;
var responseTime;
var AverageTime = 0;


// images for winning questions
var imageArr = ["ELP1.jpg","KeithEmerson.jpg","Tarkus.jpg","TarkusTrack.jpg","TSFH.jpg"];

// Ojbect containing 5 sets of: question, choices, answer .............
var questions = [{
    tQuestion: "What is Mark's favorite Band of the '70's?",
    choices: ["Emerson Lake & Palmer","Yes","Led Zepplin","Pink Floyd","Skip Question"],
    answerIndex: 0
}, {
    tQuestion: "Who was Mark's favorite performer in his favorite band?",
    choices: ["Carl Palmer","Keith Emerson","Greg Lake","Cozy Powell","Skip Question"],
    answerIndex: 1
}, {
    tQuestion: "What was Mark's favorite ELP album?",
    choices: ["Pictures at an Exhibition","Brain Salad Surgery","Tarkus","Trilogy","Skip Question"],
    answerIndex: 2
}, {
    tQuestion: "And on that favorite album, what is his favorite song?",
    choices: ["Karn Evil 9","Knife Edge","Touch & go","Tarkus","Skip Question"],
    answerIndex: 3
}, {
    tQuestion: "Who is Mark's current favorite performer?",
    choices: ["Foo Fighters","Taylor Swift","Lady Gaga","Two Steps from Hell","Skip Question"],
    answerIndex: 3
}
]
// end of OBJECT var array above ................................

var questionNum = -1;
var answerNum = null;
var clickNum = null;
var intervalId = 0;



//------------------------- Start Game below --------------------

$("questiondisplay").hide();







// Put listening buttons on the page ........................

// Variable content Buttons listening for click event
$("#ButtonA").on("click", function() {
    clickNum = 0;
    console.log("0 position for 1st btn");        
    console.log(clickNum);
    stop();
    evaluateClick();
});


$("#ButtonB").on("click", function () {
    clickNum = 1;
    console.log("1 position or 2nd btn");        
    console.log(clickNum);
    stop();
    evaluateClick();
});


$("#ButtonC").on("click", function () {
    clickNum = 2;
    console.log("2 position for 3rd btn");        
    console.log(clickNum);
    stop();
    evaluateClick();
});


$("#ButtonD").on("click", function () {
    clickNum = 3;
    console.log("3 position for 4th btn")        
    console.log(clickNum);
    stop();   
    evaluateClick(); 
});

// SKIP BUTTON Note that only this one breaks the sequence and  
// starts with new question and answer buttons
$("#ButtonE").on("click", function () {
    clickNum = 4;
    console.log("4 or E skip button");     
    console.log(clickNum);
    console.log("skip count");
    unAnswered = unAnswered +1;
    console.log(unAnswered);
    stop();
    lastQuestion();
});    

// Start Game button
$("#startbutton").on("click", function () {
    console.log("at start of NEW game");
    stop();
    playGame();
});


// NEW GAME button to start again after game is over
// $("#ButtonG").on("click", function() {
//     console.log("at play again button");
//     startNewGame();
// });

// |||||||||||||||||| close globally available stuff |||||||||||||

// SET VARs TO INITIAL STATE OF "NOT PLAYED"
startNewGame();

// ********************** FUNCTIONS BELOW ************************


//........................................................

//-------- START GAME TO INITIAL STATE OF "NOT PLAYED" ---
function startNewGame() {
    // Set begining current value back to zero
    right = 0;
    wrong = 0;
    unAnswered = 0;
    questionNum = -1;
    responseTime = 0;
    clearInterval(intervalId);
    clockRunning = false; 
}
// .......................................................

// Start timer function ..................................
function startTimer() {
    clockRunning = true; 
    intervalId = setInterval(count, 1000);
}
//........................................................

// Counting function ......................................
function count() {
    time--;
    var converted = timeConverter(time);
    console.log("counting");
        $("#timedisplay").html(time + " seconds remaining");
      if (time === 0) {
          stop();
      }
  }
// .........................................................

// Stop timer function .....................................
function stop() {
    clearInterval(intervalId);
    // a way to keep track of cumulative 'thinking time' until click
    console.log(time);
    responseTime = responseTime + (timeLimit - time);

    console.log(timeLimit);
    console.log(responseTime);
}
// ...........................................................
// Close of Start Game set up.....................................


// Play game function: increment question # and show start button
function playGame() {
    clickNum = null;
    console.log("clickNum at play game")        
    console.log(clickNum);

    time = timeLimit = 20;
    questionNum = questionNum + 1;
    
    // if (questionNum === 5) {
    //     summaryResults ();
    // };
    

    console.log("q Num incr at play game");
    console.log(questionNum);

    startTimer();
    showCurrentQuestion();
}
// ...............................................................

// Show the current question function ..........................
function showCurrentQuestion() {
    // Show the current question in the right div
    var questionX; 
    questionX = questions[questionNum].tQuestion;
    console.log(questionX);

    $("#currentquestiondisplay").html("<p><h4> " + questionX + "</h4></p>");
    showCurrentCandidateAnswers();
    
    //$("#questiondisplay").show();   
    //console.log("at question display");
}
// Show the current answers function 
function showCurrentCandidateAnswers() {

    console.log("question number at show answers");
    console.log(questionNum);

    // CANDIDATE ANSWER CHOICES
    var candidate1 = questions[questionNum].choices[0];
    var candidate2 = questions[questionNum].choices[1];
    var candidate3 = questions[questionNum].choices[2];
    var candidate4 = questions[questionNum].choices[3];
    var candidate5 = questions[questionNum].choices[4];

    // Variably change content label in the answer set of buttons below
    // by the answer variables above
    document.getElementById('ButtonA').innerHTML = candidate1;
    document.getElementById('ButtonB').innerHTML = candidate2;
    document.getElementById('ButtonC').innerHTML = candidate3;
    document.getElementById('ButtonD').innerHTML = candidate4;
    document.getElementById('ButtonE').innerHTML = candidate5;
    document.getElementById('ButtonG').innerHTML = "Play A New Game";
}
// close current answer candidates function .................


  
// Needed time converter functions (called inside function) ...
function timeConverter(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
      if (minutes === 0) {
          minutes = "00";
      }
          else if (minutes < 10) {
              minutes = "0" + minutes;
          }
              return minutes + ":" + seconds;
}
// ..........................................................

// Evaluate answer clicked for action .......................
function evaluateClick () {
    // Answer based upon questionNum value to find right answer 
    answerNum = questions[questionNum].answerIndex;
    //console.log(questions[questionNum].choices[answerNum]);
    console.log("answerNum");
    console.log(answerNum);
    console.log("clickNum at eval");
    console.log(clickNum);

    // Note that on timed out you do not see the answer and go to next question
    if (time === 0) {
        console.log("TIMED OUT");
        $("#rightanswerdisplay").html("Hey, you got timed out!");
        unAnswered = unAnswered + 1; 
        // Nested else if statements ... if not true then falls to next group
                if (questionNum > questions.length -1) {
                    alert("Game over");
                    summaryResults();
                } else {playGame();  
                }
    }
        else if (answerNum === clickNum) {
            console.log("You are RIGHT at eval");
            $("#rightanswerdisplay").html("You are correct!");
            right = right +1;
            console.log("Matched");            
            showRightAnswer();
            }

            else if (!(answerNum === clickNum)) {

                if (!(clickNum === 4)) {
                console.log("You are INCORRECT at eval");
                $("#rightanswerdisplay").html("Sorry, you were incorrect!");
                wrong = wrong +1;
                console.log("Not matched");  
                showRightAnswer();
                //console.log(wrong);
            }

            // Note that on skipped you do not see the answer and go to next question
                else if (clickNum === 4) {
                    console.log("You skipped at eval");
                    unAnswered = unAnswered +1;
                    console.log(unAnswered);
                        if (questionNum >= questions.length -1) {
                            alert("Game over");
                            summaryResults();
                        } else {playGame();  
                        }
            //        console.log(unAnswered);
            //        console.log(questionNum);
            }
        }
    }
// Close of Evaluate Click event ............................

// Display the right answer function .........................
function showRightAnswer() {
        
        // pull the right answer from the object array var
        //$("#rightanswerdisplay").append("<p><h4> " + questionX + "</h4></p>"); 
        $("#rightanswerdisplay").append("<br><br>The right answer is <br/><h4>" + 
        (questions[questionNum].choices[answerNum]) + "</h4><br/> Here is a photo: </br>"
        );
        changeImage();
    }
// ............................................................

// Change the image associated with the right question for the rightanswerdisplay div
function changeImage() {
    activeImageIndex = questionNum;
    document.getElementById("BandPics").setAttribute("src", imageArr[activeImageIndex]);

    showNextButton();
}
//..............................................................

// Next button function ........................................
function showNextButton () {

    $("#ButtonF").on("click", function() {
        clickNum = [];
        console.log(clickNum);
        console.log("click Num cleared out");
        // Test for the last question condition
        console.log("you reached the next button");
    });
    console.log("you are after next button");

    lastQuestion();
}
// ..............................................................

//--------------------------------------------------------------
// LAST QUESTION FUNCTION
// Loops to next question if not done OR  goes to summary

function lastQuestion () {
    console.log("questionNum last Q test ");
    console.log(questionNum);
    console.log(questions.length -2);

    // This is to next question branch
    if (questionNum <= questions.length -2) {
        // NEW -- GO TO SHOWING THE NEXT set of QUESTION AND ANSWERS
        playGame();
    }
        else if (questionNum >= questions.length -1) {
            //alert("Game over");
            AverageTime = (responseTime / 5);
            // Show scores
            $("#summaryresultsdisplay").html("Right answers: <h4>" + 
            right + 
            "</h4><br>Incorrect answers: <h4>" +
            wrong +
            "</h4><br>Skipped: <h4>" +
            unAnswered +
            "</h4><br>Average time to respond: <h4>" + 
            AverageTime +
            "</h4> seconds per question.<br>");
            // message text for game over
            $("#summaryresultsdisplay").prepend("<h3><br/>Game is over.</h3><br>");

            // // NEW GAME button to start again after game is over
            // $("#ButtonG").on("click", function() {
            //     console.log("at play again button");
            //     startNewGame();
            // });
            // document.getElementById('ButtonG').innerHTML = "Play A New Game";


    }
}

// NEW GAME button to start again after game is over
$("#ButtonG").on("click", function() {
    console.log("at play again button");
    startNewGame();
});
document.getElementById('ButtonG').innerHTML = "Play A New Game";

//................................................................

// Open the summary results function -----------------------------
// function summaryResults() {
//     console.log("At summary");

//     // Text for scores
//     $("#summaryresultsdisplay").html("Right answers: <h4>" + 
//     right + 
//     "</h4><br/>Incorrect answers: <h4>" +
//      wrong +
//     "</h4><br>Skipped: <h4>" +
//      unAnswered +
//     "</h4><br></br>");
//     // message text for game over
//     $("#summaryresultsdisplay").appendTo("</h4><br/>Game is over. " + "  Click to play again</h4><br>");
// }
// Close the summary results function ----------------------------   



// BELOW WILL BE USED AS FODDER FOR AN AVERAGE TIME TO ANSWER
//var lap = 0;
// this kind of reset is not needed for this game
//function reset() {
  //time = 15;
  //lap = 0;
  //$("#timedisplay").text("00");
  //$("#laps").text("");
//}

// function recordLap() {
//   var converted = timeConverter(time);
//   $("#laps").append("<p>Lap " + lap + " : " + converted + "</p>");
//   lap++;
// }
// ................................................................

        // 'hide' div's that are not needed yet
        // show the instruction
        //$("#instruct").show();   
        // Hide the the bigger div that holds time, question, answers
        //$("gameplayholderdisplay").hide();
        // Hide the time counter div
        //$("#timedisplay").hide();
        // Hide the question div
        //$("#questiondisplay").hide();
        // Hide the question set information div
        //$("#candidatesdisplay").hide(); 
        // Hide the rightanswer div
        //$("#rightanswerdisplay").hide();
        // Hide the summaryresults div
        //$("#summaryresultsdisplay").hide();

                // console.log(answerNum);
        // console.log("Answer");
        // clear the DOM of certain div's later to control what is shown
            //$("#timedisplay").hide();
            //$("#instructdisplay").hide();
            //$("#candidatesdisplay").hide();
            //$("#rightanswerdisplay").hide();
            //$("#rightanswerdisplay").show();  




// CLOSING FOR DOCUMENT READY
});