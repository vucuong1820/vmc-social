import AgoraRTC from 'agora-rtc-sdk-ng';
import React, { useEffect, useState } from 'react';
import { client, appId, token, channelName } from "../settings"

function VideoCall(props) {
  // const [rtc, setRtc] = useState<any>({
  //   localAudioTrack: null,
  //   client: client
  // })
  const [localAudioTrack, setLocalAudioTrack] = useState()
  const [isJoin, setIsJoin] = useState(false)
  useEffect(() => {
    (async () => {
     
      client.on("user-published", async (user, mediaType) => {
        // Subscribe to the remote user when the SDK triggers the "user-published" event
        await client.subscribe(user, mediaType);
        console.log("subscribe success");

        // If the remote user publishes an audio track.
        if (mediaType === "audio") {
            const remoteAudioTrack = user.audioTrack;
            remoteAudioTrack.play();
        }

        // Listen for the "user-unpublished" event
        client.on("user-unpublished", async (user) => {
            // Unsubscribe from the tracks of the remote user.
            await client.unsubscribe(user);
        });

    });
    

    })()
  },[])
  const handleJoin = async () => {
      try {
        await client.join(appId, channelName, token, null)
        const track = await AgoraRTC.createMicrophoneAudioTrack();
        setLocalAudioTrack(track)
        await client.publish([localAudioTrack])
        setIsJoin(true)
        console.log("publish success")
      } catch (error) {
        console.log("error join:",error)
      }
      

  }
  const handleLeave = async () => {
      if(localAudioTrack){
        localAudioTrack.close();
        await client.leave()
        setIsJoin(false)
      }
  }
  return ( 
<>
<button style={{border: "1px solid white"}} onClick={handleJoin} disabled={isJoin}>JOIN CHAT</button>
<button style={{border: "1px solid white"}} jkm                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              onClick={handleLeave} disabled={!isJoin}>LEAVE</button>
</>    
  );
}

export default VideoCall;