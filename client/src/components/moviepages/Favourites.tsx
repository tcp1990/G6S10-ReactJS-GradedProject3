import { useState, useEffect } from 'react';
import IMovieItem from "../../models/IMovieItem";
import { getFavourites } from '../../services/movies';
import MovieCardItem from '../MovieCardItem';
import { Row, Col } from 'react-bootstrap';
import RemoveFavourites from '../favourites/RemoveFavourites';
import { removeFavouriteMovie } from '../common';

const Favourites = (props: any) => {

    const [movies, setMovies] = useState<IMovieItem[]>([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const favouritesData = await getFavourites();
                setMovies(favouritesData);
            } catch (error) {

            } finally {

            }
        };

        getMovies();
    }, []);

    return (
        <>
            <Row xs={1} md={2} lg={3}>
                {
                    movies.map((movie: IMovieItem) => (
                        <Col key={movie.id} className="d-flex align-items-stretch my-3">
                            <MovieCardItem
                                movie={movie}
                                favouriteComponent={<RemoveFavourites />}
                                handleFavouritesClick={removeFavouriteMovie}
                            />
                        </Col>
                    ))
                }
            </Row>
        </>
    );
};

export default Favourites;