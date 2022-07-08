import {Navigate, Route, Routes} from 'react-router-dom'
import './App.css'
import Admin from './pages/Admin'
import Login from './pages/Login'
import User from './pages/User'
import {useSelector} from "react-redux";
import {getUserInfo} from "./reducers/profile";

function App() {
    const profile = useSelector(state => getUserInfo(state));
    const isLogin = profile.maso;
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isLogin ? <Navigate to="/app" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/app/*" element={<User />} />
      </Routes>
    </div>
  )
}

export default App
