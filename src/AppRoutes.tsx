import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreatePost from './components/Post/CreatePost';
import EditPost from './components/Post/EditPost';
import PostDetail from './components/Post/PostDetail';
import Category from './pages/Category';
import ChatBox from './pages/ChatBox';
import Chat from './pages/ChatBox/Chat';
import CreateRoomWatch from './pages/CreateRoomWatch';
import Discovery from './pages/Discovery';
import Explore from './pages/Explore';
import History from './pages/History';
import Home from './pages/Home';
import Movie from './pages/Movie';
import PostList from './pages/PostList';
import Profile from './pages/Profile';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import TV from './pages/TV';
import VoiceCall from './pages/VoiceCall';
import WatchTogetherControl from './pages/WatchTogetherControl';

const AppRoutes: FC = (props) => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="movie/:id" element={<Movie />} />
      <Route path="post" element={<PostList />} />
      <Route path="post/edit/:id" element={<EditPost />} />
      <Route path="post/:id" element={<PostDetail />} />
      <Route path="post/create" element={<CreatePost />} />
      <Route path="tv/:id" element={<TV />} />
      <Route path="search" element={<Search />} />
      <Route path="explore" element={<Explore />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="history" element={<History />} />
      <Route path="category/:id" element={<Category />} />
      <Route path="discovery" element={<Discovery />} />
      <Route path="chat-box" element={<ChatBox />} />
      <Route path="chat-box/:id" element={<Chat />} />
      <Route path="voice-call" element={<VoiceCall />} />
      <Route path="profile" element={<Profile />} />
      <Route path="watch-together/:id" element={<WatchTogetherControl />} />
      <Route path="watch-together" element={<CreateRoomWatch />} />
    </Routes>
  );
}

export default AppRoutes;
