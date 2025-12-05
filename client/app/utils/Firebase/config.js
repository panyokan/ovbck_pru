// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { collection, query, where, getDocs } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();

async function getAdminMemberByEmail(email) {
    try {
        const adminsCollectionRef = collection(firestore, "admins");
        const q = query(adminsCollectionRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return "true";
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching admin member:", error);
        return null;
    }
}

async function getNameByEmail(email, isAdmin) {
    try {
        const adminsCollectionRef = isAdmin ? collection(firestore, "admins") : collection(firestore, "volunteers");
        const q = query(adminsCollectionRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = doc.data();
            const firstName = data.firstName;
            const lastName = data.lastName;
            const Name = `${firstName} ${lastName}`;
            return Name;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching admin member:", error);
        return undefined;
    }
}

export { app, auth, getAdminMemberByEmail, getNameByEmail }