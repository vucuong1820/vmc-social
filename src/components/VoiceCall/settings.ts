import AgoraRTC from 'agora-rtc-sdk-ng';

export const appId = "f900ff72432d4bc59d0244674d4546df";
export const token =
  "006f900ff72432d4bc59d0244674d4546dfIACRDEeW0k1TzHeFSbg4uQtiKgIJAxk8seZIqtadZejVe2TNKL8AAAAAEAD2FHLc2+CtYgEAAQDb4K1i";
export const channelName = "main"
export const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
