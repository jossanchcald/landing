"use strict";

/**
 * Realiza una petición HTTP para obtener productos en formato JSON.
 *
 * @param {string} url - URL del recurso a consultar.
 * @returns {Promise<{success: boolean, body: any}>}
 * Objeto con el resultado de la operación:
 * - `success`: indica si la petición fue exitosa.
 * - `body`: contiene los datos recibidos o el mensaje de error.
 */
const fetchProducts = (url) => {

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return {
                success: true,
                body: data
            };
        })
        .catch(error => {
            return {
                success: false,
                body: error.message
            };

        });
}

/**
 * Realiza una petición HTTP para obtener categorías en formato XML.
 *
 * @async
 * @param {string} url - URL del recurso XML a consultar.
 * @returns {Promise<{success: boolean, body: Document|string}>}
 * Objeto con el resultado de la operación:
 * - `success`: indica si la petición fue exitosa.
 * - `body`: contiene un objeto `Document` XML parseado o el mensaje de error.
 */
let fetchCategories = async (url) => {

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        let text = await response.text();
        const parser = new DOMParser();
        const data = parser.parseFromString(text, "application/xml");

        return {
            success: true,
            body: data
        }

    } catch (error) {
        return {
            success: false,
            body: error.message
        }
    }
}

export { fetchProducts, fetchCategories }