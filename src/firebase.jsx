// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBHqILdemr8fVLrThOTdnvG2cF8IpM-hJo",
  authDomain: "nexus-8487a.firebaseapp.com",
  projectId: "nexus-8487a",
  storageBucket: "nexus-8487a.appspot.com",
  messagingSenderId: "393295080767",
  appId: "1:393295080767:web:d4173802628ecb810fb78a",
  measurementId: "G-E7F1N4MBCK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
