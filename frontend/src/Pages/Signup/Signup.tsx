import React from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import Facebook from "@mui/icons-material/Facebook";

function Signup() {
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
          <form className="signup-form" action="">
            <input
              type="email"
              placeholder="Email"
              className="signup-input-form"
              id="email"
            />
            <br />
            <input
              type="text"
              placeholder="Fullname"
              className="signup-input-form"
              id="fullname"
            />
            <br />
            <input
              type="text"
              placeholder="Username"
              className="signup-input-form"
              id="username"
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              className="signup-input-form"
              id="password"
            />
            <button type="submit" className="signup-btn">
              Sign up
            </button>
          </form>
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
