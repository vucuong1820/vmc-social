import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Peer from 'peerjs';

WatchTogether.propTypes = {
    
};

const createConnection = (thisObj, is_host, host_id = null, previous_id = null) => {
    const settings = {
      debug: 2,
      // iceTransps ortPolicy: "relay",
      config: {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      },
    };

    if (previous_id) {
        var peer = new Peer(previous_id, settings);
      } else {
        var peer = new Peer(settings);
      }
    peer.on("open", (id) => {
        console.log("MY peer ID is " + peer.id);
        
    })



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
            user_name: e.target.userName.value,
            youtube_video_id: video_id,
            only_host_controls: e.target.onlyHost.checked,
            submitted: true
          })
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