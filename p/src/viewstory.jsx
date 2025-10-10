import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./view.css";

const Viewstory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [storyv, setStoryv] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const storyId = Number(id);

  // Fetch all stories once to know total count
  useEffect(() => {
    fetch("http://localhost:3002/stories")
      .then((res) => res.json())
      .then((data) => setAllStories(data))
      .catch((err) => console.log(err));
  }, []);

  // Fetch single story based on id
  useEffect(() => {
    fetch(`http://localhost:3002/stories/${storyId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Story not found");
        return res.json();
      })
      .then((data) => setStoryv(data))
      .catch((err) => setStoryv(null));
  }, [storyId]);

  // Helper for navigation boundaries
  const nextId = storyId < allStories.length ? storyId + 1 : storyId;
  const prevId = storyId > 1 ? storyId - 1 : storyId;

  if (!storyv) {
    return (
      <div className="loading-text">
        Story not found 😢
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="story-page">
      {/* Header */}
      <div className="story-header">
        <img src={storyv.profilePic} alt={storyv.name} />
        <span>{storyv.name}</span>
      </div>

      {/* Story Items Carousel */}
      {storyv.items && storyv.items.length > 0 ? (
        <div className="story-items">
          {storyv.items.map((item, idx) => (
            <div key={item.storyId} className="story-item">
              {item.type === "image" ? (
                <img src={item.url} alt={`story ${idx}`} className="story-img" />
              ) : (
                <video
                  src={item.url}
                  controls
                  className="story-video"
                  width="100%"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No items in this story.</div>
      )}

      {/* Navigation Arrows */}
      {storyId > 1 && (
        <Link to={`/story/${prevId}`}>
          <i className="bi bi-arrow-left-circle-fill story-arrow left"></i>
        </Link>
      )}
      {storyId < allStories.length && (
        <Link to={`/story/${nextId}`}>
          <i className="bi bi-arrow-right-circle-fill story-arrow right"></i>
        </Link>
      )}

      {/* Close Button */}
      <i className="bi bi-x-circle story-close" onClick={() => navigate(-1)}></i>
    </div>
  );
};

export default Viewstory;
