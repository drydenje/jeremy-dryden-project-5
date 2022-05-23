import React from "react";
import { useSelector } from "react-redux";
import Article from "../../components/Article/Article";
import "../Feed/Feed.css";

export const Feed = () => {
  // Turn props into an array
  const articles = useSelector((state) => state.articles);
  // console.log(articles);

  // const articles = this.props.articles.sort((a, b) => {
  //   // Sort the array by date (most recent)
  //   const d1 = new Date(a.date);
  //   const d2 = new Date(b.date);
  //   return d1 < d2;
  // });

  // check if there is data to display

  const arr = Object.keys(articles);
  console.log(arr);

  return (
    // Loop through the array and pass each item to an Article object
    // Uses the article url as the key
    <main id="maincontent">
      {/* {articles.map((article) => {
        console.log("A:", article);
        return <Article article={article} key={article.link} />;
      })} */}
    </main>
  );
  //   } else {
  //     return (
  //       <div className="wrapper">
  //         <h1>Open the menu and add a search term</h1>
  //       </div>
  //     );
  //   }
};

export default Feed;
