
import { axiosErrordata } from "./TeamAPI";
import { UpdateCurrentUserPasswordForm, UserProfileForm } from "../types";
import api from "@/lib/axios";



export async function updateProfile(formData: UserProfileForm){
    try {
        const {data} = await api.put<string>('/auth/profile', formData)
        return data
        
    } catch (error) {
        axiosErrordata(error)
    }
}

export async function changePassword(formData: UpdateCurrentUserPasswordForm){
    try {
        const {data} = await api.post<string>('/auth/update-password', formData)
        return data
    } catch (error) {
        axiosErrordata(error)
    }
}