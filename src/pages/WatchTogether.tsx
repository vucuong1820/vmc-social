import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Peer from 'peerjs';
import { useStore } from '../store';
import {createConnection} from "../services/watchtogether.js"
import { store_data } from "../services/data_storage_utils.js"
import { Navigate } from 'react-router-dom';
import "../watch-together.css"
WatchTogether.propTypes = {
    
};



function WatchTogether(props) {

    const [watchInfo, setWatchInfo] = useState<any>({
        user_name: '',
        youtube_video_id: '',
        host_peer_id: null,
        is_host:true,
        submitted: false,
        only_host_controls: false,
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(e.target.youtubeLink)
        const video_id = parseIdfromUrl(e.target.youtubeLink.value)
        setWatchInfo({
            user_name: e.target.username.value,
            youtube_video_id: video_id,
            only_host_controls: e.target.onlyHost.checked,
            submitted: true
          })
          createConnection(setWatchInfo, true )
    }
    const parseIdfromUrl = url => {
        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return false;
    }
    }
    if(watchInfo.host_peer_id){
      store_data(watchInfo.host_peer_id, watchInfo);

      return (  
        <Navigate
          to={`/party/${watchInfo.host_peer_id}`}
        ></Navigate>
      );
    }
    return (
      <form onSubmit={handleSubmit}>
        <input placeholder="user..." type="text" name="username" required />
        <input placeholder="youtube link.." type="text" name="youtubeLink" required />
        <input type="checkbox" name="onlyHost" />
        <button type="submit" name="submit">
          Submit
        </button>
      </form>
    );
}

export default WatchTogether;