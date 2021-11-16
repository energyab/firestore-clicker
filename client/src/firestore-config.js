import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {

};

initializeApp(firebaseConfig);
export const db = getFirestore()