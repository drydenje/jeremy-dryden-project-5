import React, { Component } from "react";
import Article from "../../components/Article/Article";
import "../Feed/Feed.css";

class Feed extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  render() {
    if (this.state.hasError) {
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
    if (this.props.articles.length > 0) {
      // const articles = this.props.articles;
      if (articles[0] !== undefined) {
        return (
          // Loop through the array and pass each item to an Article object
          // Uses the article url as the key
          <main id="maincontent">
            {/* // <div className="wrapper"> */}
            {articles.map(article => {
              console.log("A:", article);
              return <Article article={article} key={article.link} />;
            })}
            {/* </div> */}
          </main>
        );
      } else {
        return (
          <div className="wrapper">
            <h1>Open the menu and add a search term</h1>
          </div>
        );
      }
    } else {
      return (
        <div className="wrapper">
          <h1>Open the menu and add a search term</h1>
        </div>
      );
    }
  }
}

export default Feed;
