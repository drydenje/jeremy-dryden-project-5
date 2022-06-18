// import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
import Article from "components/Article";
import Instructions from "components/Instructions";
import "./Feed.css";

export const Feed = () => {
  // useEffect(() => {
  //   const currentParams = searchParams.getAll("q");
  //   console.log("Current Params:", currentParams);
  // }, [searchParams]);

  // Turn props into an array
  const articles = useSelector((state) => state.articles);

  // const articles2 = this.props.articles.sort((a, b) => {
  //   // Sort the array by date (most recent)
  //   const d1 = new Date(a.date);
  //   const d2 = new Date(b.date);
  //   return d1 < d2;
  // });

  // check if there is data to display
  const keywords = Object.keys(articles);

  // Loop through the array and pass each item to an Article object
  // Uses the article url as the key
  const renderedArticles = keywords.map((keyword) => {
    return articles[keyword].map((article) => {
      return <Article article={article} key={article.url} />;
    });
  });

  return (
    <>
      {keywords.length > 0 ? (
        <main id="maincontent">{renderedArticles}</main>
      ) : (
        <main id="maincontent">
          <Instructions />
        </main>
      )}
    </>
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
