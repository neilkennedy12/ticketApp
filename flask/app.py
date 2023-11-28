from flask import Flask, request,jsonify, send_file
from flask_cors import CORS, cross_origin
import os
import json
import shutil
import pickle

def write(list_of_objects, file_name):
    with open(file_name, "wb") as file:
        pickle.dump(list_of_objects, file)

def read(file_name):
    with open(file_name, "rb") as file:
        list_of_objects = pickle.load(file)
    return list_of_objects

UPLOAD_FOLDER = './uploads'
DATABASE = '/home/neilkennedy12/mysite/database.txt'

# write([],DATABASE)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/view")
@cross_origin()
def view():
    return jsonify({"data":read(DATABASE)})

@app.route("/resolve/<id>", methods = ['GET'])
@cross_origin()
def resolve(id):
    if request.method == 'GET':
        tickets=read(DATABASE)
        for obj in tickets:
            if  obj['id'] == str(id):
                obj['status']="resolved"
        write(tickets, DATABASE)
        return jsonify({"data":tickets})

@app.route('/upload', methods=['POST'])
@cross_origin()
def upload():
    value = request.form['value']
    obj = json.loads(value)
    tickets=read(DATABASE)
    obj['id'] = str(len(tickets))
    obj['status'] = "new"
    tickets.append(obj)
    write(tickets,DATABASE)
    dir=os.path.join(UPLOAD_FOLDER,obj['id'])
    if os.path.exists(dir):
        shutil.rmtree(dir)
    os.makedirs(dir)
    file = request.files['file']
    if(file):
        file.save(os.path.join(dir, file.filename))
    return 'Submitted successfully', 200

@app.route('/download/<id>', methods=['GET'])
@cross_origin()
def download(id):
    if request.method== 'GET':
        dir = os.path.join(UPLOAD_FOLDER,id)
        file = os.listdir(dir)[0]
        return send_file(os.path.join(dir,file))


