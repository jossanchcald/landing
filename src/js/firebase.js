import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";
const BASE_URL = "https://landing-4f0eb-default-rtdb.firebaseio.com/suscriptores";

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

/* Código anterior utilizando Firebase SDK:
let obtenerArregloNoticias = async () => {
    try {
        const snapshot = await get(
            ref(database, "noticias")
        );

        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        } else {
            throw new Error("No encuentra base de datos noticias");
        }
    } catch (error) {
        console.log(error);
    }
} */

let obtenerArregloNoticias = async () => {
    try {

        // HTTP GET utilizando fetch()
        const respuesta = await fetch(
            "https://landing-4f0eb-default-rtdb.firebaseio.com/noticias.json"
        );

        if (!respuesta.ok) {
            throw new Error("Error al obtener las noticias");
        }

        const datos = await respuesta.json();

        return Object.values(datos);

    } catch (error) {

        console.log(error);

    }
}

// Aqui usa el Firebase SDK
let obtenerArregloNoticiasCarousel = async () => {
    try {
        const snapshot = await get(
            ref(database, "carousel")
        );

        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        } else {
            throw new Error("No se ncuentra base de datos carousel");
        }
    } catch (error) {
        console.log(error);
    }
}

const registrarSuscriptor = async (suscriptor) => {
    const respuesta = await fetch(`${BASE_URL}.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(suscriptor)
    });

    if (!respuesta.ok) throw new Error("La respuesta HTTP fue fallida");

    const data = await respuesta.json();
    return data.name; // Firebase devuelve una key unica q necesitamos si queremos luego eliminar
};

const actualizarSuscriptor = async (key, suscriptor) => {
    const respuesta = await fetch(`${BASE_URL}/${key}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(suscriptor)
    });

    if (!respuesta.ok) throw new Error("No se pudo actualizar la suscripción");
};

const eliminarSuscriptor = async (key) => {
    const respuesta = await fetch(`${BASE_URL}/${key}.json`, {
        method: "DELETE"
    });

    if (!respuesta.ok) throw new Error("No se pudo eliminar la suscripción");
};

export { obtenerArregloNoticias, obtenerArregloNoticiasCarousel, registrarSuscriptor, actualizarSuscriptor, eliminarSuscriptor }