import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.js"
import { useEffect, useState } from "react";
import profile from '../img/profile-icon.png'

export function Header() {

  const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged( auth, (user) => {
            if (user){
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
            
        })
        return ()=>{
            listen();
        }
    }, []);

    function userSignOut(){
        signOut(auth)
        .then(() => console.log("Success"))
        .catch((e) => console.log(e));
    }

  return (
    <header>
        <nav className='flex flex-row place-items-center p-4 bg-slate-950'>
          <Link to='/' className='text-3xl font-bold ml-6 mt-2 mr-auto text-slate-950 border-2 bg-slate-200 rounded-md p-1'>
            RT
          </Link>
          { authUser ? (
            <>
              <Link to='/account' className='mr-6'>
                <img src={profile} className='w-5'/>
              </Link>
              <Link to='/' className='text-lg mr-6'>
                <button onClick={userSignOut} className='px-6 py-1 rounded-lg border-2 border-slate-200'>
                  Выйти
                  </button>
              </Link>
            </>
        ) : <>
              <Link to='/sign-up' className='text-lg mr-10'>
                <button>
                  Регистрация
                </button>
              </Link>
              <Link to='/sign-in' className='text-lg mr-10'>
                <button className='px-10 py-1 rounded-lg border-2 border-slate-200'>
                  Войти
                </button>
              </Link>
            </>
           }
        </nav>
    </header>
  );
}
