import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { useState } from "react";
const Header = () => {
  const [showSignupOptions, setShowSignupOptions] = useState(false);
  return (
    <div className="flex justify-between bg-gray-50 rounded-md p-3 h-16 items-center">
      <div className="ml-5">THOUGHT CANVAS</div>
      <div className="">
        <ul className="flex">
          <Link to="/">
            <li className="px-8">Home</li>
          </Link>
          <Link to="/following">
            <li className="px-8">Following</li>
          </Link>
          <Link to="/post">
            <li className="px-8">Post</li>
          </Link>
        </ul>
      </div>
      <div>
        <FaCircleUser
          className="text-2xl mr-32"
          onClick={() => setShowSignupOptions(!showSignupOptions)}
        />
        {showSignupOptions && (
          <div className="absolute rounded-lg px-2 py-1 bg-gray-100 mt-2">
            <Link to="/login" onClick={() => setShowSignupOptions(false)}>
              <div className="text-center w-28 p-2 my-2 rounded-lg bg-gray-200">
                Login
              </div>
            </Link>
            <Link to="/signup" onClick={() => setShowSignupOptions(false)}>
              <div className="text-center w-28 p-2 mb-2 rounded-lg bg-gray-200">
                SignUp
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
