import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { sync_video } from '../../services/watchtogether';

Player.propTypes = {
    
};

function Player({youtube_video_id, youtube_current_pos, is_host, isStateChangeFromBroadcastData, player_state }) {
    const [playerInfo, setPlayerInfo] = useState({
        player: "",
    })
    useEffect(() => {
        if (playerInfo.player === "" &&   youtube_video_id !== "") {
            loadScript();
          }

    },[playerInfo.player, youtube_video_id] )

    const loadScript = () => {
        if (!window.YT) {
            // If not, load the script asynchronously
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
      
            // onYouTubeIframeAPIReady will load the video after the script is loaded
            window.onYouTubeIframeAPIReady = loadVideo;
      
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          } else {
            // If script is already there, load the video directly
            if (window.YT.Player) {
              loadVideo();
            }
          }
    }

    const loadVideo = () => {
        playerInfo.player = new window.YT.Player(`youtube-player-iframe`, {
            videoId: youtube_video_id,
            width: 830,
            height: 450,
            playerVars: {
              start: Math.ceil(youtube_current_pos)
            },
            events: {
              onReady: onPlayerReady,
              onStateChange: onPlayerStateChange,
              onPlaybackRateChange: onPlayerPlaybackRateChange
            }
          });
          window.yt_player = playerInfo.player;
    }
    const onPlayerReady = event => {
        if (player_state === 1) {
          event.target.playVideo();
        }
      };
      const onPlayerStateChange = event => {
        if (!isStateChangeFromBroadcastData) {
          if (
            event.data === window.YT.PlayerState.PLAYING ||
            event.data === window.YT.PlayerState.PAUSED
          ) {
            sync_video();
          }
        }
      };
      const onPlayerPlaybackRateChange = event => {
        console.log(event);
        if (is_host) {
          sync_video("playbackRateChange");
        }
      };
    return (
        <div className="player_container">
        <div id={`youtube-player-iframe`} />
      </div>
    );
}

export default Player;