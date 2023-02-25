import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NavigationMenu = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link to="/" as={NavLink}>Movies in theaters</Nav.Link>
                        <Nav.Link to="/coming-soon" as={NavLink}>Coming soon</Nav.Link>
                        <Nav.Link to="/top-rated-indian" as={NavLink}>Top rated Indian</Nav.Link>
                        <Nav.Link to="/top-rated-movies" as={NavLink}>Top rated movies</Nav.Link>
                        <Nav.Link to="/favourities" as={NavLink}>Favourities</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationMenu;