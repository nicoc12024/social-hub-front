import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useProfilePageHooks = (userId) => {
  // eslint-disable-next-line
  const [imageUrl, setImageUrl] = useState(null);

  const [userBlogs, setUserBlogs] = useState([]);
  const [userInfoFromBackend, setUserInfoFromBackend] = useState(null);

  // For using in the profile page form
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");

  const [blogsLikesAndComments, setBlogsLikesAndComments] = useState([]);

  const getUserBlogsLikesAndComments = useCallback(async () => {
    if (userId) {
      axios
        .get(`/users/${userId}/blog_likes/`)
        .then((response) => {
          setBlogsLikesAndComments(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId]);

  // Fetch the user blogs and user info from the backend when the userId changes (when the user navigates to another profile)
  const fetchUserBlogs = useCallback(async () => {
    if (userId !== null) {
      try {
        const res = await axios.get(`/blogs/user/${userId}`);
        setUserBlogs(res.data);
      } catch (err) {
        console.log("Something went wrong fetching user blogs");
      }
    }
  }, [userId]);

  const fetchUserInfo = useCallback(async () => {
    if (userId !== null) {
      try {
        const res = await axios.get(`/users/get/?user_id=${userId}`);
        setUserInfoFromBackend(res.data);
      } catch (err) {
        console.log("Something went wrong fetching user info");
      }
    }
  }, [userId]);

  // Update the user info in the backend (submit button from the profile page form)
  const updateBackend = useCallback(
    async (email, userId, username, location, profession, bio) => {
      try {
        await axios.put("http://localhost:8000/users/update/", {
          user_id: userId,
          email: email,
          username: username,
          location: location,
          profession: profession,
          bio: bio,
        });
        setUserInfoFromBackend((prevUserInfo) => ({
          ...prevUserInfo,
          username,
          location,
          profession,
          bio,
        }));

        await fetchUserBlogs(userId);
      } catch (error) {
        console.log("Error updating profile");
      }
    },
    [fetchUserBlogs]
  );

  // Upload the image to firebase storage and return the url of the image to send to the backend
  const uploadImage = async (imageFile, userId) => {
    try {
      if (imageFile === null) return;
      const imageName = "profilePicture" + userId;
      const imageRef = ref(storage, `images/${imageName}`);
      await uploadBytes(imageRef, imageFile);
      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
      await updateProfilePicture(userId, url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Update the the profile picture of the user in the backend and in the local state
  const updateProfilePicture = async (userId, profilePictureLink) => {
    try {
      await axios.put("http://localhost:8000/users/update/", {
        user_id: userId,
        profilePicture: profilePictureLink,
        username: userInfoFromBackend.username,
        email: userInfoFromBackend.email,
      });
      // Update userInfo state with the new profile picture
      setUserInfoFromBackend((prevUserInfo) => ({
        ...prevUserInfo,
        profilePicture: profilePictureLink,
      }));

      await fetchUserBlogs(userId);
    } catch (error) {
      console.log("Error updating profile picture");
    }
  };

  // Fetch the user blogs and user info from the backend when the userId changes (when the user navigates to another profile)
  useEffect(() => {
    fetchUserBlogs();
    fetchUserInfo();
  }, [fetchUserBlogs, fetchUserInfo]);

  // get the user blogs: likes and comments
  useEffect(() => {
    getUserBlogsLikesAndComments();
  }, [getUserBlogsLikesAndComments]);

  // Set the local state with the user info from the backend (for the profile page form)
  useEffect(() => {
    setUsername(userInfoFromBackend?.username || "");
    setLocation(userInfoFromBackend?.location || "");
    setProfession(userInfoFromBackend?.profession || "");
    setBio(userInfoFromBackend?.bio || "");
  }, [userInfoFromBackend]);

  return {
    setUsername,
    setLocation,
    setProfession,
    setBio,
    updateBackend,
    uploadImage,
    blogsLikesAndComments,
    userInfoFromBackend,
    userBlogs,
    username,
    location,
    profession,
    bio,
  };
};
