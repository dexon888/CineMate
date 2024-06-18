import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAvVaYlGI7pNPT9JEbfTEyFJKCANDE6E0",
  authDomain: "moviementor-a34c0.firebaseapp.com",
  projectId: "moviementor-a34c0",
  storageBucket: "moviementor-a34c0.appspot.com",
  messagingSenderId: "257871171210",
  appId: "1:257871171210:web:260e14d2909d57ec982773",
  measurementId: "G-367MGQ6B87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
