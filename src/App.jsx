import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './sidebar';
import Feed from './feed';
import Suggest from './suggest';
const App = () => {
  return (
    <div className='d-flex vh-100'>
      <div className="side"><Sidebar/></div>
      <div className="w-50"><Feed/></div>
      <div className="suggest"><Suggest /></div>
    </div>
  )
}

export default App