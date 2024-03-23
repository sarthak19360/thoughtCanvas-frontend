import { useState } from "react";

const Login = () => {
  const [postData, setPostData] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setPostData({
      userName: "",
      password: "",
    });
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token); // Store the token in localStorage
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  return (
    <form
      className="flex flex-col items-center w-full min-h-svh bg-gray-100"
      onSubmit={handleSubmit}
    >
      <div className="text-4xl my-4">Login Page</div>
      <input
        className="w-4/12 h-12 border border-gray-400 p-2 rounded-tl-lg rounded-tr-lg bg-gray-200"
        type="text"
        name="userName"
        value={postData.userName}
        onChange={handleChange}
        placeholder="type your username"
      />
      <input
        className="w-4/12 h-12 border border-gray-400 p-2 rounded-bl-lg rounded-br-lg bg-gray-200"
        type="password"
        name="password"
        value={postData.password}
        onChange={handleChange}
        placeholder="enter password"
      />
      <button
        type="submit"
        className="w-4/12 mt-2 border border-gray-500 p-2 rounded-full hover:bg-gray-300"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
