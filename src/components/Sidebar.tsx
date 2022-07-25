import { signOut } from 'firebase/auth';
import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { resizeImage } from '../shared/constants';
import { auth } from '../shared/firebase';
import { useStore } from '../store';
import Modal from './Modal';


interface SidebarProps {
  sidebarActive: boolean;
  setSidebarActive: (state: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ sidebarActive, setSidebarActive }) => {
  const location = useLocation();
  const { currentUser, setDisplayVoiceModal } = useStore((state) => state);
  const [displayModal, setDisplayModal] = useState('hidden');
  const handleSignOut = () => {
    signOut(auth);
  };

  useEffect(() => {
  console.log('mount')
  }, [])
  console.log({displayModal})
  return (
    <>
      <div
        className={`fixed left-auto right-full top-0 z-10 flex h-screen w-[90vw] max-w-[288px] flex-shrink-0 flex-col items-stretch overflow-y-auto border-r border-gray-800 bg-dark py-10 pl-5 pr-0 transition-all duration-500 sm:sticky sm:!right-0 sm:!left-0 sm:w-16 sm:max-w-none sm:!translate-x-0 sm:bg-transparent xl:w-72 xl:pl-10 ${
          sidebarActive ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <img className="h-6 w-6" src="/vmc_avatar.webp" alt="" />
          <p className="block text-xl font-semibold sm:hidden xl:block">VMC Social</p>
        </Link>

        <div className="mt-0 block flex-col gap-0 sm:mt-4 sm:flex sm:gap-4 xl:mt-0 xl:block xl:gap-0">
          <p className="mt-10 mb-4 block uppercase text-gray-400 sm:hidden xl:block">Menu</p>

          <div className="flex flex-col items-stretch gap-3">
            <Link
              to="/"
              className={`flex items-center gap-2 transition ${
                location.pathname === '/'
                  ? 'border-r-4 border-primary text-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="fas fa-home w-[24px] text-xl"></i>
              <p className="block sm:hidden xl:block">Home</p>
            </Link>

            <Link
              to="/discovery"
              className={`flex items-center gap-2 transition ${
                location.pathname === '/discovery'
                  ? 'border-r-4 border-primary text-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="fas fa-compass w-[24px] text-xl"></i>
              <p className="block sm:hidden xl:block">Discovery</p>
            </Link>

            <Link
              to="/explore"
              className={`flex items-center gap-2 transition ${
                location.pathname === '/explore'
                  ? 'border-r-4 border-primary text-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="fas fa-desktop w-[24px] text-xl"></i>
              <p className="block sm:hidden xl:block">Explore</p>
            </Link>

            <Link
              onClick={() => {!currentUser && setDisplayModal('block')}}
              to={currentUser ? "/chat-box" : "/"}
              className={`flex items-center gap-2 transition ${
                location.pathname === '/history'
                  ? 'border-r-4 border-primary text-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="fas fa-comment w-[24px] text-xl"></i>
              <p className="block sm:hidden xl:block">Chat box</p>
            </Link>

            <Link
              to="/history"
              className={`flex items-center gap-2 transition ${
                location.pathname === '/history'
                  ? 'border-r-4 border-primary text-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="fas fa-history w-[24px] text-xl"></i>
              <p className="block sm:hidden xl:block">History</p>
            </Link>

            <Link
              onClick={() => {!currentUser && setDisplayModal('block')}}
              to={currentUser ? "/post" : "/"}
              className={`flex items-center gap-2 transition ${
                location.pathname === '/history'
                  ? 'border-r-4 border-primary text-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="far fa-file-alt w-[24px] text-xl text-center"></i>
              <p className="block sm:hidden xl:block">Blog post</p>
            </Link>

            <button
              onClick={() => {
                if(!currentUser){
                  setDisplayModal('block')
                }else {
                  setDisplayVoiceModal("flex")
                }
              }}
              className={`flex items-center gap-2 transition ${
                location.pathname === '/history'
                  ? 'border-r-4 border-primary text-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="fas fa-microphone-alt w-[24px] text-xl text-center"></i>
              <p className="block sm:hidden xl:block">Voice call</p>
            </button>
            
            <Link
              // onClick={() => {!currentUser && setDisplayModal('block')}}   
              to="/watch-together"
              className={`flex items-center gap-2 transition ${
                location.pathname === '/history'
                  ? 'border-r-4 border-primary text-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="fas fa-people-arrows w-[24px] text-xl text-center"></i>
              <p className="block sm:hidden xl:block">Watch together</p>
            </Link>

            <Link
              to="/search"
              className={`flex items-center gap-2 transition md:!hidden ${
                location.pathname === '/search'
                  ? 'border-r-4 border-primary text-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="fas fa-search w-[24px] text-xl"></i>
              <p className="block sm:hidden xl:block">Search</p>
            </Link>
          </div>

          <p className="mt-10 mb-4 block uppercase text-gray-400 sm:hidden xl:block">Personal</p>

          {!currentUser ? (
            <Link
              to={`/sign-in?redirect=${encodeURIComponent(location.pathname)}`}
              className="flex cursor-pointer items-center gap-2 text-gray-400 transition hover:text-gray-300"
            >
              <i className="fas fa-sign-in-alt w-[24px] text-xl"></i>
              <p className="block sm:hidden xl:block">Sign In</p>
            </Link>
          ) : (
            <div className="flex flex-col items-stretch gap-3">
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  className="h-[24px] w-[24px] rounded-full"
                  src={resizeImage(currentUser.photoURL || "", '24', '24')}
                  alt=""
                />

                <p className="block text-gray-400 sm:hidden xl:block">{currentUser.displayName}</p>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex cursor-pointer items-center gap-2 text-gray-400 transition hover:text-gray-300"
              >
                <i className="fas fa-sign-out-alt w-[24px] text-xl"></i>
                <p className="block sm:hidden xl:block">Sign Out</p>
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        onClick={() => setSidebarActive(false)}
        className={`fixed top-0 left-0 z-[5] h-full w-full bg-[#00000080] transition-all duration-500 sm:!opacity-0 ${
          sidebarActive ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      ></div>

      <Modal 
        title="VMC Chat box"
        displayModal={displayModal}
        onSetDisplayModal={setDisplayModal}
      />
    </>
  );
};

export default Sidebar;
