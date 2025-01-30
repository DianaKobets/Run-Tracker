//import { createClient } from "@supabase/supabase-js";
import supabase from "../storage/supabase.js";
import { useState } from "react";
import './css/AddRunModal.css'

export function AddRunModal({isOpen, onClose, email} : {isOpen: boolean; onClose: ()=> void; email: string }){
    const [time, setTime] = useState(""); // Время пробежки
    const [distance, setDistance] = useState(""); // Дистанция пробежки
    const currentDate = new Date().toISOString();
  
    const handleSubmit = async () => {
      if (!time || !distance) {
        alert("Введите время и дистанцию пробежки");
        return;
      }
      try {
        const { data, error } = await supabase.from("runs").insert([
          { email: email, time, distance, date: currentDate },
        ]);
  
        if (error) {
          console.log("Ошибка добавления пробежки: ", error.message);
          alert("Не удалось добавить пробежку, проверьте введенные данные");
        } else {
          alert("Пробежка успешно добавлена!");
          console.log("Добавлено: ", data);
          setDistance("");
          setTime("");
          onClose();
        }
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