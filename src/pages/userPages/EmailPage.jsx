import { useParams } from "react-router-dom"
import Base from "../../components/Base";
import { Button, Card, CardBody, CardHeader, Spinner, CardSubtitle, CardTitle, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import { useState } from "react";
import { useEffect } from "react";
import { sendEmail } from "../../Services/User-Service";
import { toast } from "react-toastify";

export const EmailPage = () => {


    const { email } = useParams();


    useEffect(() => {
        setData({ ...data, to: email })
    }, [])
    const [data, setData] = useState({
        to: '',
        subject: '',
        message: ''
    })

    const handleChange = (event, property) => {
        setData({ ...data, [property]: event.target.value })

    }

    //sending dat
    const[flag,setFlag]=useState(false);

    const doSend = (event) => {
        event.preventDefault();
        setFlag(true)
        sendEmail(data).then((Response) => {
            console.info(Response)
            setFlag(false)
            toast.success("Email sent successfully!", {
                theme: 'colored',
                position: 'top-center'
            })
        }).catch((error) => {
            console.warn(error)
            toast.error("Message not sent!", {
                theme: 'dark'
            })
        })
    }

    return (
        <Base>
            <Row>
                <Col sm={{ size: 8, offset: 2 }} >
                    <Card className="my-3 border-0 shadow">
                        {/* {JSON.stringify(data)} */}
                        <CardHeader>
                            <CardTitle>
                                <h3 style={{ color: 'green' }}>Compose your Mail</h3>
                            </CardTitle>
                            <CardSubtitle>
                                whats on your mind compose mail here..
                            </CardSubtitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={doSend}>
                                    <FormGroup>
                                        <Label  style={{ fontSize: 40,color:'blue',fontWeight:'bold'}}  >To</Label>
                                        <Input type="text" id="to"
                                            
                                            onChange={((e) => handleChange(e, 'to'))}
                                            value={data.to} className="border-0 shadow" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label style={{ fontSize: 20 }}>Subject</Label>
                                        <Input type="text"
                                            onChange={((e) => handleChange(e, 'subject'))}
                                            value={data.subject}
                                            className="border-0 shadow" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label style={{ fontSize: 20 }}>Message</Label>
                                        <Input type="textarea" style={{ height: 100 }}
                                            onChange={((e) => handleChange(e, 'message'))}
                                            value={data.message}
                                            className="border-0 shadow" />
                                    </FormGroup>

                                    <FormGroup className="text-center">
                                        {
                                     flag ?
                                        <>
                                        <Button
                                            color="dark"
                                            
                                             disabled
                                            type="submit"
                                            
                                        >
                                            
                                            <Spinner size="sm">
                                                Loading...
                                            </Spinner>
                                            
                                                {' '}Sending
                                            
                                            </Button>

                                        </>:<Button
                                            color="dark"
                                         
                                            size="" 
                                            type="submit"
                                        >
                                            
                                            
                                                {' '}Send
                                          
                                            </Button>
                                     }
                                        
                        
                                    </FormGroup>

                                </Form>


                            </CardBody>
                       
                    </Card>
                </Col>
            </Row>
        </Base>
    )
}