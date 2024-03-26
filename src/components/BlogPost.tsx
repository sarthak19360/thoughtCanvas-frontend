import { useState } from "react";

const BlogPost = () => {
  const [inputText, setInputText] = useState("");
  const handleClick = async () => {
    try {
      // Retrieve the authorization token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authorization token not found");
        return;
      }
      const response = await fetch("http://localhost:3000/blog-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Attach the token to the Authorization header
        },
        body: JSON.stringify({ content: inputText }),
      });
      console.log(response);

      if (response.ok) {
        console.log("Blog Submitted successfully");
      } else {
        console.log(
          "Failed to submit blog:",
          response.status,
          await response.text()
        );
      }
      setInputText("");
    } catch (error) {
      // Handle errors from the request
      console.error("Error submitting blog:", error);
    }
  };
  return (
    <div className="flex flex-col items-center w-full h-screen bg-gray-100">
      <textarea
        className="border border-gray-400 bg-gray-200 w-1/2 mx-auto h-96 p-3 mt-5 rounded-lg"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        placeholder="Write your ideas here..."
      />
      <div className="flex justify-around w-1/2 mt-2">
        <button
          type="submit"
          className="border w-full h-10 text-lg border-gray-400 rounded-full hover:bg-gray-300"
          onClick={handleClick}
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default BlogPost;
