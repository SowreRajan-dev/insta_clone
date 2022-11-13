import React from "react";
import Button from "../button/Button";
import Searchbar from "../searchbar/Searchbar";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useStateValue } from "../../Context/StateProvider";
import { actionTypes } from "../../Context/UserContext/userReducer";
interface Props {
  searchValue: string;
  onSearchValueChange: Function;
}
function Navbar({ searchValue, onSearchValueChange }: Props) {
  const { user, dispatch, isLoggedIn } = useStateValue();
  const onLogOut = () => {
    localStorage.clear();
    dispatch({
      type: actionTypes.LOGOUT_USER,
    });
  };
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="logo-section hoverable">Instagram</div>
        <div className="searchbar-section">
          <Searchbar
            searchValue={searchValue}
            onSearchValueChange={onSearchValueChange}
          />
        </div>
        {
          isLoggedIn ? (
            <div className="nav-profile-section">
              <div className="profile-desc">
                <img src="/assets/default-profile.png" className="profile-img hoverable" alt="profile_img" />
                <p>Hello { user.fullname }</p>
              </div>
              <button className="logOutButton hoverable" onClick={onLogOut}>Log out</button>
            </div>
            
          ) : (
          <>
            <div className="actions-section">
              <Link to="/login">
                <Button label="Log in" primary />
              </Link>
              <Link to="/signup">
                <Button label="Sign up" />
              </Link>
            </div>
          </>

          )
        }
     
      </div>
    </div>
  );
}

export default Navbar;
