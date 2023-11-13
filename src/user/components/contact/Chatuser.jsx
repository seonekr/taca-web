import React from 'react'
import './chatuser.css'
import Header from '../header/Header';
import Menu from '../menu/Menu';

const Chatuser = () => {
  return (
    <>
      <Header />
      <div className="contactBox_container">
        <div className="contact_content">
          <h2>Phone: 020998878788</h2>
          <h2>Email: humascot@gmail.com</h2>
          <h2>Address: Asean mall</h2>
        </div>
      </div>
      <Menu />

    </>
  )
}

export default Chatuser
