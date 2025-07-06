# 🚀 GeoFaceTrack – AI-Powered Smart Attendance System

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Built With](https://img.shields.io/badge/Built%20With-Spring%20Boot%20%7C%20Angular%20%7C%20Python%20%7C%20AI-blueviolet)

> GeoFaceTrack is a secure, real-time, AI-driven smart attendance system that integrates deep learning-based facial recognition with anti-spoofing, GPS, IP/Wi-Fi verification, and intelligent validation logic for tamper-proof attendance tracking.

---

## 📘 About the Project

**GeoFaceTrack** is a smart attendance system designed for institutions and enterprises that demand strict, location-aware, and fraud-resistant attendance logging. It combines AI-based face recognition, liveness detection, geo-fencing, and network validation to ensure only verified users at the correct location can successfully mark attendance.

The system is modular and scalable — making it ideal for educational institutions, workplaces, and secure facilities.

---

## 🧠 Key Features

- 🔍 **Facial Recognition** – Identity verification using FaceNet & MTCNN models.
- 🛡️ **Anti-Spoofing** – Detects fake inputs like photos/videos/masks using liveness checks.
- 📍 **GPS Location Validation** – Ensures attendance only within predefined geo-locations.
- 🌐 **Wi-Fi/IP Address Check** – Prevents spoofing by validating network identity.
- 📦 **Conditional Data Storage** – Data is stored only after successful biometric & location validation.
- ⚡ **Real-Time Model Execution** – Flask API processes face input and returns verification in real time.
- 🖥️ **Responsive Angular UI** – For both admins and users.
- 🔐 **Secure Spring Boot Backend** – Integrates with MySQL and provides REST APIs for all operations.

---

## 🏗️ Tech Stack

| Layer          | Technology                                 |
|----------------|---------------------------------------------|
| **Frontend**   | Angular 19, TypeScript                      |
| **Backend**    | Spring Boot (Java 17), Spring Security, JWT|
| **Database**   | MySQL                                       |
| **ML API**     | Python, Flask, OpenCV, face_recognition     |
| **AI Models**  | FaceNet, MTCNN                              |
| **Others**     | GPS, IP Geolocation, Bcrypt, JWT            |

---

## 📁 Project Structure

```
GeoFaceTrack/
🔹 frontend/             # Angular web client
🔹 backend/              # Spring Boot REST API
🔹 ml-api/               # Flask-based Python ML service
🔹 README.md             # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/GeoFaceTrack.git
cd GeoFaceTrack
```

### 2. Run ML API (Python + Flask)

```bash
cd ml-api
pip install -r requirements.txt
python app.py
```

### 3. Configure & Run Backend (Spring Boot + MySQL)

- Open `backend/` in IntelliJ or Eclipse.
- Set up your database and update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/geofacetrack
spring.datasource.username=your_username
spring.datasource.password=your_password
jwt.secret=your_jwt_secret
```

- Run the Spring Boot application.

### 4. Run Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

Visit the app at `http://localhost:4200`.

---

## 📌 Use Cases

- 🎓 **Educational Institutions** – Verified student attendance on-campus
- 🏢 **Enterprises** – Office check-ins with location/network validation
- 🛡️ **Secure Zones** – Geo-fenced biometric verification
- 🌍 **Remote Work** – Authenticating work-from-home users via GPS/IP checks

---

## 🧹 System Architecture

```
[User Device]
     ↓
[Angular Frontend]
     ↓
[Spring Boot Backend] ↔ [MySQL Database]
     ↓
[Python ML API (Face + Anti-Spoofing)]
     ↑
[GPS + Wi-Fi/IP Validation Layer]
```

---

## 🏆 Project Highlights

- 🔐 Combines biometric, geographic, and network-level security
- 📡 Prevents spoofing and proxy-based attendance manipulation
- ⚙️ Modular system easy to scale and customize
- 📊 Accurate face detection under various lighting and angles
- 🌟 High relevance in education, HR, and high-security domains

---

## 🤝 Contribution Guidelines

We welcome contributions from the GitHub community:

1. Fork the repository  
2. Create your feature branch: `git checkout -b feature/your-feature`  
3. Commit your changes: `git commit -m "Add your feature"`  
4. Push to the branch: `git push origin feature/your-feature`  
5. Open a pull request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- Open Source Libraries: `face_recognition`, `OpenCV`, `MTCNN`, `Flask`, `Spring Boot`, `Angular`
- Support from faculty and peers during development

---

## 📬 Contact

**Abdul Hannan**  
📧 [abdulhannan.shaikhh@gmail.com](mailto:abdulhannan.shaikhh@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/abdulhannan-shaikh/)  
💻 [GitHub](https://github.com/abdulhannan-99)

---

**GeoFaceTrack – Redefining attendance with AI, biometrics, and location intelligence.**
