import AgoraRTC from 'agora-rtc-sdk-ng';

export const appId = "f900ff72432d4bc59d0244674d4546df";
export const token =
  "006f900ff72432d4bc59d0244674d4546dfIAABNOx37lk3ccDggXQyAbB+Tn8Ldlt1nKKmaTaylKqd+WTNKL8AAAAAEACJVdSD2texYgEAAQDa17Fi";
export const channelName = "main"
export const appCertificate = "fe8b8de5acb842da9c3f14fe4303bed3"
export const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
