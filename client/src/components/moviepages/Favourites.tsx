import { useState, useEffect } from 'react';
import IMovieItem from "../../models/IMovieItem";
import { getFavourites } from '../../services/movies';
import MovieCardItem from '../MovieCardItem';
import { Row, Col } from 'react-bootstrap';
import RemoveFavourites from '../favourites/RemoveFavourites';
import IToasterState from '../../models/IToasterState';
import ToasterMessage from '../ToasterMessage';

type Props = {
    toasterstate: IToasterState;
    removeFavouriteMovieAction: (params: IMovieItem) => void;
    setToasterstate: any;
};

const Favourites = (props: Props) => {

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
                                handleFavouritesClick={props.removeFavouriteMovieAction}
                            />
                        </Col>
                    ))
                }
            </Row>
            <ToasterMessage toasterstate={props.toasterstate} setToasterstate={props.setToasterstate} />
        </>
    );
};

export default Favourites;