import { FC, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { db } from "../../shared/firebase";
import { useDocumentQuery } from "../../hooks/useDocumentQuery";
import { ConversationInfo } from "../../shared/types";
import { useStore } from "../../store";
import SideBar from "../../components/ChatBox/Home/Sidebar";
import ChatView from "../../components/ChatBox/Chat/ChatView";
import ChatHeader from "../../components/ChatBox/Chat/ChatHeader";
import InputSection from "../../components/ChatBox/Input/InputSection";

const Chat: FC = () => {
  const { id } = useParams();

  const { data, loading, error } = useDocumentQuery(
    `conversation-${id}`,
    doc(db, "conversations", id as string)
  );

  const conversation = data?.data() as ConversationInfo;

  const currentUser = useStore((state) => state.currentUser);

  const [inputSectionOffset, setInputSectionOffset] = useState(0);

  const [replyInfo, setReplyInfo] = useState(null);

  useEffect(() => {
    if (conversation?.theme)
      document.body.style.setProperty("--primary-color", conversation.theme);
  }, [conversation?.theme || ""]);

  return (
    <div className="flex">
      
      <SideBar />
      <div className="flex h-screen flex-grow flex-col items-stretch">
        {loading ? (
          <>
            <div className="border-dark-lighten h-20 border-b"></div>
            <div className="flex-grow"></div>
            <InputSection disabled />
          </>
        ) : !conversation ||
          error ||
          !conversation.users.includes(currentUser?.uid as string) ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6">
            <img className="h-32 w-32 object-cover" src="/error.svg" alt="" />
            <p className="text-center text-lg">Conversation does not exists</p>
          </div>
        ) : (
          <>
            <ChatHeader conversation={conversation} />
            <ChatView
              replyInfo={replyInfo}
              setReplyInfo={setReplyInfo}
              inputSectionOffset={inputSectionOffset}
              conversation={conversation}
            />
            <InputSection
              setInputSectionOffset={setInputSectionOffset}
              replyInfo={replyInfo}
              setReplyInfo={setReplyInfo}
              disabled={false}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
