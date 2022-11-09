import React from 'react'
import "./post.css";
import { Post as PostModel } from "../../Models/Post/Post";
import Favorite from "@mui/icons-material/Favorite";
import ModeComment from "@mui/icons-material/ModeComment";
interface Props { 
  post: PostModel;
  selectPost: Function;
}
function Post({ post, selectPost }: Props) {
  function onClick() { 
    selectPost(post);
  }
  return (
    <div onClick={(e) => {onClick() }} className="post-container">
          <div className="post">
        <a href="#a" style={{ backgroundImage: `url(${post.image_url})` }} className="post-image"></a>
        <div className="post-overlay">
          <span>
            <Favorite />
            {post.likes}
        </span>
          <span>
            <ModeComment />
            {post.comments.length}
        </span>
        </div>
          </div>
    </div>
  )
}

export default Post