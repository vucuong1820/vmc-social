import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import NavBar from '../NavBar';
import { useParams } from 'react-router-dom';
import { CollectionReference, doc, getDoc } from 'firebase/firestore';
import { db } from '../../shared/firebase';
import { formatDateFirebase } from '../../shared/utils';

PostDetail.propTypes = {};

function PostDetail(props) {
  const { id } = useParams()
  const [postDetails, setPostDetails] = useState<any>({})
  useEffect(() => {
    (async () => {
      // @ts-ignore
      const postSnap = await getDoc(doc<CollectionReference>(db, "posts", id))
      if (postSnap.exists()) {
        setPostDetails({
          ...postSnap.data(),
          createdAt: new Date(postSnap.data().createdAt.seconds * 1000 + postSnap.data().createdAt.nanoseconds/1000000 )
        })
      }
    })()
  }, [])
  return ( 
    <>
      <Title value="Explore - VMC Social" />
      <div className="mx-[7vw] flex min-h-screen flex-col items-stretch">
        <NavBar />
        <div className="container mx-auto flex flex-wrap py-6 ">
          <section className="flex w-full flex-col items-center px-3 md:w-9/12">
            <article className="my-4 flex flex-col overflow-hidden rounded-2xl shadow ">
              <a href="#" className="">
                <img className="w-full" src="https://source.unsplash.com/collection/1346951/1000x500?sig=1" />
              </a>
              <div className="flex flex-col justify-start bg-dark-lighten p-8">
                <a href="#" className="pb-4 text-sm font-bold uppercase text-blue-700">
                  {postDetails?.category}
                </a>
                <a href="#" className="pb-4 text-3xl  font-bold">
                  {postDetails?.title}
                </a>
                <a href="#" className="pb-8 text-sm italic opacity-60">
                  By{' '}
                  <a href="#" className="font-semibold ">
                    {postDetails?.user?.displayName || ""}
                  </a>
                  , Published on {formatDateFirebase(new Date(postDetails?.createdAt))}
                </a>
                <h1 className="pb-3 text-2xl font-bold">Introduction</h1>
                <p className="pb-3">
                  {postDetails?.content}
                </p>
                
                
               
                
              </div>
            </article>
          </section>
          <aside className="flex w-full flex-col items-center px-3 md:w-3/12">

          <div className="my-4 flex w-full flex-col bg-dark-lighten p-6 shadow rounded-xl">
            <div className="grid grid-cols-1">
              <img className="hover:opacity-75 rounded-md w-full mb-3" src="https://source.unsplash.com/collection/1346951/150x150?sig=1" />
              <img className="hover:opacity-75 rounded-md w-full mb-3" src="https://source.unsplash.com/collection/1346951/150x150?sig=1" />
              <img className="hover:opacity-75 rounded-md w-full mb-3" src="https://source.unsplash.com/collection/1346951/150x150?sig=1" />
              
            </div>
            <a
              href="#"
              className="mt-6 flex w-full items-center justify-center rounded-md bg-blue-800 px-2 py-3 text-sm font-bold uppercase text-white hover:bg-blue-700"
            >
              <i className="fas fa-film w-[24px] text-xl mr-2"></i> Related movie
            </a>
          </div>
        </aside>
        </div>
        
      </div>
    </>
  );
}

export default PostDetail;
