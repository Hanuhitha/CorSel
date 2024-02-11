import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore";

const app = firebase.initializeApp({
    apiKey: "AIzaSyCpXJcpFFQEHDNER6d8QcTTV6tWFTm5c5s",
    authDomain: "cosel-e414d.firebaseapp.com",
    databaseURL: "https://cosel-e414d-default-rtdb.firebaseio.com",
    projectId: "cosel-e414d",
    storageBucket: "cosel-e414d.appspot.com",
    messagingSenderId: "201258524605",
    appId: "1:201258524605:web:4475c47aecee87fcf8bcd4"
})

const auth = app.auth();
const db = app.firestore(); // Make sure to include this line for Firestore

export { auth, db };
export default app;