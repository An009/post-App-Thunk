import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/doThis.png";
import {GoThreeBars} from 'react-icons/go';
import {AiOutlineClose} from 'react-icons/ai';

const Navbar = () => {
  const [isExpended ,setIsExpended] = useState(false);
  const handleClick =()=>{
    setIsExpended(!isExpended);
  }
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="" />
        <h2>
          What's in your <span>Mind</span>
        </h2>
      </div>
      <ul className={isExpended ? "menu" : ""}>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/post">
          <li>Posts</li>
        </Link>
        <Link to="/addPost">
          <li>Add post</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
      </ul>
      <button className="bars" onClick={handleClick}>{isExpended ? <AiOutlineClose/> : <GoThreeBars />}</button>
    </nav>
  );
};
export default Navbar;
