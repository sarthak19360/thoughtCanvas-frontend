import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
const BlogCard = ({ author, content }: any) => {
  const [followed, setFollowed] = useState(false);
  return (
    <div className="flex flex-col w-6/12 px-3 py-1 my-2 border border-gray-300 rounded-xl">
      <div className="px-3 py-1 flex items-center justify-between ">
        <div className="flex items-center">
          <FaCircleUser className="text-2xl" />
          <div className="text-lg px-2 cursor-pointer hover:underline">
            <Link to={`/profile?userName=${author}`}>@{author}</Link>
          </div>
        </div>
        <button
          className="cursor-pointer bg-gray-300 rounded-lg px-2 py-1"
          onClick={() => setFollowed(!followed)}
        >
          {followed ? "Followed" : "Follow"}
        </button>
      </div>
      <div className="px-4 py-1 ml-2">{content}</div>
    </div>
  );
};

export default BlogCard;
