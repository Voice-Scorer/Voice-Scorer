from flask import Flask, request, jsonify, render_template
import os

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

    # delete file (seems to not be working? might be a timing thing...)
    file = "temp/recording.wav"
    try:
        os.remove(file)
    except:
        print("could not remove " + file)
    
    return "nice"

if __name__ == '__main__':
    app.run(debug=True)