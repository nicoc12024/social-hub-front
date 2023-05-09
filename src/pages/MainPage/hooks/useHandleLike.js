import { useState, useEffect } from "react";
import axios from "axios";

export const useHandleLike = (userId) => {
  const [userInfoFromBackend, setUserInfoFromBackend] = useState(null);

  // get profile info from user from the backend
  useEffect(() => {
    if (userId !== null) {
      axios
        .get(`/users/get/?user_id=${userId}`)
        .then((res) => {
          setUserInfoFromBackend(res.data);
        })
        .catch((err) => {
          alert("Algo salio mal User Info");
          console.log(err);
        });
    }
  }, [userId]);

  // Handle like and unlike
  const handleLike = async (blogId, isLiked) => {
    const likeUrl = `http://localhost:8000/likes/`;
    const getLikeUrl = `http://localhost:8000/likes/get/`;

    try {
      if (!isLiked) {
        // Create a like object in the backend
        await axios.post(likeUrl, {
          user: userInfoFromBackend?.user_id,
          blog: blogId,
        });
      } else {
        // Get the like object from the backend
        const likeObj = await axios.get(getLikeUrl, {
          params: {
            user: userInfoFromBackend?.user_id,
            blog: blogId,
          },
        });

        // Delete the like object
        await axios.delete(`${likeUrl}${likeObj.data.id}/`);
      }
    } catch (error) {
      console.error("Error liking/unliking the blog post:", error);
    }
  };

  return { handleLike };
};
