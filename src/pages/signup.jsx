import { Card, CardBody, CardTitle, CardSubtitle, FormGroup, Label, Input, Button,CardHeader, Row, Col, FormFeedback } from "reactstrap"
import './PageCSS/signup.css';
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { Form } from "reactstrap";
import createUser, { saveUserImage } from "../Services/User-Service";
import { toast } from "react-toastify";
const Signup = () => {
 
   

   const [data,setData]= useState({
        name:'',
        email:'',
        password:'',
        mobile:'',
        about:'',
        username:'',
    })

   const [error,setError] =useState({
        errors:{},
        isError:false
    })
//use Effect ka use is liye karte hai kyo ki ye on the spot component ko load hone pe ya change hone pe chalta hao
// useEffect(()=>{
//     console.log(data)
// },[data])

    //handle the changes on filed 

    const handelChange=(event,property)=>{
        //yaha property dynamicaly sab field se aa rhi hai isi liye ise [] isme rkhe hai nahi to aise bhi name:event.target.value kar skte hai
        setData({...data,[property]:event.target.value})
    }

    //form submit
   const submitForm=(event)=>{
    event.preventDefault()

        //checking error
        // if(error.isError){
        //     toast.error("Form data is Invalid,correct first!")
        //     return;
        // }

     createUser(data).then((response)=>{
        console.log(response);
        toast.success("User registerd successfully!!")
 
        //image posting
        saveUserImage(response.username,image).then((Response)=>{
            console.log(Response)
            toast.success("image is uploaded",{
              theme:'colored'
            })
          }).then((error)=>{
            console.warn(error)
            toast.error("image is not uploaded")
          })
          //image posting end
     }).catch((error)=>{
        console.warn(error)
        setError({
           errors:error,
           isError:true 
        })
           if(error.response.status!=500){
            toast.error(error.response.data)
           }else{
            toast.error("something went wrong!")
           }
     })
   } 

   const[image,setImage]=useState(null);

   const handleChangeImage=(event)=>{
     setImage(event.target.files[0])
     
   }

    return (
        <Base>
            <Row>
                <Col sm={{size:6,offset:3}}>
                <Card className="Signup border-0 shadow" outline color="dark">

                <CardBody>
                    {/* {JSON.stringify(data)} */}
                    <CardHeader>
                        <CardTitle style={{ color: 'black' }}><h3>SignUp Here!</h3></CardTitle>
                        <CardSubtitle style={{ color: 'blue' }}>Enter to Explore something new & Post your Blogs</CardSubtitle>
                    </CardHeader>
                    <Form onSubmit={submitForm}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name"

                                id="name"
                                 placeholder="enter Your name"
                                 onChange={(e)=>handelChange(e,'name')}
                                 value={data.name}
                                
                                  />
                        </FormGroup>
                        <FormFeedback></FormFeedback>
               {/* row of email and username */}
                    <Row>
                        <Col sm={{size:6}}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="text" name="email"

                                id="email" placeholder="enter your email" 
                                onChange={(e)=>handelChange(e,'email')}
                                value={data.email}
                                />
                        </FormGroup>
                        </Col>
                        <Col sm={{size:6}}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username"

                                id="username" placeholder="enter your username" 
                                onChange={(e)=>handelChange(e,'username')}
                                value={data.username}
                                />
                        </FormGroup>
                        </Col>
                     
                        </Row>
                           {/* end of this row of email username */}
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password"

                                id="password" placeholder="enter password"
                                onChange={(e)=>handelChange(e,'password')}
                                value={data.password}
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label for="mobile">Mobile</Label>
                            <Input type="text" name="mobile"

                                id="mobile" placeholder="enter Mobile NO."
                                onChange={(e)=>handelChange(e,'mobile')}
                                value={data.mobile}
                                />
                        </FormGroup>
                        {/* for image field */}
                        <FormGroup>
                <Label for="image">Picture</Label>
                <Input type="file" name="image" id="image"  
                  onChange={(e)=>handleChangeImage(e,'image')}
                  value={data.image}
                />
                  </FormGroup>

                        {/* ending of image fiewld */}

                        <FormGroup>
                            <Label for="about">About</Label>
                            <Input type="textarea" name="about"

                                id="about" placeholder="enter about yourself"
                                onChange={(e)=>handelChange(e,'about')}
                                value={data.about}
                                />
                        </FormGroup>

                        <FormGroup className="text-center ">
                            <Button color="dark" type="submit">Signup</Button>
                            <Button type="reset" color="warning " className="ms-2" outline>Clear</Button>
                        </FormGroup>
                    </Form>
                </CardBody>

            </Card>
                </Col>
            </Row>
        </Base>
    );
}
export default Signup;