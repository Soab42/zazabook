// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB77wPqE2SghPeqqa4fy_vM9IcTuB2IzvY",
  authDomain: "zazabook-95669.firebaseapp.com",
  databaseURL:
    "https://zazabook-95669-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zazabook-95669",
  storageBucket: "zazabook-95669.appspot.com",
  messagingSenderId: "687524608392",
  appId: "1:687524608392:web:6d5f17602902ffdd9d623d",
  measurementId: "G-TNNBGVCZV2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// export const signintithgoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => console.log(error));
// };
// export const logout = () => {
//   signOut(auth);
// };
