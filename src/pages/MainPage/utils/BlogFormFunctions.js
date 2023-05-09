import axios from "axios";

// Create a post in the main page
export const createPost = (authUser, body, blogs, setBlogs, setBody, setEdit) => {
  axios
    .post("blogs/create/", {
      user_id: authUser.uid,
      body: body,
      email: authUser.email,
      username: authUser.displayName,
    })
    .then((res) => {
      setBlogs([res.data, ...blogs]);
      setBody("");
      setEdit(false);
    })
    .catch((err) => alert("Something went wrong!"));
};

// Update a post in the main page
export const updatePost = (authUser, body, blogs, setBlogs, setBody, setEdit, itemId) => {
  axios
    .put(`blogs/update/${itemId}/`, {
      user: authUser.uid,
      body: body,
      email: authUser.email,
    })
    .then((res) => {
      const newBlogs = blogs.map((blog) => {
        if (blog.id === itemId) {
          return res.data;
        }
        return blog;
      });
      setBlogs(newBlogs);
      setBody("");
      setEdit(false);
    })
    .catch((err) => alert("Something went wrong!"));
};

// Delete a post in the main page
export const handleDelete = (id, blogs, setBlogs) => {
  axios
    .delete(`blogs/delete/${id}/`)
    .then(() => {
      const newBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(newBlogs);
    })
    .catch((err) => {
      alert("Something went wrong");
    });
};
