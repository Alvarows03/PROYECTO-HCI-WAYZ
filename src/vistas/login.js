// Vista: Iniciar sesión (wireframe W-01)
import '../styles/vistas/login.css';
import '../styles/vistas/login-ayuda.css';
import logo from '../assets/logo_con_letras.png';
import { USUARIOS_DEMO, CLAVE_DEMO } from '../config/roles.js';

export default {
  render: () => `
    <div class="v-login">
    <main class="login" id="contenido-principal" tabindex="-1">
      <aside class="login__bienvenida">
        <img src="${logo}" alt="Wayz: detección de fraude en seguros" width="420" height="210">
      </aside>

      <section class="login__formulario">
        <p class="marca">Wayz</p>
        <h1>Iniciar sesión</h1>
        <p class="subtitulo">Ingresa con tu cuenta de la aseguradora</p>

        <form id="form-login" data-propio novalidate>
          <label for="correo">Correo electrónico</label>
          <input type="email" id="correo" name="correo" placeholder="nombre@empresa.com" autocomplete="username" required>

          <label for="clave">Contraseña</label>
          <div class="campo-clave">
            <input type="password" id="clave" name="clave" placeholder="••••••••" autocomplete="current-password" required minlength="8">
            <button type="button" class="enlace-boton" id="ver-clave" aria-pressed="false">Mostrar contraseña</button>
          </div>

          <div class="opciones">
            <label class="recordar"><input type="checkbox" name="recordar"> Recordar este equipo</label>
            <button type="button" class="enlace-boton" data-dialog="recuperar">¿Olvidaste tu contraseña?</button>
          </div>

          <button type="submit" class="boton-login">Ingresar</button>
          <p class="error-login" id="error-login" role="alert" hidden></p>
        </form>

        <details class="demo">
          <summary>Cuentas de demostración</summary>
          <p>Elige un rol para completar los datos. Contraseña de todas: <strong>${CLAVE_DEMO}</strong></p>
          <ul>
            ${USUARIOS_DEMO.map((u) => `<li><button type="button" class="enlace-boton" data-demo="${u.correo}">${u.correo}</button></li>`).join('')}
          </ul>
        </details>

        <footer>
          <button type="button" class="enlace-boton" data-dialog="soporte">Soporte local</button> ·
          <button type="button" class="enlace-boton" data-accion="Términos y condiciones">Términos y condiciones</button> ·
          <button type="button" class="enlace-boton" data-accion="Protección de datos">Protección de datos</button>
        </footer>
      </section>
    </main>
    </div>`,
};
