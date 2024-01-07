window.addEventListener('DOMContentLoaded', function() {
  const recordButton = document.getElementById("recordButton");
  const mainElement = document.getElementById("mainElement");
  const returnText = document.getElementById("returnText"); 
  const loadingIcon = document.getElementById("loadingIcon");
  const randomButton = document.getElementById("randomButton"); // New button


  const names = ["Donald Trump", "SpongeBob", "Kayne West", "Marge Simpson", "Squidward Tenticles", "Morgan Freeman", "Andrew Tate", "Kendric Lamar"];

  // Existing event listeners and functions

  // New functionality for random number picking
  randomButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];
    mainElement.textContent = randomName; // Display the random name
 // Display the random number
    mainElement.style.display = "flex";
    mainElement.classList.add('slotMachineAnimation'); // Add slot machine animation class
  });

  // Slot machine animation end event
  mainElement.addEventListener('animationend', (event) => {
    if (event.animationName === 'slotMachineAnimation'){  
      mainElement.classList.remove('slotMachineAnimation');
    }
  });

// Ensure to define the 'slotMachineAnimation' in your CSS with appropriate keyframes

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
      loadingIcon.classList.add("moveAndFadeOut");
    });
    loadingIcon.addEventListener('animationend', (event) => {
      if (event.animationName === "moveAndFadeOut"){
      loadingIcon.style.display = "none";
      loadingIcon.classList.remove("moveAndFadeOut");

      // format the response and add to div
      const score = data.score;
      const character = data.character;
      returnText.innerHTML = "Your score for " + character + "'s voice is " + score + "!";

      // the div gets centered weird so gotta do it here
      returnText.style.position = "absolute";
      returnText.style.transform = "translate(-50%,-50%)";
      returnText.style.display = "flex";
      returnText.classList.add("moveAndFadeIn");

    }});


    
  })

  // error case
  .catch(error => {
    console.error('Error:', error);
  });
}