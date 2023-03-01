import IMovieItem from "../../models/IMovieItem";
import MovieCardItem from '../MovieCardItem';
import { Row, Col, ToastContainer, Toast } from 'react-bootstrap';
import FavouriteComponent from '../favourites/AddFavourites';
import IToasterState from '../../models/IToasterState';
import ToasterMessage from '../ToasterMessage';
import LoadingIndicator from "../common/LoadingIndicator";

type Props = {
    setShow: (params: boolean) => void;
    loading: boolean;
    error: string;
    show: boolean;
    movies: IMovieItem[];
    searchValue: string;
    toasterstate: IToasterState;
    addFavouriteMovieAction: (params: IMovieItem) => void;
    setToasterstate: (params: IToasterState) => void;
};

const MovieListPage = (props: Props) => {

    return (
        <>
            {
                props.loading && (
                    <LoadingIndicator
                        size="large"
                        message="We are fetching the movies list. Please wait..."
                    />
                )
            }
            <Row xs={1} md={2} lg={3}>
                {
                    props.movies.map((movie: IMovieItem) => (
                        <Col key={movie.id} className="d-flex align-items-stretch my-3">
                            <MovieCardItem
                                movie={movie}
                                favouriteComponent={<FavouriteComponent />}
                                handleFavouritesClick={props.addFavouriteMovieAction}
                            />
                        </Col>
                    ))
                }
            </Row>
            <ToasterMessage toasterstate={props.toasterstate} setToasterstate={props.setToasterstate} />

            {
                props.error && (
                    <ToastContainer className="p-3" position="top-end">
                        <Toast
                            bg="danger"
                            show={props.show}
                            autohide
                            delay={5000}
                            onClose={() => props.setShow(false)}
                        >
                            <Toast.Header closeButton={false}>
                                Error
                            </Toast.Header>
                            <Toast.Body>{props.error}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                )
            }
        </>
    );
};

export default MovieListPage;