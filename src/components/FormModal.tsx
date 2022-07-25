import React from 'react';

function VoiceModal({handleSubmit, voiceDetails, displayModal, onSetDisplayModal}) {
  return (
    <>
      <div
        id="authentication-modal"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}
        className={`${displayModal} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal"
              onClick={() => onSetDisplayModal('hidden')}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="app-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Your App ID
                  </label>
                  <input
                    value={voiceDetails?.appId}
                    type="text"
                    name="app-id"
                    id="app-id"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="App ID..."
                  />
                </div>
                <div>
                  <label htmlFor="token" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Your token
                  </label>
                  <input
                    value={voiceDetails?.token}
                    type="text"
                    name="token"
                    id="token"
                    placeholder="Token..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="channel-name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your channel name
                  </label>
                  <input
                    value={voiceDetails?.channel}
                    type="text"
                    name="channel-name"
                    id="channel-name"
                    placeholder="Channel name..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Join the room chat
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onSetDisplayModal('hidden');
                  }}
                  type="submit"
                  className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* {isJoin && (
        <span onClick={handleLeave} className="cursor-pointer hover:opacity-50 fixed bottom-12 left-7 z-10 flex h-14 w-14">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="justify-center relative inline-flex rounded-full h-14 w-14 bg-slate-700">
            <i className="flex items-center justify-center fas fa-phone w-[24px] text-xl"></i>
          </span>
        </span>
      )} */}
    </>
  );
}

export default VoiceModal;
