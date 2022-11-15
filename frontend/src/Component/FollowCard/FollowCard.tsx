import axios from "axios";
import React, { useState } from "react";
import { useStateValue } from "../../Context/StateProvider";
import { actionTypes } from "../../Context/UserContext/userReducer";
import "./followcard.css";

interface Props {
  key: number;
  name: string;
  profile?: string;
  id?: any;
}

function FollowCard({ key, name, profile,id }: Props) {
  const [isFollowed, setIsFollowed] = useState<string | null>(null);
  const { dispatch } = useStateValue();
  console.log(isFollowed)
  
  const onClickFollow = async() => {
    await axios.put("http://localhost:8080/user/follow", {
      followId:id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      }
    }).then(result => {
      console.log(result);
      localStorage.setItem("User", JSON.stringify(result.data));
      dispatch({
        type: actionTypes.SET_USER,
        action:result.data
      })
      setIsFollowed("unfollowed");
    })

  };

  const onClickUnFollow = async() => { 
    await axios.put("http://localhost:8080/user/unfollow", {
      unfollowId:id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      }
    }).then(result => {
      console.log(result);
      localStorage.setItem("User", JSON.stringify(result.data));
      dispatch({
        type: actionTypes.SET_USER,
        action:result.data
      })
      setIsFollowed("followed");
    })
  }

  return (
    <div className="follower-card" key={key}>
      <div className="follow-content">
        <img
          src={profile ? profile : "/assets/default-profile.png"}
          className="hoverable"
          alt="profile-img"
        />
        <p className="follow-name hoverable">{name}</p>
        <div className="follow-btn-container">
          <button className="follow-btn hoverable" >
            {isFollowed === "unfollowed" ? <p className="unfollow" onClick={onClickUnFollow}>Unfollow</p> : <p onClick={onClickFollow}>Follow</p>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FollowCard;
