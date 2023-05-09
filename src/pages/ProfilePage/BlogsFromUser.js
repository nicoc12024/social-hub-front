import React from "react";
import { BlogItem } from "../../components/blog/shared/BlogItem";

export const BlogsFromUser = ({ userBlogs }) => {
  return (
    <>
      {/* Items added from Form */}
      <div className="flex flex-col gap-4 mx-auto mt-8">
        {userBlogs?.map((item) => (
          <BlogItem key={item.id} item={item} hideEditButtons={true} />
        ))}
      </div>
    </>
  );
};
