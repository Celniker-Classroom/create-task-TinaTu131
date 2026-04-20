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

var userAnswers = []; 
var currentIndex = 0; 

function calculateDimension(answers, dim) {

  var firstCount = 0;  
  var secondCount = 0;

  for (var i = 0; i < questions.length; i++) {

    if (questions[i].dimension == dim) {

      if (answers[i] == true) {
        if (questions[i].direction == dim[0]) {
          firstCount++;
        } else {
          secondCount++;
        }
      } else {
        if (questions[i].direction == dim[0]) {
          secondCount++;
        } else {
          firstCount++;
        }
      }
    }
  }


  if (firstCount > secondCount) {
    return dim[0];
  } else {
    return dim[1];
  }
}
function startQuiz(){
  currentIndex = 0; userAnswers = []; 
  document.getElementById ("welcome-section").style.display = "none";
  document.getElementById("quiz-section").style.display = "block";
  showQuestion();
}
 
function showQuestion(){
  document.getElementById("question-text").textContent = questions[currentIndex].text; 
  "Question"+ (currentIndex+1) + "of" + questions.length;
}
 
function submitAnswer(answer){
  userAnswers.push(answer); 
  currentIndex = currentIndex +1;
  if (currentIndex < questions.length){
    showQuestion();
  } else {
    showResult();}
  }
  

function showResult() {
    var letter1 = calculateDimension(userAnswers, "EI");
    var letter2 = calculateDimension(userAnswers, "SN");
    var letter3 = calculateDimension(userAnswers, "TF");
    var letter4 = calculateDimension(userAnswers, "JP");

    var result = letter1 + letter2 + letter3 + letter4;

    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("result-section").style.display = "block";
    document.getElementById("result-type").textContent = "Your MBTI Type: " + result;
    document.getElementById("result-description").textContent = getDescription(result);
}

function getDescription(type) { 
    if (type == "ISTJ") { return "The Logistician: Responsible, sincere, and analytical."; }
    if (type == "ISFJ") { return "The Defender: Dedicated, warm, and protective."; }
    if (type == "INFJ") { return "The Advocate: Quiet, mystical, and inspiring."; }
    if (type == "INTJ") { return "The Architect: Imaginative, strategic, and determined."; }
    if (type == "ISTP") { return "The Virtuoso: Bold, practical, and curious."; }
    if (type == "ISFP") { return "The Adventurer: Flexible, charming, and artistic."; }
    if (type == "INFP") { return "The Mediator: Poetic, kind, and altruistic."; }
    if (type == "INTP") { return "The Logician: Innovative, curious, and logical."; }
    if (type == "ESTP") { return "The Entrepreneur: Energetic and action-oriented."; }
    if (type == "ESFP") { return "The Entertainer: Spontaneous, energetic, and enthusiastic."; }
    if (type == "ENFP") { return "The Campaigner: Enthusiastic, creative, and sociable."; }
    if (type == "ENTP") { return "The Debater: Smart, curious, and witty."; }
    if (type == "ESTJ") { return "The Executive: Organized, logical, and assertive."; }
    if (type == "ESFJ") { return "The Consul: Caring, sociable, and popular."; }
    if (type == "ENFJ") { return "The Protagonist: Charismatic, inspiring, and altruistic."; }
    if (type == "ENTJ") { return "The Commander: Bold, imaginative, and strong-willed."; }
    return "A unique personality type!";
}

function restartQuiz() {
    userAnswers = [];
    currentIndex = 0;
    document.getElementById("result-section").style.display = "none";
    document.getElementById("welcome-section").style.display = "block";
}

document.getElementById("agree-btn").addEventListener("click", function() {
    submitAnswer(true);
});

document.getElementById("disagree-btn").addEventListener("click", function() {
    submitAnswer(false);
});

document.getElementById("restart-btn").addEventListener("click", function() {
    restartQuiz();
});

 document.getElementById("start-btn").addEventListener("click", function() {
    startQuiz();
});