import { ReactNode, useEffect, useState } from "react";
import IMovieItem from "../../models/IMovieItem";
import MovieCardItem from './MovieCardItem';
import { Row, Col } from 'react-bootstrap';
import IToasterState from '../../models/IToasterState';
import FavouriteToasterMessage from '../FavouriteToasterMessage';
import LoadingIndicator from "../common/LoadingIndicator";
import LoadingToasterMessage from "../LoadingToasterMessage";
import { getMovieList } from "../../services/movies";

type Props = {
    favouriteComponent: ReactNode;
    movieType: string;
    searchValue: string;
    toasterstate: IToasterState;
    favouriteClickAction: (params: IMovieItem) => void;
    setToasterstate: (params: IToasterState) => void;
};

const MovieListPage = (props: Props) => {

    const [movies, setMovies] = useState<IMovieItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const moviesList = await getMovieList({
                    movieType: props.movieType,
                    suffix: props.searchValue
                });
                setMovies(moviesList);
            } catch (error) {
                setError((error as Error).message);
                setShow(true);
            } finally {
                setLoading(false);
            }
        };

        getMovies();
    }, [props.movieType, props.searchValue]);

    return (
        <>
            {
                loading && (
                    <LoadingIndicator
                        size="large"
                        message="We are fetching the movies list. Please wait..."
                    />
                )
            }

            {
                movies && (
                    <>
                        <Row xs={1} md={2} lg={3} xl={4}>
                            {
                                movies.map((movie: IMovieItem) => (
                                    <Col key={movie.id} className="d-flex align-items-stretch my-3">
                                        <MovieCardItem
                                            movie={movie}
                                            movieType={props.movieType}
                                            favouriteComponent={props.favouriteComponent}
                                            handleFavouritesClick={props.favouriteClickAction}
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
                show={show}
                error={error}
                setShow={setShow} />
        </>
    );
};

export default MovieListPage;