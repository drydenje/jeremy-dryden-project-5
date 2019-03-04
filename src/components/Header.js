import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
   render() {
      return(
         <header>
            <h1>Watchtower</h1>
            
            <label htmlFor="navMenu">
               <i className="fas fa-bars"></i>
            </label>
         </header>
      )
   }
}

export default Header;