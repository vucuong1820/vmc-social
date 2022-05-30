import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FC, useCallback, useState } from 'react';
import { auth } from '../shared/firebase';
import { resizeImage } from '../shared/constants';
import { signOut } from 'firebase/auth';
import { useStore } from '../store';

interface SidebarProps {
  sidebarActive: boolean;
  setSidebarActive: (state: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ sidebarActive, setSidebarActive }) => {
  const location = useLocation();
  const navigate = useNavigate()
  const currentUser = useStore((state) => state.currentUser);
  const [displayModal, setDisplayModal] = useState('hidden');
  console.log(currentUser)
  const handleSignOut = () => {
    signOut(auth);
  };
  const toggleModal = useCallback(() => {
    if (displayModal === 'hidden') {
      setDisplayModal('block');
    }
    if (displayModal === 'block') {
      setDisplayModal('hidden');
    }
  }, []);
  console.log(displayModal);
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
              to="/post"
              className={`flex items-center gap-2 transition ${
                location.pathname === '/history'
                  ? 'border-r-4 border-primary text-primary hover:brightness-125'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <i className="far fa-file-alt w-[24px] text-xl"></i>
              <p className="block sm:hidden xl:block">Blog post</p>
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
              <div className="flex items-center gap-2">
                <img
                  className="h-[24px] w-[24px] rounded-full"
                  src={resizeImage(currentUser.photoURL || "", '24', '24')}
                  alt=""
                />

                <p className="block text-gray-400 sm:hidden xl:block">{currentUser.displayName}</p>
              </div>
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

      <div
        id="exampleModal"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        aria-hidden="true"
        className={`h-modal fixed top-0 right-0 left-0 z-50 ${displayModal} w-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full`}
      >
        <div className="relative top-1/4 left-1/4 h-full w-full max-w-2xl p-4 md:h-auto">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">VMC Chat box</h3>
              <button
                type="button"
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setDisplayModal('hidden')}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="space-y-6 p-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                You need to sign in to use this feature
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Please <span className='text-sky-500 font-bold cursor-pointer underline' onClick={() => navigate("/sign-in")}>sign in</span>
              </p>
            </div>
            <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
              <button
                onClick={() => {setDisplayModal('hidden'); navigate("/sign-in");}}
                type="button"
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign In
              </button>
              <button
                onClick={() => setDisplayModal('hidden')}
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
