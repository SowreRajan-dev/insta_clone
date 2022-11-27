import React from 'react';
import Close from "@mui/icons-material/Close";
import "./modal.css"
import { Post } from '../../Models/Post/Post';
import Button from '../button/Button';
import MoreHoriz from "@mui/icons-material/MoreHoriz"
import Comment from '../comment/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeComment from '@mui/icons-material/ModeComment';
import Send from '@mui/icons-material/Send';
import Bookmark from '@mui/icons-material/Bookmark';
import axios from 'axios';
import { useStateValue } from '../../Context/StateProvider';

interface Props { 
  onClose: Function;
  post?: Post;
}
function Modal({ onClose, post }: Props) {
  const { user } = useStateValue();
  const [liked, setLiked] = React.useState(post?.likes.includes(user._id) ? "liked" : "notliked")
  const [makeLikeCount, setMakeLikeCount] = React.useState<number | undefined>(post?.likes.length);
  
  function onClickModal(element: EventTarget) { 
    if ((element as HTMLElement).className === "modal-container") { 
      onClose();
    }
  }
  const onLikePost = async () => { 
    await axios.put("http://localhost:8080/post/like", {
      postId: post?._id,
      userId:user._id
    }, {
      headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      }
    }).then(res => { 
      console.log(res.data);
      setLiked("liked")
      setMakeLikeCount((prev ) => (prev as number) + 1);
    }).catch(err => {
      console.log(err);
    })
  }
  const onUnLikePost = async () => { 
    await axios.put("http://localhost:8080/post/unlike", {
      postId: post?._id,
      userId:user._id
    }, {
      headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      }
    }).then(res => { 
      console.log(res.data);
      setLiked("unliked")
      setMakeLikeCount((prev) => (prev as number) - 1);

    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <div onClick={e => onClickModal(e.target)} className="modal-container">
      <div className="close-modal hoverable">
        <Close onClick={() => { onClose() }} fontSize="large" className="hoverable" sx={{color:"white"}}  />
      </div>
      <div className="modal">
        <img src={post?.image_url} className="modal-image" alt={post?.profile_name} />
        <div className="modal-content-section ">
          <div className="modal-top-section">
            <img className=" profile-image hoverable" src={post?.posted_by[0].profile ? post?.posted_by[0].profile : "/assets/default-profile.png"} alt="" />
            <div className="username hoverable">{post?.posted_by[0].username ? post?.posted_by[0].username : "/assets/default-profile.png"}</div>
            <Button label="Follow"  />
            <div className="spacer"></div>
            <MoreHoriz className="hoverable" />
          </div>
          <div className="modal-comment-section modal-section">
            <div className="comment-container">
              <img src={post?.posted_by[0]?.profile ? post?.posted_by[0]?.profile : "/assets/default-profile.png"} className="profile-image" alt={post?.posted_by[0].username} />
              <div >
                  <div>
                      <span className="username">{post?.posted_by[0].username}</span>
                      <span>{post?.post_desc}</span>
                    </div>
                  </div>
            </div>
            
          {
              post?.comments.map((comment, index) => (
               <Comment key={index} comment={comment} />
              
            ))
          }
          </div>
          <div className="modal-details-section modal-section">
            <div className="details-actions">
              <div className="post-likes">
                {liked === "liked" ?  <FavoriteIcon className="hoverable liked-image" onClick={onUnLikePost}  /> : (
                  <FavoriteIcon className={`hoverable  unliked`} onClick={onLikePost}  />)}
                <span className="post-likes">{makeLikeCount} Likes</span>
              </div>
              <ModeComment className="hoverable" />
              <Send className="hoverable"/>
              <div className="spacer"></div>
              <Bookmark className="hoverable" />
            </div>
          </div> 
          <div className='modal-write-section modal-section'> 
            <a href="#a">Login</a> to like or Comment
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Modal