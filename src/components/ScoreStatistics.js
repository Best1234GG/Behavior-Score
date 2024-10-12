// ScoreStatistics.js
import { ref, set } from 'firebase/database';

export const updateStatistics = (database, addedPoints, deductedPoints) => {
  const statsRef = ref(database, '/statistics'); // สมมุติว่ามี path นี้อยู่ในฐานข้อมูล
  set(statsRef, {
    addedPoints: addedPoints,
    deductedPoints: deductedPoints,
  })
    .then(() => {
      console.log('Statistics updated successfully');
    })
    .catch((error) => {
      console.error('Error updating statistics:', error);
    });
};
const token = 'AUSfaETn1NZ6ukBY42StAt50ReRML4FMROmQn9NtdO9';
// ส่งออกฟังก์ชันอื่น ๆ
export const sendLineNotify = (message) => {
  return fetch('https://notify-api.line.me/api/notify', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'message': message
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to send notification');
    }
    return response.json();
  })
  .catch(error => console.error('Error:', error));
};