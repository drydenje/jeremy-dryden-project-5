import React from 'react'

const Navigation = (props) => {
   return (
      <nav>
         {
            props.searchTerms.map((item) => {
               return (
                  <li key={item.key}>
                     {item.keyword}
                  </li>    
               )   
            })
         }
      </nav>
   )
}

export default Navigation;