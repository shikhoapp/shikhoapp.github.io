const firebaseConfig = {
  apiKey: "AIzaSyAl4qC5y2XnMT81w42XxqnlIQ8NrX4L5ww",
  authDomain: "shikho-class-ap.firebaseapp.com",
  projectId: "shikho-class-ap",
  storageBucket: "shikho-class-ap.appspot.com",
  messagingSenderId: "219192364771",
  appId: "1:219192364771:web:5909fdb3ed33dee744ffd6",
  measurementId: "G-RE4YKNGHY4",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });
