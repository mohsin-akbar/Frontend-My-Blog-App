import axios from 'axios';
import { BaseUrl } from '../../../Services/Helper';

export const PostService=(data)=>{
    return axios.post(`${BaseUrl}/api/posts/create-post`,data).then((Response)=>Response.data)
}

export const savePostImage=(id,image)=>{
    let formData=new FormData();
    formData.append("image",image)
    return axios.post(`${BaseUrl}/api/posts/image/${id}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then((Response)=>Response.data);
}

