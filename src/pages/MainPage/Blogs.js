import React from "react";
import { BlogItem } from "../../components/blog/shared/BlogItem";
import { useHandleLike } from "./hooks/useHandleLike";

export const Blogs = ({ blogs = [], setBlogs, setBody, setEdit, setItemId, userId }) => {
  const { handleLike } = useHandleLike(userId);

  return (
    <>
      {/* Items added from Form */}
      <div className="flex flex-col gap-4 mx-auto mt-8">
        {blogs?.map((item) => (
          <BlogItem
            key={item.id}
            item={item}
            setBody={setBody}
            setEdit={setEdit}
            setItemId={setItemId}
            blogs={blogs}
            setBlogs={setBlogs}
            handleLike={handleLike}
          />
        ))}
      </div>
    </>
  );
};
