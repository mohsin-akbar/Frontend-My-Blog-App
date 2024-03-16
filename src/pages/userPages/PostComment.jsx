import { useParams } from "react-router-dom";
import Base from "../../components/Base";
import { Col, Row, Card, CardHeader, CardTitle, CardSubtitle, Spinner,CardBody, FormGroup, Form, Input, Label, Button, Pagination, PaginationItem, PaginationLink, Container } from "reactstrap";
import { useState } from "react";
import { createComment, getAllComment, getImage, getPost } from "../../Services/User-Service";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getCurrentUser } from "../../components/authentication/securityauth";
import Comment from "./Comments";



export const PostComment = () => {
    const { id } = useParams();

    const [user, setUser] = useState('')

    useEffect(() => {
        setUser(getCurrentUser())
    }, [])



    const [post, setPost] = useState({})
    const[imageData,setImageData]=useState([])

    const [comments, setComments] = useState({
        content: [],
        pageSize: '',
        pageNo: '',
        totalElements: '',
        totalPages: '',
        last: false
    })

    useEffect(() => {
        getPost(id).then((Response) => {
            console.log(Response);
            setPost(Response)
          //getting image
          getImage(Response.image).then((Response)=>{
            const blob=new Blob([Response])
            const objectUrl=URL.createObjectURL(blob)
            setImageData(objectUrl)
        }).catch((error)=>{
            console.warn(error)
            toast.error("image is not came")
        })
          //ending image

        }).catch((error) => {
            console.log(error)
            toast.error("something went wrong!")
        })
    }, [])

    // const[content,setContent]=useState([]);

    const getComments = (pageNo = 0, pageSize = 3, sortBy = 'date', sortDir = 'desc') => {//sorting decending to date
        getAllComment(id, pageNo, pageSize, sortBy, sortDir).then((Response) => {
            console.log(Response);
            setComments(Response);
            //   setContent(Response.content)

            // toast.success("posts loaded!")

        }).catch((error) => {
            console.log(error);
            toast.error("comments not loaded");
        })
    }

    useEffect(() => {
        getComments(0, 3)
    }, [])


    //for submiting the form

    const [form, setForm] = useState({
        body: '',


    })

    const changeHandle = (event, property) => {
        setForm({ ...form, [property]: event.target.value })
    }

    //end submiting comment form

    //submitting the form
    const formSubmit = (event) => {
        event.preventDefault();

        const dataToSend = { ...form, name: user.name, email: user.email }

        createComment(id, dataToSend).then((Response) => {
            console.log(Response)
            toast.success("comment done!")
            // window.location.reload(false); 
            getComments(0, 3)

        }).catch((error) => {
            console.warn(error)
            toast.error("comment not done")
        })
    }
    //filter comment
    const filterComment = () => {
        getComments(comments.pageNo, 3)
    }


    return (
        <Base>
            <Row className="p-3">
                <Col sm={{ size: 6 }}>
                    <Card outline color="dark">
                        <CardHeader>
                            <CardTitle><h3>{post.title}</h3>
                            </CardTitle>
                            <CardSubtitle style={{ color: "blue" }}>{post.description}</CardSubtitle>
                        </CardHeader>
                        <CardBody>
                          <img src={imageData} alt="post-image" style={{width:'300px',height:'400px'}} className="border-0 shadow rounded"/>
                            <CardBody>
                            {post.content}
                            </CardBody>
                            <Form className="my-3" onSubmit={formSubmit}>
                                <FormGroup>
                                    <Label for="body" style={{ color: 'red' }}><b>Comment</b></Label>
                                    <Input type="textarea" style={{ height: 150 }} name="body" id="body" placeholder="comment here."
                                        onChange={(e) => changeHandle(e, 'body')}
                                        value={form.body}
                                    />
                                </FormGroup>


                                <FormGroup>
                                    <Button color="dark" size="sm">Comment</Button>
                                </FormGroup>
                            </Form>
                        </CardBody>

                    </Card>
                </Col>
                <Col sm={{ size: 6 }}>
                    <Card outline color="dark">
                        <CardHeader>
                            <CardTitle><h3>comment section.</h3></CardTitle>
                            <CardSubtitle style={{ color: 'blue' }}> this is comment section regarding this post</CardSubtitle>
                        </CardHeader>
                        <CardBody>
                            {
                                comments.content.length > 0 ? comments.content.map((item) => <Comment comment={item} key={item.commentId} refreshComment={filterComment} />) : "No Comments Available!"
                            }
                        </CardBody>

                        <Pagination className="ms-3" >
                            <PaginationItem disabled={comments.pageNo === 0} >
                                <PaginationLink onClick={() => getComments(comments.pageNo - 1)} >
                                    prev
                                </PaginationLink>
                            </PaginationItem>

                            {/* java script here */}
                            {
                                comments.totalPages > 0 ? [...Array(comments.totalPages)].map((item, index) => (
                                    <PaginationItem active={index === comments.pageNo}>
                                        <PaginationLink onClick={() => getComments(index)}>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )) : <PaginationItem><PaginationLink>...</PaginationLink></PaginationItem>
                            }


                            <PaginationItem disabled={comments.last === true}>
                                <PaginationLink onClick={() => getComments(comments.pageNo + 1)}>
                                    next
                                </PaginationLink>
                            </PaginationItem>

                        </Pagination>
                    </Card>
                </Col>
            </Row>
        </Base>
    );
}