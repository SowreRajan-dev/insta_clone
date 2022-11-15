import React, { useState, useEffect } from "react";
import { Post } from "../../Models/Post/Post";
import Content from "../Content/Content";
import Modal from "../Modal/Modal";
import Navbar from "../Navbar/Navbar";
import posts from "../../data/posts/posts.json";

import "./landing.css";
import { useStateValue } from "../../Context/StateProvider";
import FollowerBlock from "../FollowerBlock/FollowerBlock";
import axios from "axios";
function Landing() {
  const [searchValue, setSearchValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const { user, dispatch, isLoggedIn } = useStateValue();
  useEffect(() => {
    setAllPosts([...allPosts, ...posts]);
    setFilteredPosts([...filteredPosts, ...posts]);
  }, []);

  function selectPost(post: Post) {
    setSelectedPost(post);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  }
  function onSearchValueChange(newValue: string) {
    setSearchValue(newValue);
    let filteredPosts = allPosts.filter((p) =>
      p.description.toLowerCase().includes(newValue.toLowerCase())
    );
    setFilteredPosts([...filteredPosts]);
  }


  return (
    <div>
      <Navbar
        searchValue={searchValue}
        onSearchValueChange={onSearchValueChange}
      />
      <div className="landing-section">
        <Content posts={filteredPosts} selectPost={selectPost} />
        {modalOpen && <Modal onClose={closeModal} post={selectedPost} />}
        {isLoggedIn && (
          <div className="follow-container">
            <FollowerBlock />
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;
