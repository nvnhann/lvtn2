import {Navigate, Route, Routes} from "react-router-dom";
import "./App.css";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Student from "./pages/Student";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/student/*" element={<Student />} />
      </Routes>
    </div>
  );
}

export default App;
