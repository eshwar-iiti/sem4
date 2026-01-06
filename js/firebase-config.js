// Firebase configuration
// Replace the placeholders with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyBU-yYugzdcy0Px9s4Mxs_VbLfdmEk1ASU",
  authDomain: "spi-cpi.firebaseapp.com",
  projectId: "spi-cpi",
  storageBucket: "spi-cpi.firebasestorage.app",
  messagingSenderId: "641411211734",
  appId: "1:641411211734:web:91ef314c54a4d402ba4477",
  measurementId: "G-F9DKRYXW7E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
