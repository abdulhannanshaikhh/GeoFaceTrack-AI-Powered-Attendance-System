# 🚀 GeoFaceTrack – AI-Powered Smart Attendance System

![Built With](https://img.shields.io/badge/Built%20With-Spring%20Boot%20%7C%20Angular%20%7C%20Python%20%7C%20AI%20%7C%20ML-blueviolet)

> GeoFaceTrack is a secure, real-time, AI-driven smart attendance system that integrates deep learning-based facial recognition with anti-spoofing, GPS, IP/Wi-Fi verification, and intelligent validation logic for tamper-proof attendance tracking.

---

## 📘 About the Project

**GeoFaceTrack** is a smart attendance system designed for institutions and enterprises that demand strict, location-aware, and fraud-resistant attendance logging. It combines AI-based face recognition, liveness detection, geo-fencing, and network validation to ensure only verified users at the correct location can successfully mark attendance.

The system is modular and scalable — making it ideal for educational institutions, workplaces, and secure facilities.

---

## 🧠 Key Features

- 🔍 **Facial Recognition** – Identity verification using pretrained deep learning models.
- 🛡️ **Anti-Spoofing** – Detects fake inputs like fake photos/masks using liveness checks.
- 📍 **GPS Location Validation** – Ensures attendance only within predefined geo-locations.
- 🌐 **Wi-Fi/IP Address Check** – Prevents spoofing by validating network identity.
- 📦 **Conditional Data Storage** – Data is stored only after successful biometric & location validation.
- ⚡ **Real-Time Model Execution** – Flask API processes face input and returns verification in real time.
- 🖥️ **Responsive Angular UI** – For both admins and users.
- 🔐 **Secure Spring Boot Backend** – Integrates with MySQL and provides REST APIs for all operations.

---

## 🏗️ Tech Stack

| Layer          | Technology                                  |
|----------------|---------------------------------------------|
| **Frontend**   | Angular 19, TypeScript                      |
| **Backend**    | Spring Boot (Java 17), Spring Security, JWT |
| **Database**   | MySQL                                       |
| **ML API**     | Python, Flask, OpenCV, face_recognition     |
| **AI Models**  | InsightFace                                 |
| **Others**     | GPS, IP Geolocation                         |

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
     ↓
[Angular Frontend]
     ↓
[Spring Boot Backend]
     ↓
[MySQL Database]↔ [Angular Frontend]

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

## 🙏 Acknowledgements

- Open Source Libraries: `face_recognition`, `OpenCV`, `InsightFace`, `Flask`, `Spring Boot`, `Angular`
- Support from faculty and peers during development

---
