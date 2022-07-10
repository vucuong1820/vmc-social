import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Spin from "react-cssfx-loading/src/Spin";
import { useParams } from 'react-router-dom';
import HostView from '../components/WatchTogether/HostView';
import MemberView from '../components/WatchTogether/MemberView';

import { getMovieDetail } from '../services/movie';
import { db } from '../shared/firebase';
import { useStore } from '../store';

function WatchTogetherControl(props) {
  const currentUser = useStore((state) => state.currentUser);
  const [movieDetail, setMovieDetail] = useState({
    data: {},
    sources: [],
    subtitles: [],
  });
  const [loading, setLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({});

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const roomRef = doc(db, 'room-watch', id);
      const docSnap = await getDoc(roomRef);
      if (docSnap.exists()) {
        setRoomInfo(docSnap.data());
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (roomInfo?.movieId) {
        const movieDetailResponse = await getMovieDetail(roomInfo?.movieId);
        setMovieDetail(movieDetailResponse);
        setLoading(false);
      }
    })();
  }, [roomInfo]);
  if (loading) return <Spin />;
  return roomInfo?.hostId === currentUser?.uid ? (
      <HostView movieDetail={movieDetail} role="Host" roomInfo={roomInfo} roomId={id} />
  ) : <MemberView movieDetail={movieDetail} role="Member" roomInfo={roomInfo} roomId={id} />
}

export default WatchTogetherControl;
