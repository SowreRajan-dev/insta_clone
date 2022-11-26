import React from 'react'
import "./comment.css"
import {Comment as CommentModal} from "../../Models/Comment/Comment"
interface Props { 
    comment: CommentModal;
    key:number;
}
function Comment({ comment,key }: Props) {
  return (
      <div className="comment-container" key={key}>
        
          {comment  && (
              <>
            <img src={comment.postedBy.profile ? comment.postedBy.profile : "/assets/default-profile.png"} className="profile-image" alt={comment.username} />
            <div >
                <div>
                    <span className="username">{comment.postedBy.username}</span>
                    <span>{comment.text}</span>
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
              </>
          )
          }
    </div>
  )
}

export default Comment