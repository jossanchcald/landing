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

    let referenciaVotos = ref(database, 'votes');
    const nuevaReferenciaVotos = push(referenciaVotos);

    return set(nuevaReferenciaVotos, {
        productID: productID,
        timestamp: Date.now()
    }).then(() => {
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

const getVotes = async () => {

    let referenciaVotos = ref(database, 'votes');

    try {
        let snapshot = await get(referenciaVotos);

        if (!snapshot.exists()) {
            return {
                status: false,
                data: "No hay datos",
            }
        }

        return {
            status: true,
            data: snapshot.val(),
        }

    } catch (error) {
        console.log(error);
    }
}

export {saveVote, getVotes}