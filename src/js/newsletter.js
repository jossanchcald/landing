import { registrarSuscriptor, actualizarSuscriptor, eliminarSuscriptor } from './firebase.js';

const formSuscripcion = document.getElementById('novedades_form');
const formulario = document.getElementById('newsletter_form');
const containerSuscrito = document.getElementById('novedades_suscrito');
const ETIQUETAS_FRECUENCIA = {
  diario: "Resumen Diario",
  semanal: "Resumen Semanal",
  urgente: "Solo noticias de última hora"
};

// Usamos el localStorage para almacenar la info de uqe ya está suscrito
const obtenerSuscripcionLocal = () => {
  const guardado = localStorage.getItem('suscripcion');
  if (guardado != null) {
    return JSON.parse(guardado);
  }
  return null; // No hay nada guardado
}

// Cuando se suscribe, se guarada en local los datos y se muestra que esta suscrito
const mostrarSeccionSegunSuscripcion = () => {
    const datos = obtenerSuscripcionLocal();

    if (datos) {
        formSuscripcion.classList.add('hidden');
        containerSuscrito.classList.remove('hidden');
        document.getElementById('suscrito-nombre').textContent = datos.usuario;
        document.getElementById('suscrito-categorias').textContent = datos.intereses.join(', ');
        document.getElementById('suscrito-frecuencia').textContent = ETIQUETAS_FRECUENCIA[datos.frecuencia] || datos.frecuencia;
    } else {
        formSuscripcion.classList.remove('hidden');
        containerSuscrito.classList.add('hidden');
    }
};

// CUando quieren modificar, que ya se ingresen los datos previos
const prellenarFormulario = (datos) => {
    document.getElementById('usuario').value = datos.usuario;
    document.getElementById('email').value = datos.email;
    document.getElementById('frecuencia').value = datos.frecuencia;
    document.querySelectorAll('input[name="intereses[]"]').forEach(checkbox => {
        checkbox.checked = datos.intereses.includes(checkbox.value);
    });
};

// Se lee el form
const obtenerDatosFormulario = (evento) => {
    const datosForm = new FormData(evento.target);

    return {
        usuario: datosForm.get("usuario"),
        email: datosForm.get("email"),
        frecuencia: datosForm.get("frecuencia"),
        intereses: datosForm.getAll("intereses[]")
    };
};

// Se envian los datos a la bd y a local
const manejarSubmit = async (evento) => {
    evento.preventDefault();

    const suscriptor = obtenerDatosFormulario(evento);

    if (suscriptor.intereses.length === 0) {
        alert("Seleccione al menos un interés");
        return;
    }

    const suscripcionActual = obtenerSuscripcionLocal();

    try {
        if (suscripcionActual && suscripcionActual.key) {
            // Ya existe una suscripción, solo se actualiza
            await actualizarSuscriptor(suscripcionActual.key, suscriptor);
            localStorage.setItem('suscripcion', JSON.stringify({ ...suscriptor, key: suscripcionActual.key }));
            alert("Suscripción actualizada correctamente");

        } else {
            // No existe, se crea
            const key = await registrarSuscriptor(suscriptor);
            localStorage.setItem('suscripcion', JSON.stringify({ ...suscriptor, key }));
            alert("Suscripción realizada correctamente");

        }

        mostrarSeccionSegunSuscripcion();
        evento.target.reset();

    } catch (error) {
        console.log(error);
        alert("No se pudo procesar la suscripción");
    }
};

// Boton de eliminar suscripcion
const manejarEliminar = async () => {
    const datos = obtenerSuscripcionLocal();
    if (!datos) return;

    const confirmado = confirm("¿Estás seguro de que quieres eliminar tu suscripción?");
    if (!confirmado) return;

    try {
        await eliminarSuscriptor(datos.key);
        localStorage.removeItem('suscripcion');
        mostrarSeccionSegunSuscripcion();
        formulario.reset();
        alert("Suscripción eliminada correctamente");
    } catch (error) {
        console.log(error);
        alert("No se pudo eliminar la suscripción");
    }
};

const initNewsletter = () => {
  mostrarSeccionSegunSuscripcion();

  formulario.addEventListener('submit', manejarSubmit);

  document.getElementById('btn-cambiar-suscripcion').addEventListener('click', () => {
      const datos = obtenerSuscripcionLocal();
      if (datos) prellenarFormulario(datos);

      formSuscripcion.classList.remove('hidden');
      containerSuscrito.classList.add('hidden');
  });

  document.getElementById('btn-eliminar-suscripcion').addEventListener('click', manejarEliminar);
};

export {initNewsletter}