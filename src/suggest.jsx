import React, { useState, useEffect } from "react";
import "./feed.css";

const Suggest = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [profile, setProfile] = useState(null);
  const [followStates, setFollowStates] = useState({}); // store follow state per user
   const [isswitch,setSwitch]=useState(true)
  useEffect(() => {
    fetch("http://localhost:3002/suggestions")
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data);

        // initialize all follow states as false
        const initialFollowStates = {};
        data.forEach((user) => {
          initialFollowStates[user.id] = false;
        });
        setFollowStates(initialFollowStates);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3002/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data && data.length > 0 ? data[0] : null))
      .catch((err) => console.log(err));
  }, []);

  // toggle follow for specific user
  const handleFollow = (userId) => {
    setFollowStates((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };
  const handleswitch=()=>{
    setSwitch((prev)=>!prev)
  }

  return (
    <div className="prosug">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <h5>Profile</h5>
        {profile && (
          <div
            key={profile.id}
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0 }}>{profile.name}</p>
            <button on onClick={handleswitch}id="probtn" className="btn btn-primary">
              {isswitch?"Switch":"nonSwitch"}
            </button>
          </div>
        )}

        <h5>Suggestions</h5>
        {suggestions.map((user) => (
          <div
            key={user.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <img
                src={user.profilePic}
                alt={user.username}
                width={40}
                height={40}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <p style={{ margin: 0 }}>{user.name}</p>
            </div>

            <button
              onClick={() => handleFollow(user.id)}
              style={{
                color: followStates[user.id] ? "green" : "blue",
                border: "none",
                backgroundColor: "white",
              }}
            >
              {followStates[user.id] ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggest;
