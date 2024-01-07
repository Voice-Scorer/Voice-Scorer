from flask import Flask, request, jsonify, render_template
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
    
    # please format your data just like this 
    data_text = "the quick brown fox jumped over the lazy dog"
    data = {
        "return_data" : data_text
    }

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)