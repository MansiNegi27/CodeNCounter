const stopRecording = document.getElementById('stopRecording');
stopRecording.addEventListener("click",stopRec);
const startRecording = document.getElementById('startRecording');
startRecording.addEventListener("click",startRec);

function handleRecommendations()
{
  const tag = document.getElementById('chosenLabel').classList[0];
  const http = new XMLHttpRequest();
  const url = 'http://localhost:4600/recommendations';
  http.open('POST',url,true);
  http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  http.setRequestHeader('DATA', tag);
  http.send();
}

function startRec()
{
  const startRecording = document.getElementById('startRecording');
  const icon = document.createElement('i');
  startRecording.innerHTML ="";
  icon.classList.add('fa');
  icon.classList.add('fa-microphone');
  icon.classList.add('fa-2x');
  startRecording.appendChild(icon);
  const textbox = document.getElementById('text');
  text.classList.remove('dontshow');
  const stopRecord = document.getElementById('stopRecord');
  stopRecord.classList.remove('dontshow');
}

function showEmojis(predictedLabel,pictureQuote)
{
  const heading = document.createElement('h3');
  const icon = document.createElement('h1');
  const chosenLabel = document.getElementById('chosenLabel');
  chosenLabel.classList.add(predictedLabel)
  const goRecommend = document.createElement('button');
  goRecommend.classList.add('btn');
  goRecommend.classList.add('btn-primary');
  goRecommend.classList.add('recommend');
  goRecommend.innerHTML = "See the suggestions";
  heading.innerHTML = pictureQuote;
  heading.classList.add('quote');
  const app = document.getElementById('app');
  app.appendChild(heading);
  app.appendChild(icon);
  app.appendChild(goRecommend);
  const emos = {
    "Angry" : "&#128545",
    "Sad" : 	"&#128542",
    "Happy" : "&#128516"
  }
  icon.innerHTML = emos[predictedLabel];
  icon.classList.add('myEmoji');
  goRecommend.addEventListener('click',handleRecommendations);
}

function showPrediction(predictedLabel)
{
    const app = document.getElementById('app');
    app.innerHTML = "";
    const quote = {
      "Angry" :"Why so angry ? You need to calm down",
      "Sad":"Please don't be sad :( , Smile",
      "Happy":"Yayy, let's spread more happiness"
    };
    const pictureQuote = quote[predictedLabel];
    if(pictureQuote.length>0)
    {
      showEmojis(predictedLabel,pictureQuote);
    }
}

function stopRec()
{
  let text = document.getElementById('textbox');
  const http = new XMLHttpRequest();
  const url = 'http://localhost:4600';
  http.open('POST',url,true);
  http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  http.setRequestHeader('DATA', text.value);
  http.onload = (e) =>{
      const predictedLabel =  (JSON.parse(http.response)).data;
      const length = predictedLabel.length;
      const finalLabel = predictedLabel.substr(0,length-2);
      const expectedLabel = ["Angry","Sad","Happy"];
      if(expectedLabel.indexOf(finalLabel) != -1)
      {
        showPrediction(finalLabel);
      }else{
        console.log("Wrong Label");
        window.alert("Not recognition");
      }
  };
  http.send();
}


var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

var Textbox = $('#textbox');
var instructions = $('instructions');

var Content = '';

recognition.continuous = true;

recognition.onresult = function(event) {

  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;

    Content += transcript;
    Textbox.val(Content);

};

recognition.onstart = function() {
  instructions.text('Voice recognition is ON.');
}

recognition.onspeechend = function() {
  instructions.text('No activity.');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('Try again.');
  }
}

$('#startRecording').on('click', function(e) {
  if (Content.length) {
    Content += ' ';
  }
  recognition.start();
});

Textbox.on('input', function() {
  Content = $(this).val();
})
