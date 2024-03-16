import { Card, CardHeader,CardBody,CardTitle,CardText} from "reactstrap";

const Footer=()=>{
    return (
        <Card
    className="my-5"
    color="dark"
    inverse
    style={{
      width: '100rem',
      height:'10rem'
      
    }}
  >
    <CardHeader>
      Footer
    </CardHeader>
    <CardBody>
      <CardTitle tag="h5">
        Special Title Treatment
      </CardTitle>
      <CardText>
        With supporting text below as a natural lead-in to additional content.
      </CardText>
    </CardBody>
  </Card>
    );
}

export default Footer;