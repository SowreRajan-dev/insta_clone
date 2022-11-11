import React from "react";
import "./login.css";
import Facebook from "@mui/icons-material/Facebook"
import { Link} from "react-router-dom"
function Login() {
  return (
    <div className="login-container">
      <div className="left-section"></div>
      <div className="right-section">
        <div className="top-section">
          <div className="logo-section hoverable">Instagram</div>
          <form className="login-form" action="">
            <input
              type="text"
              placeholder="Phone number, username, or email"
              className="login-input-form"
              id="username"
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              className="login-input-form"
              id="password"
            />
            <button type="submit" className="login-btn">
              Log in
            </button>
          </form>
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
