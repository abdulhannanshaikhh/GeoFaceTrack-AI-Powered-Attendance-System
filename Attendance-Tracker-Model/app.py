from flask import Flask, request, jsonify  # Flask web framework and utilities
from flask_cors import CORS  # Enable Cross-Origin Resource Sharing
import cv2  # OpenCV for image processing
import numpy as np  # NumPy for array manipulation
import base64  # For decoding base64-encoded images
import face_recognition  # Library for face detection and recognition
import os  # For file system operations
from insightface.app import FaceAnalysis  # InsightFace for anti-spoofing and face analysis

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize InsightFace application with the 'buffalo_l' model
face_app = FaceAnalysis(name='buffalo_l')
face_app.prepare(ctx_id=0)  # Prepare the model with GPU context ID 0

# Directory containing known face images
KNOWN_FACE_DIR = "known_faces"
known_face_encodings = []  # List to store face encodings
known_face_ids = []  # List to store corresponding employee IDs

# Load known faces from the directory and extract their encodings
def load_known_faces():
    for filename in os.listdir(KNOWN_FACE_DIR):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            path = os.path.join(KNOWN_FACE_DIR, filename)
            image = face_recognition.load_image_file(path)
            encodings = face_recognition.face_encodings(image)
            if encodings:
                known_face_encodings.append(encodings[0])
                known_face_ids.append(int(filename.split(".")[0]))  # Extract ID from filename

# Decode a base64-encoded image string into an OpenCV image
def decode_base64_image(data_url):
    try:
        base64_str = data_url.split(",")[1] if "," in data_url else data_url
        base64_str += "=" * ((4 - len(base64_str) % 4) % 4)  # Pad base64 string if needed
        image_bytes = base64.b64decode(base64_str)
        np_arr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        return img
    except Exception as e:
        print("Decode error:", str(e))
        return None

# Define the /recognize endpoint for face recognition
@app.route('/recognize', methods=['POST'])
def recognize_face():
    try:
        data = request.get_json()
        if 'image' not in data:
            return jsonify({"status": "fail", "message": "No image provided"}), 400

        image = decode_base64_image(data['image'])
        if image is None:
            return jsonify({"status": "fail", "message": "Invalid image"}), 400

        # Perform anti-spoofing check using InsightFace
        faces = face_app.get(image)
        if not faces:
            return jsonify({"status": "fail", "message": "No face detected"}), 200

        face = faces[0]
        if face.det_score < 0.85 or face.normed_embedding is None:
            return jsonify({"status": "spoof", "message": "Spoof detected", "spoof": True}), 200

        # Perform face recognition using face_recognition library
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        face_encodings = face_recognition.face_encodings(rgb)
        if not face_encodings:
            return jsonify({"status": "fail", "message": "Face encoding failed"}), 200

        for encoding in face_encodings:
            matches = face_recognition.compare_faces(known_face_encodings, encoding, tolerance=0.5)
            if True in matches:
                index = matches.index(True)
                return jsonify({
                    "status": "success",
                    "employee_id": known_face_ids[index],
                    "spoof": False
                }), 200

        # If no match is found 
        return jsonify({"status": "fail", "message": "Face not recognized", "spoof": True}), 200

    except Exception as e:
        # Handle unexpected errors
        return jsonify({"status": "error", "message": str(e)}), 500

# Load known faces and start the Flask server
if __name__ == '__main__':
    load_known_faces()
    app.run(debug=True)
