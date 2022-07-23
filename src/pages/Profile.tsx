import React from 'react';
import PropTypes from 'prop-types';
import Title from '../components/Title';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

Profile.propTypes = {};

function Profile(props) {
  const currentUser = useStore((state) => state.currentUser);
  const voiceDetails = useStore((state) => state.voiceDetails);

  return (
    <>
      <Title value="Profile - VMC Social" />
      <div className="flex flex-col items-stretch min-h-screen mx-[7vw]">
        <div className="my-7 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <i className="fas fa-arrow-left w-[24px] text-xl text-white"></i>
            </Link>
            <img className="h-8 w-8" src="/vmc_avatar.webp" />
            <span className="text-xl font-medium">User Profile</span>
          </div>
        </div>

        <div className="container mx-auto flex flex-wrap py-6">
          <div className='w-full'>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Your email
              </label>
              <input
                value={currentUser?.email}
                type="text"
                disabled
                id="email"
                placeholder='Your email'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Your phone number
              </label>
              <input
                value={currentUser?.phoneNumber}
                type="text"
                disabled
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your phone number"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="UID" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Your UID
              </label>
              <input
                disabled
                value={currentUser?.uid}
                type="text"
                id="UID"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Your ID"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Photo 
              </label>
              <img className='rounded-lg' src={currentUser?.photoURL} width={200}/>
            </div>

            <div className="mb-6">
              <label htmlFor="app-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Your APP ID ( voice chat )
              </label>
              <input
                disabled
                value={voiceDetails?.appId}
                type="text"
                id="app-id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Your app id"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="token" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Your APP Token ( voice chat )
              </label>
              <input
                disabled
                value={voiceDetails?.token}
                type="text"
                id="token"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Your app token"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="channel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Channel voice chat
              </label>
              <input
                disabled
                value={voiceDetails?.channel}
                type="text"
                id="channel"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                placeholder="Your channel name"
              />
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
