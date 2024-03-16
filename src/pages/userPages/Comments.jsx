import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container } from "reactstrap";
import { getCurrentUser } from "../../components/authentication/securityauth";
import { deleteComment, findUserByEmail } from "../../Services/User-Service";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Comment({comment,refreshComment}){

     const[curUser,setCurUser]=useState('')
     const[user,setUser]=useState('')


     useEffect(()=>{
        setCurUser(getCurrentUser())
        //userByEmail
        findUserByEmail(comment.email).then((Response)=>{
            console.log(Response)
            setUser(Response)
           
        }).catch((error)=>{
            console.warn(error)
            toast.error("not loaded by email")
        })
       
     },[])


     //deleting comment
     const deleteCommentById=()=>{
        deleteComment(comment.postId,comment.commentId).then((Response)=>{
            console.log(Response);
            toast.success("comment deleted!")
            refreshComment()
        }).catch((error)=>{
            console.warn(error)
            toast.error("comment is not deleted!")
        })
     }

    //for AM PM time conversions
        var hour=parseInt(comment.date.substring(11,13));
        
     

    return (
        <>
       
         Comment by  <img style={{height:20}} src="https://static.thenounproject.com/png/5034901-200.png"   alt="profile-pic"/> <b>{comment.name}</b> with <img style={{height:25}} src="https://media.istockphoto.com/id/1125279178/vector/mail-line-icon.jpg?s=612x612&w=0&k=20&c=NASq4hMg0b6UP9V0ru4kxL2-J114O3TaakI467Pzjzw="   alt="profile-pic"/> <b><Link tag="a" to={"/private/user-profile/"+user.username}>{comment.email}</Link></b> A/C on <b>{comment.date.substring(0,11)} {parseInt(comment.date.substring(11))>12
         ? hour%12 + comment.date.substring(13,19) +' PM' :comment.date.substring(13,19)+' AM'
         }</b>
         <br/>
         <img style={{height:20}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRZe2j8ZxtqO05_XWmHSLbOAZoskz8rsF1Lw&usqp=CAU"   alt="profile-pic"/> <p style={{color:'blue'}}>{comment.body}</p>
         
         {
            curUser.email==comment.email? <Container className="text-end">
            <Button onClick={()=>deleteCommentById(comment.commentId)} color="danger" outline size="sm" >Undo</Button>
            </Container>:''
         }
         <hr/>
        </>
      
    );
}

export default Comment;