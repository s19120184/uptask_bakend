import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [confimado, setConfirmado] = useState<boolean>();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      setConfirmado(false);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      navigate("/auth/login");
      setConfirmado(true);
      toast.success(data);
    }
  });

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  const handleComplete = (token: ConfirmToken["token"]) => {
    mutate({ token }); //lo pasamos como objeto
  };
  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {""}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="text-xs md:text-sm w-8 h-8 md:w-10 md:h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/request-code"
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
        {confimado && (
          <Link
            to="/auth/login"
            className="text-center text-gray-300 font-normal"
          >
            Iniciar Sesión
          </Link>
        )}
      </nav>
    </>
  );
}
