// Registrar reclamo: verificación de documento, adjuntos con progreso y guardado del caso nuevo.
import { validarFormulario, marcarError, limpiarError } from '../nucleo/formularios.js';
import { trabajo } from '../nucleo/almacen.js';
import { toast } from '../nucleo/avisos.js';

export default function nuevoReclamo(raiz, ctx) {
  const form = raiz.querySelector('#f-reclamo');
  const ok = raiz.querySelector('#verificado');
  const hoy = new Date().toISOString().slice(0, 10);
  form.fecha.max = hoy; // prevención de errores: no se acepta una fecha futura
  form.fecha.dataset.mensaje = 'Indica la fecha en que ocurrió el hecho (no puede ser futura).';

  // --- Verificación de identidad (simulada: no hay servicio oficial conectado) ---
  raiz.querySelector('#verificar').addEventListener('click', () => {
    const largo = { DNI: 8, RUC: 11, CE: 9 }[form.tipoDoc.value];
    const num = form.numero.value.trim();
    ok.hidden = true;
    if (!new RegExp(`^\\d{${largo}}$`).test(num)) {
      marcarError(form.numero, `Un ${form.tipoDoc.value} tiene ${largo} dígitos. Revisa el número e inténtalo otra vez.`);
      form.numero.focus();
      return;
    }
    limpiarError(form.numero);
    if (!form.nombre.value) form.nombre.value = 'Carla Mendoza Rojas';
    ok.textContent = '✔ Identidad verificada: nombre y estado coinciden (simulación).';
    ok.hidden = false;
  });

  // --- Adjuntos: lista con barra de progreso simulada (se puede seguir trabajando mientras carga) ---
  const lista = raiz.querySelector('#lista-carga');
  const zona = raiz.querySelector('#zona');
  const agregar = (archivos) => [...archivos].forEach((f) => {
    const li = document.createElement('li');
    li.innerHTML = '<span class="carga__nombre"></span> <b>0 %</b><div class="progreso" aria-hidden="true"><div style="width:0%"></div></div>';
    li.querySelector('.carga__nombre').textContent = `${f.name} · ${(f.size / 1048576).toFixed(1)} MB`;
    lista.append(li);
    let n = 0;
    const t = setInterval(() => {
      n = Math.min(100, n + 20);
      li.querySelector('b').textContent = `${n} %`;
      li.querySelector('.progreso div').style.width = `${n}%`;
      if (n === 100) clearInterval(t);
    }, 250);
  });
  raiz.querySelector('#archivos').addEventListener('change', (e) => agregar(e.target.files));
  zona.addEventListener('dragover', (e) => { e.preventDefault(); zona.classList.add('zona-carga--sobre'); });
  zona.addEventListener('dragleave', () => zona.classList.remove('zona-carga--sobre'));
  zona.addEventListener('drop', (e) => { e.preventDefault(); zona.classList.remove('zona-carga--sobre'); agregar(e.dataTransfer.files); });

  // --- Guardar ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validarFormulario(form)) return;
    const id = `RCL-${2060 + trabajo.casosNuevos.length}`;
    trabajo.casosNuevos.push({
      id, asegurado: form.nombre.value.trim(), reclamante: form.nombre.value.trim(), tipo: form.tipo.value, riesgo: 'Medio', urgencia: 'Media',
      plazo: 15, estado: 'Nuevo', poliza: form.poliza.value, monto: Number(form.monto.value), fecha: form.fecha.value,
    });
    toast(`Reclamo ${id} registrado. Ya aparece en la bandeja.`, 'ok');
    ctx.ir('/reclamos');
  });
}
