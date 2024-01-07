window.addEventListener('DOMContentLoaded', function() {
  const recordButton = document.getElementById("recordButton");
  const mainElement = document.getElementById("mainElement");
  const returnText = document.getElementById("returnText"); 
  const loadingIcon = document.getElementById("loadingIcon");
  const audioPlayer = document.getElementById("audioPlayer");
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

    displayImageForName(randomName);
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

function displayImageForName(name) {
  const imageElement = document.getElementById('displayedImage');

  // Assuming you have a way to determine the image source based on the name
  const imageUrl = '/path/to/images/' + name + '.jpg'; // Modify as needed

  imageElement.src = imageUrl;
  imageElement.alt = 'Image for ' + name;
  imageElement.style.display = 'block'; // Show the image
}

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
      
      audioPlayer.src = "/audio/" + character + "/" + score;

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