import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type Blog = {
  blog_author: String;
  blog_content: String;
  createdAt: Date;
};

const SingleBlog = () => {
  const [searchParams] = useSearchParams();
  const [blog, setBlog] = useState<Blog | undefined>();
  const [showBox, setShowBox] = useState<Boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const fetchBlogDetails = async () => {
    const resposne = await fetch(
      "http://localhost:3000/blog/" + searchParams.get("blogId")
    );
    const json = await resposne.json();
    setBlog(json.blog);
    setInputText(json.blog.blog_content);
  };
  useEffect(() => {
    fetchBlogDetails();
  }, []);
  const handleDelete = async () => {
    try {
      // Retrieve the authorization token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authorization token not found");
        return;
      }
      const response = await fetch(
        "http://localhost:3000/blog/" + searchParams.get("blogId"),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Attach the token to the Authorization header
          },
        }
      );
      console.log(response);

      if (response.ok) {
        console.log("Blog deleted successfully");
      } else {
        console.log(
          "Failed to delete blog:",
          response.status,
          await response.text()
        );
      }
    } catch (error) {
      // Handle errors from the request
      console.error("Error deleting blog:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      // Retrieve the authorization token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authorization token not found");
        return;
      }
      const response = await fetch(
        "http://localhost:3000/blog/" + searchParams.get("blogId"),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Attach the token to the Authorization header
          },
          body: JSON.stringify({ content: inputText }),
        }
      );
      console.log(response);

      if (response.ok) {
        console.log("Blog updated successfully");
        fetchBlogDetails();
      } else {
        console.log(
          "Failed to update blog:",
          response.status,
          await response.text()
        );
      }
    } catch (error) {
      // Handle errors from the request
      console.error("Error updating blog:", error);
    }
  };

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Authorization token not found");
    return;
  }
  const userData = jwtDecode(token);
  const username = userData.userName;

  return (
    <div className="w-1/3 mx-auto bg-blue-200 text-center py-4 px-5 rounded-lg">
      <div className="text-xl font-bold">{blog?.blog_author}</div>
      <div className="text-lg font-medium">{blog?.blog_content}</div>
      {username === blog?.blog_author && (
        <div className="flex justify-between">
          <button
            className="bg-red-200 px-2 py-1 rounded-lg"
            type="submit"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-red-200 px-2 py-1 rounded-lg"
            type="submit"
            onClick={() => setShowBox(true)}
          >
            Update
          </button>
        </div>
      )}
      {showBox && (
        <>
          <textarea
            className="bg-red-200 px-2 py-1 mt-3 rounded-lg w-full h-48"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            className="bg-red-200 px-2 py-1 rounded-lg"
            type="submit"
            onClick={handleUpdate}
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default SingleBlog;
