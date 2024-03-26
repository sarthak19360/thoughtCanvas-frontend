import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "./BlogCard";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

type User = {
  name: String;
  followers: User[];
  following: User[];
};

type Blog = {
  _id: string;
  blog_author: string;
  blog_content: string;
};

const Profile = () => {
  const [followed, setFollowed] = useState<Boolean>(false);

  const handleUnfollow = async () => {
    try {
      // Retrieve the authorization token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authorization token not found");
        return;
      }
      const response = await fetch("http://localhost:3000/user/unfollow", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Attach the token to the Authorization header
        },
        body: JSON.stringify({ unfollowUserName: author }),
      });

      if (response.ok) {
        console.log("User unfollowed successfully");
        setFollowed(!followed);
      } else {
        console.log(
          "Failed to unfollow user:",
          response.status,
          await response.text()
        );
      }
    } catch (error) {
      // Handle errors from the request
      console.error("Error unfollowing user:", error);
    }
  };
  const handleFollow = async () => {
    try {
      // Retrieve the authorization token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authorization token not found");
        return;
      }
      const response = await fetch("http://localhost:3000/user/follow", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Attach the token to the Authorization header
        },
        body: JSON.stringify({ followUserName: author }),
      });

      if (response.ok) {
        console.log("User followed successfully");
        setFollowed(!followed);
      } else {
        console.log(
          "Failed to follow user:",
          response.status,
          await response.text()
        );
      }
    } catch (error) {
      // Handle errors from the request
      console.error("Error following user:", error);
    }
  };
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  useEffect(() => {
    fetchUserDetails();
    fetchBlogsByUser();
  }, []);
  const fetchUserDetails = async () => {
    const userDetail = await fetch(
      `http://localhost:3000/user/${searchParams.get("userName")}`
    );
    const data = await userDetail.json();
    setUser(data.data);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authorization token not found");
      return;
    }
    const userData = jwtDecode(token);
    if (Date.now() - Number(userData.exp + "000") >= 3600) {
      console.log("Expired");
    }

    if (data.data.followers.find((x) => x.username === userData.userName)) {
      setFollowed(true);
    }
  };
  const fetchBlogsByUser = async () => {
    const blogsByUser = await fetch(
      `http://localhost:3000/blogs/user/${searchParams.get("userName")}`
    );
    const data = await blogsByUser.json();
    setBlogs(data.blogs);
  };
  return (
    <div className="mx-auto">
      <div className="px-3 py-1 w-1/2 mx-auto">{user?.name}</div>
      <div className="w-1/2 mx-auto flex">
        <Link
          to={"/followers?userName=" + searchParams.get("userName")}
          className="px-3 py-1 w-1/2 mx-auto"
        >
          Followers: {user?.followers.length}
        </Link>
        <div className="px-3 py-1 w-1/2 mx-auto">
          Following: {user?.following.length}
        </div>
      </div>
      <button
        className="flex justify-center cursor-pointer bg-gray-300 rounded-lg px-2 py-1 w-1/2 mx-auto"
        onClick={followed ? handleUnfollow : handleFollow}
      >
        {followed ? "Followed" : "Follow"}
      </button>
      <div className="flex flex-col items-center">
        {blogs?.map((b) => {
          return (
            <BlogCard
              key={b._id}
              author={b.blog_author}
              content={b.blog_content}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
