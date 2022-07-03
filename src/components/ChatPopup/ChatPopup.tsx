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
// import ChatViewPopup from '../ChatBox/Chat/ChatView';
import InputSection from '../ChatBox/Input/InputSection';
import ChatPopupItem from './ChatPopupItem';
interface ChatPopupProps {
  currentUserId: string;
}

const ChatPopup: FC<ChatPopupProps> = ({ currentUserId }) => {
  console.log(currentUserId)
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
  console.log({currentUserId, data, error, loading })
  return (
    <div className="fixed bottom-4 right-8 ">
      {data?.docs.map((item) => (
        <ChatPopupItem key={item.id} conversation={item.data()} conversationId={item.id} currentUserId={currentUserId}/>
      ))}


      <div
        style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
        className="mt-4 bg-white w-12 h-12 text-stone-900 rounded-full z-50 flex items-center justify-center"
      >
        <i className="far fa-edit w-5 h-5 flex items-center justify-center translate-x-0.5"></i>
      </div>
      <ChatViewPopup/>
      {/* <div className="flex h-screen flex-grow flex-col items-stretch">
        {loadingConservation ? (
          <>
            <div className="border-dark-lighten h-20 border-b"></div>
            <div className="flex-grow"></div>
            <InputSection disabled />
          </>
        ) : !conversation ||
        errorConversation ||
          !conversation.users.includes(currentUserId as string) ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6">
            <img className="h-32 w-32 object-cover" src="/error.svg" alt="" />
            <p className="text-center text-lg">Conversation does not exists</p>
          </div>
        ) : (
          <>
            <ChatHeader conversation={conversation} />
            <ChatViewPopup />
            <ChatViewPopup
              conversationId={'M2MF1Vntu1uFt72mL6IP'}
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
      </div> */}
    </div>
  );
};
export default ChatPopup;
