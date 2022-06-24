import React from 'react';
import PropTypes from 'prop-types';
import Title from '../components/Title';
import { Link } from 'react-router-dom';

Profile.propTypes = {};

function Profile(props) {
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
                value="cuong123@gmail.com"
                type="text"
                disabled
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Your UID
              </label>
              <input
                disabled
                value="1237889"
                type="number"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
