import React from "react";

import NewsPost from "./NewsPost/NewsPost";
import "./NewsList.css";

const NewsList = ({ news }) =>
  news.length <= 0 ? (
    <h2 style={{ textAlign: "center", color: "white" }}>
      There are no news yet!
    </h2>
  ) : (
    <div className="news-list">
      {news.map((single) => (
        <NewsPost key={single._id} {...single} time={single.createdAt} />
      ))}
    </div>
  );

export default NewsList;
