import React from 'react';
import Article from './Article';

const Feed = (props) => {
   // Turn props into an array
   const articles = props.articles.sort((a, b) => {
      // Sort the array by date (most recent)
      return a.date < b.date;
   });
   
   return (
      // Loop through the array and pass each item to an Article object
      // Uses the article url as the key
      <main>
         {
            articles.map((article) => {
               return <Article article={article} key={article.link}/>
            })
         }
      </main>
   )
} 

export default Feed;