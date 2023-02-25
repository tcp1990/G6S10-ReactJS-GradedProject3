import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IMovieItem from "../models/IMovieItem";

type Props = {
    movie: IMovieItem
};

const MovieCardItem = ({ movie }: Props) => {
    const {
        id,
        title,
        year,
        poster,
        storyline,
        imdbRating,
        posterurl
    } = movie;

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`${posterurl}`} />
            <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                    <div>
                        {title}
                    </div>
                    {/* <div onClick={() => props.handleFavouritesClick(movie)}
                                className='movie-favourite-container'>
                            </div> */}
                    <div
                        className='movie-favourite-container'>
                    </div>
                </Card.Title>
            </Card.Body>
        </Card>
    );
}

export default MovieCardItem;