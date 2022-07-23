import { User } from "firebase/auth";
import create from "zustand";

interface StoreType {
  currentUser: undefined | null | User;
  setCurrentUser: (user: User | null) => void;
}

export const useStore = create<any>((set: any) => ({
  currentChat: {
    isShow: false,
    conversationId: '',
    chatPartner: {},
  },
  setCurrentChat: (chat) => set((prev) => ({...prev, currentChat: chat})),
  voiceDetails: {
    appId: '3d3864b7b2b0419bacd5081751ce6a9e',
    token: '0063d3864b7b2b0419bacd5081751ce6a9eIABDR7fTEMzj/VlBw47mrPjel0V7HvUOs9qD/57VQiy5HWTNKL8AAAAAEAAtDEjTSX/dYgEAAQBIf91i',
    channel: 'main'
  } ,
  currentUser: undefined,
  setCurrentUser: (user) => set((prev) => ({...prev, currentUser: user })),
}));
