const SignUp = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-svh bg-gray-100">
      <div className="text-4xl my-4">SignUp Page</div>
      <input
        className="w-4/12 h-12 border border-gray-400 p-2 rounded-tl-lg rounded-tr-lg bg-gray-200"
        type="text"
        placeholder="type your username"
      />
      <input
        className="w-4/12 h-12 border border-gray-400 p-2 rounded-bl-lg rounded-br-lg bg-gray-200"
        type="password"
        placeholder="enter password"
      />
      <button className="w-4/12 mt-2 border border-gray-500 p-2 rounded-full hover:bg-gray-300">
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
