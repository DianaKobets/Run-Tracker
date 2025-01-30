import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.js"
import { useState } from "react";
import { useNavigate } from "react-router";

export function SignIn(){
    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    function logIn(e){
        e.preventDefault();
        
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user);
                navigate('/account');
            })
            .catch((error)=> {
                console.log(error);
                setError("Ошибка: проверьте введенные данные")}
        );
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-[34rem]">
            <form className="flex flex-col items-center rounded-lg shadow-md -mt-24">
                <h2 className="text-5xl font-bold mb-6">
                    Вход
                </h2>
                <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="rounded-lg p-2 mb-4 w-64 text-slate-950"
                />
                <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                type="password"
                className="rounded-lg p-2 mb-4 w-64 text-slate-950"
                />
                <button 
                onClick={logIn}  
                className="bg-slate-200 text-slate-950 rounded-lg px-4 py-2 hover:bg-slate-500">
                    Войти
                </button>
                {error && <p className="text-red-600 mt-4">{error}</p>}
            </form>
            </div>
        </>
      );  
}