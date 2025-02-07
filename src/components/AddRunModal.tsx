import { db } from '../firebase/firebase.js'
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useState } from "react";
import './css/AddRunModal.css'

export function AddRunModal({isOpen, onClose, email} : {isOpen: boolean; onClose: ()=> void; email: string }){
    const [time, setTime] = useState(""); // Время пробежки
    const [distance, setDistance] = useState(""); // Дистанция пробежки
    const currentDate = Timestamp.now();
  
    const handleSubmit = async () => {
      if (!time || !distance) {
        alert("Введите время и дистанцию пробежки");
        return;
      }
      try {
        const runsCollection = collection(db, "runs");
        await addDoc(runsCollection, {
          date: currentDate, 
          distance: parseFloat(distance), 
          time: parseFloat(time), 
          email
        });

          alert("Пробежка успешно добавлена!");
          setDistance("");
          setTime("");
          onClose();
      } catch (err) {
        console.log("Ошибка выполнения запроса: ", err);
        alert("Произошла ошибка, попробуйте еще раз");
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div
        className="add-run-modal-overlay"
        onClick={onClose}
      >
        <div
          className="add-run-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="add-run-modal-close"
          >
            ✕
          </button>
          <label>
            Время (Формат: минуты.секунды):
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Введите время"
            />
          </label>
  
          <label>
            Дистанция (км):
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Введите дистанцию"
            />
          </label>
  
          <button
            onClick={handleSubmit}
            className="add-run-modal-button"
          >
            Добавить пробежку
          </button>
        </div>
      </div>
    );
  }