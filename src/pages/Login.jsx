import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { use } from "react";
import { LoaderCircle } from "lucide-react";
import { validateEmail } from "../util/validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //validaciones
    if (!validateEmail(email)) {
      setError("Por favor debe ingresar su correo");
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("Por favor debe ingresar su contraseña");
      setIsLoading(false);
      return;
    }

    //console.log(fullName, email, password);
    setError("");

    // llamnado api login
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.error("Algo salió mal", error);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img
        src={assets.fondo1}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter "
      />
      <div className="relative z-10 flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-xl bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2x1 p-8 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2x1 font-semibold text-black text-center mb-2">
            Finanzas Smart
          </h2>
          <p className="text-sm text-slate-700 text-center mb-8">
            Pon tus gastos 💸 e ingresos 💰 bajo control
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="nombre@ejemplo.com"
              type="text"
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Contraseña"
              placeholder="*********"
              type="password"
            />

            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <button
              disabled={isLoading}
              className={`flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
              type="submit"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Iniciando...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              ¿Aún no tienes cuenta?{" "}
              <Link
                to="/signup"
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Regístrate
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
