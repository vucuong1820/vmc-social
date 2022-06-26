import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMatch, useParams } from 'react-router-dom';
import { get_data } from "../../services/data_storage_utils.js"
import { bulk_connect, introduce } from '../../services/watchtogether';
import Player from "./Player"
import Chat from './Chat.jsx';

Party.propTypes = {
    
};

function Party(props) {
    const { host_id } = useParams();
    const [partyInfo, setPartyInfo] = useState({
      user_name: "",
      youtube_video_id: "",
      youtube_current_pos: 0,
      peer_id: "",
      is_host: false,
      chat_log: [],
      invite_popup_shown: false,
      connected_users: {},
      color_code: "",
      isStateChangeFromBroadcastData: false,
      player_state: false,
    });
    console.log({partyInfo});
    useEffect(() => {
        window.global_this_obj = {
            closeModal,
            copyToClipboard,
            notify,
            state: partyInfo,
            setState: setPartyInfo,
        }
    }, [partyInfo])
    useEffect(() => {
        window.peer_ids = [];
        window.connections = [];
        var data = get_data(host_id);
        const color_code = Math.floor(Math.random() * 16777215).toString(16);
        if (data) {
            if (!window.peer_obj) {
              createConnection(setPartyInfo, true, null, host_id);
            }
      
            if (!data.connected_users) {
              var connected_users = {};
              connected_users[host_id] = {
                user_name: data.user_name,
                color_code: color_code,
                is_host: true
              };
            } else {
              var connected_users = data.connected_users;
              // https://stackoverflow.com/questions/38416020/deep-copy-in-es6-using-the-spread-syntax
              var reconnect_users = JSON.parse(JSON.stringify(connected_users));
      
              delete reconnect_users[host_id];
              bulk_connect(
                Object.keys(reconnect_users),
                connected_users[host_id]
              );
            }
      
            setPartyInfo({
              peer_id: host_id,
              user_name: data.user_name,
              youtube_video_id: data.youtube_video_id,
              only_host_controls: data.only_host_controls,
              is_host: data.is_host,
              connected_users: connected_users,
              color_code: color_code
            });
          } else {
            // Not a host: Create connection
            createConnection(setPartyInfo, false, host_id);
          }
    }, [])
    const setUserName = e => {
        e.preventDefault();
        const color_code = Math.floor(Math.random() * 16777215).toString(16);
        var connected_users = partyInfo.connected_users;
        connected_users[partyInfo.peer_id] = {
          user_name: e.target.user_name.value,
          color_code: color_code,
          is_host: false
        };
        setPartyInfo(prev => ({
            ...prev,
          user_name: e.target.user_name.value,
          connected_users: connected_users,
          color_code: color_code
        }));
        introduce(e.target.user_name.value, color_code);
      };

      const copyToClipboard = e => {
        e.preventDefault();
        // this.copy_invite.select();
        document.execCommand("copy");
        setPartyInfo(prev => ({ invite_popup_shown: true }));
      };
    
      const closeModal = e => {
        setPartyInfo(prev => ({ invite_popup_shown: true }));
      };
    
      const notify = (message, timeout = 3000) => {
        // toast.info(message, {
        //   position: "bottom-left",
        //   autoClose: timeout,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   toastId: message
        // });
      };

    return (
      <div>
        <div className="section">
          <div className="container">
            <div className="tile is-ancestor">
              <div className="tile is-8 left_tile_custom">
                <Player
                  youtube_video_id={partyInfo?.youtube_video_id}
                  youtube_current_pos={partyInfo?.youtube_current_pos}
                  is_host={partyInfo?.is_host}
                  isStateChangeFromBroadcastData={
                    partyInfo?.isStateChangeFromBroadcastData
                  }
                  player_state={partyInfo?.player_state}
                ></Player>
                {/* {(partyInfo?.only_host_controls === false ||
                  partyInfo?.is_host === true) && <ChangeVideo></ChangeVideo>} */}
              </div>
              <div className="chat-window">
                <Chat
                  connected_users={partyInfo?.connected_users}
                  only_host_controls={partyInfo?.only_host_controls}
                  user_name={partyInfo?.user_name}
                  chat_log={partyInfo?.chat_log}
                  is_host={partyInfo?.is_host}
                  color_code={partyInfo?.color_code}
                ></Chat>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Party;