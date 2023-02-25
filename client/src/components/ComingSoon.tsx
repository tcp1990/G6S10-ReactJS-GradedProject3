import { useState, useEffect } from 'react';
import IMovieItem from "../models/IMovieItem";
import { getUpcomingMovies } from '../services/movies';
import MovieCardItem from './MovieCardItem';
import { Row, Col } from 'react-bootstrap';

const ComingSoon = (props: any) => {
    const [movies, setMovies] = useState<IMovieItem[]>([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const upcomingMoviesData = await getUpcomingMovies();
                setMovies(upcomingMoviesData);
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
                            />
                        </Col>
                    ))
                }
            </Row>
        </>
    );
};

export default ComingSoon;