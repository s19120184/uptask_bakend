import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import { TaskFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/api/TaskAPI";
import { toast } from "react-toastify";

export default function AddTaskModal() {
  // http://localhost:5173/projects/669772a2de315927840b9249?newTask=true

  const location = useLocation(); //para usar datos en la url
  const queryParams = new URLSearchParams(location.search); //newTask=true
  const modalTask = queryParams.get("newTask"); //verifivamos que exixta newTask
  const show = modalTask ? true : false; // de ser asi el modal sera true


  //obtener projectId 
  const params =useParams()
  const projectId = params.projectId!


  const navigate = useNavigate();

  const initialValues: TaskFormData={
      name:'',
      description:''
  }

  const { register ,reset, handleSubmit, formState:{errors} } =useForm({defaultValues:initialValues})
  const queryClient=useQueryClient()

  
  const {mutate} =useMutation({
      mutationFn: createTask,
      onError:(error)=>{
        toast.error(error.message);

      },
      onSuccess:(data)=>{
        queryClient.invalidateQueries({queryKey:['editProject',projectId] })
        queryClient.invalidateQueries({queryKey:['project',projectId] })
        toast.success(data)
         reset();//reiniciamos el formulario
         navigate(location.pathname ,{replace:true});//ocultamos el modal
      }
  })

  const handelCreateTask= (formData: TaskFormData) =>{
    
     const data={
        formData,
        projectId,
     }
     mutate(data)
  }
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          {/* //elimina ?newtask=true */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <DialogTitle as="h3" className="font-black text-4xl  my-5">
                    Nueva Tarea
                  </DialogTitle>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-fuchsia-600">una tarea</span>
                  </p>

                  <form 
                      onSubmit={handleSubmit(handelCreateTask)} 
                      noValidate
                      className="mt-10 space-y-3">
                   
                    <TaskForm
                         register={register}
                         errors={errors}
                    />


                    <button
                      className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                      onClick={() => navigate("?newTask=true")}
                    >
                      Guardar tarea
                    </button>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
