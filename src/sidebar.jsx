import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
   const navigate = useNavigate();
    const reelss = () => {
    navigate('/reels');  
  };
  return (
    <div className='m-3' id='sidebarr'>
        <div className=' position-fixed top-0 d-flex flex-column gap-3'>
      <img src="../src/assets/insta.png" alt=""  className='logo'/>
      <div onClick={()=>navigate("/")}><i className="bi bi-house-door-fill"></i>Home</div>
      <div><i className="bi bi-search"></i>Search</div>
      <div><i className="bi bi-compass-fill"></i>Explore</div>
<div onClick={reelss}  style={{cursor:'pointer'}}><i className="bi bi-play-btn-fill" ></i>Reels</div>
      <div><i className="bi bi-chat-dots-fill"></i>Message</div>
      <div><i className="bi bi-heart-fill"></i>Notification</div>
      <div><i className="bi bi-plus-square"></i>Create</div>
      <div onClick={()=>navigate("/profile")}><i className="bi bi-person-circle"></i>Profile</div>
       </div>
       <div className='position-fixed bottom-0 d-flex flex-column gap-3 mb-3'>
        <div><i className="bi bi-threads"></i>Threads</div>
        <div><i className="bi bi-list"></i>more</div>
        </div>
        </div>

  )
}

export default Sidebar