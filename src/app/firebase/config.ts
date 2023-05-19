import { initializeApp } from "firebase/app";
import { enableMultiTabIndexedDbPersistence, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: 'AIzaSyASOpQwgynVzOZ-7NcifzrK6ph8pNyvNAk',
    authDomain: 'lifion-accelerator.firebaseapp.com',
    projectId: 'lifion-accelerator',
    storageBucket: 'lifion-accelerator.appspot.com',
    messagingSenderId: '443828537510',
    appId: '1:443828537510:web:7d2e94fdc60fbbeb7a8c67'

};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore()
enableMultiTabIndexedDbPersistence(db);
