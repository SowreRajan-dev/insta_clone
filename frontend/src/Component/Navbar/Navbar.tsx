import React, { useState} from 'react'
import Button from '../button/Button'
import Searchbar from '../searchbar/Searchbar'
import "./navbar.css"
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
                      <Button label="Log in" primary />
                      <Button label="Sign up" />
                      
                  </div>
              </div>
          </div>  )
}

export default Navbar