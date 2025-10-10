import React, { useState, useEffect } from "react";
import "./feed.css";

const Feed = () => {
  const [stories, setStories] = useState([]);
  const [posts, setPosts] = useState([]);

  // Fetch stories
  useEffect(() => {
    fetch("http://localhost:3002/stories")
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch((err) => console.log(err));
  }, []);

  // Fetch posts
  useEffect(() => {
    fetch("http://localhost:3002/users")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="feed-container">

      {/* Stories row */}
      <div className="stories">
        {stories.map((story) => (
          <div key={story.id} className="story">
            <div className="story-ring">
              <img
                src={story.profilePic}
                alt={story.username}
                className="storyimg"
              />
            </div>
            <p>{story.username}</p>
          </div>
        ))}
      </div>

      {/* Posts */}
      <div className="posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              {/* User header */}
              <div className="d-flex align-items-center mb-2">
                <img
                  src={post.profilePic}
                  alt={post.username}
                  className="rounded-circle me-2"
                  width="40"
                  height="40"
                />
                <div>
                  <p className="mb-0 fw-bold">{post.name}</p>
                  <small className="text-muted">@{post.username}</small>
                </div>
              </div>

              {/* Post image */}
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="postimage"
              />

              {/* Caption */}
              <p>
                <strong>@{post.username}</strong> {post.caption}
              </p>

              {/* Buttons */}
              <div className="d-flex justify-content-around mt-2 border-top pt-2">
                <button className="btn btn-light btn-sm">
                  <i className="bi bi-hand-thumbs-up"></i> Like
                </button>
                <button className="btn btn-light btn-sm">
                  <i className="bi bi-chat"></i> Comment
                </button>
                <button className="btn btn-light btn-sm">
                  ↗ <i className="bi bi-share"></i> Share
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>Loading posts...</div>
        )}
      </div>
    </div>
  );
};

export default Feed;
