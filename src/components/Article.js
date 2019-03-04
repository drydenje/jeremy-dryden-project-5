import React from 'react';
import './Article.css'

const Article = (props) => {
   return (
      <article>
         { props.article.image ? 
         <figure>
            <img src={props.article.image} 
               alt={props.article.title}/>
         </figure>
         : ""
         }
         <h2><a href={props.article.link}>{props.article.title}</a></h2>
         <h3>{props.article.source}</h3>
         <h3>{props.article.date}</h3>
         <p>{props.article.desc}</p>
      </article>
   )
}

export default Article; 