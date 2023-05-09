import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function CommentList({
  commentsOfThePost,
  location,
  userId,
  handleDeleteComment,
}) {
  return (
    <>
      {commentsOfThePost.map((comment) => (
        <div
          key={comment.id}
          className="p-2 bg-bgLightPurple rounded mt-2 flex flex-row items-center w-full"
        >
          <Link
            className="w-7 h-7 mr-2 border-2 border-gray-400 rounded-full cursor-pointer overflow-hidden inline-block relative"
            to={`/profile/${comment.user}`}
          >
            <div className="w-full h-full overflow-hidden">
              <img
                src={comment.profilePicture}
                alt="User profile pic"
                className="object-cover w-full h-full "
              />
            </div>
          </Link>

          <Link className="w-[90%]" to={`/profile/${comment.user}`}>
            <p className=" text-white">{comment.username}</p>
            <p>{comment.content}</p>
          </Link>

          {location.pathname.includes("home") && userId === comment?.user && (
            <AiFillDelete
              className="cursor-pointer hover:text-white transition duration-150"
              onClick={() => handleDeleteComment(comment.id)}
            />
          )}
        </div>
      ))}
    </>
  );
}
