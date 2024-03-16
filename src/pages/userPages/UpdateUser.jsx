import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UpdateUserById, findUserById } from "../../Services/User-Service";
import { toast } from "react-toastify";
import Base from "../../components/Base";
import { Row,Col,Card,CardHeader,CardTitle,CardSubtitle,CardBody,Button,Form,FormGroup,Label,Input } from "reactstrap";

export const UpdateUser=()=>{

    // const[user,setUser]=useState('');
    const navigate=useNavigate();

    const {username}=useParams();
     
    useEffect(()=>{
        findUserById(username).then((Response)=>{
        //    setUser(Response)
           setData(Response)
        //    toast.success("u can update user!")
        }).catch((error)=>{
            console.warn(error)
            toast.error("something went wrong!")
        })
    },[])

    //data to be send
    const[data,setData]=useState({
        name:'',
        email:'',
        username:'',
        password:'',
        about:'',
        mobile:''
    })
    const handelChange=(event,property)=>{
         setData({...data,[property]:event.target.value})
    }

    //submititing the form
    const submitForm=(event)=>{
         event.preventDefault();
        UpdateUserById(username,data).then((Response)=>{
            console.log(Response)
          navigate("/private/user-profile/"+data.username)
       toast.success("successfully updated!")
        }).catch((error)=>{
            console.warn(error)
            toast.error("something went wrong!")
        })
    }

    return (
        <Base>
          <Row>
                <Col sm={{size:6,offset:3}}>
                <Card className="Signup border-0 shadow" outline color="dark">

                <CardBody>
                    {/* {JSON.stringify(data)} */}
                    <CardHeader>
                        <CardTitle style={{ color: 'black' }}><h3>Updae your Profile Here!</h3></CardTitle>
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
                        <FormGroup>
                            <Label for="about">About</Label>
                            <Input type="textarea" name="about"

                                id="about" placeholder="enter about yourself"
                                onChange={(e)=>handelChange(e,'about')}
                                value={data.about}
                                />
                        </FormGroup>

                        <FormGroup className="text-center ">
                            <Button color="dark" type="submit">Update</Button>
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