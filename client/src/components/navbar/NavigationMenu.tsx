import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

const NavigationMenu = (props: any) => {
    return (
        <Navbar bg="light" expand="lg" style={{ position: "sticky" }} fixed="top">
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
                    <div className='d-flex'>
                        <input
                            className='form-control'
                            value={props.value}
                            onChange={(event) => props.setSearchValue(event.target.value)}
                            placeholder='Type to search...'
                        ></input>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationMenu;