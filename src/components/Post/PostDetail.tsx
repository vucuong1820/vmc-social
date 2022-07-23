import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../Title';
import NavBar from '../NavBar';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { db } from '../../shared/firebase';
import { formatDateFirebase, htmlToText } from '../../shared/utils';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { searchKeywords, searchWithKeyword } from '../../services/search';
import useSWR from 'swr';
import { useStore } from '../../store';
import ConfirmModal from './ConfirmModal';

PostDetail.propTypes = {};

function PostDetail(props) {
  const navigate = useNavigate();
  const currentUser = useStore((state) => state.currentUser);
  if (!currentUser) return <Navigate to="/" />;
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState<any>({});
  const [relatedList, setRelatedList] = useState<any>([]);
  const [displayModal, setDisplayModal] = useState<any>('hidden');
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
  useEffect(() => {
    (async () => {
      if (postDetails?.title) {
        const data = await searchWithKeyword(postDetails?.category);
        setRelatedList(
          data.slice(0, 3).map((movie) => ({ img: movie.coverHorizontalUrl, id: movie.id, name: movie.name }))
        );
      }
    })();
  }, [postDetails]);
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'posts', postDetails?.id));
      console.log('delete successfully!');
      navigate('/post');
    } catch (error) {
      console.log('error delete post:', error);
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
        <div className="container mx-auto flex flex-wrap py-6 ">
          <section className="flex w-full flex-col items-center px-3 md:w-9/12">
            <article className="w-full my-4 flex flex-col overflow-hidden rounded-2xl shadow ">
              <a href="#" className="">
                <img className="w-full" src={postDetails?.img || 'https://placehold.jp/727274/ffffff/744x1098.png?text=%20'} />
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
                    {postDetails?.user?.displayName || ''}
                  </a>
                  , Published on{' '}
                  {Object.keys(postDetails).length > 0 && formatDateFirebase(new Date(postDetails?.createdAt))}
                </a>
                <h1 className="pb-3 text-2xl font-bold">Introduction</h1>
                <p className="pb-3 whitespace-pre-line	">{postDetails?.content}</p>
              </div>
            </article>
          </section>
          <aside className="flex w-full flex-col items-center px-3 md:w-3/12">
            <div className="my-4 flex w-full flex-col bg-dark-lighten p-6 shadow rounded-xl">
              <div className="grid grid-cols-1">
                {relatedList.length > 0 &&
                  relatedList.map((movie: any) => (
                    <img key={movie.id} className="hover:opacity-75 rounded-md w-full mb-3" src={movie.img} />
                  ))}
                
              </div>
              <a
                href="#"
                className="mt-6 flex w-full items-center justify-center rounded-md bg-blue-800 px-2 py-3 text-sm font-bold uppercase text-white hover:bg-blue-700"
              >
                <i className="fas fa-film w-[24px] text-xl mr-2"></i> Related movie
              </a>
            </div>
            {currentUser?.uid === postDetails?.user?.id && (
              <div className="w-full">
                <div onClick={() => setDisplayModal('block')} className="mb-2 hover:text-rose-500 cursor-pointer">
                  <i className="fas fa-trash mr-2"></i>
                  Delete post
                </div>
                <Link to={`/post/edit/${postDetails?.id}`} className="hover:text-primary cursor-pointer">
                  <i className="fas fa-edit mr-2"></i>
                  Edit post
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
      <ConfirmModal
        title="Delete post"
        displayModal={displayModal}
        onSetDisplayModal={setDisplayModal}
        onDelete={handleDelete}
      />
    </>
  );
}

export default PostDetail;
