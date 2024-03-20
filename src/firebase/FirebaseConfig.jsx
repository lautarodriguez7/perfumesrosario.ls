// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDBHTUtOeuCON7AEF3UPPxU1sHsnFfBv-M",
//     authDomain: "ecommerce-for.firebaseapp.com",
//     projectId: "ecommerce-for",
//     storageBucket: "ecommerce-for.appspot.com",
//     messagingSenderId: "609664686595",
//     appId: "1:609664686595:web:302bf25cc8efa64a4e4c36"
// };
const firebaseConfig = {
  apiKey: "AIzaSyC9F3vk_hcG9vzMxi1hMC8_WzkBTil9e98",
  authDomain: "perfumesrosariols.firebaseapp.com",
  projectId: "perfumesrosariols",
  storageBucket: "perfumesrosariols.appspot.com",
  messagingSenderId: "879669863787",
  appId: "1:879669863787:web:84ce94fe0fc28282d0582e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC9F3vk_hcG9vzMxi1hMC8_WzkBTil9e98",
//   authDomain: "perfumesrosariols.firebaseapp.com",
//   projectId: "perfumesrosariols",
//   storageBucket: "perfumesrosariols.appspot.com",
//   messagingSenderId: "879669863787",
//   appId: "1:879669863787:web:84ce94fe0fc28282d0582e"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);