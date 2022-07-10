import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import HlsPlayer from 'react-hls-player';
import { subtitleProxy } from '../shared/constants';
import { Player } from 'react-tuby';
import ChatBox from './ChatBox';
import { collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../shared/firebase';
import useFirestore from '../hooks/useFirestore';
import Video from "../components/WatchTogether/Video.jsx"
WatchTogether2.propTypes = {};

function WatchTogether2(props) {
  const [ documents, isLoading ] = useFirestore("room-watch", null)
  console.log({documents});
  const sources = [
    {
        "quality": 1080,
        "url": "https://ali-cdn-play.loklok.tv/57685bb4988c40d5b3008081e4989cef/84032138adb14d7e90be21c8043e7fb9-b1a069a5f06a1ae4aabfcf5e7b14cad7-hd.m3u8?auth_key=1656340634-2f53352eae3c4c7ca7a6fd777ef7f913-0-ab69bd5d6223c5d7f47382211ace036e"
    },
    {
        "quality": 720,
        "url": "https://ali-cdn-play.loklok.tv/57685bb4988c40d5b3008081e4989cef/84032138adb14d7e90be21c8043e7fb9-e35a1d65bb464542fc4a7068bd721030-sd.m3u8?auth_key=1656340634-65553850faa84e4bb9e6a7e6813b8a36-0-8fef56a56fa20db1ff606bb859073bc1"
    },
    {
        "quality": 540,
        "url": "https://ali-cdn-play.loklok.tv/57685bb4988c40d5b3008081e4989cef/84032138adb14d7e90be21c8043e7fb9-a3be7af4c8e5541d5dc13b46186a373c-ld.m3u8?auth_key=1656340634-5a015a9663cb486ea2a6e7466c0919b5-0-fdd3f9ffab1b0209bf0a030f6eedf4e5"
    }
]

  const subtitles = [
    {
        "language": "Tiếng Việt (Auto)",
        "url": "https://subtitles.netpop.app/subtitles/20220617/1655468611692_vi_1655468272454_The-Summer-I-Turned-Pretty-S01E01-720p-WEB-h264-KOGi-en-srt",
        "lang": "vi"
    },
    {
        "language": "English",
        "url": "https://subtitles.netpop.app/subtitles/20220617/1655468272454_The-Summer-I-Turned-Pretty-S01E01-720p-WEB-h264-KOGi-en-srt",
        "lang": "en"
    },
    {
        "language": "عربي",
        "url": "https://subtitles.netpop.app/subtitles/20220617/1655462689419_The-Summer-I-Turned-Pretty-S01-E01-Summer-House-WEBRip-Amazon-ar-001-srt",
        "lang": "ar"
    },
    {
        "language": "Español",
        "url": "https://subtitles.netpop.app/subtitles/20220617/1655462694409_The-Summer-I-Turned-Pretty-S01E01-Summer House -Espa--srt",
        "lang": "es"
    },
    {
        "language": "Bahasa Indonesia (Auto)",
        "url": "https://subtitles.netpop.app/subtitles/20220617/1655468611575_in_ID_1655468272454_The-Summer-I-Turned-Pretty-S01E01-720p-WEB-h264-KOGi-en-srt",
        "lang": "in_ID"
    },
    {
        "language": "فارسی (Auto)",
        "url": "https://subtitles.netpop.app/subtitles/20220617/1655468611721_fa_1655468272454_The-Summer-I-Turned-Pretty-S01E01-720p-WEB-h264-KOGi-en-srt",
        "lang": "fa"
    },
    {
        "language": "Bahasa Melayu (Auto)",
        "url": "https://subtitles.netpop.app/subtitles/20220617/1655468611603_ms_1655468272454_The-Summer-I-Turned-Pretty-S01E01-720p-WEB-h264-KOGi-en-srt",
        "lang": "ms"
    },
    {
        "language": "简体中文 (Auto)",
        "url": "https://subtitles.netpop.app/subtitles/20220617/1655468611455_zh_CN_1655468272454_The-Summer-I-Turned-Pretty-S01E01-720p-WEB-h264-KOGi-en-srt",
        "lang": "zh_CN"
    },
    {
        "language": "繁体中文 (Auto)",
        "url": "https://subtitles.netpop.app/subtitles/20220617/1655468611489_zh_TW_1655468272454_The-Summer-I-Turned-Pretty-S01E01-720p-WEB-h264-KOGi-en-srt",
        "lang": "zh_TW"
    },
    {
        "language": "ภาษาไทย (Auto)",
        "url": "https://subtitles.netpop.app/subtitles/20220617/1655468611574_th_1655468272454_The-Summer-I-Turned-Pretty-S01E01-720p-WEB-h264-KOGi-en-srt",
        "lang": "th"
    },
    {
        "language": "português (Auto)",
        "url": "https://subtitles.netpop.app/subtitles/20220617/1655468611833_pt_1655468272454_The-Summer-I-Turned-Pretty-S01E01-720p-WEB-h264-KOGi-en-srt",
        "lang": "pt"
    },
    {
        "language": "Türk (Auto)",
        "url": "https://subtitles.netpop.app/subtitles/20220617/1655468611707_tr_1655468272454_The-Summer-I-Turned-Pretty-S01E01-720p-WEB-h264-KOGi-en-srt",
        "lang": "tr"
    },
    {
        "language": "français (Auto)",
        "url": "https://subtitles.netpop.app/subtitles/20220617/1655468611799_fr_1655468272454_The-Summer-I-Turned-Pretty-S01E01-720p-WEB-h264-KOGi-en-srt",
        "lang": "fr"
    }
]
const playerRef = useRef<any>()
  const handleChangeTime = () => {
    const dataRef = doc(collection(db, 'room-watch'));
    setDoc(dataRef, {
      movie: 'SpiderMan',
      currentTime: '1p24s',
      paused: true,
      roomId: '123',
      users : ['123','456'],
      createdAt: serverTimestamp(),
    });
  }
  const handleUpdate = async (updatedObj) => {
    const watchRef = doc(db, 'room-watch',"rIRB7I7lJSAgCOaUYDOf")
    await  updateDoc(watchRef, {
      ...updatedObj
    })
    console.log('updated!!!')
  }
  const handlePause = async (e) => {
    const watchRef = doc(db, 'room-watch',"rIRB7I7lJSAgCOaUYDOf")
    await  updateDoc(watchRef, {
      paused: true
    })
    console.log('updated pause!!!')
  }

  const handlePlay = async (e) => {
    const watchRef = doc(db, 'room-watch',"rIRB7I7lJSAgCOaUYDOf")
    await  updateDoc(watchRef, {
      paused: false
    })
    console.log('updated play!!!')
  }
  console.log(documents[0]?.currentTime, isLoading)
  useEffect(() => {
    // playerRef.current?.addEventListener('timeupdate', () => {
    //     // console.log(playerRef.current?.currentTime);

    // })
    if(playerRef.current){
        playerRef.current.currentTime = documents[0]?.currentTime;
    }
  }, [documents[0]?.currentTime])
  if(isLoading) return <div>Loading</div>
  return (
    <div>
      <div className="overlay pointer-events-none	 fixed top-0 left-0 right-0 bottom-0"></div>
      <Player
        playerRef={playerRef}
        playerKey={'123'}
        primaryColor="#0D90F3"
        src={sources}
        subtitles={
          subtitles?.map((subtitle) => ({
            ...subtitle,
            url: subtitleProxy(subtitle.url),
          })) || []
        }
        pictureInPicture={true}
      >
        {(ref, props) => {
          if(ref.current){
            if(documents[0].paused) {
                ref.current.pause()
            }else {
                ref.current.play();
            }

            // ref.current.currentTime = documents[0].currentTime
          }
          // console.log(props.src);
          // return <Video ref={ref} props={props} />
          // useEffect(() => {
          //     function fireVideoStart(){
          //         console.log('123');
          //     }
          //     ref.current.addEventListener('play',fireVideoStart)
          // }, [])
          // ref?.current && ref.current.addEventListener("pause", (e) =>{
          //   if(documents[0].paused === e.target.paused) return;
          //   handleUpdate({
          //     paused: e.target.paused
          //   })
          //   // console.log(e.target.paused);
          // })
          // ref?.current && ref.current.addEventListener("play", (e) =>{
          //   if(documents[0].paused === e.target.paused) return;
          //   handleUpdate({
          //     paused: e.target.paused
          //   })
          // })
          return <HlsPlayer playerRef={ref} {...props} src={`${props.src}`} controls={false}/>;
        }}
        
      </Player>
      {/* <button onClick={handleChangeTime}>setTime</button>
      <button onClick={handleUpdate}>set Update</button> */}
      <ChatBox />
    </div>
  );
}

export default WatchTogether2;
