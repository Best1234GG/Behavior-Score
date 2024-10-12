// firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

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

// ตรวจสอบว่ามีการเริ่มต้น Firebase App แล้วหรือไม่
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

export { app, database };
