let mediaRecorder;
let recordedChunks = [];
let isRecording = false;
let timeoutId;

async function toggleRecording() {
  if (!isRecording) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const recordedBlob = new Blob(recordedChunks, { type: 'audio/wav' });
      // send recording to backend on stop
      sendData(recordedBlob);
    };

    // start recording
    mediaRecorder.start();

    // auto stop after 5 seconds
    timeoutId = setTimeout(() => {
      stopRecording();
    }, 5000);

    isRecording = true;
  } else {
    stopRecording();
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    clearTimeout(timeoutId); // clear the auto stop timeout
    isRecording = false;
  }
}
