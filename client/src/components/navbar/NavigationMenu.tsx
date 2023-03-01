import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

type Props = {
    searchValue: string;
    setSearchValue: (params: string) => void;
    movieTypeList: string[];
}

const NavigationMenu = (props: Props) => {
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
                        <Nav.Link to={`/${props.movieTypeList[1]}`} as={NavLink}>Coming soon</Nav.Link>
                        <Nav.Link to={`/${props.movieTypeList[2]}`} as={NavLink}>Top rated Indian</Nav.Link>
                        <Nav.Link to={`/${props.movieTypeList[3]}`} as={NavLink}>Top rated movies</Nav.Link>
                        <Nav.Link to={`/${props.movieTypeList[4]}`} as={NavLink}>Favourities</Nav.Link>
                    </Nav>
                    <div className='d-flex'>
                        <input
                            className='form-control'
                            value={props.searchValue}
                            onChange={(event) => props.setSearchValue(event.target.value)}
                            placeholder='Search movie'
                        ></input>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationMenu;