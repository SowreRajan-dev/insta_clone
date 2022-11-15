import React, { useEffect,useState} from 'react'
// import { User } from '../../Models/User/User';
import FollowCard from '../FollowCard/FollowCard'
import "./follow.css"
function FollowerBlock() {
    const [followRequest, setFollowRequest] = useState([]);

    useEffect(() => {
    fetch("http://localhost:8080/user/every/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setFollowRequest(result);
      });
  }, []);
  return (
    <div className="follow-block">
      <p className="follow-text">Follow Suggestions</p>
      <div className="follower-card-section">
        {
          followRequest.map((follows: any, index) => (
            <FollowCard key={index} name={follows.username} profile={ follows.profile} id={follows._id} />      
            
          ))
        }
      </div>
    
    </div>
  )
}

export default FollowerBlock