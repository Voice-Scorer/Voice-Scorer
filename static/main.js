
const recordButton = document.getElementById("recordButton");
const mainElement = document.querySelector("main");
const returnText = document.getElementById("returnText");

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
  
  function sendData(audioBlob) {

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav')

    // hide visualizer & display a loading icon while we wait for the fetch
    mainElement.style.display = "none";
    document.getElementById("lds-ripple").s;

    // post data to backend
    fetch('/get_data', {
      method: 'POST',
      body: formData,
    })

    // display response
    .then(response => response.json())
    .then(data => {  
      loadingIcon.style.display = "none";
      const returned_data = data.return_data;

      // display response

    })

    // error case
    .catch(error => {
      console.error('Error:', error);
    });
  }

