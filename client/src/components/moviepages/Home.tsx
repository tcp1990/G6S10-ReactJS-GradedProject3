import { useState, useEffect } from 'react';
import IMovieItem from "../../models/IMovieItem";
import { addFavourites, getMoviesInTheaters } from '../../services/movies';
import MovieCardItem from '../MovieCardItem';
import { Row, Col, ToastContainer, Toast } from 'react-bootstrap';
import FavouriteComponent from '../favourites/AddFavourites';
import IToasterState from '../../models/IToasterState';

const Home = (props: any) => {
    const [movies, setMovies] = useState<IMovieItem[]>([]);
    const [toasterstate, setToasterstate] = useState<IToasterState>({
        responseState: 'initial',
        toastMessage: '',
        show: false
    });

    useEffect(() => {
        const getMovies = async () => {
            try {
                const moviesInTheatersData = await getMoviesInTheaters();
                setMovies(moviesInTheatersData);
            } catch (error) {

            } finally {

            }
        };

        getMovies();
    }, []);

    const addFavouriteMovieAction = async (movie: IMovieItem) => {
        try {
            setToasterstate({
                ...toasterstate,
                responseState: 'initial'
            });
            const data = await addFavourites(movie);
            setToasterstate({
                ...toasterstate,
                responseState: 'success',
                toastMessage: `A menu item with id=${data.id} has been added successfully`,
                show: true
            });

        } catch (error) {
            setToasterstate({
                ...toasterstate,
                responseState: 'error',
                toastMessage: (error as Error).message,
                show: true
            });
        }
    }

    return (
        <>
            <Row xs={1} md={2} lg={3}>
                {
                    movies.map((movie: IMovieItem) => (
                        <Col key={movie.id} className="d-flex align-items-stretch my-3">
                            <MovieCardItem
                                movie={movie}
                                favouriteComponent={<FavouriteComponent />}
                                handleFavouritesClick={addFavouriteMovieAction}
                            />
                        </Col>
                    ))
                }
            </Row>
            {
                toasterstate.responseState !== 'initial' && (
                    <ToastContainer className="p-3" position="top-end">
                        <Toast
                            bg={toasterstate.responseState === 'success' ? 'success' : 'danger'}
                            show={toasterstate.show}
                            autohide
                            delay={5000}
                            onClose={() => setToasterstate({ ...toasterstate, show: false })}
                        >
                            <Toast.Header closeButton={false}>
                                {toasterstate.responseState === 'success' ? 'Success' : 'Error'}
                            </Toast.Header>
                            <Toast.Body>
                                {toasterstate.toastMessage}
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                )
            }
        </>
    );
};

export default Home;