import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useUsersInfo } from '../../hooks/useUsersInfo';
import { DEFAULT_AVATAR, IMAGE_PROXY } from '../../shared/constants';
import { useStore } from '../../store';
import './ChatPopupItem.css';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../shared/firebase';
import { useCollectionQuery } from '../../hooks/useCollectionQuery';
ChatPopupItem.propTypes = {};

function ChatPopupItem({ conversation, conversationId, currentUserId }) {
  const { data: users, loading } = useUsersInfo(conversation.users);
  const filteredUsers = users?.filter((user) => user.id !== currentUserId);
  const [msgNotSeen, setMsgNotSeen] = useState(0)
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const handleClickChatIcon = () => {
    setCurrentChat({
      isShow: true,
      conversationId,
      chatPartner: filteredUsers?.[0]?.data(),
    });
  };

  const { data, loading: loadingMessage, error } = useCollectionQuery(
    `conversation-data-${conversationId}-${null}`,
    query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('createdAt'),
      // limitToLast(20)
    ));

  useEffect(() => {
    const msgLength = data?.docs.map((doc) => doc.data()).length

    const timeoutId = setTimeout(() => {
      setMsgNotSeen(msgLength - conversation?.[`seen-info-${currentUserId}`]?.currentMsgSeen)
    }, 200)
    return () => clearTimeout(timeoutId)

  }, [data, conversation])



  const handleDeleteConversation = async () => {
    try {
      await deleteDoc(doc(db, 'conversations', conversationId))
    }
    catch(err) {
      console.log("failed to delete conversation: ", err)
    }
  };

  return (
    <div
      style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
      className="popup-wrapper relative  mt-4 w-12 h-12 rounded-full z-50 flex items-center justify-center"
    >
      <img
        onClick={handleClickChatIcon}
        className="avatar-popup cursor-pointer hover:opacity-70 rounded-full"
        src={IMAGE_PROXY(filteredUsers?.[0]?.data()?.photoURL)}
      />
      <div
        onClick={handleDeleteConversation}
        className="cursor-pointer hover:opacity-80 delete-popup absolute top-0 rounded-full flex items-center justify-center bg-slate-400 right-[-5px] w-[18px] h-[18px]	"
      >
        <i class="fas fa-times"></i>
      </div>

      {msgNotSeen > 0 && (
        <div
          onClick={handleDeleteConversation}
          className="leading-tight bg-[red] cursor-pointer hover:opacity-80 noti-popup absolute top-0 rounded-full flex items-center justify-center left-[-5px] w-[18px] h-[18px]	"
        >
          {msgNotSeen}
        </div>
      )}
    </div>
  );
}

export default ChatPopupItem;
