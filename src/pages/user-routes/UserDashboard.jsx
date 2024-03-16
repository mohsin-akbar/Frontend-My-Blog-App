import { Card ,CardBody,CardHeader,CardTitle,CardSubtitle,Button} from "reactstrap";
import Base from "../../components/Base"
import { Link } from "react-router-dom";

export const UserDashboard=()=>{
    return (
        <Base>
         <Card>
                <CardBody>
                    <CardHeader>
                        <CardTitle tag="h5" color="danger">This is User Dashboard!</CardTitle>
                        <CardSubtitle>this is user dashboard of this application!</CardSubtitle>

                        <div>lerem30
                            <ul>
                                <li>Lorem ipsum dolor sit amet, consectetuer adipiscing
                                    elit. Aenean commodo ligula eget dolor. Aenean
                                    massa.</li>
                                <li>Cum sociis natoque penatibus et magnis dis
                                    parturient montes, nascetur ridiculus mus. Donec quam
                                    felis, ultricies nec, pellentesque eu, pretium quis,
                                    sem.</li>
                                <li>Nulla consequat massa quis enim. Donec pede justo,
                                    fringilla vel, aliquet nec, vulputate eget, arcu.</li>
                                <li>In enim justo, rhoncus ut, imperdiet a, venenatis
                                    vitae, justo. Nullam dictum felis eu pede mollis
                                    pretium. Integer tincidunt.</li>
                            </ul>
                            <Link tag="a" to='/private/post' exact ><Button color="success">Post Here</Button></Link>
                            <Link tag="a" to='/private/posts' exact ><Button color="primary" className="ms-3">All Contents</Button></Link>
                        </div>
                    </CardHeader>
                </CardBody>
            </Card>
        
        </Base>
    );
}


    
