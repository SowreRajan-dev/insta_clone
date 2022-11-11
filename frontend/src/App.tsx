import './App.css';
import Landing from './Component/landing/Landing';
import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login /> } />
        <Route path="/signup" element={<Signup /> } />
      </Routes>
    </div>
  );
}

export default App;
