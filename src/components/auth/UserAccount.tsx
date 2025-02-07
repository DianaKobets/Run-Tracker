import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import avatar from "../../img/women avatar.jpg";
import '../css/UserAccount.css'
import { Statistics } from "../Statistics.js";
import { AddRunModal } from "../AddRunModal.js";

export function UserAccount() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

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

  const nickname = authUser.email!.slice(0, authUser.email!.indexOf("@")).toUpperCase();
  const degree = "любитель";
  const status = "lorem ipsum lorem ipsum"
  return (
    <div className="main-container">
      <div className="profile-container" style={{ backgroundImage: `url('../../src/img/background-profile.jpg')`, backgroundSize: 'cover' }}>
        <div className="first-column">
          <h1 className="font-semibold mb-4">{nickname}</h1>
          <p>{status}</p>
          <img src={avatar} />
        </div>
        <div className="second-column">
          <p>{degree}</p>
          <button onClick={() => setModalOpen(true)} className="text-slate-950 border-2 bg-slate-200 px-4 py-1 mt-4 w-10">Добавить пробежку</button>
        </div>
      </div>
      <AddRunModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} email={authUser.email!}/> 
       <Statistics /> 
    </div>
  );
}
