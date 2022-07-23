import axios from 'axios';
import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { searchKeywords } from '../../services/search';
import { db } from '../../shared/firebase';
import { htmlToText } from '../../shared/utils';
import { useStore } from '../../store';
import Title from '../Title';
import debounce from 'lodash.debounce';
import { isEqual } from 'lodash';

function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState<any>({});
  const currentUser = useStore((state) => state.currentUser);
  if (!currentUser) return <Navigate to="/" />;
  const [profileImg, setProfileImg] = useState('');
  const [fileValue, setFileValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      // @ts-ignore
      const postSnap = await getDoc(doc(db, 'posts', id));
      if (postSnap.exists()) {
        setPostDetails({
          ...postSnap.data(),
          id: postSnap.id,
          createdAt: new Date(
            postSnap.data().createdAt.seconds * 1000 + postSnap.data().createdAt.nanoseconds / 1000000
          ),
        });
      }
    })();
  }, []);

  const imageHandler = (e: any) => {
    const reader: any = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setFileValue(e.target.files[0]);
  };
  const handleOnInput = debounce(async (e) => {
    const valueInput = e.target.value;
    const data = await searchKeywords(valueInput);
    setSuggestions(data.map((item) => htmlToText(item)));
  }, 500);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', fileValue || '');
      formData.append('upload_preset', 'vmc_social');
      formData.append('cloud_name', 'dblyqezyt');
      const response = await axios.post('https://api.cloudinary.com/v1_1/dblyqezyt/image/upload', formData);
      const imgUrl = response.data.secure_url;
      const postRef = doc(db, 'posts', postDetails?.id);
      await updateDoc(postRef, {
        ...postDetails,
        img: fileValue ? imgUrl : postDetails?.img,
      });
      console.log('done edit data');
      navigate('/post');
    } catch (error) {
      console.log('error:', error);
    }
  };
  return (
    <>
      <Title value="Explore - VMC Social" />
      <div className="mx-[7vw] flex min-h-screen flex-col items-stretch">
        <div className="my-7 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/post">
              <i className="fas fa-arrow-left w-[24px] text-xl text-white"></i>
            </Link>
            <img className="h-8 w-8" src="/vmc_avatar.webp" />
            <span className="text-xl font-medium">Create new post</span>
          </div>
        </div>
        <form autoComplete="off">
          <div className="mb-6 relative">
            <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
              Your category
            </label>

            <input
              autoComplete="off"
              value={postDetails?.category}
              onInput={handleOnInput}
              onKeyDown={(e) => e.stopPropagation()}
              onKeyUp={(e) => e.stopPropagation()}
              onKeyPress={(e) => e.stopPropagation()}
              onChange={(e) => setPostDetails((prev) => ({ ...prev, category: e.target.value }))}
              type="text"
              id="category"
              name="category"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Your category..."
              required
            />
            {suggestions.length > 0 && (
              <div className="absolute z-10 top-full left-0 w-full bg-dark-lighten rounded overflow-x-hidden overflow-y-auto max-h-[200px] flex-col items-stretch group-focus-within:flex">
                {suggestions.map((suggestion, index) => (
                  <div key={index}>
                    <button
                      className={`text-left p-2 w-full ${
                        index !== suggestions.length - 1 ? 'border-b border-gray-500' : ''
                      }`}
                      onClick={() => {
                        setPostDetails((prev) => ({ ...prev, category: suggestion }));
                        setSuggestions([]);
                      }}
                    >
                      {suggestion}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
              Your title
            </label>
            <input
              value={postDetails?.title}
              onChange={(e) => setPostDetails((prev) => ({ ...prev, title: e.target.value }))}
              type="text"
              id="title"
              name="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
              placeholder="Your title..."
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
              Your Content
            </label>
            <textarea
              value={postDetails?.content}
              onChange={(e) => setPostDetails((prev) => ({ ...prev, content: e.target.value }))}
              id="content"
              name="content"
              rows={10}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Your content here..."
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="post-img">
              Upload your image
            </label>
            <input
              name="img"
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
              aria-describedby="post-img_help"
              id="post-img"
              type="file"
              accept="image/*"
              onChange={imageHandler}
            />
          </div>
          <img src={profileImg || postDetails?.img} alt="" id="img" className="h-auto w-96 rounded-lg" />

          <button
            onClick={handleSubmit}
            type="submit"
            className="mt-5 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default EditPost;
