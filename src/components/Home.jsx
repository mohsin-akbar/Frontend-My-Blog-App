import { Button, Card, CardBody, CardHeader, CardSubtitle, CardTitle } from "reactstrap";
import Base from "./Base";
const Home = () => {
    return (
        <Base>
            <Card>
                <CardBody>
                    <CardHeader>
                        <CardTitle tag="h5" color="danger">This is Home Page!</CardTitle>
                        <CardSubtitle>this is home page of this application!</CardSubtitle>

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
                            <Button color="success">Button</Button>
                        </div>
                    </CardHeader>
                </CardBody>
            </Card>
        </Base>
    );
}

export default Home;