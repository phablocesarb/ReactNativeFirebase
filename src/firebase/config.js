// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNemmwKj060LgopcAy1geyB31SHO8UElQ",
  authDomain: "atividade04-97779.firebaseapp.com",
  projectId: "atividade04-97779",
  storageBucket: "atividade04-97779.firebasestorage.app",
  messagingSenderId: "950103268153",
  appId: "1:950103268153:web:ea1c6d27fa0398c07626e8",
  measurementId: "G-426QFJLN3K"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
