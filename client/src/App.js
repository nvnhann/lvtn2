import {Navigate, Route, Routes} from 'react-router-dom'
import './App.css'
import Admin from './pages/Admin'
import Login from './pages/Login'
import User from './pages/User'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/user/*" element={<User />} />
      </Routes>
    </div>
  )
}

export default App
