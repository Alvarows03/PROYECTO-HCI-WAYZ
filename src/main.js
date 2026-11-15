// Punto de entrada de la aplicación Wayz.
import './styles/index.css';
import { iniciarPreferencias } from './nucleo/preferencias.js';
import { iniciarInteracciones } from './nucleo/interacciones.js';
import { iniciarEnrutador } from './nucleo/app.js';
import { iniciarSesion, cerrarSesion, obtenerSesion, obtenerPrefs, suscribir } from './nucleo/almacen.js';
import { hayBaseDeDatos } from './datos/supabase.js';
import { haySesionActiva, perfilActual, cargarTodo, guardarPreferencias } from './datos/repositorio.js';

iniciarPreferencias();
iniciarInteracciones();

// El enlace «Saltar al contenido» no usa un ancla (#) para no confundir al enrutador.
document.querySelector('[data-saltar]')?.addEventListener('click', (e) => {
  e.preventDefault();
  (document.getElementById('contenido-principal') ?? document.getElementById('app')).focus();
});

// Con base de datos: las preferencias de cada persona se guardan en su perfil.
let esperaPrefs;
suscribir((que, extra) => {
  if (que !== 'prefs' || extra?.sinNube) return;
  clearTimeout(esperaPrefs);
  esperaPrefs = setTimeout(() => guardarPreferencias(obtenerPrefs()).catch(() => {}), 600);
});

// Al abrir la app: si la base de datos recuerda la sesión, se restaura y se cargan los datos antes de dibujar.
async function restaurar() {
  if (!hayBaseDeDatos) return;
  try {
    if (await haySesionActiva()) {
      const perfil = await perfilActual();
      if (perfil) {
        if (!obtenerSesion() || obtenerSesion().correo !== perfil.correo) iniciarSesion(perfil);
        await cargarTodo();
        return;
      }
    }
    if (obtenerSesion()) cerrarSesion(); // la sesión guardada ya no es válida
  } catch (error) {
    console.warn('No se pudo restaurar la sesión:', error.message);
    cerrarSesion();
  }
}

restaurar().finally(iniciarEnrutador);
