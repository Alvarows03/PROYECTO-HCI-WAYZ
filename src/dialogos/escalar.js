// Ventana: Escalar caso a superior o colega (wireframe W-15)
import { trabajo } from '../nucleo/almacen.js';
import { validarFormulario } from '../nucleo/formularios.js';
import { toast } from '../nucleo/avisos.js';

const PERSONAS = { superior: ['Luis Quispe (líder)', 'Gabriela Ríos (gerencia)'], colega: ['Ana Torres', 'Marcos Díaz', 'Elena Paredes'] };

export default {
  titulo: () => `Solicitar apoyo en el caso ${trabajo.casoActual}`,
  ancho: 500,
  render: () => `
    <form id="f-escalar" data-propio novalidate>
      <fieldset class="grupo">
        <legend>¿A quién pides apoyo?</legend>
        <div class="radios">
          <label><input type="radio" name="para" value="superior" checked> Superior</label>
          <label><input type="radio" name="para" value="colega"> Colega</label>
        </div>
      </fieldset>
      <label class="campo"><span>Destinatario</span>
        <select name="destinatario" required data-mensaje="Elige a la persona que recibirá la solicitud."></select></label>
      <label class="campo"><span>Motivo de la solicitud</span>
        <textarea name="motivo" placeholder="Explica qué apoyo necesitas…" required minlength="10"
                  data-mensaje="Cuéntale a la otra persona qué apoyo necesitas (mínimo 10 caracteres)."></textarea></label>
      <label class="casilla"><input type="checkbox" name="adjuntar" checked> Adjuntar resumen del caso y alertas</label>
      <div class="modal__acciones">
        <button type="button" class="boton" data-cerrar>Cancelar</button>
        <button type="submit" class="boton boton--primario">Enviar solicitud</button>
      </div>
    </form>`,
  init(d) {
    const form = d.querySelector('#f-escalar');
    const llenar = () => {
      form.destinatario.innerHTML = `<option value="">Seleccionar persona</option>${PERSONAS[form.para.value].map((p) => `<option>${p}</option>`).join('')}`;
    };
    llenar();
    form.querySelectorAll('[name="para"]').forEach((r) => r.addEventListener('change', llenar));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validarFormulario(form)) return;
      toast(`Solicitud enviada a ${form.destinatario.value}. Queda registrada en la bitácora.`, 'ok');
      d.close('listo');
    });
  },
};
