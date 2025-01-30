import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import avatar from "../../img/women avatar.webp";
import { Statistics } from "../Statistics.js";
import { AddRunModal } from "../AddRunModal.js";

export function UserAccount() {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  // Проверка авторизации пользователя
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        navigate("/sign-in");
      }
    });
    return () => {
      listen();
    };
  }, [navigate]);

  if (!authUser) {
    return <p>Загрузка...</p>;
  }

  const nickname = authUser.email.slice(0, authUser.email.indexOf("@"));

  return (
    <div className="px-10 h-max flex flex-row">
      <div className="flex flex-col items-left">
        <h1 className="text-xl font-semibold mb-4">
          Добро пожаловать, {nickname}!
        </h1>
        <img src={avatar} className="rounded-lg size-36" />
        <button onClick={() => setModalOpen(true)} className="text-slate-950 border-2 bg-slate-200 rounded-md px-4 py-1 mt-4 w-10">Добавить пробежку</button>
      </div>
      <AddRunModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} email={authUser.email}/> 
      <Statistics />
    </div>
  );
}
