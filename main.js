x = 0;
y = 0;
draw_apple = "";
screen_width = 0
screen_height = 0

apple = ""
speak_data = ""
to_number = ""

function preload() {
  apple = loadImage("apple.png")
}


function setup() {
  createCanvas(900, 600)

  screen_width = window.innerWidth;
  screen_heigth = window.height;

}

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
  document.getElementById("status").innerHTML = "System Is Listening Please Speak";
  recognition.start();
}

recognition.onresult = function (event) {

  console.log(event);

  content = event.results[0][0].transcript;

  document.getElementById("status").innerHTML = "The Speech Has Been Recognized: " + content;

  to_number = Number(content);

  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "Started Drawing Apple";
    draw_apple = "set"
  }
  else {
    document.getElementById("status").innerHTML = "The Speech Has Not Recognise The Number";
  }

}


function draw() {
  if (draw_apple == "set") {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    speak_data = to_number + "Apples Drawn";
    speak();
    for (var i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(apple, x, y, 50, 50);
    }
  }
}


function speak() {
  var synth = window.speechSynthesis;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  speak_data = "";

}

