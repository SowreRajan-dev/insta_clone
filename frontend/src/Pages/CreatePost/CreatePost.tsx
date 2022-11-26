import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import React, { useState } from "react";
import { useStateValue } from "../../Context/StateProvider";
import { useNavigate } from "react-router-dom";
import "./createpost.css";
function CreatePost() {
  const { user } = useStateValue();
  const [selectedPostImage, setSelectedPostImage] = useState<File | null>(null);
  const [title,setTitle] = useState<string>("");
  const [desc,setDesc] = useState<string>("");
  const [postPic, setPostPic] = useState<string>("");
  const navigate = useNavigate();

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("changing image")
    if (e.target.files && e.target.files.length > 0) {
      setSelectedPostImage(e.target.files[0]);
    }
  };


  const onImageUpload = async () => {
    if (!selectedPostImage) return;
    const formData = new FormData();
    formData.append("file", selectedPostImage);
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
          setPostPic(result.secure_url);
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
    }
  };
  const removeSelectedImage = () => {
    setSelectedPostImage(null);
    setPostPic("");
  };

  const updatePost = async () => {
    await axios.post("http://localhost:8080/post/createPost", {
      title: title,
      post_desc: desc,
      image_url:postPic
    }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
    }).then(result => { 
      console.log(result);
      navigate("/");
      window.location.reload();
    }).catch(err => { 
      console.log(err);
    })
  }
  return (
    <div className="newpost-container">
      <div className="newpost-section">
        <div className="newpost-top-section">
          <img
            src={user?.profile ? user.profile : "/assets/default-profile.png"}
            alt="profile-img"
          />
          <p>{user?.username}</p>
        </div>
        <div className="newpost-mid-section">
          {selectedPostImage ? (
            <div className="newpost-update-section hoverable">
              <img
                src={URL.createObjectURL(selectedPostImage)}
                className="newpost-update-image hoverable"
                alt="profile-img"
              />
              <div className="btn-container-newupdate">
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
            <div className="newpost-change-section hoverable">
              <img
                src={"/assets/default-post.png"}
                className="post-change-image hoverable"
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
        </div>
        <div className="newpost-bottom-section">
          <div>
            <label htmlFor="title">Title : </label>
            <br />
            <input type="text" id="title" placeholder="Enter the title here" onChange={(e) => {
              setTitle(e.target.value)
            }} />
          </div>
          <div>
            <label htmlFor="Description">Description : </label>
            <br />
            <textarea
              name="Description"
              id="description"
              cols={30}
              rows={5}
              placeholder="Enter your description"
              onChange={(e) => {
                setDesc(e.target.value)
              }}
            ></textarea>
          </div>
        </div>
        <div className="btn-container">
          <button className="post-btn" onClick={updatePost}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
