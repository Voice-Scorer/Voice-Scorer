var finalResultIndex = "undefined";

window.addEventListener('DOMContentLoaded', function() {
  const recordButton = document.getElementById("recordButton");
  const mainElement = document.getElementById("mainElement");
  const returnText = document.getElementById("returnText"); 
  const loadingIcon = document.getElementById("loadingIcon");
  const audioPlayer = document.getElementById("audioPlayer");
  const randomButton = document.getElementById('randomButton');
  const characterRoll = document.getElementById("characterRoll");

  const names = ["Donald Trump", "SpongeBob", "Kayne West", "Marge Simpson", "Squidward Tentacles", "Morgan Freeman", "Andrew Tate", "Kendrick Lamar"];

  recordButton.addEventListener('animationend', (event) => {
    if (event.animationName === 'moveAndFadeOut'){  
      recordButton.style.display = "none";
      recordButton.classList.remove('moveAndFadeOut');
    }
  });

  // functionality for recording
  recordButton.addEventListener('click', () => {
    // animate the button and visuals
    characterRoll.style.display = "none";
    recordButton.classList.remove("moveAndFadeIn");
    recordButton.classList.add('moveAndFadeOut');
    mainElement.style.display = "flex";
    // record
    toggleRecording();
  });

  // Boolean flag to control the animation
  let isCycling = false;

  var cycles = 15

  // Function to cycle through the text array
  function cycleText(index) {
    characterRoll.innerHTML = names[index];
    
    // Adjust the speed of cycling here (you can use timeouts or intervals)
    // This is a simple example, adjust the logic to slow down the cycling
    setTimeout(() => {
      if (isCycling) {
        const nextIndex = (index + 1) % names.length;
        cycleText(nextIndex);
        if (cycles === 0){
          stopCyclingAndShowResult();
        }
        cycles-=1;
      }
    }, 100); // Adjust the interval duration for cycling
  }

  // Event listener for the button click
  randomButton.addEventListener('click', () => {
    characterRoll.style.display = "flex";
    characterRoll.classList.add("slideDown");
    randomButton.classList.add("moveAndFadeOut");
    characterRoll.addEventListener('animationend', (event) => {
      if (event.animationName === 'slideDown'){  
        randomButton.style.display = "none";
        characterRoll.classList.remove("slideDown");
        recordButton.classList.add("moveAndFadeIn");
        recordButton.style.display = "flex";
      }
    });
    isCycling = true;
    cycleText(0); // Start cycling through the text array
  });

  // Logic to stop the cycling and settle on a result
  // This can be triggered after a certain duration or condition
  function stopCyclingAndShowResult() {
    isCycling = false;
    // Logic to determine the final result, e.g., random selection or based on a condition
    finalResultIndex = Math.floor(Math.random() * names.length); // Random result for example
    characterRoll.innerHTML = names[finalResultIndex];
    cycles = 15;
  }


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
  formData.append('audio', audioBlob, 'recording.wav');
  console.log(finalResultIndex);
  formData.append("character", finalResultIndex);

  // hide visualizer & display a loading icon while we wait for the fetch
  mainElement.style.display = "none";
  loadingIcon.style.display = "flex";
  loadingIcon.classList.add("moveAndFadeIn");
  loadingIcon.addEventListener('animationend', (event) => {
    if (event.animationName === 'moveAndFadeIn'){  
      loadingIcon.classList.remove("moveAndFadeIn");
      loadingIcon.classList.add("loadAnimation");
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