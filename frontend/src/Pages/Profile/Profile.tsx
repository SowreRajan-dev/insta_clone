import React, { useState } from "react";
import { useStateValue } from "../../Context/StateProvider";
import "./profile.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { actionTypes } from "../../Context/UserContext/userReducer";
import { Link,useNavigate} from "react-router-dom"

export default function Profile() {
  const { user,dispatch } = useStateValue();
  const [email, setEmail] = useState<string>(user.email);
  const [username, setUsername] = useState<string>(user.username);
    const [fullname, setFullName] = useState<string>(user.fullname);
    const navigate = useNavigate();
    
    const onUpdateUser = async () => { 
        await axios.put(`http://localhost:8080/user/update/${user._id}`, {
            userId: user._id,
            email: email,
            username: username,
            fullname: fullname
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("JWT")}` 
            }
        }).then((result) => { 
            localStorage.setItem("User", JSON.stringify(result.data.updatedUser))
            dispatch({
                type: actionTypes.UPDATE_USER,
                action:result.data.updatedUser
            })
            navigate("/")
            window.location.reload()
        }).catch(err => { 
            console.log(err);
        })
    }
  return (
    <div className="profile-container">
      <div className="profile-section">
              <div className="profile-top-section">
                  <Link to="/">
          <div className="logo-section hoverable">Instagram</div>
                  </Link>
          <div className="profile-change-section hoverable">
            <img
              src="/assets/default-profile.png"
              className="profile-change-image hoverable"
              alt="profile-img"
            />
            <div className="overlay">
              <AddCircleOutlineIcon className="icon hoverable" />
                      </div>
                  </div>
                  <div className="profile-stats">
                      <p>followers <br /> { user.followers.length}</p>
                      <p>following <br/> {user.following.length}</p>
                  </div>
        </div>
        <div className="profile-update-settings">
          <div>
            <div>
              <label htmlFor="username">Username</label>
              <br />
              <input
                type="text"
                className="change-input"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="fullname">Fullname</label>
              <br />
              <input
                type="text"
                id="fullname"
                className="change-input"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                id="email"
                className="change-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="btn-container">
            <button className="button-primary hoverable" onClick={onUpdateUser}>Update</button>
            <button className="button-danger hoverable">reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}
