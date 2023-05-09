import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { handleDelete } from "../../../pages/MainPage/utils/BlogFormFunctions";
import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useLocation } from "react-router-dom";
import UserInfo from "./UserInfo";
import { createCharLimitHandler } from "../../../sharedUtils/utils/functions";
import LikeButton from "../../../pages/MainPage/LikeButton";
import DeleteConfirmation from "../../../pages/MainPage/DeleteConfirmation";
import CommentForm from "../../../pages/MainPage/CommentForm";
import CommentList from "./../../../pages/MainPage/CommentList";

export const BlogItem = ({
  item,
  hideEditButtons,
  setBody,
  setEdit,
  setItemId,
  blogs,
  setBlogs,
  handleLike,
}) => {
  const [open, setOpen] = useState(false);
  const { userId } = useContext(AuthContext);
  const [commentsOfThePost, setCommentsOfThePost] = useState([]);
  const [userInfoFromBackend, setUserInfoFromBackend] = useState(null);
  const location = useLocation();

  const [comment, setComment] = useState("");
  const [remainingCommentChar, setRemainingCommentChar] = useState(400);

  const handleCommentChange = createCharLimitHandler(
    setComment,
    setRemainingCommentChar,
    400
  );

  // get profile info from user from the backend
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (userId) {
          const res = await axios.get(`/users/get/?user_id=${userId}`);
          setUserInfoFromBackend(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/comments/delete/${commentId}`, {
        params: { user_id: userId },
      });
      setCommentsOfThePost((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting the comment:", error);
    }
  };

  // get all posts
  useEffect(() => {
    axios
      .get(`/comments/blog/${item.id}/`)
      .then((res) => {
        setCommentsOfThePost(res.data);
      })
      .catch((err) => {
        alert("Algo salio mal");
      });
  }, [item.id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/comments/create/", {
        blog: item.id,
        user: userId,
        content: comment,
      });

      // Add the new comment to the commentsOfThePost state
      setCommentsOfThePost((prevComments) => [...prevComments, response.data]);

      // Clear the comment input field
      setComment("");
    } catch (error) {
      console.error("Error submitting the comment:", error);
    }
  };

  return (
    <>
        <div
          key={item.id}
          className="rounded hover:bg-gradient-to-r bg-gray3 from-blue-500 via-green-500 to-blue-500 p-[1.3px] break-words"
        >
          <div className="text-gray1 p-4 flex flex-col h-full w-full items-start bg-bgDarkPurple hover:bg-bgLightPurple back">
            {/* User Info */}
            <UserInfo item={item} />

            {/* Post body */}
            <p className="sm:text text-[14px] my-2 text-gray2">{item.body}</p>
            <div className="h-[0.2px] bg-slate-500 opacity-40 w-full"></div>

            {/* edit buttons */}
            <div className="flex flex-col justify-end w-full gap-2 mt-4">
              <div
                className={`flex items-center ${
                  !hideEditButtons && userId === item?.user_id
                    ? "justify-between"
                    : "justify-end"
                }`}
              >
                {!hideEditButtons && userId === item?.user_id && (
                  <button
                    onClick={() => {
                      setBody(item.body);
                      setItemId(item.id);
                      setEdit(true);
                      window.scrollTo(0, 0);
                    }}
                    className="rounded-full mr-6 text-xs font-medium border-[1px] h-8 w-8 hover:bg-indigo-900 transition duration-150 hover:text-black border-none whitespace-nowrap cursor-pointer"
                  >
                    <FiEdit2 className="text-gray1 h-4 w-4 mx-auto cursor-pointer" />
                  </button>
                )}
                {!hideEditButtons && userId === item?.user_id && (
                  <button
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="rounded-full text-xs ml-6 font-medium h-8 w-8 hover:bg-indigo-900 transition duration-150 border-none whitespace-nowrap cursor-pointer"
                  >
                    <AiFillDelete className="text-gray1 h-4 w-4 mx-auto cursor-pointer" />
                  </button>
                )}
                <LikeButton
                  blogId={item.id}
                  initialLikesCount={item.likes_count}
                  handleLike={handleLike}
                  likesUserIds={item.likes_user_ids}
                  userId={userId}
                />
              </div>
            </div>
          </div>

          {/* Popup Modal */}
          <DeleteConfirmation
            open={open}
            setOpen={setOpen}
            handleDelete={handleDelete}
            item={item}
            blogs={blogs}
            setBlogs={setBlogs}
          />

          {!location.pathname.includes("profile") && (
            <CommentForm
              handleSubmitComment={handleSubmitComment}
              userInfoFromBackend={userInfoFromBackend}
              comment={comment}
              handleCommentChange={handleCommentChange}
              remainingCommentChar={remainingCommentChar}
            />
          )}

          {commentsOfThePost?.length > 0 && (
            <div className="p-2 bg-bgLightPurple2 text-gray3 sm:text text-[14px]">
              <CommentList
                commentsOfThePost={commentsOfThePost}
                location={location}
                userId={userId}
                handleDeleteComment={handleDeleteComment}
              />
            </div>
          )}
        </div>
    </>
  );
};
