import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputSection from '../Input/InputSection';

ChatViewPopup.propTypes = {};

function ChatViewPopup(props) {
  const [replyInfo, setReplyInfo] = useState(null);
  const [inputSectionOffset, setInputSectionOffset] = useState(0);
  return (
    <div className="fixed right-24 bottom-5 bg-white" style={{width: '338px', height: '455px'}}>
      <div className="heading absolute w-full h-12 p-1.5 bg-sky-500	 flex items-center">
        <div className="user-detail flex absolute items-center">
        <img
          className="avatar-circle rounded-full w-9"
          src="https://apoqrsgtqq.cloudimg.io/https://lh3.googleusercontent.com/a/AATXAJwCccE6DnqvuJ1_8XEg7beejzMrFzpSYdAu3zEM=s96-c"
        />
        <div className="name"> Vũ Mạnh Cường </div>
        </div>
        <div className="action absolute right-4">
          <i className="fas fa-times"></i>
        </div>
      </div>
      <div className="absolute bottom-0">
      <InputSection
        setInputSectionOffset={setInputSectionOffset}
        replyInfo={replyInfo}
        setReplyInfo={setReplyInfo}
        disabled={false}
      />
      </div>
    </div>
  );
}

export default ChatViewPopup;
