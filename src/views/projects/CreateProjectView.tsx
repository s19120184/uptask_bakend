import { Link , useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";//react-query
import { toast } from "react-toastify";//cuando deceamos mostrar eltoast
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";


export default function CreateProjectView() {

  const navigate=useNavigate()//useNavigate para redireccionar 

  const initialValues: ProjectFormData= {
    projectName: "",
    clientName: "",
    description: ""
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  //usamos react query
  const mutation = useMutation({
      mutationFn: createProject,
      onError: (error) => {
           toast.error(error.message)
      },
      onSuccess: (data)=>{
        toast.success(data)
        navigate('/')
      }
  })

  const handleForm = (datos: ProjectFormData) => {

       mutation.mutate(datos)

  };


  return (
    <>
      <div className="max-w-3xl mx-auto ">
        <h1 className="text-5xl font-black">Crear proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para crear un proyecto
        </p>

        <nav className="my-5">
          <Link
            className="bg-purple-400  hover:bg-purple-500 px-10 py-3  text-white text-xl font-bold cursor-pointer transition-colors"
            to="/" //ruta a la que dirigira
          >
            {" "}
            Volver a proyectos
          </Link>
        </nav>
        <form
          action=""
          className="mt-10 bg-white p-10  shadow-lg rounded-lg"
          onSubmit={handleSubmit(handleForm)} //usamos  nuestro arrow fucntion
          noValidate
        >
          <ProjectForm
               register={register}
               errors={errors}

          />

          <input
            type="submit"
            value="Crear proyecto"
            className=" bg-fuchsia-600 hover:bg-fuchsia-700  w-full p-3 text-white uppercase font-bold  cursor-pointer transition-colors "
          />
        </form>
      </div>
    </>
  );
}
