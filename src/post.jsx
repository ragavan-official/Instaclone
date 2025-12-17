import React, { useEffect, useState } from "react";
import "./feed.css";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const currentUserId = 1; 
  useEffect(() => {
    fetch("http://localhost:3002/users")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  
  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = post.likes.includes(currentUserId);
          const updatedLikes = isLiked
            ? post.likes.filter((id) => id !== currentUserId)
            : [...post.likes, currentUserId];
          return { ...post, likes: updatedLikes };
        }
        return post;
      })
    );
  };

  
  const handleAddComment = (postId, text) => {
    if (!text.trim()) return;
    const newComment = {
      id: Date.now(),
      userId: currentUserId,
      text: text.trim(),
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  return (
    <div>
      {posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-card mb-4 p-3 border rounded">
            {/* User Info */}
            <div className="d-flex align-items-center mb-2">
              <img
                src={post.profilePic}
                alt={post.username}
                className="rounded-circle me-2"
                width="40"
                height="40"
              />
              <div>
                <strong>{post.name}</strong>
                <div className="text-muted">@{post.username}</div>
              </div>
            </div>

            {/* Post Image */}
            <div className="text-center">
              <img
                src={post.imageUrl}
                alt="post"
                className="img-fluid rounded mb-2"
              />
            </div>

            {/* Like + Comment Buttons */}
            <div className="d-flex justify-content-around mt-2 border-top pt-2">
              <button
                className={`btn btn-sm ${
                  post.likes.includes(currentUserId)
                    ? "btn-danger text-white"
                    : "btn-light"
                }`}
                onClick={() => handleLike(post.id)}
              >
                <i className="bi bi-heart-fill me-1"></i>
                {post.likes.length} Likes
              </button>

              <button
                className="btn btn-light btn-sm"
                onClick={() => {
                  const text = prompt("Add a comment:");
                  if (text) handleAddComment(post.id, text);
                }}
              >
                <i className="bi bi-chat me-1"></i> Comment
              </button>
            </div>

            <p className="mt-2 mb-1">
              <strong>@{post.username}</strong> {post.caption}
            </p>

            
            <div className="border-top pt-2">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((c) => (
                  <p key={c.id} className="mb-1">
                    <strong>User {c.userId}</strong>: {c.text}
                  </p>
                ))
              ) : (
                <p className="text-muted">No comments yet</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Post;
