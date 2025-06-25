import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { aunthenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import SpinnerLoad from "@/components/SpinnerLoad";
import { useState } from "react";



export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: ""
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [color] = useState('#a21caf');

  const { mutate } = useMutation({
    mutationFn: aunthenticateUser,
    onError: (error) => {
      toast.error(error.message);
      setLoading(false)
    },
    onSuccess: () => {
      setLoading(false)
      navigate("/");
    }
  });

  const handleLogin = (formData: UserLoginForm) => {
    setLoading(true)
    mutate(formData);
  };

  return (
    <>
      
      <h1 className="text-4xl text-center md:text-5xl font-black text-white">
        Iniciar Sesión
      </h1>
      <p className="text-sm text-center md:text-2xl font-light text-white mt-5">
        Comienza a planear tus proyectos {""}
        <br />
        <span className=" text-fuchsia-500 font-bold">
          {" "}
          iniciando sesión es este formulario
        </span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className=" p-5 mt-10 md:p-10 md:space-y-8  bg-white  md:w-full  "
        noValidate
      >
        <div className="flex flex-col gap-5 p-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido"
              }
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5 p-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio"
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <SpinnerLoad loading={loading} color={color} />

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-64 ml-2 md:ml-0  md:w-full p-3 mt-4  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col justify-items-center space-y-4">
        <Link
          to={"/auth/register"}
          className="text-center text-gray-300 font-normal"
        >
          ¿No tienes cuenta? Crear Una
        </Link>
        <Link
          to={"/auth/forgot-password"}
          className="text-center text-gray-300 font-normal"
        >
          ¿Olvidate tu contraseña? Restablecer
        </Link>
      </nav>
    </>
  );
}
