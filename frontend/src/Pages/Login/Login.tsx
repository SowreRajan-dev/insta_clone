import React, { useState} from "react";
import "./login.css";
import Facebook from "@mui/icons-material/Facebook"
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "../../Context/StateProvider";
import { actionTypes } from "../../Context/UserContext/userReducer";
function Login() {
  const [username, setUsername] = useState<string| null>("");
  const [password, setPassword] = useState<string | null>("");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {user,dispatch} = useStateValue();
  const navigate = useNavigate();

  
  const signInUser = async () => { 
    try { 
      await axios.post("http://localhost:8080/auth/login", {
        username: username,
        password: password
      }).then((result :any) => { 
        console.log(result.data);
        if (result.error) {
          setServerMessage(result.error);
        } else { 
          localStorage.setItem("JWT", result.data.token);
          localStorage.setItem("User", JSON.stringify(result.data.user));
          dispatch({
            type: actionTypes.SET_USER,
            action: result.data.user
          });
          navigate("/")
          
        }
      })
    } catch (err) { 
      console.log(err);
    }
  }
  return (
    <div className="login-container">
      <div className="left-section"></div>
      <div className="right-section">
        <div className="top-section">
          <div className="logo-section hoverable">Instagram</div>
          <div className="login-form" >
            <input
              type="text"
              placeholder="Username"
              className="login-input-form"
              id="username"
              onChange={(e) => setUsername(e.target.value) }
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              className="login-input-form"
              id="password"
              onChange={(e) => setPassword(e.target.value) }

            />
            <button  className="login-btn" onClick={signInUser}>
              Log in
            </button>
          </div>
          <div className="or-section">
              <div className="horiz"></div> OR <div className="horiz"></div>
          </div>
          <div className="facebook-login">
            <span><Facebook /></span> <span>Log in with Facebook</span>
          </div>
          <p style={{ fontWeight: 500,fontSize:"12px",color:"#52B3E7",cursor: "pointer" }}>Forgot password?</p>
        </div>
        <div className="mid-section">
          <div>
            Don't have an account? <span>
              <Link to="/signup">
                Sign up
              </Link>
            </span>

          </div>
           
        </div>
        <div className="bottom-section">
          <p>Get the app</p>
          <div className="provider-section">
              <img className="hoverable providers" src="/assets/images/getonplaystore.png" alt="play-store" />  
              <img className="hoverable providers" src="/assets/images/getonms.png" alt="microsoft" />  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
