import moment from "moment";
import ReactEmoji from "react-emoji";
import socket from "socket.io-client";
import React, { useContext, useEffect, useState, useRef } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { BASE_URL, NODE_ENV } from "../../../constants";
import classes from "../../styles/ChatPane.module.css";
import Spinner from "../../Spinner/Spinner";

const Message = ({ chat, userId }) => (
  <li
    className={`${classes.chat} ${
      chat.author.id === userId ? classes.mine : ""
    }`}
    key={chat._id}
  >
    <span>
      <span className={classes.img}>
        <img src={chat.author.image} alt="chat-author-img" />
      </span>
      <b>{chat.author.id === userId ? "Me" : chat.author.name}</b>
      <em>{moment(chat.createdAt).fromNow()}</em>
    </span>
    <p>{ReactEmoji.emojify(chat.body)}</p>
  </li>
);

const Messages = () => {
  const { chatsPending, chats, userId } = useContext(GlobalContext);
  return (
    <>
      <ul className="chats">
        {chatsPending && <Spinner color="default" />}
        {!chats.length && !chatsPending && <p>No messages yet!</p>}
        {chats.map((chat) => (
          <Message chat={chat} userId={userId} />
        ))}
      </ul>
    </>
  );
};

const CreateMessage = ({ sent, scroll }) => {
  const { createChat } = useContext(GlobalContext);
  const [msg, setMsg] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await createChat({ body: msg });
    scroll();
    if (success) {
      setMsg("");
      sent();
    }
  };
  return (
    <form className={classes.addOne} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="New message..."
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
      />
      <button className="btn">Send</button>
    </form>
  );
};

const ChatPane = () => {
  const bottom = useRef();
  const [sent, setSent] = useState(false);
  const scrollTo = (ref) => ref.current.scrollIntoView({ behavior: "smooth" });
  const {
    userId,
    fetchChats,
    token,
    updateChats,
    error,
    cleanError,
  } = useContext(GlobalContext);
  useEffect(() => {
    (async () => {
      const success = await fetchChats();
      if (success) scrollTo(bottom);
    })();
    const io = socket(BASE_URL, {
      query: { auth_token: token },
      secure: NODE_ENV === "production",
      reconnection: true,
      rejectUnauthorized: false,
    });
    io.on("chat-message", (data) => {
      if (data.author.id !== userId) {
        updateChats(data);
        scrollTo(bottom);
      }
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSentMessage = () => {
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const handleScrollOnCreate = () => {
    scrollTo(bottom);
    setTimeout(() => cleanError(), 5000);
  };

  return (
    <div className={classes.pane}>
      <div className={classes.title}>
        <h3>News Poster Chat</h3>
      </div>
      <Messages />
      <span ref={bottom} className={classes.feedback}>
        {sent && (
          <>
            <i
              class="fa fa-check-circle"
              style={{ color: "var(--bg-secondary)" }}
            ></i>
            <span style={{ color: "var(--bg-secondary)" }}>Message sent!</span>
          </>
        )}
        {error && (
          <span className={classes.error}>
            Message not sent! try again please.
          </span>
        )}
      </span>
      <CreateMessage scroll={handleScrollOnCreate} sent={handleSentMessage} />
    </div>
  );
};

export default ChatPane;
