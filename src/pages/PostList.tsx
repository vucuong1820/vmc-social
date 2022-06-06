import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../components/Title';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs, onSnapshot, query } from 'firebase/firestore';
import { db } from '../shared/firebase';
import { format } from 'date-fns';
import { formatDateFirebase } from '../shared/utils';

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
  console.log(postsList);
  return (
    <>
      <Title value="Explore - VMC Social" />
      <div className="flex flex-col items-stretch min-h-screen mx-[7vw]">
        <div className="my-7 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <i className="fas fa-arrow-left w-[24px] text-xl text-white"></i>
            </Link>
            <img className="h-8 w-8" src="/vmc_avatar.webp" />
            <span className="text-xl font-medium">Create new post</span>
          </div>
        </div>

        <div className="container mx-auto flex flex-wrap py-6">
          <Link className="px-3 hover:text-primary flex items-center" to="/post/create">
            <i className="fas fa-edit mr-2"></i>
            <span className="">Create new post</span>
          </Link>
          <section className="flex w-full flex-col items-center px-3 md:w-full">
            {postsList.length > 0 &&
              postsList.map((post: PostDetails) => (
                <article key={post.id} className="my-4 flex flex-col shadow rounded-2xl overflow-hidden w-full">
                  <div className="hover:opacity-75">
                    <img className="w-full" src={post.img} />
                  </div>
                  <div className="flex flex-col justify-start bg-dark-lighten p-8 group-hover:text-primary">
                    <div className="pb-4 text-sm font-bold uppercase text-blue-700">{post.category}</div>
                    <div className="">{post.title}</div>
                    <div className="flex mt-1 mb-5 text-sm italic opacity-60">
                      By
                      <div className="ml-1">{post.user.displayName}</div>, Published on{' '}
                      {formatDateFirebase(post.createdAt)}
                    </div>
                    <div className="pb-6">{post.content}</div>
                    <Link to={`/post/${post.id}`} className="uppercase ">
                      Continue Reading <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              ))}
          </section>
        </div>
      </div>
    </>
  );
}

export default PostList;
