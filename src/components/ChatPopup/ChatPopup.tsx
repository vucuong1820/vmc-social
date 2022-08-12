import {
  collection,
  query,
  where,
  orderBy,
  doc,
  limitToLast,
} from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { useCollectionQuery } from "../../hooks/useCollectionQuery";
import { useDocumentQuery } from "../../hooks/useDocumentQuery";
import { auth, db } from "../../shared/firebase";
import { ConversationInfo } from "../../shared/types";
import { useStore } from "../../store";
import ChatHeader from "../ChatBox/Chat/ChatHeader";
import ChatView from "../ChatBox/Chat/ChatView";
import ChatViewPopup from "../ChatBox/Chat/ChatViewPopup";
import CreateConversation from "../ChatBox/Home/CreateConversation";
// import ChatViewPopup from '../ChatBox/Chat/ChatView';
import InputSection from "../ChatBox/Input/InputSection";
import ChatPopupItem from "./ChatPopupItem";
interface ChatPopupProps {
  currentUserId: string;
}

const ChatPopup: FC<ChatPopupProps> = ({ currentUserId }) => {
  const { currentChat, setCurrentChat } = useStore((state) => state);
  const [createConversationOpened, setCreateConversationOpened] =
    useState(false);

  const { data, error, loading } = useCollectionQuery(
    "conversations",
    query(
      collection(db, "conversations"),
      orderBy("updatedAt", "desc"),
      where("users", "array-contains", currentUserId || null)
    )
  );
  useEffect(() => {
    const listDataId = data?.docs.map((item) => item?.id);
    if (!listDataId?.includes(currentChat?.conversationId)) {
      setCurrentChat({
        isShow: false,
        conversationId: "",
        chatPartner: {},
      });
    }
  }, [data]);
  if (loading) return <div>Loading</div>;
  return (
    <div className="fixed bottom-4 right-8 ">
      {data?.docs.map((item) => (
        <ChatPopupItem
          key={item.id}
          conversation={item.data()}
          conversationId={item.id}
          currentUserId={currentUserId}
        />
      ))}

      <div
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        className="cursor-pointer hover:opacity-70 mt-4 bg-white w-12 h-12 text-stone-900 rounded-full z-50 flex items-center justify-center"
        onClick={() => setCreateConversationOpened(true)}
      >
        <i className="far fa-edit w-5 h-5 flex items-center justify-center translate-x-0.5"></i>
      </div>
      {currentChat.isShow && (
        <ChatViewPopup
          currentUserId={currentUserId}
          conversationId={currentChat.conversationId}
          chatPartner={currentChat.chatPartner}
        />
      )}

      {createConversationOpened && (
        <CreateConversation setIsOpened={setCreateConversationOpened} />
      )}
    </div>
  );
};
export default ChatPopup;
