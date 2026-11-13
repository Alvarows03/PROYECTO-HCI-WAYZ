// Aplica las preferencias al documento. Es la base del diseño inclusivo:
// quien usa la aplicación al sol, con poca visión o con fatiga visual puede cambiar el aspecto sin perder funciones.

import { obtenerPrefs, suscribir } from './almacen.js';

export const TEMAS = {
  clara: 'Clara',
  calida: 'Cálida',
  oscura: 'Oscura',
  contraste: 'Alto contraste',
};

export function aplicarPreferencias() {
  const p = obtenerPrefs();
  const raiz = document.documentElement;
  // «Modo sol»: texto negro sobre blanco, bordes gruesos y letra más grande, para leer con luz directa.
  raiz.dataset.tema = p.sol ? 'sol' : p.tema;
  raiz.style.fontSize = `${Math.round(p.texto * (p.sol ? 1.15 : 1))}%`;
  raiz.style.setProperty('--fuerza-contraste', `${p.sol ? 100 : p.contraste}%`);
  raiz.dataset.resaltar = String(p.resaltar);
  const boton = document.getElementById('btn-sol');
  if (boton) {
    boton.setAttribute('aria-pressed', String(p.sol));
    boton.querySelector('[data-estado]')?.replaceChildren(p.sol ? 'activado' : 'desactivado');
  }
}

export function iniciarPreferencias() {
  aplicarPreferencias();
  suscribir((que) => que === 'prefs' && aplicarPreferencias());
}
