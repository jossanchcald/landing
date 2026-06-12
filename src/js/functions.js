"use strict";

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

export { fetchProducts }