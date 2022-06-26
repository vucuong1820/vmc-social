

import React from 'react';
import PropTypes from 'prop-types';

ChatBubble.propTypes = {
    
};

function ChatBubble({chat_data}) {
    return (
        <div className="chat-bubble">
        <span
          className="chat_user_name"
          style={{ color: "#" + chat_data.color_code }}
        >
          {chat_data.user_name}
        </span>
        {chat_data.message}
      </div>
    );
}

export default ChatBubble;