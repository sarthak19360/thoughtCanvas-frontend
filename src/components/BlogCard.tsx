import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BlogCard = ({ id, author, content }: any) => {
  return (
    <div className="flex flex-col w-6/12 px-3 py-1 my-2 border border-gray-300 rounded-xl">
      <div className="px-3 py-1 flex items-center justify-between">
        <div className="flex items-center">
          <FaCircleUser className="text-2xl" />
          <div className="text-lg px-2 cursor-pointer hover:underline">
            <Link to={`/profile?userName=${author}`}>@{author}</Link>
          </div>
        </div>
      </div>
      <Link to={"/singleblog?blogId=" + id}>
        <div className="px-4 py-1 ml-2">{content}</div>
      </Link>
    </div>
  );
};

export default BlogCard;
