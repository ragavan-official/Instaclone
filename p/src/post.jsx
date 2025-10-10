import React, { useEffect, useState } from 'react';
import './feed.css'; // move your CSS here

const Post = () => {
  const [posts, setPosts] = useState([]);
//json-server --watch db.json --port 3002

  useEffect(() => {
    fetch('http://localhost:3002/users')
      .then((data) => data.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {posts.length > 0 ? (
        
        <div>
        
       
          {posts.map((post) => (
            <div key={post.id} className="post-card mb-4">
              {/* User header */}
              <div className="postpic">
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
              <div className="imgdiv">
             
                   <img
                src={post.imageUrl}
                alt={post.caption}
                className="postimage"
                
              />

              </div>
             

              <p>
                <strong>@{post.username}</strong> {post.caption}
              </p>

             
              <div className="d-flex justify-content-around mt-2 border-top pt-2">
                <button className="btn btn-light btn-sm"><i class="bi bi-hand-thumbs-up"></i> Like</button>
                <button className="btn btn-light btn-sm"><i class="bi bi-chat"></i> Comment</button>
                <button className="btn btn-light btn-sm">↗<i class="bi bi-share"></i> Share</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading posts...</div>
      )}
    </div>
  );
};

export default Post;
