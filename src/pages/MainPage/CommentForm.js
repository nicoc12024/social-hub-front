import TextareaAutosize from "react-textarea-autosize";
import { HiArrowCircleRight } from "react-icons/hi";

export default function CommentForm({
  userInfoFromBackend,
  handleSubmitComment,
  comment,
  handleCommentChange,
  remainingCommentChar,
}) {
  return (
    <form
      onSubmit={handleSubmitComment}
      className="flex flex-row items-center justify-between w-full bg-bgLightPurple py-4 px-4"
    >
      <div className="flex flex-row items-center w-full">
        <div className="w-7 h-7 border-2 border-gray-400 rounded-full cursor-pointer overflow-hidden inline-block relative">
          <div className="w-full h-full overflow-hidden">
            <img
              src={userInfoFromBackend?.profilePicture}
              alt="User profile pic"
              className="object-cover w-full h-full "
            />
          </div>
        </div>
        <div className="flex flex-col items-start w-[90%] mx-2">
          <TextareaAutosize
            onChange={handleCommentChange}
            value={comment}
            id="text"
            type="text"
            placeholder="Write a comment..."
            className="block py-1 px-2 focus:outline-none resize-none min-h-16 overflow-auto text-gray2 border-gray-400 bg-bgLightPurple border-b-[1px] border-b-gray-50 border-opacity-30 transition duration-150 ease-in-out transform placeholder-[#d4d4d48b] text-sm w-full rounded-sm shadow-sm"
          />
          {remainingCommentChar === 0 && (
            <p className="text-right text-gray2 mt-1">
              {remainingCommentChar} characters remaining
            </p>
          )}
        </div>
      </div>
      <div onClick={handleSubmitComment} className="cursor-pointer">
        <HiArrowCircleRight className="text-gray2 h-6 w-6 hover:text-white transition duration-150 " />
      </div>
    </form>
  );
}
