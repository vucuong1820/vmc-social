import { createClient, createMicrophoneAndCameraTracks, createMicrophoneAudioTrack } from "agora-rtc-react";

const appId = "f900ff72432d4bc59d0244674d4546df";
const token =
  "006f900ff72432d4bc59d0244674d4546dfIAATpV1DwuG9lhB5/+R2czRg/yBpah52XHgyB2GbVVe73WTNKL8AAAAAEADzS24fEEOrYgEAAQAQQ6ti";

export const config: any = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAudioTrack = createMicrophoneAudioTrack();
export const channelName = "main";
