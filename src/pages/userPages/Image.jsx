import { useEffect } from "react"
import { getImage } from "../../Services/User-Service"
import { toast } from "react-toastify"
import { BaseUrl } from "../../Services/Helper"
import { useState } from "react"

export const Image=()=>{

    const[imageData,setImageData]=useState(null);

   useEffect(()=>{
       getImage("default.jpeg").then((Response)=>{
        const blob = new Blob([Response]);
        const objectURL = URL.createObjectURL(blob);
        setImageData(objectURL);
        toast.success("image came")
       }).catch((error)=>{
        console.warn(error)
        toast.error("image not came")
       })
   },[])

    return (
        <div>
        {imageData ? (
          <img src={imageData} alt="image" style={{width:'100px'}} />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
  
    )
}