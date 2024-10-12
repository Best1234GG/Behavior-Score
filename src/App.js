import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { updateStatistics } from './components/ScoreStatistics'; // นำเข้าฟังก์ชัน updateStatistics
import NavBar from './components/NavBar';
import './App.css';

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

function App() {
  const [score, setScore] = useState(100);
  const [dailyDeducted, setDailyDeducted] = useState(0);
  const [dailyAdded, setDailyAdded] = useState(0);
  const [reason, setReason] = useState('');
  const [inputPoints, setInputPoints] = useState('');

  const maxDeductionPerDay = 30;
  const maxDeductionPerTime = 5;
  const maxAdditionPerDay = 30;
  const maxAdditionPerTime = 10;

  useEffect(() => {
    const scoreRef = ref(database, '/behaviorScore');
    onValue(scoreRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setScore(data.score);
        setDailyDeducted(data.dailyDeducted || 0);
        setDailyAdded(data.dailyAdded || 0);
      }
    });
  }, [database]);

  const updateDatabase = (newScore, newDeducted, newAdded) => {
    set(ref(database, '/behaviorScore'), {
      score: newScore,
      dailyDeducted: newDeducted,
      dailyAdded: newAdded,
    });
  };

  // ฟังก์ชันหักคะแนน
  const deductPoints = () => {
    const points = parseInt(inputPoints, 10);
    if (isNaN(points) || points > maxDeductionPerTime || points < 1) {
      alert(`หักคะแนนได้ครั้งละไม่เกิน ${maxDeductionPerTime} คะแนน`);
      return;
    }
    if (dailyDeducted + points > maxDeductionPerDay) {
      alert(`หักคะแนนได้ไม่เกิน ${maxDeductionPerDay} คะแนนต่อวัน`);
      return;
    }
    if (!reason) {
      alert('กรุณาใส่เหตุผลในการหักคะแนน');
      return;
    }

    const newScore = score - points;
    const newDeducted = dailyDeducted + points;
    setScore(newScore);
    setDailyDeducted(newDeducted);
    updateDatabase(newScore, newDeducted, dailyAdded);
    updateStatistics(database, 0, points); // อัปเดตสถิติเมื่อหักคะแนน
    setReason('');
    setInputPoints('');
  };

  // ฟังก์ชันบวกคะแนน
  const addPoints = () => {
    const points = parseInt(inputPoints, 10);
    if (isNaN(points) || points > maxAdditionPerTime || points < 1) {
      alert(`บวกคะแนนได้ครั้งละไม่เกิน ${maxAdditionPerTime} คะแนน`);
      return;
    }
    if (dailyAdded + points > maxAdditionPerDay) {
      alert(`บวกคะแนนได้ไม่เกิน ${maxAdditionPerDay} คะแนนต่อวัน`);
      return;
    }

    const newScore = score + points;
    const newAdded = dailyAdded + points;
    setScore(newScore);
    setDailyAdded(newAdded);
    updateDatabase(newScore, dailyDeducted, newAdded);
    updateStatistics(database, points, 0); // อัปเดตสถิติเมื่อบวกคะแนน
    setInputPoints('');
  };

  return (
    <div className="App">
      <h1>คะแนนพฤติกรรม</h1>
      <h2>คะแนนปัจจุบัน: {score}</h2>
      <NavBar></NavBar>
      <div className="input-container">
        <input
          type="number"
          placeholder="ใส่คะแนนที่ต้องการหักหรือบวก"
          value={inputPoints}
          onChange={e => setInputPoints(e.target.value)}
          className="score-input"
        />
        
        <input
          type="text"
          placeholder="ใส่เหตุผลในการหักคะแนน"
          value={reason}
          onChange={e => setReason(e.target.value)}
          className="reason-input"
        />
      </div>

      <div className="button-container">
        <button onClick={deductPoints} className="action-button">หักคะแนน</button>
        <button onClick={addPoints} className="action-button">บวกคะแนน</button>
      </div>

      <div className="stats">
        <h3>คะแนนหักไปแล้ววันนี้: {dailyDeducted}</h3>
        <h3>คะแนนบวกไปแล้ววันนี้: {dailyAdded}</h3>
      </div>
    </div>
  );
}

export default App;
