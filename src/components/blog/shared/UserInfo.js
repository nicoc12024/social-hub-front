import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function UserInfo({ item }) {
  return (
    <div className="flex items-center mb-1 gap-x-2">
      <Link to={`/profile/${item.user_id}`}>
        <div className="w-10 h-10 border-2 border-gray-400 rounded-full cursor-pointer overflow-hidden inline-block relative">
          <div className="w-full h-full overflow-hidden">
            <img
              src={item.profilePicture}
              alt="User profile pic"
              className="object-cover w-full h-full "
            />
          </div>
        </div>
      </Link>
      <Link to={`/profile/${item.user_id}`}>
        <h3 className="sm:text-md text-[16px] font-semibold text-gray1 cursor-pointer">
          {item?.username}
          <span
            className="bg-blue-500 text-white rounded-full ml-1 p-1 inline-flex items-center justify-center"
            style={{ width: "18px", height: "18px" }}
          >
            <TiTick size="16px" />
          </span>
        </h3>
      </Link>

      <p className="sm:text-xs text-[10px] text-gray3">{item?.profession}</p>
      <p className="sm:text-xs text-[10px] text-gray3">-</p>
      <p className="sm:text-xs text-[10px] text-gray3">{item?.created_at}</p>
    </div>
  );
}
