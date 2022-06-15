import { useState, useEffect } from "react";
import {
  config,
  useClient,
  channelName,
  useMicrophoneAudioTrack,
} from "../settings";
import { Grid } from "@material-ui/core";
import Video from "./Video";
import Controls from "./Controls";
import { createMicrophoneAudioTrack } from "agora-rtc-react";

export default function VideoCall(props) {
  const { setInCall } = props;
  const [users, setUsers] = useState<any>([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, track }=  useMicrophoneAudioTrack()
  console.log({ready, track})

  useEffect(() => {
    (async () => {
      try {
        await client.join(config.appId, "main", config.token, null);
        if(ready && track){
          await client.publish(track)
          track.play()
          // console.log(track.getVolumeLevel())
        }
      } catch (error) {
        console.log('error publish audio track:', error);
      }
    })()

    return () => {
      if(ready && track) {
        client.unpublish(track)
      }
    }

  }, [ready, track])
 
  // useEffect(() => {
  //   let init = async (name) => {
  //     client.on("user-published", async (user: any, mediaType) => {
  //       await client.subscribe(user, mediaType);
  //       if (mediaType === "video") {
  //         setUsers((prevUsers: any) => {
  //           return [...prevUsers, user];
  //         });
  //       }
  //       if (mediaType === "audio") {
  //         setUsers((prevUsers: any) => {
  //           return [...prevUsers, user];
  //         });
  //         user.audioTrack.play();
  //       }
  //     });

  //     client.on("user-unpublished", (user, mediaType) => {
  //       if (mediaType === "audio") {
  //         if (user.audioTrack) user.audioTrack.stop();
  //       }
  //       // if (mediaType === "video") {
  //       //   setUsers((prevUsers) => {
  //       //     return prevUsers.filter((User) => User.uid !== user.uid);
  //       //   });
  //       // }
  //     });

  //     client.on("user-left", (user) => {
  //       setUsers((prevUsers) => {
  //         return prevUsers.filter((User) => User.uid !== user.uid);
  //       });
  //     });

  //     try {
  //       await client.join(config.appId, name, config.token, null);
  //     } catch (error) {
  //       console.log("error");
  //     }

  //     if (tracks) await client.publish([tracks[0], tracks[1]]);
  //     setStart(true);
  //   };

  //   if (ready && tracks) {
  //     try {
  //       init(channelName);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [channelName, client, ready, tracks]);

  return (
    <div>123</div>
    // <Grid container direction="column" style={{ height: "100%" }}>
    //   <Grid item style={{ height: "5%" }}>
    //     {ready && tracks && (
    //       <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
    //     )}
    //   </Grid>
    //   <Grid item style={{ height: "95%" }}>
    //     {start && tracks && <Video tracks={tracks} users={users} />}
    //   </Grid>
    // </Grid>
  );
}
