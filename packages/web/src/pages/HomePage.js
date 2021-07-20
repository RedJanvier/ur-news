// import socket from "socket.io-client";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import NewsList from "../components/NewsList/NewsList";
import MyNewsList from "../components/MyNewsList/MyNewsList";
import Spinner from "../components/Spinner/Spinner";
// import { BASE_URL } from "../constants";

const HomePage = ({ location: { pathname } }) => {
  // const [chat, setChat] = React.useState("");
  // const [chats, setChats] = React.useState([]);
  const { fetchNews, news, pending, userId } = useContext(GlobalContext);
  // const io = socket(BASE_URL, { query: { auth_token: token } });

  useEffect(() => {
    document.title = "Home - UR News Post";
    if (pathname === "/home") fetchNews();
    if (pathname === "/created") fetchNews(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, pathname]);

  // useEffect(() => {
  //   io.on("chat-message", (data) => {
  //     console.log("New message: ", data);
  //     setChats([...chats, data]);
  //   });
  //   return () => io.disconnect();
  // }, []);

  // const handleChat = (e) => setChat(e.target.value);
  // const handleChatSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(chat);
  // };

  return (
    <>
      {pending && <Spinner />}
      {pathname === "/home" && <NewsList news={news} />}
      {pathname === "/created" && <MyNewsList news={news} />}
      {/* <div className="chat">
        <ul className="chats">
          {chats.map((c) => (
            <li>{c.author}</li>
          ))}
        </ul>
        <form onSubmit={handleChatSubmit}>
          <input type="text" onChange={handleChat} value={chat} />
        </form>
      </div> */}
    </>
  );
};

export default HomePage;
