import React, { useState } from "react";
import "./signup.css";
import { Link,useNavigate } from "react-router-dom";
import Facebook from "@mui/icons-material/Facebook";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState<string | null>("");
  const [username, setUsername] = useState<string | null>("");
  const [fullname, setFullName] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [servermsg, setServerMessage] = useState(null);
  const navigate = useNavigate()

  const onSignUpUser = async () => { 
    await axios.post("http://localhost:8080/auth/signup", {
      email: email,
      username: username,
      fullname: fullname,
      password: password
    }).then((result) => { 
      if (result.data.error) {
        setServerMessage(result.data.error);
      } else {
        navigate("/login");
      }
    })
  }
  return (
    <div className="signup-container">
      <div className="right-section">
        <div className="top-section">
          <div>
            <div className="logo-section hoverable">Instagram</div>
            <p className="signup-text">
              Sign up to see photos and videos <br /> from your friends.
            </p>
          </div>
          <div className="facebook-login-signup">
            <span>
              <Facebook />
            </span>{" "}
            <span>Log in with Facebook</span>
          </div>
          <div className="or-section-signup">
            <div className="horiz"></div> OR <div className="horiz"></div>
          </div>
          <div className="signup-form" >
            <input
              type="email"
              placeholder="Email"
              className="signup-input-form"
              id="email"
              onChange={(e)=> setEmail(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Fullname"
              className="signup-input-form"
              id="fullname"
              onChange={(e)=> setFullName(e.target.value)}

            />
            <br />
            <input
              type="text"
              placeholder="Username"
              className="signup-input-form"
              id="username"
              onChange={(e)=> setUsername(e.target.value)}

            />
            <br />
            <input
              type="password"
              placeholder="Password"
              className="signup-input-form"
              id="password"
              onChange={(e)=> setPassword(e.target.value)}

            />
            <button  className="signup-btn" onClick={onSignUpUser}>
              Sign up
            </button>
          </div>
          <p className="terms-text">
            People who use our service may have uploaded <br /> your contact
            information to Instagram. <b> Learn <br /> More <br  /> </b>
            By signing up, you agree to our Terms , Privacy <br />{" "}
            <b>Policy and Cookies Policy .</b>
          </p>
        </div>
        <div className="mid-section">
          <div>
            Have an account? {" "}
            <span>
              <Link to="/login">Log in</Link>
            </span>
          </div>
        </div>
        <div className="bottom-section">
          <p>Get the app</p>
          <div className="provider-section">
            <img
              className="hoverable providers"
              src="/assets/images/getonplaystore.png"
              alt="play-store"
            />
            <img
              className="hoverable providers"
              src="/assets/images/getonms.png"
              alt="microsoft"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
