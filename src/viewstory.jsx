import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./view.css";

const Viewstory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const storyId = Number(id);
  const [story, setStory] = useState(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/stories")
      .then((res) => res.json())
      .then((data) => setStories(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3002/stories/${storyId}`)
      .then((res) => res.json())
      .then((data) => setStory(data))
      .catch(() => setStory(null));
  }, [storyId]);

  const currentIndex = stories.findIndex((s) => s.id === storyId);
  const prevStory = currentIndex > 0 ? stories[currentIndex - 1] : null;
  const nextStory =
    currentIndex >= 0 && currentIndex < stories.length - 1
      ? stories[currentIndex + 1]
      : null;

  if (!story) {
    return (
      <div className="loading-text">
        Story not found 😢
        <br />
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="story-page">
  
      <div className="story-header">
        <img src={story.profilePic} alt={story.username} />
        <span>{story.username}</span>
      </div>

     
      <div className="story-items">
        {story.items?.map((item) => (
          <div key={item.storyId} className="story-item">
            {item.type === "image" ? (
              <img src={item.url} alt="story" className="story-img" />
            ) : (
              <video
                src={item.url}
                className="story-video"
                autoPlay
                controls
              />
            )}
          </div>
        ))}
      </div>

      {prevStory && (
        <Link to={`/story/${prevStory.id}`}>
          <i className="bi bi-arrow-left-circle-fill story-arrow left"></i>
        </Link>
      )}

      {nextStory && (
        <Link to={`/story/${nextStory.id}`}>
          <i className="bi bi-arrow-right-circle-fill story-arrow right"></i>
        </Link>
      )}

    
      <i
        className="bi bi-x-circle story-close"
        onClick={() => navigate(-1)}
      ></i>
    </div>
  );
};

export default Viewstory;
