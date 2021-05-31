from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask.templating import render_template

app = Flask(__name__)

# # enabling cross origin resource sharing
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/wordprocessor", methods=['POST'])
# @cross_origin()
def wordprocessor():
    # phrase holds the text or paragraph and other details(if any) sent during the api call
    phrase = request.form.lists()
    
    # prints all elements of phrase
    for i in phrase:
        print(i)

    # returns a response in json format
    return jsonify({'response': 'Received'})
    

# tells the user to make a post call
 @app.route("/wordprocessor", methods=['GET'])
# @cross_origin
 def wordprocessor2():
     print("Get")
     return jsonify({'response': 'Please, use post method'});

app.run("localhost", 8080, debug=True)