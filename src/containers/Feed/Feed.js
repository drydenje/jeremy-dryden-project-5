import { useSelector } from "react-redux";
import { selectAllArticles, selectAllKeywords } from "state/feedSlice";
import Article from "components/Article";
import Instructions from "components/Instructions";
import "./Feed.css";

export const Feed = () => {
  // Turn props into an array
  const articles = useSelector(selectAllArticles);

  // check if there is data to display
  const keywords = useSelector(selectAllKeywords);

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
};

export default Feed;
