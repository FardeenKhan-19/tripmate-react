// ===============================================================
// firebase
// ===============================================================
// This file initializes the Firebase application.


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCjppEY_0dfKc4cC5Tftdns_ZIBTd954Ow",
    authDomain: "trip-mate-6996.firebaseapp.com",
    projectId: "trip-mate-6996",
    storageBucket: "trip-mate-6996.firebasestorage.app",
    messagingSenderId: "277961205513",
    appId: "1:277961205513:web:adb0ab85c0efec749e15d8",
    measurementId: "G-JFWWSP6F73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services needed
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;