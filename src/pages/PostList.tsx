import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../components/Title';
import NavBar from '../components/NavBar';
import { Link, Navigate } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs, onSnapshot, query } from 'firebase/firestore';
import { db } from '../shared/firebase';
import { format } from 'date-fns';
import { formatDateFirebase } from '../shared/utils';
import { useStore } from '../store';

PostList.propTypes = {};

interface PostDetails {
  category: string;
  content: string;
  id: string;
  img: string;
  title: string;
  createdAt: Date;
  user: any;
}
function PostList(props) {
  const currentUser = useStore((state) => state.currentUser);
  if (!currentUser) return <Navigate to="/" />;

  const [postsList, setPostsList] = useState([]);
  useEffect(() => {
    const postsCollectionQuery = query(collection(db, 'posts'));
    const unsubscribe = onSnapshot(postsCollectionQuery, (snapshot) => {
      let postsDocuments: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: new Date(doc.data().createdAt.seconds * 1000 + doc.data().createdAt.nanoseconds / 1000000),
      }));
      setPostsList(postsDocuments);
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <Title value="Blog - VMC Social" />
      <div className="flex flex-col items-stretch min-h-screen mx-[7vw]">
        <div className="my-7 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <i className="fas fa-arrow-left w-[24px] text-xl text-white"></i>
            </Link>
            <img className="h-8 w-8" src="/vmc_avatar.webp" />
            <span className="text-xl font-medium">Blog post</span>
          </div>
          <Link className="px-3 hover:text-primary flex items-center" to="/post/create">
            <i className="fas fa-edit mr-2"></i>
            <span className="">Create new post</span>
          </Link>
        </div>
        <div className="w-full mx-1.5">
          {postsList?.length > 0 &&
            postsList.map((post: PostDetails, index) => (
              <Link to={`/post/${post.id}`} className={`flex items-center group mb-3 pb-3 ${index === postsList.length - 1 ? '' : 'border-b'}`} key={post?.id}>
                <img src={post?.img} className="rounded-md object-cover mr-3 h-24 w-24" />
                <div className="flex-1">
                  <span className="inline-block mb-4 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                  {post.category}
                  </span>
                  <h2 className="font-bold text-lg leading-tight group-hover:underline mb-2">{post?.title}</h2>
                  <div className="flex items-center">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="clock"
                      className="h-3 mr-1"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
                      ></path>
                    </svg>
                    <span className="text-xs">
                      {formatDateFirebase(post.createdAt)} | {post.user.displayName}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

export default PostList;
