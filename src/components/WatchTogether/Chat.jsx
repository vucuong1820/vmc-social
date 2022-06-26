import React, { useState } from "react";
import PropTypes from "prop-types";
import ChatBubble from "./ChatBubble";
import { useRef } from "react";
import { send_chat } from "../../services/watchtogether";

Chat.propTypes = {};

function Chat({
  connected_users,
  only_host_controls,
  user_name,
  chat_log,
  is_host,
  color_code,
}) {
  const chatBottom = useRef()
  const [chatState, setChatState] =useState({
    showEmojis: false,
    message: "",
  });
  const showEmojis = (e) => {
    setChatState((prev) => ({
      ...prev,
      showEmojis: true,
    }));
  };
  const closeMenu = () => {
    setChatState((prev) => ({
      ...prev,
      showEmojis: false,
    }));
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    setChatState((prev) => ({
      ...prev,
      message: chatState.message + emoji,
    }));
    closeMenu();
  };

  const add_text = (e) => {
    setChatState((prev) => ({ ...prev, message: e.target.value }));
  };

  const send_message = (e) => {
    e.preventDefault();
    if (chatState.message === "") {
      return;
    }
    send_chat(
      chatState.message,
      user_name,
      is_host,
      color_code
    );
    setChatState((prev) => ({ ...prev, message: "" }));
  };
  return (
    <div className="box">
      <div className="box chat_box" onClick={closeMenu}>
        {chat_log?.length > 0 && (
            chat_log.map((chat_data, index) => {
                return <ChatBubble key={index} chat_data={chat_data}></ChatBubble>;
              })
        )}
        <span ref={chatBottom} id="chat-bottom" />
      </div>

      <form onSubmit={send_message}>
        <div className="field is-grouped">
          <p className="">
            {chatState.showEmojis ? (
              <>
                <Picker
                  onSelect={addEmoji}
                  ref={(el) => (emojiPicker = el)}
                />
                <button className="button emoji-button">
                  <span className="icon is-small">
                    <p onClick={closeMenu} className="emoji">
                      {"❌"}
                    </p>
                  </span>
                </button>
              </>
            ) : (
              <button className="button emoji-button">
                <span className="icon is-small">
                  <p onClick={showEmojis} className="emoji">
                    {String.fromCodePoint(0x1f60a)}
                  </p>
                </span>
              </button>
            )}
          </p>
          <p className="control is-expanded">
            <input
              className="input"
              value={chatState.message}
              type="text"
              placeholder="Chat.."
              onChange={add_text}
            />
          </p>
          <p className="control">
            <button className="button is-primary">
              <i
                class="icon icon ion-ios-paperplane"
                style={{
                  fontSize: "xx-large",
                  alignItems: "normal",
                  height: "1em",
                }}
              ></i>
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Chat;
