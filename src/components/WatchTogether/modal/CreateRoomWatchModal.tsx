import { addDoc, collection } from 'firebase/firestore';
import { FC, useState } from 'react';
import { db } from '../../../shared/firebase';
import Toast from '../../Toast';
import SearchBoxWatchTogether from '../SearchBoxWatchTogether';
import '../index.css';
import { useStore } from '../../../store';

interface ModalProps {
  title: string;
  displayModal: boolean;
  onSetDisplayModal: (state: any) => void;
}

const CreateRoomWatchModal: FC<ModalProps> = ({ title, displayModal, onSetDisplayModal }) => {
  const currentUser = useStore((state) => state.currentUser);

  const [toast, setToast] = useState({
    isShow: false,
    error: false,
    message: '',
    duration: 3000,
  });
  const [movieInfo, setMovieInfo] = useState<any>({});
  const [password, setPassword] = useState<any>('');
  const [error, setError] = useState({
    movie: false,
    password: false,
  });
  const handleSubmit = async () => {
    if (!movieInfo?.id) {
      setError((prev) => ({ ...prev, movie: true }));
    }
    if (!password || password.length < 6) {
      setError((prev) => ({ ...prev, password: true }));
    }
    if (!movieInfo?.id || !password || password.length < 6) return;

    setError({
      movie: false,
      password: false,
    });

    const dataSubmit = {
      movie: movieInfo.name,
      movieId: movieInfo.id,
      password,
      hostId: currentUser?.uid,
      paused: true,
      currentTime: 0,
    };
    try {
      await addDoc(collection(db, 'room-watch'), dataSubmit);
      setToast((prev) => ({
        ...prev,
        isShow: true,
        error: false,
        message: 'Create room watch together successfully!',
      }));

      setMovieInfo({});
      setPassword('');
      onSetDisplayModal('hidden');
    } catch (error) {
      console.log('failed to create room to firestore:', error);
      setToast((prev) => ({
        ...prev,
        isShow: true,
        error: true,
        message: 'Failed to create room. Try again later!',
      }));
    }
  };
  const handleChangeValuePassword = (e) => {
    const value = e.target.value;
    if (!value || value.length < 6) {
      setError((prev) => ({ ...prev, password: true }));
    } else {
      setError((prev) => ({ ...prev, password: false }));
    }
    setPassword(value);
  };
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
            <form>
              <div className="mb-6">
                <label htmlFor="movie" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Movie
                </label>
                <SearchBoxWatchTogether setMovieInfo={setMovieInfo} setError={setError} />
                {error.movie && <div className="mt-1 helper-text text-sm text-red-600">Please choose a movie</div>}
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Room password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handleChangeValuePassword}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  minLength={6}
                />
                {error.password && (
                  <div className="mt-1 helper-text text-sm text-red-600">
                    Password is not acceptable (required and at least 6 characters)
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
            <button
              onClick={handleSubmit}
              type="submit"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Room
            </button>
            <button
              onClick={() => onSetDisplayModal('hidden')}
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            >
              Discard
            </button>
          </div>
        </div>
      </div>
      {toast.isShow && (
        <Toast
          duration={toast.duration}
          error={toast.error}
          message={toast.message}
          onSetIsShow={(res) => setToast((prev) => ({ ...prev, isShow: res }))}
        />
      )}
    </div>
  );
};

export default CreateRoomWatchModal;
