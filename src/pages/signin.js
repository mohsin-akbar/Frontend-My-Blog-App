import { Button, Card, CardBody, CardTitle, CardSubtitle, FormGroup, Input,Label, CardHeader, Row, Col, Form} from "reactstrap";
import './PageCSS/Signin.css';
import Base from "../components/Base";
import { useState } from "react";
import { getCurrentUser, signIn } from "../Services/User-Service";
import { toast } from "react-toastify";
import { currentUser, doLogin, doLogout } from "../components/authentication/securityauth";
import { useNavigate } from "react-router-dom";
const SignIn=()=>{
   const navigate=useNavigate()
    

 

    const [data,setData]= useState({
      
        usernameOrEmail:'',
        password:'',
        
    })

    const handleChange=(event,property)=>{
        setData({...data,[property]:event.target.value})
    }

// login form
const loginForm=(event)=>{
    event.preventDefault();

//current user save
getCurrentUser(data).then((Response)=>{ 
    console.log(Response)
    localStorage.setItem("current",JSON.stringify(Response))
    console.log("saved Current User to local storage get by key current")

  }).catch((error)=>{
    console.warn("current user error ",error);

  })

    signIn(data).then((Response)=>{
         
//saving the data to localstorage
      doLogin(Response,()=>{
        console.log("token saved to local storage!")
        //redirect to user dashbord

        navigate("/private/user")
        
      })
           
        toast.success("login successfully!")
    }).catch((error)=>{
        console.log(error);
        if(error.response.status!=500){
            toast.error(error.response.data)
           }else{
            toast.error("something went wrong!")
           }
    })
}



    return (
        <Base>
        <div className=" p-3 Signin">
            <Row>
              <Col sm={{size:6,offset: 3}}>
            <Card outline color="dark" className="border-0 shadow">
                <CardBody>
                    <CardHeader>
                    <CardTitle style={{color:'black'}}><h3>SignIn Here!</h3></CardTitle>
                    <CardSubtitle style={{color:'blue'}}>Enter to Explore something new & Post your Blogs</CardSubtitle>
                    </CardHeader>
                   <Form onSubmit={loginForm}>
                    <FormGroup>
                    <Label for="usernameOrEmail">Username or Email</Label>
                    <Input type="text" name="usernameOrEmail"
                    
                    id="usernameOrEmail" placeholder="enter username or Email"
                    onChange={(e)=>handleChange(e,'usernameOrEmail')}
                    value={data.usernameOrEmail}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password"
                    
                      id="password" placeholder="enter password"
                      onChange={(e)=>handleChange(e,'password')}
                      value={data.password}
                      />
                    </FormGroup>
                   
                    <FormGroup className="text-center ">
                        <Button color="dark" type="submit">Login</Button>
                        <Button type="reset" color="warning " className="ms-2" outline>Clear</Button>
                    </FormGroup>
                    </Form>
                </CardBody>
            </Card>
            </Col>
            </Row>
        </div>
        </Base>
    );
}
export default SignIn;