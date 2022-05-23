import React from "react";
import "./Article.css";

const Article = ({ article }) => {
  console.log(article);
  const date = new Date(article.publishedAt).toLocaleDateString("en-us");
  const time = new Date(article.publishedAt).toLocaleTimeString("en-us");

  return (
    <article>
      <div className="wrapper">
        {article.image ? (
          <figure>
            <img src={article.image} alt={article.title} />
          </figure>
        ) : (
          ""
        )}
        <h2>
          <a href={article.link}>{article.title}</a>
        </h2>
        <h4>{article.name}</h4>
        <h3>
          {date} - {time}
        </h3>
        <p>{article.description}</p>
      </div>
    </article>
  );
};

export default Article;
