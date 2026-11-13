// Comportamiento del inicio de sesión: validación, credenciales de demostración y entrada según el rol (UF-01).
import { validarFormulario } from '../nucleo/formularios.js';
import { buscarUsuario, CLAVE_DEMO, inicioDe } from '../config/roles.js';
import { iniciarSesion } from '../nucleo/almacen.js';
import { toast } from '../nucleo/avisos.js';

export default function login(raiz, ctx) {
  const form = raiz.querySelector('#form-login');
  const error = raiz.querySelector('#error-login');
  const clave = raiz.querySelector('#clave');
  const boton = raiz.querySelector('#ver-clave');

  form.querySelector('#correo').dataset.mensaje = 'Escribe tu correo de trabajo, por ejemplo nombre@empresa.com.';
  clave.dataset.mensaje = 'La contraseña debe tener al menos 8 caracteres.';

  // Mostrar la contraseña ayuda a quien escribe con dificultad (menos errores, menos frustración).
  boton.addEventListener('click', () => {
    const ver = clave.type === 'password';
    clave.type = ver ? 'text' : 'password';
    boton.setAttribute('aria-pressed', String(ver));
    boton.textContent = ver ? 'Ocultar contraseña' : 'Mostrar contraseña';
  });

  raiz.querySelectorAll('[data-demo]').forEach((b) => b.addEventListener('click', () => {
    form.correo.value = b.dataset.demo;
    clave.value = CLAVE_DEMO;
    error.hidden = true;
    form.querySelector('.boton-login').focus();
  }));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    error.hidden = true;
    if (!validarFormulario(form)) return;
    const usuario = buscarUsuario(form.correo.value);
    if (!usuario || form.clave.value !== CLAVE_DEMO) {
      // Mensaje que explica qué pasó y cómo recuperarse (heurística 9).
      error.textContent = '⚠ El correo o la contraseña no coinciden. Revisa los datos e inténtalo otra vez, o usa «¿Olvidaste tu contraseña?».';
      error.hidden = false;
      form.clave.select();
      return;
    }
    iniciarSesion(usuario);
    toast(`Bienvenida/o, ${usuario.nombre}. Ingresaste como ${usuario.rol === 'admin' ? 'administrador' : usuario.rol}.`, 'ok');
    ctx.ir(inicioDe(usuario.rol));
  });
}
