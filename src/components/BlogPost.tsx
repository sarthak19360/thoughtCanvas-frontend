import { useState } from "react";

const BlogPost = () => {
  const [inputText, setInputText] = useState("");
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
        <button className="border w-full h-10 text-lg border-gray-400 rounded-full hover:bg-gray-300">
          POST
        </button>
      </div>
    </div>
  );
};

export default BlogPost;
