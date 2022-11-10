import React from 'react'
import "./comment.css"
import {Comment as CommentModal} from "../../Models/Comment/Comment"
interface Props { 
    comment:CommentModal
}
function Comment({comment}:Props) {
  return (
      <div className="comment-container">
          <img src={comment.profile_image_url} className="profile-image" alt={comment.profile_name} />
          <div >
              <div>
                  <span className="username">{comment.profile_name}</span>
                  <span>{comment.message}</span>
              </div>
              <div className="comment-details">
                  {comment.likes > 0 ? (
                      
                      <span className="hoverable">{comment.likes} { comment.likes > 1 ? "Likes" : "Like"}</span>
                  ) : (
                      <span className="hoverable"> { comment.likes > 1 ? "Likes" : "Like"}</span>
                          
                  )}

                  <span className="hoverable">reply</span>
              </div>
          </div>
    </div>
  )
}

export default Comment