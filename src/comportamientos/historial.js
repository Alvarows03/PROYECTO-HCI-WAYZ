// Historial de decisiones (W-18): búsqueda en la tabla y exportación para auditoría.
import { toast, anunciar } from '../nucleo/avisos.js';

export default function historial(raiz) {
  const filas = [...raiz.querySelectorAll('.historial tbody tr')];
  const buscar = raiz.querySelector('.filtros input[type="search"]');
  buscar?.addEventListener('input', () => {
    const q = buscar.value.trim().toLowerCase();
    let n = 0;
    filas.forEach((f) => { const ver = !q || f.textContent.toLowerCase().includes(q); f.hidden = !ver; if (ver) n++; });
    anunciar(`${n} resultados.`);
  });

  const panel = raiz.querySelector('#exportar');
  const generar = [...panel.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Generar');
  generar.removeAttribute('data-accion');
  generar.addEventListener('click', () => {
    const formato = panel.querySelector('input[type="radio"]:checked').parentElement.textContent.trim();
    const csv = ['caso,fecha,analista,decision,justificacion',
      ...filas.filter((f) => !f.hidden).map((r) => [...r.cells].map((c) => c.textContent.trim()).join(','))].join('\n');
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })), download: 'historial-decisiones.csv' });
    a.click(); URL.revokeObjectURL(a.href);
    toast(`Exportación lista (${formato}): se descargó un archivo CSV de ejemplo.`, 'ok');
    panel.hidden = true;
    raiz.querySelector('[data-alternar]').setAttribute('aria-expanded', 'false');
    raiz.querySelector('[data-alternar]').focus();
  });
}
