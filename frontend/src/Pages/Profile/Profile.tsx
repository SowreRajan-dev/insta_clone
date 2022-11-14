import React, { useState } from "react";
import { useStateValue } from "../../Context/StateProvider";
import "./profile.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { actionTypes } from "../../Context/UserContext/userReducer";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, dispatch } = useStateValue();
  const [email, setEmail] = useState<string>(user.email);
  const [username, setUsername] = useState<string>(user.username);
  const [fullname, setFullName] = useState<string>(user.fullname);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  console.log(selectedImage);

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const navigate = useNavigate();

  const onReset = () => {
    setEmail("");
    setUsername("");
    setFullName("");
  };

  const onUpdateUser = async () => {
    await axios
      .put(
        `http://localhost:8080/user/update/${user._id}`,
        {
          userId: user._id,
          email: email,
          username: username,
          fullname: fullname,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      )
      .then((result) => {
        localStorage.setItem("User", JSON.stringify(result.data.updatedUser));
        dispatch({
          type: actionTypes.UPDATE_USER,
          action: result.data.updatedUser,
        });
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onImageUpload = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "khoiqs1g");
    formData.append("cloud_name", "dgc5asdwu");
    formData.append("api_key", "148733824216685");
    formData.append("timestamp", `${Date.now()}`);
    for (const forms of formData.entries()) {
      console.log(forms[0], " - ", forms[1]);
    }
    try {
      fetch("https://api.cloudinary.com/v1_1/dgc5asdwu/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res :any) => res.json())
        .then((result) => {
          console.log(result);
         
          
          fetch("http://localhost:8080/user/set-profile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("JWT"),
            },
            body: JSON.stringify({
              profile:result.secure_url,
            })
          }).then(res => res.json()).then(result => { 
            console.log(result);
            localStorage.setItem("User", JSON.stringify(result));
             dispatch({
             type: actionTypes.UPDATE_PIC,
             action:result.profile
             });
            
            window.location.reload();
            
          })

        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-section">
        <div className="profile-top-section">
          <Link to="/">
            <div className="logo-section hoverable">Instagram</div>
          </Link>
          {selectedImage ? (
            <div className="profile-update-section hoverable">
              <img
                src={URL.createObjectURL(selectedImage)}
                className="profile-update-image hoverable"
                alt="profile-img"
              />
              <div className="btn-container-update">
                <button
                  className="button-primary hoverable"
                  onClick={onImageUpload}
                >
                  Upload
                </button>
                <button
                  className="button-danger hoverable"
                  onClick={removeSelectedImage}
                >
                  reset
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-change-section hoverable">
              <img
                src={
                  user.profile !== ""
                    ? user.profile
                    : "/assets/default-profile.png"
                }
                className="profile-change-image hoverable"
                alt="profile-img"
              />
              <div className="overlay">
                <AddCircleOutlineIcon className="icon hoverable" />
                <input
                  type="file"
                  className="file-upload hoverable"
                  onChange={imageChange}
                />
              </div>
            </div>
          )}
          <div className="profile-stats">
            <p>
              followers <br /> {user.followers.length}
            </p>
            <p>
              following <br /> {user.following.length}
            </p>
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
            <button className="button-primary hoverable" onClick={onUpdateUser}>
              Update
            </button>
            <button className="button-danger hoverable" onClick={onReset}>
              reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
