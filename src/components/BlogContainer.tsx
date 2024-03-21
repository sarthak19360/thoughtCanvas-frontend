import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

type Data = {
  _id: string;
  blog_content: string;
  blog_author: string;
  createdAt: string;
};

const BlogContainer = () => {
  const [blogs, setBlogs] = useState<Data[] | null>(null);
  const fetchData = async () => {
    try {
      const data = await fetch("http://localhost:3000/blogs");
      const jsondata = await data.json();
      setBlogs(jsondata.blogs);
    } catch (error) {
      console.log("Error fetching data: " + error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center bg-gray-100 py-3">
      {blogs &&
        Array.isArray(blogs) &&
        blogs.map((b: Data) => (
          <BlogCard
            key={b._id}
            author={b.blog_author}
            content={b.blog_content}
          />
        ))}
    </div>
  );
};

export default BlogContainer;
