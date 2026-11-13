// Bitácora (W-17): muestra el estado actualizado tras registrar una decisión (UF-04).
import { trabajo, obtenerSesion } from '../nucleo/almacen.js';

export default function bitacora(raiz, ctx) {
  const banner = raiz.querySelector('.estado-nuevo');
  const d = trabajo.decision;
  if (!d || d.caso !== ctx.params.caso) {
    banner.textContent = 'Este caso aún no tiene una decisión registrada.';
    return;
  }
  banner.textContent = `Estado actualizado: ${d.tipo}. Decisión registrada por ${obtenerSesion().nombre}.`;
  banner.setAttribute('role', 'status');
  const ahora = new Date();
  const fila = raiz.querySelector('tbody').insertRow(0);
  const hora = `${String(ahora.getDate()).padStart(2, '0')}/${String(ahora.getMonth() + 1).padStart(2, '0')} ${ahora.toTimeString().slice(0, 5)}`;
  [hora, obtenerSesion().nombre, 'Decisión', d.motivo.length > 40 ? `${d.motivo.slice(0, 40)}…` : d.motivo]
    .forEach((t) => (fila.insertCell().textContent = t));
  fila.classList.add('seleccionada');
}
