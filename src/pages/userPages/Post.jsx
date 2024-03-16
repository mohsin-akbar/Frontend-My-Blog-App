import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, CardLink, CardSubtitle, CardTitle, Col, Container } from "reactstrap";
import { deletePost, getImage } from "../../Services/User-Service";
import {toast} from 'react-toastify'
import { getCurrentUser } from "../../components/authentication/securityauth"
import { Link } from "react-router-dom";
function Post({post,refreshPost}){


       //curernt user
       const[imageData,setImageData]=useState([]);

     useEffect(()=>{
       
        getImage(post.image).then((Response)=>{
            const blob=new Blob([Response])
            const objectUrl=URL.createObjectURL(blob)
            setImageData(objectUrl)
        })
     },[])

     const[flag,setFlag]=useState(false);
 
    const action=()=>{
       setFlag(true)
        //  console.log("action worked!");
    }
    const actionBack=()=>{
        setFlag(false)
    }

  const [read,setRead]=useState(false)

    //read more
    const readMore=()=>{
        setRead(true);
    }

    const hideText=()=>{
        setRead(false);
    }

 
   
  


    //delete post by id
    const deletePostById=(id)=>{
        deletePost(id).then((Response)=>{
            console.log(Response)
            refreshPost()//for filtering
            toast.success("Post is Deleted!")

        }).catch((error)=>{
            console.warn(error);
            toast.error("something went wrong!")
        })
    }

    return(
       
            <Col sm={{size:3}}>
        <Card className="my-2">
            <CardHeader>
                <CardTitle>
                    <h4>{post.title}</h4>
                </CardTitle>
                <CardSubtitle style={{color:'blue'}}>{post.description}</CardSubtitle>
            </CardHeader>
            <CardBody>
                 <img src={imageData} alt="image-post" style={{width:'195px',height:'200px'}} className="border-0 shadow rounded"/> 
               <CardBody> {post.content.substring(0,40)}</CardBody>
                
                {/* for substring setting
                 */}
              

              {
                read &&(
                 <p>
                {post.content.substring(40)}</p>
                )
              }
                {

                    !read?<CardLink onClick={readMore}>...read more</CardLink>:<CardLink onClick={hideText}>hide</CardLink>
                //     !read &&(
                // <CardLink  onClick={readMore}>read more</CardLink>
                //     )
                }

            {/* end of readmore */}

                <Container style={{margin:'auto'}} className="text-center my-2">
                    {
                        !flag?<Button color="dark" outline size="sm" onClick={action}>Action</Button>:<Button color="dark" outline size="sm" onClick={actionBack}>Close</Button>
                    }

          <Link  className="ms-2 btn btn-primary btn-sm " to={"/private/comment/"+post.id} >Comments</Link>
                </Container>
                {
                    flag && (
                        <Container className="text-center my-2">
                            <hr/>
                           <Button color="danger" outline size="sm" onClick={()=>deletePostById(post.id)} >Delete</Button>
                           <Button color="primary" outline size="sm" className="ms-2" tag={Link} to={`/private/updatePost/${post.id}`}>Update</Button> 
                        </Container>
                    )
                }
            </CardBody>
        </Card>
        </Col>
        
    );
}

export default Post;