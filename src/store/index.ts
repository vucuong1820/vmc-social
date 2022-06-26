import { User } from "firebase/auth";
import create from "zustand";

interface StoreType {
  currentUser: undefined | null | User;
  setCurrentUser: (user: User | null) => void;
}

export const useStore = create<any>((set: any) => ({
  // peerObj: null,
  // setPeerObj: (obj) => set((prev) => ({...prev, peerObj: obj})),
  // peerIds: [],
  // setPeerIds: (peerId) => set((prev) => ({...prev,peerIds: [...prev.peerIds,peerId]})),
  // isHost: null,
  // setIsHost: (bool) => set((prev) => ({...prev,isHost: bool})),
  
  // global_this_obj: {
  //   state: {
  //     connected_users: null
  //   }
  // },
  // setGlobalThisObj: () => set(),

  currentUser: undefined,
  setCurrentUser: (user) => set((prev) => ({...prev, currentUser: user })),
}));
