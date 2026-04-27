var questions = [
  { text: "Do you feel energized after spending time with other people?", dimension: "EI", direction: "E" },
  { text: "Do you prefer quiet time alone to recharge?", dimension: "EI", direction: "I" },
  { text: "You find the idea of networking or promoting yourself to strangers very daunting.", dimension: "EI", direction: "I"},

  { text: "Do you focus more on concrete facts and details?", dimension: "SN", direction: "S" },
  { text: "Do you enjoy thinking about ideas and future possibilities?", dimension: "SN", direction: "N" },
  { text: "You are not too interested in discussions about various interpretations of creative works.", dimension: "SN", direction:"S"},

  { text: "Do you make decisions based on logic and objective analysis?", dimension: "TF", direction: "T" },
  { text: "Do you consider emotions and people's feelings when making decisions?", dimension: "TF", direction: "F" },
  { text: "People's stories and emotions speak louder to you than numbers or data.", dimension: "TF", direction:"F"},

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

//character database
  function getFamousPeople(type) {
    const famous = {
      "ISTJ": "George Washington, Queen Elizabeth II, Jeff Bezos",
      "ISFJ": "Mother Teresa, Kate Middleton, Beyoncé",
      "INFJ": "Martin Luther King Jr., Nelson Mandela, Lady Gaga",
      "INTJ": "Elon Musk, Isaac Newton, C.S. Lewis",
      "ISTP": "Clint Eastwood, Bear Grylls, Tom Cruise",
      "ISFP": "Frida Kahlo, Michael Jackson, Britney Spears",
      "INFP": "William Shakespeare, J.R.R. Tolkien, Kurt Cobain",
      "INTP": "Albert Einstein, Charles Darwin, Bill Gates",
      "ESTP": "Ernest Hemingway, Madonna, Donald Trump",
      "ESFP": "Marilyn Monroe, Jamie Oliver, Adele",
      "ENFP": "Robin Williams, Ellen DeGeneres, Walt Disney",
      "ENTP": "Mark Twain, Leonardo da Vinci, Steve Jobs",
      "ESTJ": "Michelle Obama, Hillary Clinton, Judge Judy",
      "ESFJ": "Taylor Swift, Bill Clinton, Steve Harvey",
      "ENFJ": "Barack Obama, Oprah Winfrey, Martin Luther King",
      "ENTJ": "Steve Jobs, Gordon Ramsay, Margaret Thatcher"
    };
    return famous[type] || "Many influential people share your type!";
  }

  function updateProgressBar() {
    var fill = document.getElementById("progress-fill");
    var answered = currentIndex;
    var percent = (answered / questions.length) * 100;
    if (fill) fill.style.width = percent + "%";
    var progressSpan = document.getElementById("progress");
    if (progressSpan) {
      if (currentIndex < questions.length) {
        progressSpan.textContent = (currentIndex + 1) + " / " + questions.length;
      } else {
        progressSpan.textContent = questions.length + " / " + questions.length;
      }
    }
  }
 
  function showQuestion() {
    if (currentIndex < questions.length) {
      document.getElementById("question-text").textContent = questions[currentIndex].text;
      updateProgressBar();
    }
  }
  
  function submitAnswer(answer) {
    if (currentIndex >= questions.length) return;
    userAnswers.push(answer); 
    currentIndex = currentIndex + 1;
    updateProgressBar();  
    
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      setTimeout(function() {
        showResult();
      }, 80);
    }
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

    document.getElementById("famous-people").innerHTML =
      "<strong>Famous people with your type:</strong><br>" +
      getFamousPeople(result);
  }
//start quiz
  function startQuiz() {
    currentIndex = 0; 
    userAnswers = []; 
    document.getElementById("welcome-section").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";
    var fill = document.getElementById("progress-fill");
    if (fill) fill.style.width = "0%";
    var progressSpan = document.getElementById("progress");
    if (progressSpan) progressSpan.textContent = "1 / " + questions.length;
    showQuestion();
  }
  
  function restartQuiz() {
    userAnswers = [];
    currentIndex = 0;
    document.getElementById("result-section").style.display = "none";
    document.getElementById("welcome-section").style.display = "block";
    var fill = document.getElementById("progress-fill");
    if (fill) fill.style.width = "0%";
  }
//more description
  function getDescription(type) { 
    const shortDesc = {
      "ISTJ": "The Logistician: Responsible, sincere, and analytical. Practical fact‑based organizer.",
      "ISFJ": "The Defender: Dedicated, warm, and protective. Quietly caring for others.",
      "INFJ": "The Advocate: Quiet, mystical, and inspiring. Visionary with deep empathy.",
      "INTJ": "The Architect: Imaginative, strategic, and determined. Master of systems.",
      "ISTP": "The Virtuoso: Bold, practical, and curious. Action‑oriented problem solver.",
      "ISFP": "The Adventurer: Flexible, charming, and artistic. Sensitive live‑in‑the‑moment type.",
      "INFP": "The Mediator: Poetic, kind, and altruistic. Guided by inner values.",
      "INTP": "The Logician: Innovative, curious, and logical. Analytical thinker.",
      "ESTP": "The Entrepreneur: Energetic and action‑oriented. Realistic risk‑taker.",
      "ESFP": "The Entertainer: Spontaneous, energetic, and enthusiastic. Vibrant and sociable.",
      "ENFP": "The Campaigner: Enthusiastic, creative, and sociable. People‑oriented idealist.",
      "ENTP": "The Debater: Smart, curious, and witty. Innovative brainstormer.",
      "ESTJ": "The Executive: Organized, logical, and assertive. Natural leader.",
      "ESFJ": "The Consul: Caring, sociable, and popular. Devoted helper.",
      "ENFJ": "The Protagonist: Charismatic, inspiring, and altruistic. Teacher & mentor.",
      "ENTJ": "The Commander: Bold, imaginative, and strong‑willed. Strategic visionary."
    };
    return shortDesc[type] || "A unique personality type with remarkable traits.";
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