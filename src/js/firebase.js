import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: "https://landing-9a336-default-rtdb.firebaseio.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const saveVote = async (productID) => {
    const refVotes = ref(database, 'votes')
    const newVotesRef = push(refVotes);
    return set(newVotesRef, {
        productID: productID,
        timestamp: Date.now()
    }).then(() => {
        return {
            status: true,
            message: "Enviado  los datos correctamente"
        }
    }).catch(error => {
        // Error en la solicitud
        return {
            status: false,
            message: error
        };
    });
};

export { saveVote };