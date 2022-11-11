import React, { useState} from 'react'
import Button from '../button/Button'
import Searchbar from '../searchbar/Searchbar'
import {Link} from "react-router-dom";
import "./navbar.css";
interface Props { 
    searchValue: string;
    onSearchValueChange: Function;
}
function Navbar({ searchValue, onSearchValueChange}:Props) {
  
  return (
  <div className="navbar-container">
              <div className="navbar">
                  <div className="logo-section hoverable">
                  Instagram
                
                  </div>
                  <div className="searchbar-section">
                      <Searchbar searchValue={searchValue} onSearchValueChange={ onSearchValueChange}  />
                  </div>
              <div className="actions-section">
                  <Link to="/login">
                      <Button label="Log in" primary />
                  </Link>
                  <Link to="/signup">
                      <Button label="Sign up" />
                  </Link>
                      
                  </div>
              </div>
          </div>  )
}

export default Navbar