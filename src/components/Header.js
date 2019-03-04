import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
   render() {
      return(
         <header>
            <div className="wrapper">
               <h1>Feedwatch</h1>
               <label htmlFor="navMenu">
                  <i className="fas fa-bars"></i>
               </label>
            </div>
         </header>
      )
   }
}

export default Header;