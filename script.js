// add javascript here
// purpose: discover MBTI type by asking questions

// "start test"
// input: user responds with a scale (e.g., 1–5 from disagree to agree)
// output: "Your MBTI Type: ENFP" with a short description

// data abstraction
var questions = [
  { text: "Do you feel energized after spending time with other people?", dimension: "EI", direction: "E" },
  { text: "Do you prefer quiet time alone to recharge?", dimension: "EI", direction: "I" },
  { text: "You find the idea of networking or promoting yourself to strangers very daunting.", dimension: "EI", direction: "I"},

  { text: "Do you focus more on concrete facts and details?", dimension: "SN", direction: "S" },
  { text: "Do you enjoy thinking about ideas and future possibilities?", dimension: "SN", direction: "N" },
  { text: "You are not too interested in discussions about various interpretations of creative works.", dimension: "SN", direction:"S"},

  { text: "Do you make decisions based on logic and objective analysis?", dimension: "TF", direction: "T" },
  { text: "Do you consider emotions and people's feelings when making decisions?", dimension: "TF", direction: "F" },
  { text: "People’s stories and emotions speak louder to you than numbers or data.", dimension: "TF", direction:"F"},

  { text: "Do you prefer having a clear plan and schedule?", dimension: "JP", direction: "J" },
  { text: "Do you like to stay flexible and adapt as things happen?", dimension: "JP", direction: "P" },
  { text: "You often allow the day to unfold without any schedule at all.", dimension: "JP", direction: "P"},
];

var userAnswers = []; // store every question answer 
var currentIndex = 0; // track which question is currently being shown

// calculate dimension result
function calculateDimension(answers, dim) {
  // answers: user's answer list (userAnswers)
  // dim: which dimension to calculate, e.g., "EI", "SN", "TF", "JP"

  var firstCount = 0;  // score for first letter (E)
  var secondCount = 0; // score for second letter (I)

  // loop through all questions
  for (var i = 0; i < questions.length; i++) {

    // check if question belongs to the target dimension
    if (questions[i].dimension == dim) {

      if (answers[i] == true) {
        // if user agrees, count toward the direction of the question
        if (questions[i].direction == dim[0]) {
          firstCount++;
        } else {
          secondCount++;
        }
      } else {
        // if user disagrees, count toward the opposite direction
        if (questions[i].direction == dim[0]) {
          secondCount++;
        } else {
          firstCount++;
        }
      }
    }
  }

  // return the letter with higher score
  if (firstCount > secondCount) {
    return dim[0];
  } else {
    return dim[1];
  }
}
  // startQuiz()- 
  currentIndex = 0; userAnswers = []; // reset the question number to 0, and clear all previous answers.
  document. getElementById ("welcome-section").style.display = "none";
  document.getElementById("quiz-section").style.display = "block";
  showQuestion();
  // function to display the first questions
  //display
  document.getElementById("question-text").textContent = questions[currentIndex]. text; 
  "Question"+ (currentIndex+1) + "of" + questions.length // Question 1 of 12 
  
  userAnswers.push(answer); // .push() adds an element to the end of a list. // true true false 
  currentIndex = currentIndex +1; // move to the next question 
  if (currentIndex < questions.length){
    showQuestion();
  } else {
    showResult();}
  // list stores 6 questions, each question contains the question text, the dimension it measures ("EI"), and the direction indicates E or indicates
