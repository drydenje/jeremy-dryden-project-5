import React from "react";
import "./Article.css";

const Article = props => {
  const date = new Date(props.article.date).toLocaleDateString("en-us");
  const time = new Date(props.article.date).toLocaleTimeString("en-us");
  return (
    <article>
      <div className="wrapper">
        {props.article.image ? (
          <figure>
            <img src={props.article.image} alt={props.article.title} />
          </figure>
        ) : (
          ""
        )}
        <h2>
          <a href={props.article.link}>{props.article.title}</a>
        </h2>
        <h4>{props.article.source}</h4>
        <h3>
          {date} - {time}
        </h3>
        <p>{props.article.desc}</p>
      </div>
    </article>
  );
};

export default Article;
