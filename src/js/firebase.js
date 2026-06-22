import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: "https://landing-4f0eb-default-rtdb.firebaseio.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function obtenerNoticias() {

    const snapshot = await get(
        ref(database, "noticias")
    );

    if (snapshot.exists()) {
        const noticias = snapshot.val();
        console.log(noticias);
        for (const id in noticias) {
            console.log(id);
            console.log(noticias[id]);
        }
        const noticiasArray = Object.values(noticias);
        console.log(noticiasArray);
        noticiasArray.forEach(noticia => {
            console.log(noticia.titulo);
        });
    } else {
        console.log("No hay noticias");
    }

}

obtenerNoticias();