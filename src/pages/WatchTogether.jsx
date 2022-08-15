import { doc, updateDoc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Spin from 'react-cssfx-loading/src/Spin';
import HlsPlayer from 'react-hls-player';
import { useParams } from 'react-router-dom';
import { Player } from 'react-tuby';
import { getMovieDetail } from '../services/movie';
import { subtitleProxy } from '../shared/constants';
import { db } from '../shared/firebase';
import Title from '../components/Title'
import MetaData from '../components/WatchView/MetaData'
import Similar from '../components/WatchView/Similar'
import NavBar from '../components/Navbar';
import { useStore } from '../store';


WatchTogether.propTypes = {};

function WatchTogether() {
  const currentUser = useStore((state) => state.currentUser);
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({
    data: {},
    sources: [],
    subtitles: [],
  });
  const [loading, setLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({})

  useEffect(() => {
    (async () => {
      const roomRef = doc(db, "room-watch", id);
      const docSnap = await getDoc(roomRef);
      if (docSnap.exists()) {
        setRoomInfo(docSnap.data())
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if(roomInfo?.movieId){
        const movieDetailResponse = await getMovieDetail(roomInfo?.movieId);
        setMovieDetail(movieDetailResponse);
        setLoading(false);
      }
    })()
  }, [roomInfo])

  const handlePause = async (e) => {
    const watchRef = doc(db, 'room-watch', id);
    await updateDoc(watchRef, {
      paused: true,
    });
    console.log('updated pause!!!');
  };

  const handlePlay = async (e) => {
    const watchRef = doc(db, 'room-watch', id);
    await updateDoc(watchRef, {
      paused: false,
    });
    console.log('updated play!!!');
  };

  const handleTimeUpdate = async (e) => {
    const watchRef = doc(db, 'room-watch', id);
    await updateDoc(watchRef, {
      currentTime: e.target.currentTime,
    });
    console.log('updated time!!!');
  };
  console.log(roomInfo?.hostId, currentUser?.uid);

  if (loading) return <Spin />;
  return (
    <>
      <Title value={'Watch-together'} />
      <div className="flex justify-center">
        <div className="mx-[4vw] lg:mx-[6vw] flex-1">
          <NavBar />
          <div className="flex flex-col md:flex-row gap-10 my-7">
            <div className="flex flex-col items-stretch flex-grow">
              <div className="w-full">
                <Player
                  playerKey={'123'}
                  primaryColor="#0D90F3"
                  src={movieDetail?.sources || []}
                  subtitles={
                    movieDetail?.subtitles?.map((subtitle) => ({
                      ...subtitle,
                      url: subtitleProxy(subtitle.url),
                    })) || []
                  }
                >
                  {(ref, props) => {
                    return (
                      <HlsPlayer
                        onSeeked={handleTimeUpdate}
                        onPlay={handlePlay}
                        onPause={handlePause}
                        playerRef={ref}
                        {...props}
                        src={`${props.src}`}
                        controls={false}
                      />
                    );
                  }}
                </Player>
              </div>
              {
                roomInfo?.hostId === currentUser?.uid ? (
                  <span className="w-max block mt-8 bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Host</span>
                ) : (
                  <span className="w-max block mt-8 bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Member</span>
                )
              }
              <MetaData data={movieDetail?.data} />
            </div>
            <Similar data={movieDetail?.data} />
          </div>
        </div>
      </div>
    </>
  );
}
export default WatchTogether;
