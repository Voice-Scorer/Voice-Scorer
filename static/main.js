document.getElementById('recordButton').addEventListener('click', () => {
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

