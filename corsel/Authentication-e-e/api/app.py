from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
import uuid
import hashlib
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
import datetime

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

uri = "mongodb+srv://zackgtay:zackgtay@cybersecurityproject.55ccglt.mongodb.net/?retryWrites=true&w=majority&appName=cybersecurityproject"
# Create a new client and connect to the server
client = MongoClient(uri)
db = client['student_records']
students_collection = db['students']
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


@app.route('/', methods=['GET'])
def index():
    return "Welcome to the Student Records App!"


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    uniqueId = str(uuid.uuid4())
    name = data.get('name')
    surname = data.get("surname")
    # Convert DOB to a proper date format
    dob = data.get('dob')
    dob = dob.strftime('%Y-%m-%d') if isinstance(dob, datetime.date) else dob
    maidenName = data.get('maiden_name')
    elementarySchool = data.get('elementary_school')

    # Hash KBA information
    kba_data = f'{dob}{maidenName}{elementarySchool}'.encode()
    kba_hash = hashlib.sha256(kba_data).hexdigest()

    # Save KBA hash in MongoDB collection
    student_data = {
        'uniqueId': uniqueId,
        'name': name,
        "surname": surname,
        'dob': dob,
        'maidenName': maidenName,
        'elementarySchool': elementarySchool,
        'kbaHash': kba_hash  # This is the stored hash value
    }
    students_collection.insert_one(student_data)

    # Return the kba_hash along with the response
    return jsonify({'uniqueId': uniqueId, 'kbaHash': kba_hash, 'message': 'User registered successfully'})


@app.route('/view_student', methods=['POST'])
def view_student():
    data = request.json
    uniqueId = data.get('uniqueId')
    # Assuming this is the KBA information from the user input
    kba_info = data.get('kba_info')

    # Retrieve student data from MongoDB collection
    student_data = students_collection.find_one({'uniqueId': uniqueId})

    if student_data:
        # Check if provided KBA information matches
        kba_data = ''.join([kba_info.get(field, '') for field in [
                           'dob', 'maiden_name', 'elementary_school']])
        calculated_hash = hashlib.sha256(kba_data.encode()).hexdigest()

        # Retrieve the stored kbaHash from the student_data
        stored_hash = student_data.get('kbaHash', '')

        # validate the checksum
        if calculated_hash == stored_hash:
            # Return student data
            # , "dob": student_data["dob"]
            return jsonify({'name': student_data['name'], 'surname': student_data['surname'], "dob": student_data['dob']})
        else:
            return jsonify({'message': 'KBA information does not match'})
    else:
        return jsonify({'message': 'Record not found'})


if __name__ == '__main__':
    app.run(debug=True)
