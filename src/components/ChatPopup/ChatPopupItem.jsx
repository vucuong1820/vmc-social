import React from 'react';
import PropTypes from 'prop-types';
import { useUsersInfo } from "../../hooks/useUsersInfo";
import { DEFAULT_AVATAR, IMAGE_PROXY } from "../../shared/constants";

ChatPopupItem.propTypes = {};

function ChatPopupItem({conversation, conversationId, currentUserId}) {
  const { data: users, loading } = useUsersInfo(conversation.users);
  const filteredUsers = users?.filter((user) => user.id !== currentUserId);


  return (
    <div
      style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
      className="mt-4 bg-white w-12 h-12 rounded-full z-50 flex items-center justify-center"
    >
      <img className="rounded-full" src={IMAGE_PROXY(filteredUsers?.[0]?.data()?.photoURL)} />
    </div>
  );
}



export default ChatPopupItem;
