// add javascript here
// purpose: discover MBTI type by asking questions

// "start test"
// input: user responds with a scale (e.g., 1–5 from disagree to agree)
// output: "Your MBTI Type: ENFP" with a short description

// data abstraction
var questions = [
  { text: "Do you feel energized after spending time with other people?", dimension: "EI", direction: "E" },
  { text: "Do you prefer quiet time alone to recharge?", dimension: "EI", direction: "I" },

  { text: "Do you focus more on concrete facts and details?", dimension: "SN", direction: "S" },
  { text: "Do you enjoy thinking about ideas and future possibilities?", dimension: "SN", direction: "N" },

  { text: "Do you make decisions based on logic and objective analysis?", dimension: "TF", direction: "T" },
  { text: "Do you consider emotions and people's feelings when making decisions?", dimension: "TF", direction: "F" },

  { text: "Do you prefer having a clear plan and schedule?", dimension: "JP", direction: "J" },
  { text: "Do you like to stay flexible and adapt as things happen?", dimension: "JP", direction: "P" }
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