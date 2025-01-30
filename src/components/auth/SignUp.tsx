import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.js"
import { useState } from "react";
import { Header } from "../Header.js";

export function SignUp(){
    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const [copyPassword, setCopyPassword] = useState("");
    const [error, setError] = useState("");

    function register(e){
        e.preventDefault();
        if (copyPassword !== password){
            setError("Пароли не совпадают");
            return
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user);
                setError("");
                setEmail("");
                setPassword("");
                setCopyPassword("");
            })
            .catch((error)=> console.log(error));
    }

    return (
            <>
                <div className="flex items-center justify-center min-h-96">
                    <form className="flex flex-col items-center rounded-lg shadow-md" onSubmit={register}>
                        <h2 className="text-5xl font-bold mb-6">Регистрация</h2>
                        <input 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        placeholder="Укажите email"
                        type="email"
                        className="rounded-lg p-2 mb-4 w-64"/>
                        <input
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="Придумайте пароль"
                        type="password"
                        className="rounded-lg p-2 mb-4 w-64"/>
                        <input 
                        value={copyPassword} 
                        onChange={(e)=>setCopyPassword(e.target.value)}
                        placeholder="Повторите пароль"
                        type="password"
                        className="rounded-lg p-2 mb-4 w-64"/>
                        <button className="bg-slate-200 text-slate-950 rounded-lg px-4 py-2 hover:bg-slate-500">
                            Зарегистрироваться
                        </button>
                        {error ? <p className="text-red-600">{ error }</p> : ""}
                    </form>
                </div>
        </>
    );
}