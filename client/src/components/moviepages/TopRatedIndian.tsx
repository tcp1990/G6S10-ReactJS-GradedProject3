import { useState, useEffect } from 'react';
import IMovieItem from "../../models/IMovieItem";
import { getTopRatedIndia } from '../../services/movies';
import MovieCardItem from '../MovieCardItem';
import { Row, Col } from 'react-bootstrap';
import FavouriteComponent from '../favourites/AddFavourites';
import { addFavouriteMovie } from '../common';

const TopRatedIndian = (props: any) => {
    const [movies, setMovies] = useState<IMovieItem[]>([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const topRatedIndiaData = await getTopRatedIndia();
                setMovies(topRatedIndiaData);
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
                                favouriteComponent={<FavouriteComponent />}
                                handleFavouritesClick={addFavouriteMovie}
                            />
                        </Col>
                    ))
                }
            </Row>
        </>
    );
};

export default TopRatedIndian;