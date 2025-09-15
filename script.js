// Randomize bubbles
document.querySelectorAll(".bubble").forEach((bubble) => {
  bubble.style.left = Math.random() * 100 + "vw";
  let size = Math.random() * 8 + 2;
  bubble.style.width = size + "vw";
  bubble.style.height = size + "vw";
  bubble.style.animationDuration = Math.random() * 6 + 6 + "s";
  bubble.style.animationDelay = Math.random() * 4 + "s";
});

let recognition = new window.webkitSpeechRecognition();
let Textbox = document.querySelector("#textarea input");
let camera = document.querySelector(".display");
let snapshot = document.getElementById("spanshot");

let synth = window.speechSynthesis;
let msg1 = new SpeechSynthesisUtterance("Taking your selfie in five seconds.");
let msg2 = new SpeechSynthesisUtterance("Your command does not match.");

function start() {
  Textbox.value = "";
  recognition.start();
}

recognition.onresult = function (event) {
  let command = event.results[0][0].transcript.trim().toLowerCase();
  Textbox.value = command;

  if (command === "selfie") {
    speak();
  } else {
    synth.speak(msg2);
  }
};

function speak() {
  synth.speak(msg1);
  Webcam.attach(camera);
  setTimeout(function () {
    takeSelfie();
    save();
  }, 5000);
}

function takeSelfie() {
  Webcam.snap(function (image) {
    snapshot.style.display = "block";
    snapshot.style.textAlign = "center";
    snapshot.innerHTML = `
    <h2>Your selfie:</h2>
    <img src="${image}" id="selfie" />`;
  });
}

function save() {
  let saveLink = document.createElement("a");
  let img = document.querySelector("#spanshot img").src;
  let timestamp = new Date().getTime();
  saveLink.download = `selfie-${timestamp}.png`;
  saveLink.href = img;
  saveLink.click();
}
