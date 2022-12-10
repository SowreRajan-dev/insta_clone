import React from "react";
import Close from "@mui/icons-material/Close";
import "./modal.css";
import { Post } from "../../Models/Post/Post";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Comment from "../comment/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeComment from "@mui/icons-material/ModeComment";
import Send from "@mui/icons-material/Send";
import Bookmark from "@mui/icons-material/Bookmark";
import axios from "axios";
import { useStateValue } from "../../Context/StateProvider";
import { Comment as CommentStructure } from "../../Models/Comment/Comment";
import { actionTypes } from "../../Context/UserContext/userReducer";

interface Props {
  onClose: Function;
  post?: Post;
}
function Modal({ onClose, post }: Props) {
  const { user, isLoggedIn, dispatch } = useStateValue();
  const [liked, setLiked] = React.useState(
    post?.likes.includes(user._id) ? "liked" : "notliked"
  );
  const [makeLikeCount, setMakeLikeCount] = React.useState<number | undefined>(
    post?.likes.length
  );
  const [comment, setComment] = React.useState<string>("");
  const [commentList, setCommentList] = React.useState(post?.comments);
  const [isFollowed, setIsFollowed] = React.useState<string>(
    JSON.parse(window.localStorage.getItem("followings") as string)?.includes(
      user._id
    )
      ? "unfollowed"
      : "followed"
  );

  function onClickModal(element: EventTarget) {
    if ((element as HTMLElement).className === "modal-container") {
      onClose();
    }
  }
  const onLikePost = async () => {
    await axios
      .put(
        "http://localhost:8080/post/like",
        {
          postId: post?._id,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setLiked("liked");
        setMakeLikeCount((prev) => (prev as number) + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onUnLikePost = async () => {
    await axios
      .put(
        "http://localhost:8080/post/unlike",
        {
          postId: post?._id,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setLiked("unliked");
        setMakeLikeCount((prev) => (prev as number) - 1);
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
          followId: user._id,
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
        localStorage.setItem(
          "followings",
          JSON.stringify(result.data.following)
        );
        dispatch({
          type: actionTypes.SET_USER,
          action: result.data,
        });
        setIsFollowed("unfollowed");
      });
  };

  const onClickUnFollow = async () => {
    await axios
      .put(
        "http://localhost:8080/user/unfollow",
        {
          unfollowId: user._id,
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
        localStorage.removeItem("followings");

        setIsFollowed("followed");
      });
  };
   const setOnComment = async () => {
    if (!comment) return;
    await axios
      .put(
        "http://localhost:8080/post/comment",
        {
          postId: post?._id,
          text: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT")}`,
          },
        }
      )
      .then((res) => {
        setCommentList(res.data.comments);
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div onClick={(e) => onClickModal(e.target)} className="modal-container">
      <div className="close-modal hoverable">
        <Close
          onClick={() => {
            onClose();
          }}
          fontSize="large"
          className="hoverable"
          sx={{ color: "white" }}
        />
      </div>
      <div className="modal">
        <img
          src={post?.image_url}
          className="modal-image"
          alt={post?.profile_name}
        />
        <div className="modal-content-section ">
          <div className="modal-top-section">
            <img
              className=" profile-image hoverable"
              src={
                post?.posted_by[0].profile
                  ? post?.posted_by[0].profile
                  : "/assets/default-profile.png"
              }
              alt=""
            />
            <div className="username hoverable">
              {post?.posted_by[0].username
                ? post?.posted_by[0].username
                : "/assets/default-profile.png"}
            </div>
            <button className="follow-btn hoverable">
              {isFollowed === "unfollowed" ? (
                <p className="unfollow" onClick={onClickUnFollow}>
                  Unfollow
                </p>
              ) : (
                <p onClick={onClickFollow}>Follow</p>
              )}
            </button>{" "}
            <div className="spacer"></div>
            <MoreHoriz className="hoverable" />
          </div>
          <div className="modal-comment-section modal-section">
            <div className="comment-container">
              <img
                src={
                  post?.posted_by[0]?.profile
                    ? post?.posted_by[0]?.profile
                    : "/assets/default-profile.png"
                }
                className="profile-image"
                alt={post?.posted_by[0].username}
              />
              <div>
                <div>
                  <span className="username">
                    {post?.posted_by[0].username}
                  </span>
                  <span>{post?.post_desc}</span>
                </div>
              </div>
            </div>

            {commentList?.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </div>
          <div className="modal-details-section modal-section">
            <div className="details-actions">
              <div className="post-likes">
                {liked === "liked" ? (
                  <FavoriteIcon
                    className="hoverable liked-image"
                    onClick={onUnLikePost}
                  />
                ) : (
                  <FavoriteIcon
                    className={`hoverable  unliked`}
                    onClick={onLikePost}
                  />
                )}
                <span className="post-likes">{makeLikeCount} Likes</span>
              </div>
              <ModeComment className="hoverable" />
              <Send className="hoverable" />
              <div className="spacer"></div>
              <Bookmark className="hoverable" />
            </div>
          </div>
          {isLoggedIn ? (
            <>
              <div className="modal-comment-write-section">
                <div className="comment-section">
                  <input
                    type="text"
                    placeholder="enter your comment"
                    className="commentInputBox"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                  <Send className="hoverable" onClick={setOnComment} />
                </div>
              </div>
            </>
          ) : (
            <div className="modal-write-section modal-section">
              <a href="#a">Login</a> to like or Comment
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
