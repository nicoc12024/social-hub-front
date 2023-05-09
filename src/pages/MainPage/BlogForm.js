import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { createPost, updatePost } from "./utils/BlogFormFunctions";
import TextareaAutosize from "react-textarea-autosize";
import { createCharLimitHandler } from "../../sharedUtils/utils/functions";

export const BlogForm = ({ blogs, setBlogs, body, setBody, setEdit, edit, itemId }) => {
  const { authUser } = useContext(AuthContext);
  const [remainingBodyChar, setRemainingBodyChar] = useState(400);

  const handleBodyChange = createCharLimitHandler(setBody, setRemainingBodyChar, 600);

  // Submit form function to create or update post
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!body) {
      return alert("You must write something!");
    }

    if (edit) {
      updatePost(authUser, body, blogs, setBlogs, setBody, setEdit, itemId);
    } else {
      createPost(authUser, body, blogs, setBlogs, setBody, setEdit);
    }
  };

  return (
    <form
      className="w-full py-3 px-4  bg-bgLightPurple border-[1px] border-gray-50 border-opacity-30 shadow-md rounded-sm max-w-[700px] mx-auto"
      onSubmit={handleSubmit}
    >
      {/* Text */}
      <div className="mb-3">
        <label htmlFor="text" className="block text-xl font-medium text-gray1">
          Your Aha! Moment of the Day
        </label>
        <div className="flex flex-col items-start">
          <TextareaAutosize
            onChange={handleBodyChange}
            value={body}
            id="text"
            type="text"
            placeholder="Type here!"
            className="block py-1 focus:outline-none resize-none min-h-16 overflow-auto text-gray2 border-gray-400 bg-bgLightPurple border-b-[1px] border-b-gray-50 border-opacity-30 transition duration-300 ease-in-out transform placeholder-[#d4d4d48b] text-sm w-full mt-1 rounded-sm shadow-sm"
          />
          {remainingBodyChar === 0 && (
            <p className="text-right text-gray2 mt-1">
              {remainingBodyChar} characters remaining
            </p>
          )}
        </div>
      </div>
      {/* Save button */}
      <div className="flex items-center justify-end gap-x-3">
        {edit && (
          <button
            onClick={() => {
              setEdit(false);
              setBody("");
            }}
            type="button"
            className="w-fit  border-indigo-500 border !py-[8px] !px-[12px] text-xs text-white tracking-wider rounded-sm cursor-pointer uppercase"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="inline-flex items-center butn butn__new !py-[8px] !px-[12px] !mr-0 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-[#3478F6] border border-transparent rounded-sm active:bg-gray-900 false"
        >
          {edit ? "Save Changes" : "Post"}
        </button>
      </div>
    </form>
  );
};
