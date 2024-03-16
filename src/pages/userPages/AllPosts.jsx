import { Card, CardBody, CardHeader, CardSubtitle, CardTitle, Col, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap"
import Base from "../../components/Base"
import { useState } from "react"
import { useEffect } from "react"
import { getCurrentUser, isLoggedIn } from "../../components/authentication/securityauth"
import { getAllPosts } from "../../Services/User-Service"
import { toast } from "react-toastify"
import Post from "./Post"

export const  AllPosts=()=>{

     
    const [login,setLogin]=useState(false)
    const[user,setUser]=useState({})

    const [postResponse,setPostResponse]=useState({
      content:[],
      pageSize:'',
      pageNo:'',
      totalElements:'',
      totalPages:'',
      last:false
    });

    //for seting content only for filtering purpose
    // const[content,setContent]=useState([])

    const getPosts=(pageNo=0,pageSize=8)=>{
      getAllPosts(pageNo,pageSize).then((Response)=>{
        console.log(Response);
        setPostResponse(Response);
        // setContent(Response.content)
       
        // toast.success("posts loaded!")

      }).catch((error)=>{
        console.log(error);
        toast.error("posts not loaded");
      })
    }

  
    useEffect(()=>{
        setLogin(isLoggedIn())
        setUser(getCurrentUser())
       getPosts(0,8)
    },[login])


    //after deletion filtering process
  const forFilter=(id)=>{
    getPosts(postResponse.pageNo,8) 
  }

      return (
        <Base>
            <Row>
              <Col sm={{size:10,offset:1}}>
            <Card className="my-2">
                <CardHeader>
                    <CardTitle><h3>Your all Feeds</h3></CardTitle>
                    <CardSubtitle style={{color:'blue'}}>your all feeds are visible here.</CardSubtitle>
                </CardHeader>
              <CardBody>
              <Row >
                   
                      {
                    postResponse.content.length>0? postResponse.content.map((item)=><Post key={item.id} post={item} refreshPost={forFilter}/>):"No Posts Available!"
                      }
                    
                 </Row>  
             
              </CardBody>
              <Pagination className="ms-3">
                <PaginationItem disabled={postResponse.pageNo===0}>
                  <PaginationLink onClick={()=>getPosts(postResponse.pageNo-1)}>
                    prev
                  </PaginationLink>
                </PaginationItem>

                {/* java script here */}
            {
             postResponse.totalPages>0?[...Array(postResponse.totalPages)].map((item,index)=>(
              <PaginationItem active={index===postResponse.pageNo}>
              <PaginationLink onClick={()=>getPosts(index)}>
                {index+1}
              </PaginationLink>
            </PaginationItem>
             )):<PaginationItem><PaginationLink>...</PaginationLink></PaginationItem>
             }   
            

                <PaginationItem disabled={postResponse.last===true}> 
                  <PaginationLink onClick={()=>getPosts(postResponse.pageNo+1)}>
                    next
                  </PaginationLink>
                </PaginationItem>

              </Pagination>
            </Card>
            </Col>
            </Row>
        </Base>
      )
}