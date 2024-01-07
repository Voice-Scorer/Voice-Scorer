from flask import Flask, request, jsonify, render_template, send_from_directory
import os, time

app = Flask(__name__)

# render html
@app.route('/')
def render_index():
    return render_template('index.html')

# at app/get_data, you can POST to this function
@app.route('/get_data', methods=['POST'])
def get_data():
    data = request.files['audio']
    data.save('temp/recording.wav')

    # from here do data processing and whatever function calls you got
    # ...
    # and then return it 

    # clear temp recording
    file = "temp/recording.wav"
    try:
        os.remove(file)
    except:
        print("could not remove " + file)
    
    # please format your return data just like this 
    accuracy_score = "65.7" # replace this variable
    character_name = "Trump" # replace this variable

    serve_audio(character_name, accuracy_score)

    data = {
        "score" : accuracy_score,
        "character" : character_name
    }

    return jsonify(data)

# serves specific audio at /audio
@app.route('/audio')
def serve_audio(character_name, score):

    if float(score) >= 50:
        filename = character_name + "_good.wav"
    else:
        filename = character_name + "_bad.wav"

    return send_from_directory("static/end_sound",filename)

if __name__ == '__main__':
    app.run(debug=True)