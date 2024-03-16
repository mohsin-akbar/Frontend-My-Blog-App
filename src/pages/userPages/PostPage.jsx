import { Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle, Container, Form, FormGroup, Input, Label } from "reactstrap"
import Base from "../../components/Base"
import { useState } from "react"
import { PostService,savePostImage } from "./UserService/PostService"
import { toast } from "react-toastify"



export const PostPage=()=>{

   const [data,setData]=useState({
    title:'',
    description:'',
    content:'',
 

   })

  const handleChange=(event ,property)=>{
       setData({...data,[property]:event.target.value})
  }

  const[image,setImage]=useState(null);

  const handleChangeImage=(event)=>{
    setImage(event.target.files[0])
    
  }
//submititng the form
const doSubmit=(event)=>{
    console.warn("warning uper method")
        event.preventDefault();
      PostService(data).then((Response)=>{
        console.warn("warning under method")
        console.log(Response)
     
        //saving image
        savePostImage(Response.id,image).then((Response)=>{
          console.log(Response)
          toast.success("image is uploaded",{
            theme:'colored'
          })
        }).then((error)=>{
          console.warn(error)
          
        })
        ///saving image end

        toast.success("Post created successfully!")
      }).catch((error)=>{
        console.warn(error);
        toast.error("error occoured")
      })
        
}


    return (
       <Base>
      <Container style={{width:600}} className="my-2">
         <Card color="dark" outline className="border-0 shadow" >
            {/* {JSON.stringify(data)} */}
            <CardBody>
             <CardHeader style={{background:"#e2e2e2"}}>
                <CardTitle><h3>
                    Post your Blogs
                    </h3></CardTitle>
                    <CardSubtitle style={{color:"blue"}}>post your blog and spread your skills to others</CardSubtitle>
             </CardHeader>

                <Form className="my-3" onSubmit={doSubmit}>
                  <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" id="title" placeholder="post title here."
                 onChange={(e)=>handleChange(e,'title')}
                 value={data.title}
                />
                  </FormGroup>
                  {/* description */}
                  <FormGroup>
                <Label for="description">Description</Label>
                <Input type="text" name="description" id="description"  placeholder="post description here."
                  onChange={(e)=>handleChange(e,'description')}
                  value={data.description}
                />
                  </FormGroup>
                  {/* content */}
                  <FormGroup>
                <Label for="content">Content</Label>
                <Input type="textarea" style={{ height: 150 }} name="content" id="content"  placeholder="post content here."
                onChange={(e)=>handleChange(e,'content')}
              
                />
                  </FormGroup>

                  {/* image saving */}
                  <FormGroup>
                <Label for="image">Picture</Label>
                <Input type="file" name="image" id="image"  
                  onChange={(e)=>handleChangeImage(e,'image')}
                  value={data.image}
                />
                  </FormGroup>
                  {/* image saveing end */}
      
      <Container className="text-center">
      <Button type="submit"  color="primary">Post</Button>
      <Button type="reset" className="ms-3" color="warning">Reset</Button>
      </Container>
      </Form>
   

            </CardBody>
         </Card>
         </Container>
       </Base>
    )
        
    
}