import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: process.env.VITE_FIREBASE_KEY,
	authDomain: 'todo-list-c49be.firebaseapp.com',
	projectId: 'todo-list-c49be',
	storageBucket: 'todo-list-c49be.appspot.com',
	messagingSenderId: '780376709778',
	appId: '1:780376709778:web:3dea9bc644779a4d01e44b',
};

export const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
