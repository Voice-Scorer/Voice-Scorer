import speech_recognition as sr
import wave
from transformers import pipeline
from pynput import keyboard

class VoiceDectetor:
    def __init__(self):
        self.r = sr.Recognizer()
        self.model = "MoritzLaurer/DeBERTa-v3-base-mnli-fever-anli"
        self.classifier = pipeline(
            'zero-shot-classification', model=self.model)
        self.is_listening = False
        self.data = {"Emotion": None}
        self.transcription = ""

    def on_press(self, key):
        try:
            if key.char == 's' or key.char == 'q':
                self.is_listening = False
                return False
        except AttributeError:
            pass

    def getVoice(self):
        self.is_listening = True
        listener = keyboard.Listener(on_press=self.on_press)
        listener.start()
        with sr.Microphone() as source:
            try:
                self.r.adjust_for_ambient_noise(source, duration=0.5)
                if self.is_listening:
                    print("Listening...")
                    audio = self.r.listen(
                        source, timeout=5, phrase_time_limit=None)
                    self.transcription = self.r.recognize_google(audio)
                    file_path = "output.wav"
                    # Save the audio to a WAV file
                    with wave.open(file_path, 'wb') as wf:
                        wf.setnchannels(1)
                        wf.setsampwidth(2)
                        wf.setframerate(44100)
                        wf.writeframes(audio.frame_data)

                    return file_path

            except sr.WaitTimeoutError:
                pass
            except sr.UnknownValueError:
                pass
            except sr.RequestError:
                pass
            except Exception as e:
                print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    voice = VoiceDectetor()
    file_path = voice.getVoice()
    print(f"Audio file saved at: {file_path}")
    