import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation ,useQueryClient} from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps={
  data:ProjectFormData
  projectId:Project['_id']
}
export default function EditProjectForm({data , projectId}:EditProjectFormProps) {

    const navigate= useNavigate()//useNavigate para redireccionar 

    const initialValues: ProjectFormData= {
      projectName:data.projectName,
      clientName:data.clientName,
      description:data.description,
    };
  
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({ defaultValues: initialValues });

    const queryClient = useQueryClient()//para invalidar los querys cuando necesitamos que se actualizen los datos
 
    const {mutate}= useMutation({
         mutationFn:updateProject,
         onError:(error) => {
           toast.error(error.message)
         },
         onSuccess:(data) => {
            queryClient.invalidateQueries({queryKey:['projects']})//para tener los datos acutualizados 
            queryClient.invalidateQueries( {queryKey:['editProject', projectId]})
            toast.success(data)
            navigate('/')
         }
    })

    const handleForm=(formData: ProjectFormData) => {
               const data={
                formData,
                projectId
               }
               mutate(data)
    }

    
    return (
        <>
          <div className="max-w-3xl mx-auto ">
            <h1 className="text-5xl font-black">Editar proyecto</h1>
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
                value="Actualizar proyecto"
                className=" bg-fuchsia-600 hover:bg-fuchsia-700  w-full p-3 text-white uppercase font-bold  cursor-pointer transition-colors "
              />
            </form>
          </div>
        </>
      );
}
