import React, { Fragment, useEffect, useState } from 'react';
import { Spin } from 'react-cssfx-loading/lib';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCollectionQuery } from '../../../hooks/useCollectionQuery';
import InputSection from '../Input/InputSection';

import { collection, doc, orderBy, query, updateDoc } from 'firebase/firestore';
import { useDocumentQuery } from '../../../hooks/useDocumentQuery';
import { IMAGE_PROXY } from '../../../shared/constants';
import { db } from '../../../shared/firebase';
import { useStore } from '../../../store';
import LeftMessage from '../Message/LeftMessage';
import RightMessage from '../Message/RightMessage';
ChatViewPopup.propTypes = {};

function ChatViewPopup({conversationId, chatPartner, currentUserId}) {
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const currentChat = useStore((state) => state.currentChat);

  const [replyInfo, setReplyInfo] = useState(null);
  const [inputSectionOffset, setInputSectionOffset] = useState(0);
  const [limitCount, setLimitCount] = useState(10);
  const [hasMore, setHasMore] = useState(true);
    const { data, loading, error } = useCollectionQuery(
      `conversation-data-${conversationId}-${limitCount}`,
      query(
        collection(db, 'conversations', conversationId, 'messages'),
        orderBy('createdAt'),
        // limitToLast(20)
      ));

      useEffect(() => {
        (async () => {
          if(currentChat.isShow === true && data){
            await updateDoc(doc(db, 'conversations', conversationId), {
              [`seen-info-${currentUserId}`]: {
                  currentMsgSeen: data?.docs.map((doc) => doc.data()).length
              }
            })
          }
        })()
    }, [data])
  const {
    data: conversationDataInfo,
    loading: conversationLoading,
    error: conversationError,
  } = useDocumentQuery(`conversation-${conversationId}`, doc(db, 'conversations', conversationId));


  const conversationData = conversationDataInfo?.data();

  if (loading || error || conversationLoading || conversationError) {
    return null;
  }
  return (
    <div className="rounded-md overflow-hidden fixed right-24 bottom-5 bg-white" style={{ width: '338px', height: '455px' }}>
      <div className="heading absolute w-full h-12 p-1.5 bg-sky-500	 flex items-center">
        <div className="user-detail flex absolute items-center">
          <img
            className="avatar-circle rounded-full w-9 mr-2"
            src={IMAGE_PROXY(chatPartner.photoURL)}
          />
          <div className="name"> {chatPartner.displayName}</div>
        </div>
        <div onClick={() => setCurrentChat({isShow: false, conversationId: ''})} className="cursor-pointer action absolute right-4">
          <i className="fas fa-times"></i>
        </div>
      </div>
      <div className="chat-view absolute top-12 bottom-16 left-0 right-0">
        <InfiniteScroll
          dataLength={data?.size}
          // next={fetchMoreData}
          inverse
          // hasMore={false}
          loader={
            <div className="flex justify-center py-3">
              <Spin />
            </div>
          }
          style={{ display: 'flex', flexDirection: 'column-reverse', width: '100%', height: '100%' }}
        >
          <div className="flex flex-col items-stretch gap-3 pt-10 pb-1">
            {(error || loading) && <Spin />}
            {data &&
              data?.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .map((item, index) => (
                  <Fragment key={index}>
                    {item.sender === currentUserId ? (
                      <RightMessage 
                      replyInfo={replyInfo} 
                      setReplyInfo={setReplyInfo}
                      conversationId={conversationId}
                      message={item} />
                    ) : (
                      // <div>left </div>
                      <LeftMessage
                        replyInfo={replyInfo}
                        setReplyInfo={setReplyInfo}
                        message={item}
                        index={index}
                        docs={data?.docs}
                        conversation={conversationData}
                        conversationId={conversationId}
                      />
                    )}
                  </Fragment>
                ))}
          </div>
        </InfiniteScroll>
      </div>
      <div className="absolute bottom-0 chat-input">
        <InputSection
          conversationId={conversationId}
          setInputSectionOffset={setInputSectionOffset}
          replyInfo={replyInfo}
          setReplyInfo={setReplyInfo}
          disabled={false}
        />
      </div>
    </div>
  );
}

export default ChatViewPopup;
