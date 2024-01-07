window.addEventListener('DOMContentLoaded', function() {
  const recordButton = document.getElementById("recordButton");
  const mainElement = document.getElementById("mainElement");
  const returnText = document.getElementById("returnText"); 
  const loadingIcon = document.getElementById("loadingIcon");

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
    loadingIcon.addEventListener('animationiteration', () => {
      loadingIcon.classList.remove("loadAnimation");
      loadingIcon.classList.add("moveAndFadeOut");
    });
    loadingIcon.addEventListener('animationend', (event) => {
      if (event.animationName === "moveAndFadeOut"){
      loadingIcon.style.display = "none";
      loadingIcon.classList.remove("moveAndFadeOut");
    }});
    // display response
    const returned_data = data.return_data;
  })

  // error case
  .catch(error => {
    console.error('Error:', error);
  });
}