import { BaseUrl } from "./Helper";
import axios from "axios";


const createUser=(data)=>{
    return axios.post(`${BaseUrl}/api/auth/signup`,data).then((Response)=>Response.data);
}

export const signIn=(data)=>{
    return axios.post(`${BaseUrl}/api/auth/signin`,data).then((Response)=>Response.data);
}

export const getCurrentUser=(data)=>{
    return axios.post(`${BaseUrl}/api/auth/current-user`,data).then((Response)=>Response.data);
}
export const userProfile=(data)=>{
    return axios.post(`${BaseUrl}/api/auth/current-user`,data).then((Response)=>Response.data);
}
export const getAllPosts=(pageNo,pageSize)=>{
    return axios.get(`${BaseUrl}/api/posts?pageNo=${pageNo}&pageSize=${pageSize}`).then((Response)=>Response.data);
}

export const deletePost=(id)=>{
    return axios.delete(`${BaseUrl}/api/posts/${id}`).then((Response)=>Response.data);
}
export const getPost=(id)=>{
    return axios.get(`${BaseUrl}/api/posts/${id}`).then((Response)=>Response.data);
}
export const createComment=(id,data)=>{
    return axios.post(`${BaseUrl}/api/posts/${id}/comments`,data).then((Response)=>Response.data);
}

export const getAllComment=(id,pageNo,pageSize,sortBy,sortDir)=>{
    return axios.get(`${BaseUrl}/api/posts/${id}/comments?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then((Response)=>Response.data);
}

export const deleteComment=(postId,commentId)=>{
    return axios.delete(`${BaseUrl}/api/posts/${postId}/comment/${commentId}`).then((Response)=>Response.data);
}

export const  findUserById=(username)=>{
    return axios.get(`${BaseUrl}/api/auth/${username}`).then((Response)=>Response.data);
}
export const  findUserByEmail=(email)=>{
    return axios.get(`${BaseUrl}/api/auth/user/${email}`).then((Response)=>Response.data);
}
export const  deleteUserById=(id)=>{
    return axios.delete(`${BaseUrl}/api/auth/${id}`).then((Response)=>Response.data);
}

export const  UpdateUserById=(username,data)=>{
    return axios.put(`${BaseUrl}/api/auth/${username}`,data).then((Response)=>Response.data);
}
export const  sendEmail=(data)=>{
    return axios.post(`${BaseUrl}/api/auth/email`,data).then((Response)=>Response.data);
}
export const getImage=(imageName)=>{
    return axios.get(`${BaseUrl}/api/posts/getImage/${imageName}`, { responseType: 'arraybuffer' }).then((Response)=>Response.data);
}
export const getUserImage=(imageName)=>{
    return axios.get(`${BaseUrl}/api/auth/getImage/${imageName}`, { responseType: 'arraybuffer' }).then((Response)=>Response.data);
}

export const saveUserImage=(username,image)=>{
    let formData=new FormData();
    formData.append("image",image)
    return axios.post(`${BaseUrl}/api/auth/image/${username}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then((Response)=>Response.data);
}

export default createUser;