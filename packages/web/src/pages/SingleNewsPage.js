import React, { useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import "./SingleNewsPage.css";
import Modal from "../components/Modal/Modal";
import { GlobalContext } from "../context/GlobalState";
import { BASE_URL } from "../constants";

const SingleNews = ({ match }) => {
  const { id } = match.params;
  const history = useHistory();
  const { news } = useContext(GlobalContext);

  useEffect(() => {
    document.title = `Post - UR News Post`;
  }, []);

  if (news.length < 1) return <p>{history.push("/")}</p>;

  const [post] = news.filter((newz) => newz._id === id);

  const setMarkup = () => ({
    __html: post.description,
  });

  return (
    <div className="home-page">
      <Modal title={post.title}>
        {post.img && <img src={post.img} alt="post-hero-img" />}
        <p dangerouslySetInnerHTML={setMarkup()}></p>
        {post.file && (
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`${BASE_URL}/api/v1/news/file/download/${encodeURIComponent(
              post.file
            )}`}
          >
            <button className="btn">Download {post.file}</button>
          </a>
        )}
        <Link to="/">
          <button className="btn-light">back</button>
        </Link>
      </Modal>
    </div>
  );
};

export default SingleNews;
