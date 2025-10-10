import React from 'react'
import './sidebar.css'
const Sidebar = () => {
  return (
    <div className='m-3' id='sidebarr'>
        <div className=' position-fixed top-0 d-flex flex-column gap-3'>
      <img src="../src/assets/insta.png" alt=""  className='logo'/>
      <div><i className="bi bi-house-door-fill"></i>Home</div>
      <div><i className="bi bi-search"></i>Search</div>
      <div><i className="bi bi-compass-fill"></i>Explore</div>
      <div><i className="bi bi-play-btn-fill"></i>Reels</div>
      <div><i className="bi bi-chat-dots-fill"></i>Message</div>
      <div><i className="bi bi-heart-fill"></i>Notification</div>
      <div><i className="bi bi-plus-square"></i>Create</div>
      <div><i className="bi bi-person-circle"></i>Profile</div>
       </div>
       <div className='position-fixed bottom-0 d-flex flex-column gap-3 mb-3'>
        <div><i className="bi bi-threads"></i>Threads</div>
        <div><i className="bi bi-list"></i>more</div>
        </div>
        </div>

  )
}

export default Sidebar