import { useParams } from "react-router-dom";
import Base from "../../components/Base";
import { useEffect } from "react";
import { getPost } from "../../Services/User-Service";
import { useState } from "react";
import { toast } from "react-toastify";
import { PostService } from "./UserService/PostService";
import { Container,Card,CardHeader,CardSubtitle,CardTitle,CardBody,Label,FormGroup,Input,Form,Button} from "reactstrap";

export const UpdatePost=()=>{

    const {id}=useParams();
    useEffect(()=>{
        getPost(id).then((Response)=>{
            console.log(Response);
            setData(Response)
        }).catch((error)=>{
            console.log(error)
            toast.error("something went wrong!")
        })
    },[])

    //update post
    const [data,setData]=useState({
        title:'',
        description:'',
        content:'',
    
       })
    
      const handleChange=(event ,property)=>{
           setData({...data,[property]:event.target.value})
      }
    //submititng the form
    const doSubmit=(event)=>{
        console.warn("warning uper method")
            event.preventDefault();
          PostService(data).then((Response)=>{
            console.warn("warning under method")
            console.log(Response)
            toast.success("Response came")
          }).catch((error)=>{
            console.warn(error);
            toast.error("error occoured")
          })
            
    }
    return (
        <Base>
         <Container style={{width:600}} className="my-2">
         <Card color="dark" outline >
            {/* {JSON.stringify(data)} */}
            <CardBody>
             <CardHeader style={{background:"#e2e2e2"}}>
                <CardTitle><h3>
                    Update your post
                    </h3></CardTitle>
                    <CardSubtitle style={{color:"blue"}}>udpate your posts here..Titled:<b> {data.title}</b></CardSubtitle>
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
                value={data.content}
                />
                  </FormGroup>
      
      <Container className="text-center">
      <Button type="submit"  color="primary">Update</Button>
      <Button type="reset" className="ms-3" color="warning">Reset</Button>
      </Container>
      </Form>
   

            </CardBody>
         </Card>
         </Container>
        </Base>
    );
}