import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "./BlogCard";

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
      <div className="px-3 py-1 w-1/2 mx-auto">
        Followers: {user?.followers.length}
      </div>
      <div className="px-3 py-1 w-1/2 mx-auto">
        Following: {user?.following.length}
      </div>
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
