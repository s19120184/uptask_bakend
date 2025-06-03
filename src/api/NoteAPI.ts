import api from "@/lib/axios"
import { Note, NoteFormData, Project, Task } from "../types"
import { axiosErrordata } from "./TeamAPI"

type NoteAPIType= {
    formData:NoteFormData,
    projectId:Project['_id']
    taskId:Task['_id']
    noteId:Note['_id']
}
export async function setNoteTeam({projectId, taskId , formData}: Pick<NoteAPIType , 'projectId' | 'taskId' | 'formData'> ){
    try {
        const url =`/projects/${projectId}/tasks/${taskId}/notes`
        const {data} = await api.post<string>(url, formData)
        return data
       
        
    } catch (error) {
         axiosErrordata(error)
    }
}

export async function deleteNote({projectId, taskId, noteId} :Pick<NoteAPIType , 'projectId' | 'taskId' | 'noteId'>){

    try {
        const url =`/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const {data} = await api.delete<string>(url)
        console.log(data)
        return data
        
    } catch (error) {
        axiosErrordata(error); 
        
    }
}