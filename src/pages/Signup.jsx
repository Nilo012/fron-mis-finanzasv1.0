import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import uploadProfileImage from "../util/uploadProfileImage";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //imagen de perfil
  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //debe ser igual ala variable q esta en entity
    let profileImagenUrl = "";
    setIsLoading(true);

    //validaciones
    if (!fullName.trim()) {
      setError("Por favor debe ingresar su nombre");
      setIsLoading(false);
      return;
    }
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

    //signup api
    try {
      //subir foto
      if (profilePhoto) {
        console.log("Archivo:", profilePhoto);

        const imageUrl = await uploadProfileImage(profilePhoto);
        profileImagenUrl = imageUrl || "";
        console.log("URL Cloudinary:", imageUrl);
      }
      
      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
        profileImagenUrl
      });
      if (response.status === 201) {
        toast.success("Registro exitoso");
        navigate("/login");
      }
    } catch (err) {
      console.error("Algo salió mal", err);
      setError(err.message);
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
            Crear Cuenta
          </h2>
          <p className="text-sm text-slate-700 text-center mb-8">
            Pon tus gastos 💸 e ingresos 💰 bajo control
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-6">
              <ProfilePhotoSelector
                image={profilePhoto}
                setImage={setProfilePhoto}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Nombres"
                placeholder="Mi Nombre"
                type="text"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                placeholder="nombre@ejemplo.com"
                type="text"
              />
              <div className="col-span-2">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Contraseña"
                  placeholder="*********"
                  type="password"
                />
              </div>
            </div>
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
                  Registrando...{"😊"}
                </>
              ) : (
                "Registrarse"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Ingresar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
