import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { SignUp } from './components/auth/SignUp'
import { SignIn } from './components/auth/SignIn'
import { UserAccount } from './components/auth/UserAccount'

function App() {

  return (
    <div className='bg-slate-950 text-slate-200'>
      <Header/>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/account" element={<UserAccount />} />
        </Routes>
    </div>
  )
}

export default App
