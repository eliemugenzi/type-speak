const synth = window.speechSynthesis;

//DOM elements selection

const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

//Initialize voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  voices.forEach(voice => {
    const option = document.createElement("option");
    option.textContent = voice.name + "(" + voice.lang + ")";

    //Set needed attributes to an option
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//Speak

const speak = () => {
  //check if speaking
  if (synth.speaking) {
    console.error("Still speaking");
    return;
  }

  if (textInput.value !== "") {
    body.style.background =
      "#141414 url(http://38.media.tumblr.com/4804740c190d8a0430550a2fc8541409/tumblr_ngk1sj6g8O1r2xv8po1_500.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    //End Speaking...
    speakText.onend = e => {
      console.log("Done Speaking...");
      body.style.background = "#141414";
    };

    //Error in Speaking...
    speakText.onerror = e => {
      console.error("Something went wrong...");
    };

    //Selected Voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    //Loop though Voices

    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    //Set Pitch and Rate

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //Speak

    synth.speak(speakText);
  }
};

//Event Listeners

textForm.addEventListener("submit", e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

rate.addEventListener("change", e => (rateValue.textContent = rate.value));

pitch.addEventListener("change", e => (pitchValue.textContent = pitch.value));

voiceSelect.addEventListener("change", e => speak());
