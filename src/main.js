// Punto de entrada de la aplicación Wayz.
import './styles/index.css';
import { iniciarPreferencias } from './nucleo/preferencias.js';
import { iniciarInteracciones } from './nucleo/interacciones.js';
import { iniciarEnrutador } from './nucleo/app.js';

iniciarPreferencias();
iniciarInteracciones();

// El enlace «Saltar al contenido» no usa un ancla (#) para no confundir al enrutador.
document.querySelector('[data-saltar]')?.addEventListener('click', (e) => {
  e.preventDefault();
  (document.getElementById('contenido-principal') ?? document.getElementById('app')).focus();
});

iniciarEnrutador();
