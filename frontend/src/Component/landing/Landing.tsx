import React, { useState } from 'react'
import { Post } from '../../Models/Post/Post';
import Button from '../button/Button';
import Content from '../Content/Content';
import Navbar from '../Navbar/Navbar';
import "./landing.css"
function Landing() {
    const [searchValue, setSearchValue] = useState("");
    function selectPost(post: Post) {
        
     }
    function onSearchValueChange(newValue: string) { 
        setSearchValue(newValue);
    }
  return (
      <div>
          <Navbar searchValue={searchValue} onSearchValueChange={onSearchValueChange}/>
          <Content selectPost={ selectPost} />
      </div>
  )
}

export default Landing