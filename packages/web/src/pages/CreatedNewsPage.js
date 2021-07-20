import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import NewsList from "../components/MyNewsList/MyNewsList";
import Spinner from "../components/Spinner/Spinner";

const CreatedNewsPage = () => {
  const { userId, news, fetchNews, pending } = useContext(GlobalContext);

  useEffect(() => {
    document.title = "Created News - UR News Post";

    fetchNews(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{pending ? <Spinner /> : <NewsList news={news} />}</>;
};

export default CreatedNewsPage;
