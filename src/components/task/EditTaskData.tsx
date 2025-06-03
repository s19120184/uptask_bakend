import { getTaskById } from "@/api/TaskAPI"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"


export default function EditTaskData() {

    const params= useParams() 
    const projectId = params.projectId!

    //sacamos el id de la url
    const location= useLocation() 
    const queryParams= new URLSearchParams(location.search)
    const taskId= queryParams.get('editTask')!


    const {data , isError} =useQuery({
        queryKey:['task', taskId],
        queryFn:() => getTaskById({projectId , taskId}),
        enabled: !!taskId, // !! convierte en boolean  en este caso si se tiene algo en la url hace la consulta si no no
    })

    if( isError )return <Navigate to={'/404'}/>

    if(data) return <EditTaskModal data={data} taskId={taskId} projectId={projectId} />
}
