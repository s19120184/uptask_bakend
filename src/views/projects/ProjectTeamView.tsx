import { getProjectTeam, removeUserFromProject } from "@/api/TeamAPI";
import AddMemberModal from "@/components/team/AddMemberModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { MutatingDots } from 'react-loader-spinner'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";


export default function ProjectTeamView() {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()//para invalidar los querys cuando necesitamos que se actualizen los datos
 

    const {data, isLoading, isError} = useQuery({
      queryKey: ['projetTeam' ,projectId],
      queryFn: ()=> getProjectTeam(projectId),
      retry: false
    })



    const {mutate}= useMutation({
      mutationFn:removeUserFromProject,
      onError:(error)=>{
         toast.error(error.message)
      },
      onSuccess:(data)=>{
         toast.success(data)
         queryClient.invalidateQueries({queryKey: ['projetTeam' ,projectId]})
      }
    })


    if(isLoading) return <MutatingDots 
    visible={true}
    height="100"
    width="100"
    color="#c084fc"
    secondaryColor="#c084fc"
    radius="12.5"
    ariaLabel="mutating-dots-loading"
    wrapperStyle={{
      
    }}
    wrapperClass=""
    />

    if(isError) return <Navigate to={'/404'} />

    function handleRemoveMember ( userId:string){
       mutate({projectId:projectId, userId: userId})
    }

  if(data) return (
    <>
      <h1 className="text-5xl font-black">Adiminstrar equipo</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Administra el equipo de trabajo para este proyecto</p>
             <nav className="my-5 flex gap-3">
                <button
                className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors flex flex-wrap"
                onClick={()=> navigate('?addMember=true')}
                >Agregar colaborador</button>
                <Link to={`/projects/${projectId}`} className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors" >
                        Volver al Proyecto
                </Link>
             </nav>

             <h2 className="text-5xl font-black my-10">Miembros actuales</h2>
            {data.length ? (
                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {data?.map((member) => (
                        <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-2xl font-black text-gray-600">
                                       {member.name} 
                                    </p>
                                    <p className="text-sm text-gray-400">
                                       {member.email} 
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                            <span className="sr-only">opciones</span>
                                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </MenuButton>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <MenuItem>
                                                <button
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                    onClick={()=>handleRemoveMember(member._id)}
                                                >
                                                    Eliminar del Proyecto
                                                </button>
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center py-20'>No hay miembros en este equipo</p>
            )}

             <AddMemberModal/>
    
    </>
  )
}
