import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../../Context/StateProvider";
import { actionTypes } from "../../Context/UserContext/userReducer";
import { User } from "../../Models/User/User";
import "./userprofile.css";
function UserProfile() {
  const userId = window.location.pathname.split("/")[3];
  const [sugUser, setSugUser] = useState<User>({} as User);
  const [isFollowed, setIsFollowed] = useState<string>(
    JSON.parse(window.localStorage.getItem("followings") as string)?.includes(
      userId
    )
      ? "unfollowed"
      : "followed"
  );
  const { user, dispatch } = useStateValue();

  const getSelectedUser = async () => {
    await axios
      .get(`http://localhost:8080/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWT")}`,
        },
      })
      .then((res) => {
        setSugUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickFollow = async () => {
    await axios
      .put(
        "http://localhost:8080/user/follow",
        {
          followId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        localStorage.setItem("User", JSON.stringify(result.data));
        dispatch({
          type: actionTypes.SET_USER,
          action: result.data,
        });
        setIsFollowed("unfollowed");
        window.location.reload();
      });
  };

  const onClickUnFollow = async () => {
    await axios
      .put(
        "http://localhost:8080/user/unfollow",
        {
          unfollowId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        localStorage.setItem("User", JSON.stringify(result.data));
        dispatch({
          type: actionTypes.SET_USER,
          action: result.data,
        });
        setIsFollowed("followed");
        window.location.reload();
      });
  };
  useEffect(() => {
    getSelectedUser();
  }, []);

  return (
    <div className="userprofile-container">
      <div className="userprofile-section">
        <div className="userprofile-top-section">
          <div className="profile-img-section">
            <img
              src={
                sugUser.profile
                  ? sugUser.profile
                  : "/assets/default-profile.png"
              }
              className="userprofile-img hoverable"
              alt="default-img"
            />
            <p className="follow-username">{sugUser.username}</p>
          </div>
          <div className="profile-stats-section">
            <div className="follow-section">
              <div className="follow-text">
                Followers <br /> <p>{sugUser.followers?.length}</p>
              </div>
              <div className="follow-text">
                Following <br /> <p>{sugUser.following?.length}</p>
              </div>
            </div>
            <div className="btn-container ">
              {isFollowed === "unfollowed" ? (
                <p className="unfollow-profile" onClick={onClickUnFollow}>
                  Unfollow
                </p>
              ) : (
                <p onClick={onClickFollow} className="follow-profile">
                  Follow
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
