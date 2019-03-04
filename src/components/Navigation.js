import React, { Fragment } from 'react';
import './Navigation.css';

const Navigation = (props) => {
   return (
      <Fragment>
         <input type="checkbox" id="navMenu" />
         <nav>
            <form action="submit" onSubmit={props.addQuery}>
               <input type="text"
                  placeholder="Add a query to watch for"
                  name="addQuery"
                  onChange={props.inputChange}
               />
               <button type="submit">Add Query</button>
            </form>
            
            <ul>
               <li key={'all'}>All</li>
            {
               props.searchTerms.map((item) => {
                  return (
                     <li key={item.key}>
                        {item.keyword}
                        <span>
                           <a href="#0" onClick={() => props.removeQuery(item.key)}>
                              <i className="far fa-times-circle"></i>
                           </a>
                        </span>
                     </li>    
                  )   
               })
            }
            </ul>
         </nav>
      </Fragment>
   )
}

export default Navigation;
