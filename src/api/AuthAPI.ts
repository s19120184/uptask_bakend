import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { checkPasswordForm, ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, userSchema } from "../types"
import { axiosErrordata } from "./TeamAPI";

export async function createAccount(formData: UserRegistrationForm){
       try {
        const url="/auth/create-account"
        const {data} = await api.post<string>(url, formData);
        return data
        
       } catch (error) {
          if(isAxiosError(error) && error.message){
            throw new Error(error.response?.data.error)
          }
       }
}


export async function confirmAccount(token: ConfirmToken){
    try {
     const url="/auth/confirm-account"
     const {data} = await api.post<string>(url, token);
     return data
     
    } catch (error) {
       if(isAxiosError(error) && error.message){
         throw new Error(error.response?.data.error)
       }
    }
}

export async function requestConfirmatinCode(email: RequestConfirmationCodeForm){
    try {
     const url="/auth/request-code"
     const {data} = await api.post<string>(url, email);
     return data
     
    } catch (error) {
       if(isAxiosError(error) && error.message){
         throw new Error(error.response?.data.error)
       }
    }
}


export async function aunthenticateUser(user: UserLoginForm){
      try {
            const url= "/auth/login"
            const{data}= await api.post<string>(url,user)
            
            localStorage.setItem("AUTH_TOKEN",data)
            return data
      } catch (error) {
        if ( isAxiosError(error) && error.message){
          throw new Error(error.response?.data.error)
        }
      }
}

export async function resetPassword(user:ForgotPasswordForm){
  try {
       const url='/auth/forgot-password'
       const {data} = await api.post<string>(url,user)
       return data
  } catch (error) {
    if(isAxiosError(error) && error.message){
          throw new Error(error.response?.data.error)
    }
  }
}

export async function validateToken(token: ConfirmToken){
  try {
     const url='auth/validate-token'
     console.log(token.token)
     const {data} = await api.post<string>(url, token)
     return data
    
  } catch (error) {
    if(isAxiosError(error) && error.message)
    {
      throw new Error(error.response?.data.error)
    }
  }
}

export async function updatePasswordWithToken({formData , token}: {formData: NewPasswordForm , token: ConfirmToken['token']}){
  try {
     const url=`auth/update-password/${token}`
     const {data} = await api.post<string>(url, formData)
     return data
    
  } catch (error) {
    if(isAxiosError(error) && error.message)
    {
      throw new Error(error.response?.data.error)
    }
  }
}

export async function getUser(){
  try {
    const {data} = await api.get('/auth/user')
    const response = userSchema.safeParse(data)
    
    if(response.success){
      return response.data
    }
   
  } catch (error) {
    if(isAxiosError(error) && error.message)
      {
        throw new Error(error.response?.data.error)
      }
  }
}

export async function checkPassword(formdata:checkPasswordForm){
  try {
    const url = '/auth/check-password'
    const{data} = await api.post<string>(url, formdata)
    return data
    
  } catch (error) {
      axiosErrordata(error)
  }
}