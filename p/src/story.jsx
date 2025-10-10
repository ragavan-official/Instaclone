import React, { useState, useEffect } from "react";
import "./feed.css";

const Story = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/stories")
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="stories">
      {stories.map((story) => (
        <div key={story.id} className="story">
          <div className="story-ring" key={story.id}>
            <img src={story.profilePic} alt={story.username} className="storyimg" />
          </div>
          <p className="text-truncate" style={{width:"50px"}}>{story.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Story;
