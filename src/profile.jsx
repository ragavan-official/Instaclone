import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import './sidebar.css'
import './App.css'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // 🧠 Fetch user profile & posts from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock API for user profile (using randomuser.me)
        const userRes = await fetch("https://randomuser.me/api/")
        const userData = await userRes.json()
        const profile = userData.results[0]

        setUser({
          username: profile.login.username,
          fullname: `${profile.name.first} ${profile.name.last}`,
          followers: Math.floor(Math.random() * 1000),
          following: Math.floor(Math.random() * 1000),
          posts: 24,
          bio: "✨ Developer | 🎥 Content Creator | 🌍 Explorer",
          profilePic: profile.picture.large,
        })

        // Picsum API for post images
        const postsRes = await fetch("https://picsum.photos/v2/list?page=2&limit=12")
        const postsData = await postsRes.json()
        setPosts(postsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="side">
        <Sidebar />
      </div>

      {/* Main Profile Section */}
      <div className="profile container py-4" style={{ marginLeft: "250px", width: "80%" }}>
        {/* Top Section - Profile Pic + Info */}
        <div className="d-flex align-items-center mb-4">
          {/* Profile Picture */}
          <div className="me-5">
            <img 
              src={user.profilePic} 
              alt="Profile" 
              className="rounded-circle"
              style={{
                height: "10rem",
                width: "10rem",
                border: "2px solid #ddd",
                objectFit: "cover"
              }}
            />
          </div>

          {/* Profile Info */}
          <div>
            <div className="d-flex align-items-center gap-3 mb-3">
              <h4 className="m-0">Ragavram</h4>
              <button className="btn btn-light btn-sm border">Edit profile</button>
              <button className="btn btn-light btn-sm border">View archive</button>
            </div>

            <div className="d-flex gap-4 mb-3">
              <p><strong>{user.posts}</strong> posts</p>
              <p><strong>{user.followers}</strong> followers</p>
              <p><strong>{user.following}</strong> following</p>
            </div>

            <div>
              <strong>{user.fullname}</strong>
              <p className="m-0">{user.bio}</p>
            </div>
          </div>
        </div>

        {/* Story Highlights */}
        <div className="d-flex gap-4 mb-4">
          {["Trip", "Food", "Work", "Fun"].map((highlight, i) => (
            <div key={i} className="text-center">
              <img
                src={`https://via.placeholder.com/80?text=${highlight}`}
                alt={highlight}
                className="rounded-circle border"
                style={{ width: "5rem", height: "5rem", objectFit: "cover" }}
              />
              <p className="small mt-1">{highlight}</p>
            </div>
          ))}
        </div>

        <hr />

        {/* Posts Section */}
        <div className="d-flex justify-content-center gap-5 mb-3">
          <div><i className="bi bi-grid-3x3"></i> POSTS</div>
          <div><i className="bi bi-film"></i> REELS</div>
          <div><i className="bi bi-bookmark"></i> SAVED</div>
          <div><i className="bi bi-person"></i> TAGGED</div>
        </div>

        {/* Posts Grid */}
        <div className="row g-2">
          {posts.map((post) => (
            <div key={post.id} className="col-4">
              <img
                src={post.download_url}
                alt={post.author}
                className="img-fluid"
                style={{
                  objectFit: "cover",
                  height: "15rem",
                  width: "100%",
                  borderRadius: "4px"
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
