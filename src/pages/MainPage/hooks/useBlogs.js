import { useState, useEffect } from "react";
import axios from "axios";

// Get all the blogs from the backend and set the state
export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

  useEffect(() => {
    axios
      .get("/blogs/")
      .then((res) => {
        setBlogs(res.data.results);
        setNextUrl(res.data.next);
      })
      .catch((err) => {
        alert("Something went wrong in useBlogs");
      });
  }, []);

  const loadMore = () => {
    setShowLoadMoreButton(true);
    if (nextUrl) {
      axios
        .get(nextUrl)
        .then((res) => {
          setBlogs([...blogs, ...res.data.results]);
          setNextUrl(res.data.next);
        })
        .catch((err) => {
          alert("Something went wrong in useBlogs");
        });
    } else {
      setShowLoadMoreButton(false);
    }
  };

  return { blogs, setBlogs, loadMore, showLoadMoreButton };
};
