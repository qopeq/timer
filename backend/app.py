from flask import Flask, jsonify, request
from flask_cors import CORS
import time 

app = Flask(__name__)
CORS(app)

start_time = None
stop_time = None
last_results = []

@app.route('/start', methods=['POST'])
def start():
    global start_time
    start_time = time.time()
    return jsonify({'message': 'Starting timer'})

@app.route('/stop', methods=['POST'])
def stop():
    global stop_time, last_results
    stop_time = time.time()
    last_results.append({'start_time': start_time,
                        'stop_time': stop_time,
                        'elapsed_time': stop_time - start_time})
    return jsonify({'message': 'Stoping timer'})

@app.route('/results', methods=['GET'])
def results():
    return jsonify(last_results[:3])

if __name__ == '__main__':
    app.run()