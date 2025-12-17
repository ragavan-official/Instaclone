import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./feed.css";

const Story = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/stories")
      .then((res) => res.json())
      .then((data) => setStories(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="stories">
      {stories.map((story) => (
        <Link
          key={story.id}
          to={`/story/${story.id}`}
          className="story-link"
        >
          <div className="story">
            <div className="story-ring">
              <img
                src={story.profilePic}
                alt={story.username}
                className="storyimg"
              />
            </div>
            <p className="story-name">{story.username}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Story;
