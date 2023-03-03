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
    const [canShowMovieList, setCanShowMovieList] = useState<boolean>(false);
    const [canReload, setCanReload] = useState<boolean>(false);

    useEffect(() => {
        const getMovies = async () => {
            try {
                setLoading(true);
                setMovies([]);
                setShow(false);
                setError('');
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
    }, [canReload, props.movieType, props.searchValue]);

    useEffect(() => {
        setCanShowMovieList((movies && movies.length > 0));
    }, [movies]);

    const invokeReload = () => {
        setCanReload(!canReload);
    };

    return (
        <>
            {
                loading && (
                    <>
                        <div className="movie-list-empty-container">
                            <div className="movie-list-empty-container-center">
                                <LoadingIndicator
                                    size="large"
                                    message="We are fetching the movies list. Please wait..."
                                />
                            </div>
                        </div>
                    </>
                )
            }

            {
                canShowMovieList ? (
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
                                            invokeReload={invokeReload}
                                        />
                                    </Col>
                                ))
                            }
                        </Row>
                    </>
                )
                    :
                    (
                        <>
                            <div className="movie-list-empty-container">
                                <div className="movie-list-empty-container-center">
                                    <p className="movie-no-data-value">No data found</p>
                                </div>
                            </div>
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