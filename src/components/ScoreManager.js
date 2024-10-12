// ชื่อไฟล์: ScoreManager.js
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';

// กำหนดการตั้งค่า Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDOVljoIfsJ0_g-LIFDbIn_XqYd2cqJJFs",
  authDomain: "test-5e595.firebaseapp.com",
  projectId: "test-5e595",
  storageBucket: "test-5e595.appspot.com",
  messagingSenderId: "208183801328",
  appId: "1:208183801328:web:ec85175338f8d0658e1935",
  measurementId: "G-0EN690GW2N"
};

// เริ่มต้น Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ฟังก์ชันอื่น ๆ ของคุณที่เกี่ยวข้องกับ ScoreManager
