"use strict";

/**
 * Obtiene un listado de productos desde una URL JSON.
 * Realiza una solicitud HTTP GET y procesa la respuesta como JSON.
 * En caso de error, captura la excepción y retorna un objeto con el estado de fallo.
 *
 * @async
 * @function fetchProducts
 * @param {string} url - La URL del endpoint que contiene los productos en formato JSON
 * @returns {Promise<{success: boolean, body: (Array|string)}>} Promesa que se resuelve con un objeto
 *         que contiene:
 *         - `success {boolean}`: Indica si la operación fue exitosa
 *         - `body {Array|string}`: Array de productos si success es true, o mensaje de error si es false
 */
const fetchProducts = async (url) => {

    return fetch(url)
        .then(
            response => {
                if (!response.ok)
                    throw new Error(`Error HTTP: ${response.status}`);
                return response.json()
            }).then(
                data => {
                    return {
                        success: true,
                        body: data
                    };
                }).catch(error => {

                    // Error en la solicitud
                    return {
                        success: false,
                        body: error.message
                    };

                });
}

/**
 * Obtiene un listado de categorías desde una URL que contiene XML.
 * Realiza una solicitud HTTP GET y procesa la respuesta como un documento XML.
 * Utiliza DOMParser para parsear el texto XML en un objeto Document.
 *
 * @async
 * @function fetchCategories
 * @param {string} url - La URL del endpoint que contiene las categorías en formato XML
 * @returns {Promise<{success: boolean, body: (Document|string)}>} Promesa que se resuelve con un objeto
 *         que contiene:
 *         - `success {boolean}`: Indica si la operación fue exitosa
 *         - `body {Document|string}`: Documento XML parseado si success es true, o mensaje de error si es false
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