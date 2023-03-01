import { ReactNode } from "react";
import IMovieItem from "../../models/IMovieItem";
import MovieCardItem from '../MovieCardItem';
import { Row, Col } from 'react-bootstrap';
import IToasterState from '../../models/IToasterState';
import FavouriteToasterMessage from '../FavouriteToasterMessage';
import LoadingIndicator from "../common/LoadingIndicator";
import LoadingToasterMessage from "../LoadingToasterMessage";

type Props = {
    favouriteComponent: ReactNode;
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
            {
                props.movies && (
                    <>
                        <Row xs={1} md={2} lg={3}>
                            {
                                props.movies.map((movie: IMovieItem) => (
                                    <Col key={movie.id} className="d-flex align-items-stretch my-3">
                                        <MovieCardItem
                                            movie={movie}
                                            favouriteComponent={props.favouriteComponent}
                                            handleFavouritesClick={props.addFavouriteMovieAction}
                                        />
                                    </Col>
                                ))
                            }
                        </Row>
                    </>
                )
            }
            <FavouriteToasterMessage
                toasterstate={props.toasterstate}
                setToasterstate={props.setToasterstate} />

            <LoadingToasterMessage
                show={props.show}
                error={props.error}
                setShow={props.setShow} />
        </>
    );
};

export default MovieListPage;