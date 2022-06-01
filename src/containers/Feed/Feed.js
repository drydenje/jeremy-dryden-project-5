import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Article from "../../components/Article/Article";
import "../Feed/Feed.css";

export const Feed = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    // console.log(currentParams);
  }, [searchParams]);

  // Turn props into an array
  const articles = useSelector((state) => state.articles);
  // console.log(articles);

  // const articles2 = this.props.articles.sort((a, b) => {
  //   // Sort the array by date (most recent)
  //   const d1 = new Date(a.date);
  //   const d2 = new Date(b.date);
  //   return d1 < d2;
  // });

  // check if there is data to display
  const keywords = Object.keys(articles);
  const renderedArticles = keywords.map((keyword) => {
    // console.log("A:", articles[keyword][0].url);
    // console.log("A:", articles[keyword]);
    return articles[keyword].map((article) => {
      // console.log(article);
      return <Article article={article} key={article.url} />;
    });
  });

  return (
    // Loop through the array and pass each item to an Article object
    // Uses the article url as the key
    <main id="maincontent">{renderedArticles}</main>
  );

  /* {articles.map((article) => {
        console.log("A:", article);
        return <Article article={article} key={article.link} />;
      })} */

  //   } else {
  //     return (
  //       <div className="wrapper">
  //         <h1>Open the menu and add a search term</h1>
  //       </div>
  //     );
  //   }
};

export default Feed;
