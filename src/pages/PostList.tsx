import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../components/Title';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { db } from '../shared/firebase';

PostList.propTypes = {};

function PostList(props) {
  const [postsList, setPostsList] = useState([])
  useEffect(() => {
    const postsCollectionQuery = query(collection(db, "posts"))
    const unsubscribe = onSnapshot(postsCollectionQuery, (snapshot) => {
     
      let postsDocuments:any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setPostsList(postsDocuments)
    });
  return unsubscribe
  })
  return (
    <>
    
    <Title value="Explore - VMC Social" />
    <div className="flex flex-col items-stretch min-h-screen mx-[7vw]">
    <NavBar />


    <div className="container mx-auto flex flex-wrap py-6">
      <Link className='px-3 hover:text-primary flex items-center' to="/post/create" > 
        <i className="fas fa-edit mr-2"></i> 
        <span className=''>Create new post</span>
      </Link>
      <section className="flex w-full flex-col items-center px-3 md:w-full">
       {
         Array.from({length: 4}).map(item => (
          <article className="my-4 flex flex-col shadow rounded-2xl overflow-hidden w-full">
          <a href="#" className="hover:opacity-75">
            <img className='w-full' src="https://source.unsplash.com/collection/1346951/1000x500?sig=1" />
          </a>
          <div className="flex flex-col justify-start bg-dark-lighten p-8 group-hover:text-primary">
            <a href="#" className="pb-4 text-sm font-bold uppercase text-blue-700">
              Technology
            </a>
            <a href="#" className="">
              Lorem Ipsum Dolor Sit Amet Dolor Sit Amet
            </a>
            <a href="#" className="mt-1 mb-5 text-sm italic opacity-60">
              By{' '}
              <a href="#" className="">
                David Grzyb
              </a>
              , Published on April 25th, 2020
            </a>
            <a href="#" className="pb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu iaculis massa. Sed
              ornare ligula lacus, quis iaculis dui porta volutpat. In sit amet posuere magna..
            </a>
            <Link to="/post/123" className="uppercase ">
              Continue Reading <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </article>
         ))
       }

        

        <div className="flex items-center py-8">
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center bg-blue-800 text-sm font-semibold text-white hover:bg-blue-600"
          >
            1
          </a>
          <a
            href="#"
            className="flex h-10 w-10 items-center justify-center text-sm font-semibold text-gray-800 hover:bg-blue-600 hover:text-white"
          >
            2
          </a>
          <a
            href="#"
            className="ml-3 flex h-10 w-10 items-center justify-center text-sm font-semibold text-gray-800 hover:text-gray-900"
          >
            Next <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </section>

    </div>
    </div>
    </>
  );
}

export default PostList;
