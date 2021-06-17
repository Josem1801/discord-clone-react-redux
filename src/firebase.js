import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDX1xxgVXb70XozK12Q2P7P_C0ytMYXGx0",
    authDomain: "discord-clone-react-1c6ac.firebaseapp.com",
    databaseURL: "https://discord-clone-react-1c6ac-default-rtdb.firebaseio.com",
    projectId: "discord-clone-react-1c6ac",
    storageBucket: "discord-clone-react-1c6ac.appspot.com",
    messagingSenderId: "9373037445",
    appId: "1:9373037445:web:3a442fc952b4a7b7cf8aec"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider};
export default db;