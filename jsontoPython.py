import tensorflow as tf
import numpy as np
import librosa  # For audio processing

# Load your pre-trained model (Ensure you have the model files)
model = tf.keras.models.load_model('path_to_your_model.h5')

def preprocess_audio(audio_path, sr=16000, n_mfcc=13, n_fft=2048, hop_length=512):
    # Load the audio file
    audio, _ = librosa.load(audio_path, sr=sr)

    # Extract MFCCs from the audio
    mfccs = librosa.feature.mfcc(audio, sr=sr, n_mfcc=n_mfcc, n_fft=n_fft, hop_length=hop_length)

    # Transpose the result to align with the model's expected input
    mfccs = mfccs.T

    # Add a dimension to match the input shape of the model (batch_size, timesteps, features)
    mfccs = np.expand_dims(mfccs, axis=0)

    return mfccs

def interpret_prediction(prediction):
    # Assuming the prediction is a softmax output
    predicted_label_index = np.argmax(prediction)
    return predicted_label_index

def predict(audio_path):
    # Preprocess the audio
    processed_audio = preprocess_audio(audio_path)

    # Predict using your model
    prediction = model.predict(processed_audio)

    # Interpret the prediction
    predicted_label = interpret_prediction(prediction)

    return predicted_label

# Use the function
audio_path = 'path_to_your_audio_file.wav'
label = predict(audio_path)
print("Predicted Label:", label)

