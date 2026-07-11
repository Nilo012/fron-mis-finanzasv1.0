import axios from "axios";
import { BASE_URL } from "./apiEndpoints";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
// Lista de endpoints públicos que no requieren autenticación.
// Estas rutas pueden ser accedidas sin enviar token JWT.
// Se excluyen del filtro de seguridad para permitir:
// - Inicio de sesión de usuarios
// - Registro de nuevas cuentas
// - Activación de cuentas por correo
// - Verificación del estado de la API
// - Health check del servicio
const excludeEndpoints = [
  "/login",
  "/register",
  "/status",
  "/activate",
  "/health",
];

// Interceptor de solicitudes Axios.
// Se ejecuta antes de enviar cada petición HTTP al backend.
// Su función principal es agregar automáticamente el token JWT
// en el encabezado Authorization para las rutas que requieren autenticación.
//
// Las rutas públicas (login, registro, activación, etc.) son excluidas
// para evitar enviar un token innecesario.
axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) => {
      return config.url?.includes(endpoint);
    });

    if (!shouldSkipToken) {
      const accesstoken = localStorage.getItem("token");
      if (accesstoken) {
        config.headers.Authorization = `Bearer ${accesstoken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor global de respuestas Axios.
// Gestiona errores del servidor y muestra mensajes amigables al usuario.
// También redirige al login cuando la sesión ya no es válida.

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Error interno del servidor. Intenta más tarde.");
      } else if (error.code === "ECONNABORTED") {
        console.error("El servidor tardó demasiado en responder.");
      }
      return Promise.reject(error);
    }
  },
);

export default axiosConfig;
