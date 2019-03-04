import React, { Component } from 'react';
import Article from './Article';
import './Feed.css';

class Feed extends Component {
   constructor() {
      super();
      this.state = { hasError: false };
   }

   render() {
      if(this.state.hasError) {
         // fallback UI when an error has been thrown
         return <h1>Something went wrong</h1>;
      }

      // Turn props into an array
      const articles = this.props.articles.sort((a, b) => {
         // Sort the array by date (most recent)
         const d1 = new Date(a.date);
         const d2 = new Date(b.date);
         return d1 < d2;
      });
      if(this.props.articles.length > 0) {
         
         // const articles = this.props.articles;
         if(articles[0] !== undefined) {
            return (
               // Loop through the array and pass each item to an Article object
               // Uses the article url as the key
               <main>
                  { 
                     articles.map((article) => {
                        return (
                           <Article article={article} key={article.link}/>
                        )
                     })
                  }
               </main>
            )
         } else {
            return (<h1>Loading...</h1>)
         }
      } else {
         return (<h1>Loading...</h1>);
      }
   }
} 

export default Feed;