import { registrarSuscriptor } from './firebase.js';

const formSuscripcion = document.getElementById('novedades_form');
const containerSuscrito = document.getElementById('novedades_suscrito');

const mostrarSeccionSegunSuscripcion = () => {
  const datos = JSON.parse(localStorage.getItem('suscripcion') || 'null');

  if (datos) {
    formSuscripcion.classList.add('hidden');
    containerSuscrito.classList.remove('hidden');
    document.getElementById('suscrito-nombre').textContent = datos.usuario;
    document.getElementById('suscrito-categorias').textContent = datos.intereses.join(', ');

  } else {
    formSuscripcion.classList.remove('hidden');
    containerSuscrito.classList.add('hidden');

  }
};

let registrarUsuario = () => {
  const formulario = document.getElementById("newsletter_form");

  formulario.addEventListener(
      "submit",
      registrarSuscriptor
  );
}

const prellenarFormulario = (datos) => {
    document.getElementById('usuario').value = datos.usuario;
    document.getElementById('email').value = datos.email;
    document.querySelectorAll('input[name="intereses[]"]').forEach(checkbox => {
        checkbox.checked = datos.intereses.includes(checkbox.value);
    });
};

const manejarSubmit = async (evento) => {
    evento.preventDefault();

    const datosForm = new FormData(evento.target);
    const usuario = datosForm.get("usuario");
    const email = datosForm.get("email");
    const intereses = datosForm.getAll("intereses[]");

    if (intereses.length === 0) {
        alert("Seleccione al menos un interés");
        return;
    }

    const suscriptor = { usuario, email, intereses };

    try {

        await registrarSuscriptor(suscriptor);

        alert("Suscripción realizada correctamente");
        localStorage.setItem('suscripcion', JSON.stringify(suscriptor));
        mostrarSeccionSegunSuscripcion();
        evento.target.reset();

    } catch (error) {
        console.log(error);
        alert("No se pudo realizar la suscripción");
    }
};

const initNewsletter = () => {
    mostrarSeccionSegunSuscripcion();

    formSuscripcion.addEventListener('submit', manejarSubmit);

    document.getElementById('btn-cambiar-suscripcion').addEventListener('click', () => {
        const datos = JSON.parse(localStorage.getItem('suscripcion') || 'null');
        if (datos) prellenarFormulario(datos);

        formSuscripcion.classList.remove('hidden');
        containerSuscrito.classList.add('hidden');
    });
};

export {initNewsletter}