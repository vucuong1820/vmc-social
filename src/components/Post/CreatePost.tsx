import axios from 'axios';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import { db } from '../../shared/firebase';
import Title from '../Title';
CreatePost.propTypes = {};

function CreatePost() {
  const [convertedText, setConvertedText] = useState('Some default content');
  const [profileImg, setProfileImg] = useState('');
  const imageHandler = (e: any) => {
    const reader: any = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
    const data = new FormData(e.target);
    const formObject = Object.fromEntries(data.entries());
    const formData = new FormData();
    formData.append("file", formObject.img)
    formData.append("upload_preset","vmc_social")
    formData.append("cloud_name","dblyqezyt")
    const response = await axios.post("https://api.cloudinary.com/v1_1/dblyqezyt/image/upload",formData)
    formObject.img = response.data.secure_url
    const dataRef = doc(collection(db, "posts"))
    setDoc(dataRef,{
        ...formObject,
        createdAt: serverTimestamp()
    })
    console.log("done submit form")
    e.target.reset(); 
    } catch (error) {
      console.log("error:",error)
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
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
              Your category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Your category..."
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
              Your title
            </label>
            <input
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
              id="content"
              name="content"
              rows="4"
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
          <img src={profileImg} alt="" id="img" className="h-auto w-96 rounded-lg" />

          <button
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

export default CreatePost;
