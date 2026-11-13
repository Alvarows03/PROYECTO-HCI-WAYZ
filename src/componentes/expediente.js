// Cabecera común de las pantallas del expediente (W-08 a W-12 y W-17).
// Se escribe una sola vez; antes estaba copiada en cada pantalla.

import { buscarCaso, claseRiesgo, claseEstado } from '../datos/datos.js';
import { trabajo } from '../nucleo/almacen.js';

const SUBPESTANAS = [
  ['resumen', 'Resumen'],
  ['documentos', 'Documentos'],
  ['inconsistencias', 'Inconsistencias'],
  ['identidad', 'Identidad y listas'],
  ['similares', 'Similares y redes'],
  ['bitacora', 'Bitácora'],
];
const ACTIVA = { Resumen: 'resumen', Documentos: 'documentos', Inconsistencias: 'inconsistencias', 'Identidad y listas': 'identidad', 'Similares y redes': 'similares', Bitácora: 'bitacora' };

export function expedienteHeader(nombreActivo, ctx) {
  const id = ctx.params.caso ?? 'RCL-2041';
  const caso = buscarCaso(id) ?? trabajo.casosNuevos.find((c) => c.id === id) ?? { riesgo: 'Alto', estado: 'En revisión', plazo: 2, asegurado: 'nombre del asegurado' };
  const activa = ACTIVA[nombreActivo];
  const enlaces = SUBPESTANAS.map(([ruta, nombre]) =>
    `<a href="#/expediente/${id}/${ruta}" ${ruta === activa ? 'class="activo" aria-current="page"' : ''}>${nombre}</a>`).join('');
  return `
    <p class="migas"><a href="#/reclamos">Reclamos</a> › Expediente del caso › ${id}</p>
    <div class="encabezado">
      <h1 class="pagina__titulo">Expediente ${id}</h1>
      <div class="encabezado__botones">
        <button type="button" class="boton" data-dialog="escalar">Escalar</button>
        <button type="button" class="boton boton--primario" data-dialog="decision">Decidir</button>
      </div>
    </div>
    <div class="chips">
      <span class="etiqueta etiqueta--${claseRiesgo(caso.riesgo)}">Riesgo: ${caso.riesgo}</span>
      <span class="etiqueta etiqueta--${claseEstado(caso.estado)}">Estado: ${caso.estado}</span>
      <span class="etiqueta etiqueta--gris">Plazo: ${caso.plazo} días</span>
      <small>Asegurado: ${caso.asegurado}</small>
    </div>
    <div class="subpestanas">
      <nav aria-label="Secciones del expediente">${enlaces}</nav>
      <button type="button" class="boton boton--ia" data-dialog="asistente">Asistente IA</button>
    </div>`;
}
