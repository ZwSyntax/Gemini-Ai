import styles from "./ScrollChat.module.css";
import { commonIcon } from "../../../asset";
import { useSelector, useDispatch } from "react-redux";
import React, { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getChat } from "../../../store/chat-action";
import ReplyByGemini from "./ReplyByGemini";
import NewChatByGemini from "./NewChatGemini";

const ScrollChat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { historyId } = useParams();
  const chatRef = useRef(null);
  const chat = useSelector((state) => state.chat.chats);
  const chatHistoryId = useSelector((state) => state.chat.chatHistoryId);

  console.log(chatHistoryId, historyId);

  useEffect(() => {
    if (chat.length === 0 && !historyId) {
      console.log("hi");
      navigate("/");
    } else if (historyId && historyId !== chatHistoryId) {
      dispatch(getChat(historyId));
    } else {
      navigate(`/app/${chatHistoryId}`);
    }
  }, [dispatch, historyId, chatHistoryId, navigate, chat]);

  const loadText = (text) => {
    return text?.replace(/\n/g, "<br>");
  };

  const chatSection = chat.map((c) => (
    <div className={styles["single-chat"]} ref={chatRef} key={c.id}>
      <div className={styles["user"]}>
        <img src={commonIcon.avatarIcon} alt="avater icon"></img>
        <p>{c.user}</p>
      </div>
      <div className={styles["gemini"]}>
        {c?.isLoader === "yes" && (
          <img src={commonIcon.geminiLaoder} alt="avater icon"></img>
        )}
        {c?.isLoader === "no" && (
          <img src={commonIcon.chatGeminiIcon} alt="avater icon"></img>
        )}

        {c.newChat ? (
          <ReplyByGemini gemini={loadText(c?.gemini)} />
        ) : (
          <NewChatByGemini gemini={loadText(c?.gemini)} />
        )}
      </div>
    </div>
  ));

  return (
    <div className={styles["scroll-chat-main"]} ref={chatRef}>
      {chatSection}
    </div>
  );
};

export default ScrollChat;
