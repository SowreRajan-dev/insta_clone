import React, { useEffect } from 'react'
import "./content.css";
import posts from "../../data/posts/posts.json";
import Post from '../Post/Post';
interface Props { 
  selectPost: Function;
}
function Content({ selectPost}:Props) {
  // useEffect(() => { 
  //   console.log("object");
  // },[posts])
  return (
    <div className="content-container">
      <div className="content">
        {posts.map((post, index) => (
          <Post key={index} post={post} selectPost={ selectPost} />
        ))}
      </div>
    </div>
  )
}

export default Content