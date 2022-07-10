import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../shared/firebase";
  
  function useFirestore(collectionName, condition) {
    const [documents, setDocuments] = useState<any>([])
    const [isLoading, setIsLoading] = useState<any>(true)
  
    React.useEffect(() => {

      
      let collectionFiltered;
      collectionFiltered = query(
        collection(db, collectionName))
       
      const unsubscribe = onSnapshot(collectionFiltered, (snapshot) => {
       
        let newDocuments = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setDocuments(newDocuments)
        setIsLoading(false)
      });
  
      //clean up
      return unsubscribe
      
    }, [collectionName, condition]);
    return [documents, isLoading];
  }
  
  export default useFirestore;
  