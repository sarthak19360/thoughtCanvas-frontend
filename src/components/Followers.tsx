import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const Followers = () => {
  const [searchParams] = useSearchParams();
  const [followers, setFollowers] = useState([]);
  const fetchUserFollowers = async () => {
    const data = await fetch(
      `http://localhost:3000/user/followers/${searchParams.get("userName")}`
    );
    const json = await data.json();
    setFollowers(json.data);
  };
  useEffect(() => {
    fetchUserFollowers();
  }, []);
  return (
    <div className="w-1/6 mx-auto bg-red-300 py-4 rounded-lg text-center">
      <div className="font-bold text-lg">Followers</div>
      {followers.map((f) => (
        <div key={f}>{f}</div>
      ))}
    </div>
  );
};

export default Followers;
