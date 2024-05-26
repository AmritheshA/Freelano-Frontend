import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_kBKJ19mHgcSUtMD0eedu9PFlCFqXVaE",
    authDomain: "freelano-push-notificati-b04f6.firebaseapp.com",
    projectId: "freelano-push-notificati-b04f6",
    storageBucket: "freelano-push-notificati-b04f6.appspot.com",
    messagingSenderId: "938817321238",
    appId: "1:938817321238:web:596c18353c9345939a7837"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestPermission = () => {
    console.log("Requesting for User Permission....");
    return Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification User Permission Granted");
            return getToken(messaging, {
                vapidKey:
                    "BMk_zZlEDsCtx34qQtMRTLMwDSYXK7VqrtfIiE66YmlIBZs_5kGXY_Id49Yic3e6y9YfANOABtu0KpvLk_LU8Mw",
            })
                .then((currentToken) => {
                    if (currentToken) {
                        console.log("🚀 ~ .then <<<<<< currentToken >>>>>"+ currentToken)
                        return currentToken;
                    } else {
                        console.log("Failed to generate the app registration token");
                        return null;
                    }
                })
                .catch((err) => {
                    console.log(
                        "An error occurred when requesting to receive the token",
                        err
                    );
                    return null;
                });
        } else {
            console.log("User Permission Denied");
            return null;
        }
    });
};


export const onMessageListener = () => {
    return new Promise<{ notification: { title: string; body: string } }>(
      (resolve) => {
        onMessage(messaging, (payload: any) => {
          resolve(payload || {});
        });
      }
    );
  };