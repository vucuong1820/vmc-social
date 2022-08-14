import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import ConfirmDeleteRoom from "../components/WatchTogether/modal/ConfirmDeleteRoom.jsx";
import CreateRoomWatchModal from "../components/WatchTogether/modal/CreateRoomWatchModal";
import JoinRoomModal from "../components/WatchTogether/modal/JoinRoomModal.jsx";

import useFirestore from "../hooks/useFirestore";
import { useStore } from "../store";
CreateRoomWatch.propTypes = {};

function CreateRoomWatch(props) {
  const [confirmDelete, setConfirmDelete] = useState<any>({
    isShow: false,
    roomId: "",
    hostId: "",
  });
  const [joinRoom, setJoinRoom] = useState<any>({
    isShow: false,
    data: {},
  });
  const [documents, isLoading] = useFirestore("room-watch", "");
  const [displayModal, setDisplayModal] = useState(false);
  const { currentUser } = useStore((state) => state);

  const generateDotPassword = (password) => {
    const passwordLength = password.length;
    return Array.from({ length: passwordLength })
      .map((item) => "*")
      .join("");
  };
  const roomList = [
    {
      roomId: "123",
      password: "345",
      movie: "SpiderMan",
    },
    {
      roomId: "222",
      password: "34561",
      movie: "SpiderMan 1",
    },
    {
      roomId: "33",
      password: "341655",
      movie: "SpiderMan 2",
    },
  ];
  useEffect(() => {}, []);
  console.log(currentUser?.uid, confirmDelete);
  return (
    <>
      <Title value="Watch together - VMC Social" />
      <div className="flex flex-col items-stretch min-h-screen mx-[7vw]">
        <NavBar />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="p-4 flex">
            <div
              onClick={() => setDisplayModal(true)}
              className="cursor-pointer hover:opacity-70 ml-4 flex items-center justify-center"
            >
              <i className="fas fa-edit mr-2"></i>
              <p>Create new room</p>
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Movie
                </th>
                <th scope="col" className="px-6 py-3">
                  Room ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Password
                </th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.map((room) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {room.movie}
                  </th>
                  <td className="px-6 py-4">{room.id}</td>
                  <td className="px-6 py-4">
                    {generateDotPassword(room.password)}
                  </td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 text-right">
                    <a
                      onClick={() =>
                        setConfirmDelete(() => ({
                          isShow: true,
                          hostId: room.hostId,
                          roomId: room.id,
                        }))
                      }
                      href="#"
                      className="mr-6 font-medium text-red-600 dark:text-red-600 hover:underline"
                    >
                      Delete
                    </a>

                    <a
                      onClick={() => setJoinRoom({ isShow: true, data: room })}
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Join
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {displayModal && (
        <CreateRoomWatchModal
          title="Create room watch together"
          displayModal={displayModal}
          onSetDisplayModal={setDisplayModal}
        />
      )}
      {confirmDelete.isShow && currentUser?.uid === confirmDelete.hostId && (
        <ConfirmDeleteRoom
          title="Confirm delete room"
          displayModal={confirmDelete.isShow}
          onSetDisplayModal={(display) =>
            setConfirmDelete({ isShow: false, roomId: "" })
          }
          roomId={confirmDelete.roomId}
        />
      )}
      {joinRoom.isShow && (
        <JoinRoomModal
          title={`Join room ${joinRoom.data.id}`}
          onClose={() => setJoinRoom({ isShow: false, data: {} })}
          data={joinRoom.data}
          roomId={joinRoom.data.id}
        />
      )}
    </>
  );
}

export default CreateRoomWatch;
