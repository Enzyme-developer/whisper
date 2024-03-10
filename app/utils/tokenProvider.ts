import * as PusherPushNotifications from "@pusher/push-notifications-web";

export const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
  url: "/api/pusher",
});
