const recordButton = document.getElementById("recordButton");

recordButton.addEventListener('animationend', (event) => {
  if (event.animationName === 'fadeOut'){  
    recordButton.style.display = "none";
    recordButton.classList.remove('fadeOut');
  }

});

// functionality for recording
recordButton.addEventListener('click', () => {
  // animate the button
  recordButton.classList.add('fadeOut');

  // record
  toggleRecording();
    
  });
  
  function sendData(audioBlob) {

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav')
    
    // post data to backend
    fetch('/get_data', {
      method: 'POST',
      body: formData,
    })

    // display response
    .then(response => {  
      console.log('Response from server: ', response)
    })

    // error case
    .catch(error => {
      console.error('Error:', error);
    });
  }

