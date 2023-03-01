import IMovieItem from "../../models/IMovieItem";
import MovieCardItem from '../MovieCardItem';
import { Row, Col } from 'react-bootstrap';
import FavouriteComponent from '../favourites/AddFavourites';
import IToasterState from '../../models/IToasterState';
import ToasterMessage from '../ToasterMessage';
import LoadingIndicator from "../common/LoadingIndicator";

type Props = {
    loading: boolean;
    error: string;
    show: boolean;
    movies: IMovieItem[];
    searchValue: string;
    toasterstate: IToasterState;
    addFavouriteMovieAction: (params: IMovieItem) => void;
    setToasterstate: any;
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
        </>
    );
};

export default MovieListPage;