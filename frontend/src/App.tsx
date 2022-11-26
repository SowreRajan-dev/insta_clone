import './App.css';
import Landing from './Component/landing/Landing';
import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import { useStateValue } from './Context/StateProvider';
import Profile from './Pages/Profile/Profile';
import UserProfile from './Pages/UserProfile/UserProfile';
import CreatePost from './Pages/CreatePost/CreatePost';
function App() {
  const { isLoggedIn } = useStateValue();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={ isLoggedIn ? <Landing /> : <Login /> } />
        <Route path="/signup" element={<Signup /> } />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/user/profile/:id" element={<UserProfile />} />
        <Route path="/post/newpost" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
