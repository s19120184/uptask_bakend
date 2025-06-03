import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, Task, TaskFormData, taskSchema } from "../types";


type TaskApi={
    formData:TaskFormData
    projectId:Project['_id']
    taskId:Task['_id']
    status:Task['status']
}

export async function createTask({formData , projectId}: Pick<TaskApi , 'formData' | 'projectId'> ){
    try {

        const url =`/projects/${projectId}/tasks`
        const {data} = await api.post<string>(url, formData);
        return data;
        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
    }
    }
}

export async function getTaskById({projectId , taskId}:Pick<TaskApi , 'taskId' | 'projectId' >){
    try {
        const url=`/projects/${projectId}/tasks/${taskId}`
        const {data} = await api(url)
        
        const response= taskSchema.safeParse(data)
        console.log(response)
        if(response.success){
            return response.data
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
    }
  }
}

export async function updateTask({projectId, taskId, formData}: Pick<TaskApi , 'taskId' | 'projectId'|'formData' >){
    try {
        const url=`/projects/${projectId}/tasks/${taskId}`
        const {data} = await api.put<string>(url, formData)
        return data;

    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({projectId , taskId}:Pick<TaskApi , 'taskId' | 'projectId' >){
    try {
        const url=`/projects/${projectId}/tasks/${taskId}`
        const{data} = await api.delete<string>(url)
        return data;

    } catch (error) {
          if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateStatus({projectId, taskId, status}:Pick<TaskApi , 'projectId'|'taskId'| 'status'>){
    try{
          const url=`/projects/${projectId}/tasks/${taskId}/status`
          const {data} = await api.post<string>(url,{status})//pasamos status como objeto 
          console.log(data)
          return data
         
    }catch(error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}