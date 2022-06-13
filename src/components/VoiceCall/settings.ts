import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "f900ff72432d4bc59d0244674d4546df";
const token =
  "006f900ff72432d4bc59d0244674d4546dfIACTE1JXkRKG27zNMEejMO8U6nVqC2ldPv6VDu4R9bn6fmTNKL8AAAAAEABUm4+sE5eoYgEAAQATl6hi";

export const config: any = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
