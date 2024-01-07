window.addEventListener('DOMContentLoaded', function() {
  const recordButton = document.getElementById("recordButton");
  const mainElement = document.getElementById("mainElement");
  const returnText = document.getElementById("returnText"); 
  const loadingIcon = document.getElementById("loadingIcon");
  const audioPlayer = document.getElementById("audioPlayer");

  recordButton.addEventListener('animationend', (event) => {
    if (event.animationName === 'moveAndFadeOut'){  
      recordButton.style.display = "none";
      recordButton.classList.remove('moveAndFadeOut');
    }
  });

  // functionality for recording
  recordButton.addEventListener('click', () => {
    // animate the button and visuals
    recordButton.classList.add('moveAndFadeOut');
    mainElement.style.display = "flex";
    mainElement.classList.add('fadeIn');
    // record
    toggleRecording();
  });

});

function sendData(audioBlob) {

  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.wav')

  // hide visualizer & display a loading icon while we wait for the fetch
  mainElement.style.display = "none";
  loadingIcon.style.display = "flex";
  loadingIcon.classList.add("moveAndFadeIn");
  loadingIcon.addEventListener('animationend', (event) => {
    if (event.animationName === 'moveAndFadeIn'){  
      loadingIcon.classList.remove("moveAndFadeIn");
      loadingIcon.classList.add("loadAnimation")
    }
  });

  // post data to backend
  fetch('/get_data', {
    method: 'POST',
    body: formData,
  })

  // display response
  .then(response => response.json())
  .then(data => {
    // dismiss loading icon
    loadingIcon.addEventListener('animationiteration', () => {
      loadingIcon.classList.remove("loadAnimation");
      loadingIcon.innerHTML = ("🤓");
      loadingIcon.classList.add("moveAndFadeOut");
    });
    loadingIcon.addEventListener('animationend', (event) => {
      if (event.animationName === "moveAndFadeOut"){
      loadingIcon.style.display = "none";
      loadingIcon.innerHTML = ("🤔");
      loadingIcon.classList.remove("moveAndFadeOut");

      // format the response and add to div
      const score = data.score;
      const character = data.character;
        
      // get the audio player to play the end quip
      
      audioPlayer.src = "/audio";

      if (score >= 50){
        returnText.innerHTML = "Good job! Your impression of " + character + "'s voice is worth " + score + " points!";
      }
      else if (score < 50) {
        returnText.innerHTML = "Womp womp. Your impression of " + character + "'s voice is only worth " + score + " points.";
      }
      
      // the div gets centered weird so gotta do it here
      returnText.style.position = "absolute";
      returnText.style.transform = "translate(-50%,-50%)";
      returnText.style.display = "flex";
      returnText.style.margin = "0px 20px 0px 20px"
      returnText.classList.add("moveAndFadeIn");

      // end quip
      audioPlayer.load();
      audioPlayer.play();

    }});


    
  })

  // error case
  .catch(error => {
    console.error('Error:', error);
  });
}