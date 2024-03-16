import { Button, Card, CardBody, CardColumns, ListGroup, ListGroupItem, CardHeader, CardSubtitle, CardTitle, Container, Form, FormGroup, Input, Label, Row, Col } from "reactstrap"
import Base from "../../components/Base"
import { useEffect, useState } from "react"

import { getCurrentUser, isLoggedIn } from "../../components/authentication/securityauth"
import { Link, useParams } from "react-router-dom"
import { deleteUserById, findUserById, getUserImage } from "../../Services/User-Service"
import { Icons, toast } from "react-toastify"

export const UserProfile = () => {

  const { username } = useParams();

  const [user, setUser] = useState('');
  const [login, setLogin] = useState(false)
  const [curUser, setCurUser] = useState('')

  useEffect(() => {
    findUserById(username).then((Response) => {
      console.log(Response)
      setUser(Response)
      getPic(Response)//for image
      // toast.success("user came")
    }).catch((error) => {
      console.warn(error)
      toast.error("user not came!")
    })
  }, [])


  useEffect(() => {
    setCurUser(getCurrentUser())
    setLogin(isLoggedIn())
  }, [login])

  const deleteUser=()=>{
    deleteUserById(user.id).then((Response)=>{
      console.log(Response)
      toast.success("your account is removed!")
    }).catch((error)=>{
      console.warn(error)
      toast.error("not deleted!")
    })
    
  }
  //for image 

  const[imageData,setImageData]=useState([]);

 const getPic=(user)=>{
  getUserImage(user.image).then((Response)=>{
    const blob=new Blob([Response])
    const objectUrl=URL.createObjectURL(blob)
    setImageData(objectUrl)
})
 }
     
    
 


  //end for image

  return (
    <Base>
      <Container style={{ width: 600 }} className="my-2">
        <Card color="dark" outline className="border-0 shadow" >
          {/* {JSON.stringify(data)} */}
          <CardBody>
            <CardHeader className="text-center" style={{ background: "white" }}>

              <CardTitle>
                {
                  curUser.username == user.username ? (
                    <h3>
                      Your Profile
                    </h3>
                  ) : <h3>
                    User Profile
                  </h3>
                }
                <img className="border-0 shadow rounded-circle" style={{ maxWidth: '100px' }} src={imageData} alt="user-profile pic" />
              </CardTitle>
              <CardSubtitle style={{ color: "blue" }}>Your Profile is now showing you can update your profile</CardSubtitle>
            </CardHeader>
            <ListGroup flush>
              <ListGroupItem>
                <Row>
                  <Col>Name</Col>
                  <Col>{user.name}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Email</Col>
                  <Col>{user.email}  <span className="ms-3"><Button color="dark" outline size="sm" tag={Link} to={"/private/email/"+user.email} >send</Button></span></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Username</Col>
                  <Col>{user.username}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Mobile No.</Col>
                  <Col>{user.mobile}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>About</Col>
                  <Col>{user.about}</Col>

                </Row>
              </ListGroupItem>
            </ListGroup>
            {curUser.username == user.username && (
              <Container>
                <Button color="danger" size="sm" outline onClick={deleteUser}>Delete</Button>
                <Button color="info" className="ms-2" size="sm" outline
                  tag={Link} to={"/private/updateUser/"+curUser.username}
                >Update</Button>
              </Container>)}

          </CardBody>
        </Card>
      </Container>
    </Base>
  );

}