import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../shared/firebase"


const ConfirmDeleteRoom  = ({roomId, title, displayModal, onSetDisplayModal}) => {
    const navigate = useNavigate()
    const handleDeleteRoom = async () => {

        try {
            await deleteDoc(doc(db, "room-watch", roomId));
            console.log('delete room successfully!')
        } catch (error) {
            console.log('error:',error)
        }
    }
    console.log(roomId)
    return (
        <div
        id="exampleModal"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        aria-hidden="true"
        className={`h-modal fixed top-0 right-0 left-0 z-50 ${displayModal} w-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full`}
      >
        <div className="relative top-1/4 left-1/4 h-full w-full max-w-2xl p-4 md:h-auto">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
              <button
                type="button"
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => onSetDisplayModal('hidden')}
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
                Are you sure to delete this room ?
              </p>
            </div>
            <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
              <button
                onClick={handleDeleteRoom}
                type="button"
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Delete
              </button>
              <button
                onClick={() => onSetDisplayModal('hidden')}
                type="button"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ConfirmDeleteRoom;