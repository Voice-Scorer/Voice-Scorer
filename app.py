from flask import Flask, request, jsonify

app = Flask(__name__)

# at app/get_data, you can POST to this function
@app.route('/get_data', methods=['POST'])
def get_data():
    data = request.files['voiceFile']
    
    # from here do data processing and whatever function calls you got
    # ...
    # and then return it 
    
    return 
