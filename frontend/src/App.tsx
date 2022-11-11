import './App.css';
import Landing from './Component/landing/Landing';
import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login/Login';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login /> } />
      </Routes>
    </div>
  );
}

export default App;
