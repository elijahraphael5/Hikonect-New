"use client";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className='navbar'>
      <img src='/logooooo-01qqq-01-01 (1).png' alt='' />
      <div className={`links ${mobileOpen ? "mobile-open" : ""}`}>
        <a href='/' onClick={() => setMobileOpen(false)}>Home</a>
        <a href='/about' onClick={() => setMobileOpen(false)}>About</a>
        <a href='/packages' onClick={() => setMobileOpen(false)}>Package</a>
        <a href='/help-desk' onClick={() => setMobileOpen(false)}>Help Desk</a>
        <a href='/contact' onClick={() => setMobileOpen(false)}>Contact</a>
        <div className='buttons mobile-only'>
          <button className='login-button'>Login</button>
        </div>
      </div>
      <div className='buttons desktop-only'>
        <button className='login-button'>Login</button>
      </div>
      <button className='hamburger' onClick={() => setMobileOpen(!mobileOpen)}>
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
};

export default Navbar;
