import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [menu,setMenu] = useState("Home");
    const navigate = useNavigate();

    const handleMenuClick = (menuItem,path) => {
      setMenu(menuItem);
      navigate(path);
    }

   return (
    <div className='navbar'>
      <ul className='navbar-menu'>
        <li
          onClick={() => handleMenuClick("Formatter", "/formatter")}
          className={menu === "Formatter" ? "active" : ""}
        >
          Formatter
        </li>
        <li
          onClick={() => handleMenuClick("Encoder/Decoder", "/encoder")}
          className={menu === "Encoder/Decoder" ? "active" : ""}
        >
          Encoder/Decoder
        </li>
        <li
          onClick={() => handleMenuClick("JSON History", "/json-history")}
          className={menu === "JSON History" ? "active" : ""}
        >
          JSON History
        </li>
      </ul>

      <div className='navbar-right'>
        <button onClick={() => handleMenuClick("Home", "/")}>Home</button>
      </div>
    </div>
  );
};


export default Navbar