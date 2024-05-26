importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyB_kBKJ19mHgcSUtMD0eedu9PFlCFqXVaE",
  authDomain: "freelano-push-notificati-b04f6.firebaseapp.com",
  projectId: "freelano-push-notificati-b04f6",
  storageBucket: "freelano-push-notificati-b04f6.appspot.com",
  messagingSenderId: "938817321238",
  appId: "1:938817321238:web:596c18353c9345939a7837",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
