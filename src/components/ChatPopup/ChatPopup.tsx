import { collection, query, where, orderBy, doc, limitToLast } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { useCollectionQuery } from '../../hooks/useCollectionQuery';
import { useDocumentQuery } from '../../hooks/useDocumentQuery';
import { auth, db } from '../../shared/firebase';
import { ConversationInfo } from '../../shared/types';
import { useStore } from '../../store';
import ChatHeader from '../ChatBox/Chat/ChatHeader';
import ChatView from '../ChatBox/Chat/ChatView';
import ChatViewPopup from '../ChatBox/Chat/ChatViewPopup';
import CreateConversation from '../ChatBox/Home/CreateConversation';
// import ChatViewPopup from '../ChatBox/Chat/ChatView';
import InputSection from '../ChatBox/Input/InputSection';
import ChatPopupItem from './ChatPopupItem';
interface ChatPopupProps {
  currentUserId: string;
}

const ChatPopup: FC<ChatPopupProps> = ({ currentUserId }) => {
  const currentChat = useStore((state) => state.currentChat);
  const [createConversationOpened, setCreateConversationOpened] = useState(false)

  const { data, error, loading } = useCollectionQuery(
    'conversations',
    query(
      collection(db, 'conversations'),
      orderBy('updatedAt', 'desc'),
      where('users', 'array-contains', currentUserId || null)
    )
  );


  // const { data: dataConservation, loading: loadingConservation, error: errorConversation } = useDocumentQuery(
  //   `conversation-M2MF1Vntu1uFt72mL6IP`,
  //   doc(db, "conversations", 'M2MF1Vntu1uFt72mL6IP' as string)
  // );
  // const conversation = dataConservation?.data() as ConversationInfo;
  // const obj = useCollectionQuery(
  //   `conversation-data-${'M2MF1Vntu1uFt72mL6IP'}-${0}`,
  //   query(
  //     collection(db, "conversations", 'M2MF1Vntu1uFt72mL6IP', "messages"),
  //     orderBy("createdAt"),
  //     limitToLast(10)
  //   )
  // );
  if(loading) return <div>Loading</div>;
  // console.log({currentUserId, data, error, loading })
  console.log('chat box')
  return (
    <div className="fixed bottom-4 right-8 ">
      {data?.docs.map((item) => (
        <ChatPopupItem key={item.id} conversation={item.data()} conversationId={item.id} currentUserId={currentUserId}/>
      ))}


      <div
        style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
        className="cursor-pointer hover:opacity-70 mt-4 bg-white w-12 h-12 text-stone-900 rounded-full z-50 flex items-center justify-center"
        onClick={() => setCreateConversationOpened(true)}
      >
        <i className="far fa-edit w-5 h-5 flex items-center justify-center translate-x-0.5"></i>
      </div>
      {
        currentChat.isShow && (
          <ChatViewPopup currentUserId={currentUserId} conversationId={currentChat.conversationId} chatPartner={currentChat.chatPartner}/>
        )
      }

{createConversationOpened && (
        <CreateConversation setIsOpened={setCreateConversationOpened} />
      )}

    </div>
  );
};
export default ChatPopup;
