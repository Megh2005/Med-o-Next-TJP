import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "med-o-chat-3ddc0.firebaseapp.com",
  projectId: "med-o-chat-3ddc0",
  storageBucket: "med-o-chat-3ddc0.firebasestorage.app",
  messagingSenderId: "752961286840",
  appId: "1:752961286840:web:9540d7310ad8ff3ed47a4d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, app };
