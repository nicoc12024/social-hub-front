import React, { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const LikeButton = ({ blogId, initialLikesCount, handleLike, likesUserIds, userId }) => {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [liked, setLiked] = useState(false);
  const location = useLocation();

  // Check if the user has already liked the post
  useEffect(() => {
    if (likesUserIds.includes(userId)) {
      setLiked(true);
    }
  }, [likesUserIds, userId]);

  const handleClick = async () => {
    await handleLike(blogId, liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    setLiked(!liked);
  };

  // Check if the URL contains "profile"
  if (location.pathname.includes("profile")) {
    return (
      <button className="flex items-center gap-x-1 justify-center cursor-default">
        <AiFillHeart size={20} className="text-gray-400" />
        {likesCount}
      </button>
    );
  }

  return (
    <button onClick={handleClick} className="flex items-center gap-x-1 justify-center">
      <AiFillHeart
        size={20}
        className={
          liked
            ? "text-red-600"
            : "text-gray-400 hover:text-red-400 transition duration-150"
        }
      />
      {likesCount}
    </button>
  );
};

export default LikeButton;
