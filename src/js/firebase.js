import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const saveVote = (productID) => {

    referenciaVotos = ref(database, 'votes');

    const nuevaReferenciaVotos = push(referenciaVotos);

    set(nuevaReferenciaVotos, {
        productID: productID,
        timestamp: Date.now()
    });

    return result.then(() => {
        return {
            status: true,
            message: "Datos enviados correctamente"
        }
    }).catch(error => {
        return {
            status: false,
            message: error.body
        }
    });

}

export {saveVote}